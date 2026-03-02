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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
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
        // Clear item groups when viewing dropdown (show all items in dropdown)
        if (!itemGroup) {
          setSelectedItemGroups([]);
        }
      }
    }
    
    if (itemGroup && itemGroup !== 'all' && allPackages.length > 0 && navigationDropdownItems.length > 0) {
      // Look up the actual item_group from navigationDropdownItems by matching URL format
      // This ensures we use the exact database value instead of trying to normalize
      const matchedItem = navigationDropdownItems.find(
        (item: any) => item.item_group.toLowerCase().replace(/\s+/g, '-') === itemGroup
      );
      
      if (matchedItem && matchedItem.item_group) {
        const properItemGroup = matchedItem.item_group;
        setSelectedItemGroups([properItemGroup]);
        
        // Also select the parent dropdown if viewing item group
        if (matchedItem.dropdown_name) {
          setSelectedDropdowns([matchedItem.dropdown_name]);
        }
      }
    } else if (!dropdownName && !itemGroup) {
      // Clear filters when no dropdown or item group is selected
      setSelectedDropdowns([]);
      setSelectedItemGroups([]);
    }
  }, [dropdownName, itemGroup, navigationDropdownItems, allPackages]);
  
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

    if (selectedDropdowns.length === 0) {
      // No category selected: show all item groups from packages
    allPackages.forEach((pkg: any) => {
      if (pkg.item_group) {
        groups.add(pkg.item_group);
      }
    });
    } else {
      // Category selected: show only item groups that belong to selected dropdowns
      navigationDropdownItems
        .filter((item: any) => selectedDropdowns.includes(item.dropdown_name))
        .forEach((item: any) => {
          if (item.item_group) {
            groups.add(item.item_group);
          }
        });
    }

    return Array.from(groups).sort();
  }, [allPackages, selectedDropdowns, navigationDropdownItems]);

  // Apply filters and sort packages
  const sortedPackages = React.useMemo(() => {
    // Start with all packages
    let filtered = [...allPackages];
    
    // Apply dropdown filter OR item group filter with priority logic
    if (selectedDropdowns.length > 0 || selectedItemGroups.length > 0) {
      const itemGroupsToInclude = new Set<string>();
      
      // Priority logic: If subcategories (item groups) are selected, use only those
      // Otherwise, use item groups from selected categories (dropdowns)
      if (selectedItemGroups.length > 0) {
        // User has selected specific subcategories - use only those
        selectedItemGroups.forEach((group: string) => itemGroupsToInclude.add(group));
      } else if (selectedDropdowns.length > 0) {
        // No subcategories selected, use all item groups from selected categories
        navigationDropdownItems
        .filter((item: any) => selectedDropdowns.includes(item.dropdown_name))
          .forEach((item: any) => itemGroupsToInclude.add(item.item_group));
    }
    
      // Filter packages by the determined item groups
      filtered = filtered.filter(pkg => itemGroupsToInclude.has(pkg.item_group));
    }
    
    // Apply price range filter
    if (filterPrice) {
      filtered = filtered.filter(pkg => {
        const price = pkg.custom_website_price_to_show || 0;
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
        filtered.sort((a, b) => (a.custom_website_price_to_show || 0) - (b.custom_website_price_to_show || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.custom_website_price_to_show || 0) - (a.custom_website_price_to_show || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a.item_name || '').localeCompare(b.item_name || ''));
        break;
    }
    
    return filtered;
  }, [allPackages, sortBy, filterPrice, selectedDropdowns, selectedItemGroups, selectedRatings, navigationDropdownItems]);

  // Group filtered packages by item_group for title + grid display (all views)
  const groupedPackages = React.useMemo(() => {
    const grouped: { [key: string]: any[] } = {};
    sortedPackages.forEach((pkg: any) => {
      const key = pkg.item_group || 'Other';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(pkg);
    });
    return grouped;
  }, [sortedPackages]);

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
    

        {/* Main Content with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
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
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex items-center justify-between hover:bg-gray-50 transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-[1.02]"
              >
                <span className="font-semibold text-gray-900">Filters</span>
                <span className="text-sm text-gray-500">
                  {selectedDropdowns.length + selectedItemGroups.length + (filterPrice ? 1 : 0) + selectedRatings.length} applied
                </span>
                <svg 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out ${isMobileFilterOpen ? 'rotate-180' : 'rotate-0'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

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

        {/* Packages Display: category title + grid per group */}
        {Object.keys(groupedPackages).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(groupedPackages).map(([itemGroupName, groupPackages]: [string, any[]]) => (
              <div key={itemGroupName} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-primary mb-2">{itemGroupName}</h2>
                  <p className="text-gray-600">
                    {groupPackages.length} package{groupPackages.length !== 1 ? 's' : ''} available
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
                  {groupPackages.map((pkg) => {
                    const accommodationList = pkg.custom_accommodation_list || [];
                    const hotelInfo = accommodationList.length > 0
                      ? accommodationList.map((acc: any) => `${acc.hotel} (${acc.distance})`).join(', ')
                      : pkg.custom_hotel_information;
                    return (
                      <PackageCard
                        key={pkg.name}
                        id={pkg.name}
                        title={pkg.item_name}
                        nights="7 Nights"
                        duration={pkg.custom_duration}
                        rating={pkg.custom_package_rating}
                        price={pkg.custom_website_price_to_show}
                        image={pkg.image}
                        itemGroup={pkg.item_group}
                        airInfo={pkg.custom_air_information}
                        hotelMakkah={hotelInfo}
                        hotelMadinah={hotelInfo}
                        foodInfo={pkg.custom_food_information}
                        specialServices={pkg.specialServices}
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
              We couldn't find any packages matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
          </div>

        {/* Mobile Filter Panel */}
        <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          isMobileFilterOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          {/* Drawer */}
          <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileFilterOpen 
              ? 'translate-x-0' 
              : 'translate-x-full'
          }`}>
              <div className="p-6">
                {/* Mobile Filter Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out hover:scale-110"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Filter Content - Same as desktop sidebar */}
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

                  {/* Clear All Button */}
                  {(selectedDropdowns.length > 0 || selectedItemGroups.length > 0 || filterPrice || selectedRatings.length > 0) && (
                    <button
                      onClick={() => {
                        clearAllFilters();
                        setIsMobileFilterOpen(false);
                      }}
                      className="w-full bg-red-50 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-100 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageListing;
