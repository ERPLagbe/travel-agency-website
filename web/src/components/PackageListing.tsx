import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PackageCard from './PackageCard';
import { usePackagesByItemGroup } from '../hooks/useWebsiteCMS';

interface PackageListingProps {
  itemGroup?: string;
}

const PackageListing: React.FC<PackageListingProps> = ({ itemGroup: propItemGroup }) => {
  const { itemGroup: paramItemGroup } = useParams<{ itemGroup: string }>();
  const itemGroup = propItemGroup || paramItemGroup || '';
  
  const { data: packages, error, isValidating } = usePackagesByItemGroup(itemGroup);
  
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
  const [filterPrice, setFilterPrice] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });

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
    
    // Filter by price range
    return sorted.filter(pkg => {
      const price = pkg.standard_rate || 0;
      return price >= filterPrice.min && price <= filterPrice.max;
    });
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
            {itemGroup} Packages
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated {itemGroup.toLowerCase()} packages designed to provide you with the best travel experience.
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <label className="text-gray-700 font-semibold">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-4">
              <label className="text-gray-700 font-semibold">Price Range:</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filterPrice.min}
                  onChange={(e) => setFilterPrice(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-20 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filterPrice.max}
                  onChange={(e) => setFilterPrice(prev => ({ ...prev, max: Number(e.target.value) || 10000 }))}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-20 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="text-gray-600">
              {sortedPackages.length} package{sortedPackages.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        {sortedPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPackages.map((pkg) => (
              <PackageCard
                key={pkg.name}
                id={pkg.name}
                title={pkg.item_name || 'Package'}
                nights="7 Nights" // Default value, you might want to add this field to Item
                rating={5} // Default value, you might want to add this field to Item
                price={pkg.standard_rate || 0}
                image={pkg.image || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop'}
                itemGroup={pkg.item_group} // Pass the item group for proper routing
                primaryButtonText="View Details"
                secondaryButtonText="Enquire Now"
              />
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
    </div>
  );
};

export default PackageListing;
