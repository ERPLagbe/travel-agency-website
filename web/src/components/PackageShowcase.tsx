import React from 'react';
import { Link } from 'react-router-dom';
import PackageCard from './PackageCard';
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
  showViewAll = true
}) => {
  const { data: cmsData } = useWebsiteCMS();
  const { data: featuredPackages } = useFeaturedPackages();
  
  // Fetch all Items with accommodation data using custom API
  const { data: apiResponse } = useFrappeGetCall('travel_agency_website.api.get_items_with_accommodation');
  const allItems = apiResponse?.message?.data || [];

  // Use CMS data if available, otherwise fall back to props or defaults
  const displayTitle = title || cmsData?.featured_packages_title || "Featured Packages";
  const displaySubtitle = subtitle || cmsData?.featured_packages_subtitle || "Discover our most popular travel experiences";
  
  // Filter all items to only show featured packages
  const packages = propPackages || (() => {
    if (!featuredPackages || !allItems) return [];
    
    // Get the item names from featured packages
    const featuredItemNames = featuredPackages.map((pkg: any) => pkg.item);
    
    // Filter all items to only include featured ones
    const featuredItems = allItems.filter((item: any) => 
      featuredItemNames.includes(item.name)
    );
    
    // Convert to package format with dynamic data from Item custom fields
    return featuredItems.map((item: any) => {
      // Process accommodation list to get hotel names and distances
      const accommodationList = item.custom_accommodation_list || [];
      const hotelInfo = accommodationList.length > 0 
        ? accommodationList.map((acc: any) => `${acc.hotel} (${acc.distance})`).join(', ')
        : item.custom_hotel_information || "1200/1500M";

      return {
        id: item.name,
        title: item.item_name,
        category: "Featured",
        image: item.image || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
        price: item.standard_rate || 0,
        nights: "7 Nights", // Keep for compatibility
        duration: item.custom_duration || "35/42 Days", // Now dynamic from custom_duration field
        destination: "Makkah & Madinah",
        description: "Premium travel package",
        rating: item.custom_package_rating || 5, // Now dynamic from custom_package_rating
        reviews: 0,
        features: [],
        // Dynamic data from Item custom fields
        airInfo: item.custom_air_information || "SA/Biman/Flynas",
        hotelMakkah: hotelInfo, // Now from accommodation list
        hotelMadinah: hotelInfo, // Now from accommodation list
        foodInfo: item.custom_food_information || "Breakfast, Lunch & Dinner",
        specialServices: item.custom_bustaxi_information || "Ziyarah Tour, Transportation & Guide",
        // Pass accommodation list for dynamic rendering
        accommodationList: accommodationList,
        // Pass special services list for dynamic rendering
        specialServicesList: item.custom_special_services || []
      };
    });
  })();
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

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              title={pkg.title}
              nights={pkg.nights || "7 Nights"}
              rating={pkg.rating}
              price={pkg.price}
              image={pkg.image}
              duration={pkg.duration || "35/42 Days"}
              airInfo={pkg.airInfo || "SA/Biman/Flynas"}
              hotelMakkah={pkg.hotelMakkah || "1200/1500M"}
              hotelMadinah={pkg.hotelMadinah || "1200/1500M"}
              foodInfo={pkg.foodInfo || "Breakfast, Lunch & Dinner"}
              specialServices={pkg.specialServices || "Ziyarah Tour, Transportation & Guide"}
              accommodationList={pkg.accommodationList}
              specialServicesList={pkg.specialServicesList}
              primaryButtonText="View All Detail"
              secondaryButtonText="Enquire Now"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageShowcase;
