import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PackageCard from './PackageCard';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';

interface PackageListingProps {
  itemGroup?: string;
}

const PackageListing: React.FC<PackageListingProps> = ({ itemGroup: propItemGroup }) => {
  /**
   * ROUTE PARAMS
   * /dropdown/:dropdown_name
   * /category/:item_group
   */
  const params = useParams();
  const dropdownName = params.dropdown_name;
  const itemGroupParam = params.item_group;

  const normalizedItemGroup =
    itemGroupParam
      ? itemGroupParam
          .split('-')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      : propItemGroup || null;

  /**
   * STATE
   */
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'name'>('name');
  const [filterPrice, setFilterPrice] = useState<{ min: number; max: number } | null>(null);
  const [selectedDropdowns, setSelectedDropdowns] = useState<string[]>([]);
  const [selectedItemGroups, setSelectedItemGroups] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  /**
   * DATA FETCH
   */
  const { data: apiResponse, error, isValidating } =
    useFrappeGetCall('travel_agency_website.api.get_items_with_accommodation');

  const allPackages = apiResponse?.message?.data || [];

  const { data: cmsData, isValidating: cmsValidating } = useWebsiteCMS();
  const navigationDropdownItems = cmsData?.navigation_dropdown_items || [];

  /**
   * VIEW MODE
   */
  const isDropdownView = Boolean(dropdownName);

  /**
   * 🔥 URL → FILTER SYNC (THE IMPORTANT PART)
   */
  useEffect(() => {
    if (!navigationDropdownItems.length || !allPackages.length) return;

    // Reset first to avoid stale state
    setSelectedDropdowns([]);
    setSelectedItemGroups([]);

    // Dropdown page
    if (dropdownName) {
      const dropdown = navigationDropdownItems.find(
        (d: any) => d.dropdown_name.toLowerCase() === dropdownName.toLowerCase()
      );

      if (dropdown) {
        setSelectedDropdowns([dropdown.dropdown_name]);
      }
    }

    // Item group page
    if (normalizedItemGroup) {
      setSelectedItemGroups([normalizedItemGroup]);

      const parentDropdown = navigationDropdownItems.find(
        (i: any) => i.item_group === normalizedItemGroup
      );

      if (parentDropdown) {
        setSelectedDropdowns([parentDropdown.dropdown_name]);
      }
    }
  }, [dropdownName, normalizedItemGroup, navigationDropdownItems, allPackages]);

  /**
   * LOADING
   */
  const isLoading = isValidating || (isDropdownView && cmsValidating);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load packages
      </div>
    );
  }

  /**
   * AVAILABLE FILTER OPTIONS
   */
  const availableDropdowns = useMemo(() => {
    return Array.from(
      new Set(navigationDropdownItems.map((i: any) => i.dropdown_name))
    ).sort();
  }, [navigationDropdownItems]);

  const availableItemGroups = useMemo(() => {
    if (!selectedDropdowns.length) {
      return Array.from(
        new Set(allPackages.map((p: any) => p.item_group))
      ).sort();
    }

    return Array.from(
      new Set(
        navigationDropdownItems
          .filter((i: any) => selectedDropdowns.includes(i.dropdown_name))
          .map((i: any) => i.item_group)
      )
    ).sort();
  }, [selectedDropdowns, navigationDropdownItems, allPackages]);

  /**
   * FILTER + SORT
   */
  const filteredPackages = useMemo(() => {
    let result = [...allPackages];

    if (selectedItemGroups.length) {
      result = result.filter(p => selectedItemGroups.includes(p.item_group));
    } else if (selectedDropdowns.length) {
      const allowedGroups = navigationDropdownItems
        .filter((i: any) => selectedDropdowns.includes(i.dropdown_name))
        .map((i: any) => i.item_group);

      result = result.filter(p => allowedGroups.includes(p.item_group));
    }

    if (filterPrice) {
      result = result.filter(p => {
        const price = p.standard_rate || 0;
        return price >= filterPrice.min && price <= filterPrice.max;
      });
    }

    if (selectedRatings.length) {
      result = result.filter(p => {
        const rating = p.custom_package_rating || 0;
        const stars = Math.round(rating <= 1 ? rating * 5 : rating);
        return selectedRatings.includes(stars);
      });
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.standard_rate || 0) - (b.standard_rate || 0));
        break;
      case 'price-high':
        result.sort((a, b) => (b.standard_rate || 0) - (a.standard_rate || 0));
        break;
      case 'name':
        result.sort((a, b) => a.item_name.localeCompare(b.item_name));
        break;
    }

    return result;
  }, [
    allPackages,
    selectedDropdowns,
    selectedItemGroups,
    filterPrice,
    selectedRatings,
    sortBy,
    navigationDropdownItems
  ]);

  /**
   * GROUPED VIEW (DROPDOWN)
   */
  const groupedPackages = useMemo(() => {
    if (!isDropdownView) return {};

    return filteredPackages.reduce((acc: any, pkg: any) => {
      acc[pkg.item_group] = acc[pkg.item_group] || [];
      acc[pkg.item_group].push(pkg);
      return acc;
    }, {});
  }, [filteredPackages, isDropdownView]);

  /**
   * CLEAR
   */
  const clearAllFilters = () => {
    setSelectedDropdowns([]);
    setSelectedItemGroups([]);
    setFilterPrice(null);
    setSelectedRatings([]);
  };

  /**
   * RENDER
   */
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* RESULTS */}
        {isDropdownView ? (
          Object.entries(groupedPackages).map(([group, pkgs]: any) => (
            <div key={group} className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">
                {group}
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {pkgs.map((pkg: any) => (
                  <PackageCard
                    key={pkg.name}
                    id={pkg.name}
                    title={pkg.item_name}
                    duration={pkg.custom_duration}
                    rating={pkg.custom_package_rating}
                    price={pkg.standard_rate}
                    image={pkg.image}
                    itemGroup={pkg.item_group}
                    accommodationList={pkg.custom_accommodation_list || []}
                    specialServicesList={pkg.custom_special_services || []}
                    primaryButtonText="View Details"
                    secondaryButtonText="Enquire Now"
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredPackages.map((pkg: any) => (
              <PackageCard
                key={pkg.name}
                id={pkg.name}
                title={pkg.item_name}
                duration={pkg.custom_duration}
                rating={pkg.custom_package_rating}
                price={pkg.standard_rate}
                image={pkg.image}
                itemGroup={pkg.item_group}
                accommodationList={pkg.custom_accommodation_list || []}
                specialServicesList={pkg.custom_special_services || []}
                primaryButtonText="View Details"
                secondaryButtonText="Enquire Now"
              />
            ))}
          </div>
        )}

        {!filteredPackages.length && (
          <div className="text-center py-20 text-gray-500">
            No packages found
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageListing;
