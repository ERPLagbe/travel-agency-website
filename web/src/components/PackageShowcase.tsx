import React from 'react';
import FeaturedPackageCard from './FeaturedPackageCard';
import { useWebsiteCMS, useFeaturedPackages } from '../hooks/useWebsiteCMS';
import { useFrappeGetCall } from 'frappe-react-sdk';

interface Package {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  duration: string;
  destination: string;
  description: string;
  rating: number;
  reviews: number;
  features: string[];
  // New design fields
  nights?: string;
  airInfo?: string;
  hotelMakkah?: string;
  hotelMadinah?: string;
  foodInfo?: string;
  specialServices?: string;
  accommodationList?: Array<{
    hotel: string;
    distance: string;
  }>;
  specialServicesList?: Array<{
    title: string;
    description: string;
  }>;
}

interface PackageShowcaseProps {
  title?: string;
  subtitle?: string;
  packages?: Package[];
  showViewAll?: boolean;
}

const PackageShowcase: React.FC<PackageShowcaseProps> = ({ 
  title,
  subtitle,
  packages: propPackages,
}) => {
  const { data: cmsData } = useWebsiteCMS();
  const { data: featuredPackages } = useFeaturedPackages();
  
  // Fetch all Items with accommodation data using custom API
  const { data: apiResponse } = useFrappeGetCall('travel_agency_website.api.get_items_with_accommodation');
  const allItems = apiResponse?.message?.data || [];

  // Use CMS data if available, otherwise fall back to props or defaults
  const displayTitle = title || cmsData?.featured_packages_title;
  const displaySubtitle = subtitle || cmsData?.featured_packages_subtitle;
  
  // Filter all items to only show featured packages - use useMemo for proper reactivity
  const packages = React.useMemo(() => {
    if (propPackages) return propPackages;
    if (!featuredPackages || !allItems.length) return [];
    
    // Get the item names from featured packages
    const featuredItemNames = featuredPackages.map((pkg: any) => pkg.item);
    
    // Filter all items to only include featured ones
    const featuredItems = allItems.filter((item: any) => 
      featuredItemNames.includes(item.name)
    );
    
    // Convert to package format with dynamic data from Item custom fields (limit to 3)
    return featuredItems.slice(0, 3).map((item: any) => {
      // Process accommodation list to get hotel names and distances
      const accommodationList = item.custom_accommodation_list || [];
      const hotelInfo = accommodationList.length > 0 
        ? accommodationList.map((acc: any) => `${acc.hotel || ''} (${acc.distance || ''})`).join(', ')
        : item.custom_hotel_information || '';

      return {
        id: item.name,
        title: item.item_name,
        category: "Featured",
        image: item.image,
        price: item.standard_rate,
        nights: "7 Nights", // Keep for compatibility
        duration: item.custom_duration || 'N/A',
        destination: "Makkah & Madinah",
        description: "Premium travel package",
        rating: item.custom_package_rating,
        reviews: 0,
        features: [],
        // Dynamic data from Item custom fields
        airInfo: item.custom_air_information || 'N/A',
        hotelMakkah: hotelInfo,
        hotelMadinah: hotelInfo,
        foodInfo: item.custom_food_information || 'N/A',
        specialServices: item.custom_bustaxi_information || '',
        // Pass accommodation list for dynamic rendering
        accommodationList: accommodationList,
        // Pass special services list for dynamic rendering
        specialServicesList: item.custom_special_services || []
      };
    });
  }, [propPackages, featuredPackages, allItems]);



  // Show loading state
  if (!apiResponse || !featuredPackages) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-primary text-4xl md:text-5xl font-bold uppercase mb-4">
              {displayTitle}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              {displaySubtitle}
            </p>
          </div>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading featured packages...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state
  if (packages.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-primary text-4xl md:text-5xl font-bold uppercase mb-4">
              {displayTitle}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              {displaySubtitle}
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600">No featured packages available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-primary text-4xl md:text-5xl font-bold uppercase mb-4">
            {displayTitle}
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            {displaySubtitle}
          </p>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg: Package) => (
            <FeaturedPackageCard
              key={pkg.id}
              id={pkg.id}
              name={pkg.title}
              rating={pkg.rating}
              price={pkg.price}
              image={pkg.image}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PackageShowcase;
