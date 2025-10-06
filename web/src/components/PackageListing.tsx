import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PackageCard from './PackageCard';
import { useFrappeGetCall } from 'frappe-react-sdk';

interface PackageListingProps {
  itemGroup?: string;
}

const PackageListing: React.FC<PackageListingProps> = ({ itemGroup: propItemGroup }) => {
  const { itemGroup: paramItemGroup } = useParams<{ itemGroup: string }>();
  const itemGroup = propItemGroup || paramItemGroup || '';
  
  // Fetch all packages with accommodation data using custom API
  const { data: apiResponse, error, isValidating } = useFrappeGetCall('travel_agency_website.api.get_items_with_accommodation');
  const allPackages = apiResponse?.message?.data || [];
  
  // Filter packages by item group - show all if no specific group or "all"
  const packages = allPackages.filter((pkg: any) => {
    // If no itemGroup or "all", show all packages
    if (!itemGroup || itemGroup.toLowerCase() === 'all' || itemGroup.toLowerCase() === 'all item groups') {
      return true;
    }
    
    // Otherwise filter by the specific item group
    const properItemGroup = itemGroup
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return pkg.item_group === properItemGroup;
  });
  
  // Debug logging
  console.log('🔍 PackageListing Component Debug:', {
    itemGroup,
    packagesCount: packages?.length || 0,
    error: error ? {
      message: error.message,
      httpStatus: error.httpStatus
    } : null,
    isValidating
  });
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'name'>('name');
  const [filterPrice, setFilterPrice] = useState<{ min: number; max: number } | null>(null);

  // Sort packages based on selected criteria
  const sortedPackages = React.useMemo(() => {
    if (!packages) return [];
    
    let sorted = [...packages];
    
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => (a.standard_rate || 0) - (b.standard_rate || 0));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.standard_rate || 0) - (a.standard_rate || 0));
        break;
      case 'name':
        sorted.sort((a, b) => (a.item_name || '').localeCompare(b.item_name || ''));
        break;
    }
    
    // Filter by price range (only if filter is set)
    if (filterPrice) {
      return sorted.filter(pkg => {
        const price = pkg.standard_rate || 0;
        return price >= filterPrice.min && price <= filterPrice.max;
      });
    }
    
    return sorted;
  }, [packages, sortBy, filterPrice]);

  if (isValidating) {
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

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {!itemGroup || itemGroup.toLowerCase() === 'all' || itemGroup.toLowerCase() === 'all item groups' 
              ? 'All Packages' 
              : `${itemGroup.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {!itemGroup || itemGroup.toLowerCase() === 'all' || itemGroup.toLowerCase() === 'all item groups'
              ? 'Discover our comprehensive range of spiritual and cultural journey packages designed to provide you with the best travel experience.'
              : `Discover our carefully curated ${itemGroup.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').toLowerCase()} packages designed to provide you with the best travel experience.`}
          </p>
        </div>

        {/* Modern Filters and Sorting */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Filter & Sort</h2>
              <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                {sortedPackages.length} package{sortedPackages.length !== 1 ? 's' : ''} found
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sort Options */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>

              {/* Price Filter */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Price Range</label>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={filterPrice?.min || ''}
                      onChange={(e) => {
                        const min = Number(e.target.value) || 0;
                        setFilterPrice(prev => prev ? { ...prev, min } : { min, max: 1000000 });
                      }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300 placeholder-gray-400"
                    />
                  </div>
                  <div className="text-gray-400 font-medium">to</div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={filterPrice?.max || ''}
                      onChange={(e) => {
                        const max = Number(e.target.value) || 1000000;
                        setFilterPrice(prev => prev ? { ...prev, max } : { min: 0, max });
                      }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300 placeholder-gray-400"
                    />
                  </div>
                  {filterPrice && (
                    <button
                      onClick={() => setFilterPrice(null)}
                      className="flex-shrink-0 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-xl flex items-center justify-center transition-all duration-200"
                      title="Clear price filter"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                {filterPrice && (
                  <div className="text-xs text-gray-500 bg-blue-50 px-3 py-2 rounded-lg">
                    Showing packages from £{filterPrice.min.toLocaleString()} to £{filterPrice.max.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        {sortedPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
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
        )}
      </div>
    </div>
  );
};

export default PackageListing;
