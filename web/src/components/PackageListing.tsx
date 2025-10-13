import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PackageCard from './PackageCard';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';

interface PackageListingProps {
  itemGroup?: string;
}

const PackageListing: React.FC<PackageListingProps> = ({ itemGroup: propItemGroup }) => {
  const { itemGroup: paramItemGroup, dropdownName } = useParams<{ itemGroup: string; dropdownName: string }>();
  const itemGroup = propItemGroup || paramItemGroup || '';
  
  // State variables
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'name'>('name');
  const [filterPrice, setFilterPrice] = useState<{ min: number; max: number } | null>(null);
  const [selectedDropdowns, setSelectedDropdowns] = useState<string[]>([]);
  const [selectedItemGroups, setSelectedItemGroups] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  
  // Fetch all packages with accommodation data using custom API
  const { data: apiResponse, error, isValidating } = useFrappeGetCall('travel_agency_website.api.get_items_with_accommodation');
  const allPackages = apiResponse?.message?.data || [];
  
  // Fetch navigation data to get dropdown information
  const { data: cmsData, isValidating: cmsValidating } = useWebsiteCMS();
  
  const navigationDropdownItems = cmsData?.navigation_dropdown_items || [];
  
  console.log('📦 CMS Data:', { cmsData, cmsValidating, navigationDropdownItems });
  
  // Determine if we're viewing a dropdown or specific item group
  const isDropdownView = Boolean(dropdownName && !itemGroup);
  
  // Auto-select filters based on URL (runs once when component mounts or URL changes)
  React.useEffect(() => {
    // Skip if viewing "all" category
    if (itemGroup === 'all') {
      setSelectedDropdowns([]);
      setSelectedItemGroups([]);
      return;
    }

    if (dropdownName && navigationDropdownItems.length > 0) {
      // Find the proper dropdown name (case-insensitive)
      const properDropdownName = navigationDropdownItems.find(
        (item: any) => item.dropdown_name.toLowerCase() === dropdownName.toLowerCase()
      )?.dropdown_name;
      
      if (properDropdownName) {
        setSelectedDropdowns([properDropdownName]);
      }
    }
    
    if (itemGroup && itemGroup !== 'all' && allPackages.length > 0) {
      // Convert URL format to proper Item Group name
    const properItemGroup = itemGroup
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
      if (properItemGroup) {
        setSelectedItemGroups([properItemGroup]);
        
        // Also select the parent dropdown if viewing item group
        const parentDropdown = navigationDropdownItems.find(
          (item: any) => item.item_group === properItemGroup
        )?.dropdown_name;
        
        if (parentDropdown) {
          setSelectedDropdowns([parentDropdown]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownName, itemGroup]);
  
  // Show loading state if either packages or CMS data (for dropdown view) is loading
  const isLoading = isValidating || (isDropdownView && cmsValidating);
  
  // Debug logging
  console.log('🔍 PackageListing Component Debug:', {
    itemGroup,
    allPackagesCount: allPackages.length,
    error: error ? {
      message: error.message,
      httpStatus: error.httpStatus
    } : null,
    isValidating
  });

  // Get unique dropdowns and item groups from CMS data
  const availableDropdowns = React.useMemo(() => {
    const dropdowns = new Set<string>();
    navigationDropdownItems.forEach((item: any) => {
      dropdowns.add(item.dropdown_name);
    });
    return Array.from(dropdowns).sort();
  }, [navigationDropdownItems]);

  const availableItemGroups = React.useMemo(() => {
    const groups = new Set<string>();
    allPackages.forEach((pkg: any) => {
      if (pkg.item_group) {
        groups.add(pkg.item_group);
      }
    });
    return Array.from(groups).sort();
  }, [allPackages]);

  // Apply filters and sort packages
  const sortedPackages = React.useMemo(() => {
    // Start with all packages
    let filtered = [...allPackages];
    
    // Apply dropdown filter
    if (selectedDropdowns.length > 0) {
      const itemGroupsInSelectedDropdowns = navigationDropdownItems
        .filter((item: any) => selectedDropdowns.includes(item.dropdown_name))
        .map((item: any) => item.item_group);
      
      filtered = filtered.filter(pkg => itemGroupsInSelectedDropdowns.includes(pkg.item_group));
    }
    
    // Apply item group filter
    if (selectedItemGroups.length > 0) {
      filtered = filtered.filter(pkg => selectedItemGroups.includes(pkg.item_group));
    }
    
    // Apply price range filter
    if (filterPrice) {
      filtered = filtered.filter(pkg => {
        const price = pkg.standard_rate || 0;
        return price >= filterPrice.min && price <= filterPrice.max;
      });
    }
    
    // Apply rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(pkg => {
        const packageRating = pkg.custom_package_rating || 0;
        // Convert decimal rating to star rating (0.7 = 3.5 stars = 4 stars when rounded)
        // If rating is between 0-1, multiply by 5, otherwise use as-is
        const normalizedRating = packageRating <= 1 ? packageRating * 5 : packageRating;
        const starRating = Math.round(normalizedRating);
        return selectedRatings.includes(starRating);
      });
    }
    
    // Sort packages
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.standard_rate || 0) - (b.standard_rate || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.standard_rate || 0) - (a.standard_rate || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a.item_name || '').localeCompare(b.item_name || ''));
        break;
    }
    
    return filtered;
  }, [allPackages, sortBy, filterPrice, selectedDropdowns, selectedItemGroups, selectedRatings, navigationDropdownItems]);

  // Get packages based on view type (for grouped display only)
  const groupedPackages = React.useMemo(() => {
    const grouped: { [key: string]: any[] } = {};
    
    if (isDropdownView && dropdownName) {
      // Get all item groups for this dropdown (case-insensitive match)
      const dropdownItemGroups = navigationDropdownItems
        .filter((item: any) => item.dropdown_name.toLowerCase() === dropdownName.toLowerCase())
        .map((item: any) => item.item_group);
      
      // Group FILTERED packages by item group (use sortedPackages instead of allPackages)
      sortedPackages.forEach((pkg: any) => {
        if (dropdownItemGroups.includes(pkg.item_group)) {
          if (!grouped[pkg.item_group]) {
            grouped[pkg.item_group] = [];
          }
          grouped[pkg.item_group].push(pkg);
        }
      });
    }
    
    return grouped;
  }, [isDropdownView, dropdownName, navigationDropdownItems, sortedPackages]);

  // Show loading state if data is still loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading packages...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Packages</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  // Filter handlers
  const handleDropdownToggle = (dropdown: string) => {
    setSelectedDropdowns(prev => 
      prev.includes(dropdown) 
        ? prev.filter(d => d !== dropdown)
        : [...prev, dropdown]
    );
  };

  const handleItemGroupToggle = (itemGroup: string) => {
    setSelectedItemGroups(prev => 
      prev.includes(itemGroup) 
        ? prev.filter(g => g !== itemGroup)
        : [...prev, itemGroup]
    );
  };

  const clearAllFilters = () => {
    setSelectedDropdowns([]);
    setSelectedItemGroups([]);
    setFilterPrice(null);
    setSelectedRatings([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {isDropdownView && dropdownName
              ? dropdownName.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
              : !itemGroup || itemGroup.toLowerCase() === 'all' || itemGroup.toLowerCase() === 'all item groups' 
              ? 'All Packages' 
                : `${itemGroup.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isDropdownView && dropdownName
              ? `Explore our comprehensive range of ${dropdownName.toLowerCase()} packages, carefully organized by categories to help you find the perfect journey.`
              : !itemGroup || itemGroup.toLowerCase() === 'all' || itemGroup.toLowerCase() === 'all item groups'
              ? 'Discover our comprehensive range of spiritual and cultural journey packages designed to provide you with the best travel experience.'
                : `Discover our carefully curated ${itemGroup.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').toLowerCase()} packages designed to provide you with the best travel experience.`}
          </p>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                {(selectedDropdowns.length > 0 || selectedItemGroups.length > 0 || filterPrice || selectedRatings.length > 0) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-secondary hover:text-primary font-medium transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Dropdown Categories Filter */}
                {availableDropdowns.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {availableDropdowns.map(dropdown => (
                        <label key={dropdown} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedDropdowns.includes(dropdown)}
                            onChange={() => handleDropdownToggle(dropdown)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                          />
                          <span className="text-sm text-gray-700">{dropdown}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Item Groups Filter */}
                {availableItemGroups.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Item Groups</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {availableItemGroups.map(itemGroup => (
                        <label key={itemGroup} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedItemGroups.includes(itemGroup)}
                            onChange={() => handleItemGroupToggle(itemGroup)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                          />
                          <span className="text-sm text-gray-700">{itemGroup}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rating Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedRatings.includes(rating)}
                          onChange={() => {
                            setSelectedRatings(prev => 
                              prev.includes(rating) 
                                ? prev.filter(r => r !== rating)
                                : [...prev, rating]
                            );
                          }}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                        />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-sm text-gray-700 ml-1">{rating} Star{rating !== 1 ? 's' : ''}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={filterPrice?.min || ''}
                      onChange={(e) => {
                        const min = Number(e.target.value) || 0;
                        setFilterPrice(prev => prev ? { ...prev, min } : { min, max: 1000000 });
                      }}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={filterPrice?.max || ''}
                      onChange={(e) => {
                        const max = Number(e.target.value) || 1000000;
                        setFilterPrice(prev => prev ? { ...prev, max } : { min: 0, max });
                      }}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">{sortedPackages.length}</span> package{sortedPackages.length !== 1 ? 's' : ''} found
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
              </select>
            </div>
              </div>
            </div>

        {/* Packages Display */}
        {isDropdownView ? (
          // Grouped display for dropdown view
          Object.keys(groupedPackages).length > 0 ? (
            <div className="space-y-12">
              {Object.entries(groupedPackages).map(([itemGroupName, groupPackages]) => (
                <div key={itemGroupName} className="space-y-6">
                  {/* Section Header */}
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary mb-2">{itemGroupName}</h2>
                    <p className="text-gray-600">
                      {groupPackages.length} package{groupPackages.length !== 1 ? 's' : ''} available
                    </p>
                  </div>
                  
                  {/* Packages Grid for this group */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
                    {groupPackages.map((pkg) => {
                      // Process accommodation list to get hotel names and distances
                      const accommodationList = pkg.custom_accommodation_list || [];
                      const hotelInfo = accommodationList.length > 0 
                        ? accommodationList.map((acc: any) => `${acc.hotel} (${acc.distance})`).join(', ')
                        : pkg.custom_hotel_information;

                      return (
                        <PackageCard
                          key={pkg.name}
                          id={pkg.name}
                          title={pkg.item_name}
                          nights="7 Nights" // Keep for compatibility
                          duration={pkg.custom_duration}
                          rating={pkg.custom_package_rating}
                          price={pkg.standard_rate}
                          image={pkg.image}
                          itemGroup={pkg.item_group}
                          // Dynamic data from Item custom fields
                          airInfo={pkg.custom_air_information}
                          hotelMakkah={hotelInfo}
                          hotelMadinah={hotelInfo}
                          foodInfo={pkg.custom_food_information}
                          specialServices={pkg.custom_bustaxi_information}
                          // Pass dynamic lists for rendering
                          accommodationList={accommodationList}
                          specialServicesList={pkg.custom_special_services || []}
                          primaryButtonText="View Details"
                          secondaryButtonText="Enquire Now"
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No Packages Found</h3>
              <p className="text-gray-500">
                We couldn't find any packages in this category. Please check back later.
              </p>
          </div>
          )
        ) : (
          // Regular display for item group or all packages view
          sortedPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
            {sortedPackages.map((pkg) => {
              // Process accommodation list to get hotel names and distances
              const accommodationList = pkg.custom_accommodation_list || [];
              const hotelInfo = accommodationList.length > 0 
                ? accommodationList.map((acc: any) => `${acc.hotel} (${acc.distance})`).join(', ')
                  : pkg.custom_hotel_information;

              return (
                <PackageCard
                  key={pkg.name}
                  id={pkg.name}
                    title={pkg.item_name}
                  nights="7 Nights" // Keep for compatibility
                    duration={pkg.custom_duration}
                    rating={pkg.custom_package_rating}
                    price={pkg.standard_rate}
                    image={pkg.image}
                    itemGroup={pkg.item_group}
                  // Dynamic data from Item custom fields
                    airInfo={pkg.custom_air_information}
                    hotelMakkah={hotelInfo}
                    hotelMadinah={hotelInfo}
                    foodInfo={pkg.custom_food_information}
                    specialServices={pkg.custom_bustaxi_information}
                  // Pass dynamic lists for rendering
                  accommodationList={accommodationList}
                  specialServicesList={pkg.custom_special_services || []}
                  primaryButtonText="View Details"
                  secondaryButtonText="Enquire Now"
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Packages Found</h3>
            <p className="text-gray-500">
              We couldn't find any packages matching your criteria. Try adjusting your filters.
            </p>
          </div>
          )
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageListing;
