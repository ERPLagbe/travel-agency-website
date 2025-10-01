import React from 'react';
import PackageCard from '../components/PackageCard';
import { useFrappeGetCall } from 'frappe-react-sdk';

const HajjDeals: React.FC = () => {
  
  // Fetch all packages from ERPNext with accommodation data using custom API
  const { data: apiResponse } = useFrappeGetCall('travel_agency_website.api.get_items_with_accommodation');
  const allPackages = apiResponse?.message?.data || [];
  console.log("allPackages", allPackages);

  // Fallback data if CMS data is not available
  const fallbackPackages = [
    {
      id: 1,
      title: "11 Nights 5 Stars Shifting Hajj Package",
      nights: "11 Nights",
      duration: "35/42 Days",
      rating: 5,
      price: 6318,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
      itemGroup: "Hajj Packages",
      airInfo: "SA/Biman/Flynas",
      hotelMakkah: "1200/1500M", 
      hotelMadinah: "1200/1500M",
      foodInfo: "Breakfast, Lunch & Dinner",
      specialServices: "Ziyarah Tour, Transportation & Guide"
    },
    {
      id: 2,
      title: "14 Nights 5 Stars Non Shifting Hajj Package",
      nights: "14 Nights",
      duration: "35/42 Days",
      rating: 5,
      price: 9086,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      itemGroup: "Hajj Packages",
      airInfo: "SA/Biman/Flynas",
      hotelMakkah: "1200/1500M", 
      hotelMadinah: "1200/1500M",
      foodInfo: "Breakfast, Lunch & Dinner",
      specialServices: "Ziyarah Tour, Transportation & Guide"
    },
    {
      id: 3,
      title: "14 Nights 5 Stars Non Shifting Hajj Package",
      nights: "14 Nights",
      duration: "35/42 Days",
      rating: 5,
      price: 10668,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
      itemGroup: "Hajj Packages",
      airInfo: "SA/Biman/Flynas",
      hotelMakkah: "1200/1500M", 
      hotelMadinah: "1200/1500M",
      foodInfo: "Breakfast, Lunch & Dinner",
      specialServices: "Ziyarah Tour, Transportation & Guide"
    }
  ];

  // Use all packages from ERPNext with dynamic data, otherwise use fallback
  const packages = allPackages && allPackages.length > 0 
    ? allPackages.map((pkg: any) => {
        // Process accommodation list to get hotel names and distances
        const accommodationList = pkg.custom_accommodation_list || [];
        const hotelInfo = accommodationList.length > 0 
          ? accommodationList.map((acc: any) => `${acc.hotel} (${acc.distance})`).join(', ')
          : pkg.custom_hotel_information || "1200/1500M";

        return {
          id: pkg.name,
          title: pkg.item_name,
          nights: "7 Nights", // Keep for compatibility
          duration: pkg.custom_duration || "35/42 Days", // Now dynamic from custom_duration field
          rating: pkg.custom_package_rating || 5, // Now dynamic from custom_package_rating
          price: pkg.standard_rate || 0,
          image: pkg.image || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
          itemGroup: pkg.item_group, // Add item group for routing
          // Dynamic data from Item custom fields
          airInfo: pkg.custom_air_information || "SA/Biman/Flynas",
          hotelMakkah: hotelInfo, // Now from accommodation list
          hotelMadinah: hotelInfo, // Now from accommodation list
          foodInfo: pkg.custom_food_information || "Breakfast, Lunch & Dinner",
          specialServices: pkg.custom_bustaxi_information || "Ziyarah Tour, Transportation & Guide",
          // Pass accommodation list for dynamic rendering
          accommodationList: accommodationList,
          // Pass special services list for dynamic rendering
          specialServicesList: pkg.custom_special_services || []
        };
      })
    : fallbackPackages;

  const title = "All Travel Packages";

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
          {packages.map((pkg) => (
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
                // Determine category from item group
                let category = 'packages'; // default
                if (pkg.itemGroup) {
                  if (pkg.itemGroup.toLowerCase().includes('hajj')) {
                    category = 'hajj';
                  } else if (pkg.itemGroup.toLowerCase().includes('umrah')) {
                    category = 'umrah';
                  }
                }
                window.location.href = `/${category}/${pkg.id}`;
              }}
              onSecondaryClick={() => window.location.href = `/contact?package=${pkg.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HajjDeals;
