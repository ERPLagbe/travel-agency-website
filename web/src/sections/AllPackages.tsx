import React, { useState } from 'react';
import PackageCard from '../components/PackageCard';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { Button } from '../components/Button';

const AllPackages: React.FC = () => {
  const [visiblePackages, setVisiblePackages] = useState(6);
  
  // Fetch all packages from ERPNext with accommodation data using custom API
  const { data: apiResponse } = useFrappeGetCall('travel_agency_website.api.get_items_with_accommodation');
  const allPackages = apiResponse?.message?.data || [];
  console.log("allPackages", allPackages);

  // Use all packages from ERPNext with dynamic data
  const packages = allPackages?.map((pkg: any) => {
    // Process accommodation list to get hotel names and distances
    const accommodationList = pkg.custom_accommodation_list || [];
    const hotelInfo = accommodationList.length > 0 
      ? accommodationList.map((acc: any) => `${acc.hotel} (${acc.distance})`).join(', ')
      : pkg.custom_hotel_information;

    return {
      id: pkg.name,
      title: pkg.item_name,
      nights: "7 Nights", // Keep for compatibility
      duration: pkg.custom_duration,
      rating: pkg.custom_package_rating,
      price: pkg.standard_rate,
      image: pkg.image,
      itemGroup: pkg.item_group,
      // Dynamic data from Item custom fields
      airInfo: pkg.custom_air_information,
      hotelMakkah: hotelInfo,
      hotelMadinah: hotelInfo,
      foodInfo: pkg.custom_food_information,
      specialServices: pkg.custom_bustaxi_information,
      // Pass accommodation list for dynamic rendering
      accommodationList: accommodationList,
      // Pass special services list for dynamic rendering
      specialServicesList: pkg.custom_special_services || []
    };
  }) || [];

  const title = "All Travel Packages";

  // Handle load more functionality
  const handleLoadMore = () => {
    setVisiblePackages(prev => prev + 6);
  };

  // Get packages to display
  const displayedPackages = packages.slice(0, visiblePackages);
  const hasMorePackages = packages.length > visiblePackages;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Decorative Elements */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <div className="w-16 h-0.5 bg-secondary mx-4"></div>
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
          </div>
          
          <h2 className="text-primary text-4xl md:text-5xl font-bold uppercase mb-4">
            {title}
          </h2>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {displayedPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              title={pkg.title}
              nights={pkg.nights}
              rating={pkg.rating}
              price={pkg.price}
              image={pkg.image}
              duration={pkg.duration}
              airInfo={pkg.airInfo}
              hotelMakkah={pkg.hotelMakkah}
              hotelMadinah={pkg.hotelMadinah}
              foodInfo={pkg.foodInfo}
              specialServices={pkg.specialServices}
              itemGroup={pkg.itemGroup}
              accommodationList={pkg.accommodationList}
              specialServicesList={pkg.specialServicesList}
              primaryButtonText="View All Deal"
              secondaryButtonText="Enquire Now"
              onPrimaryClick={() => {
                // Always use packages route
                window.location.href = `/packages/${pkg.id}`;
              }}
              onSecondaryClick={() => window.location.href = `/contact?package=${pkg.id}`}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMorePackages && (
          <div className="text-center mt-12">
            <Button
              variant="primary"
              size="lg"
              onClick={handleLoadMore}
              className="px-8 py-3"
            >
              Load More Packages
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllPackages;
