import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
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
    
    // Convert to package format with dynamic data from Item custom fields
    return featuredItems.map((item: any) => {
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

  // Determine how many cards to show based on screen size
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 1024) return 1; // Mobile and tablet: 1 card
    return 3; // Desktop: 3 cards
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate pages
  const pages = Math.max(1, Math.ceil(packages.length / cardsPerView));

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || packages.length <= cardsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextPage = Math.floor(prev / cardsPerView) + 1;
        if (nextPage >= pages) return 0; // loop to start
        return nextPage * cardsPerView;
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, packages.length, cardsPerView, pages]);

  const maxStartIndex = Math.max(0, packages.length - cardsPerView);
  const currentPage = Math.min(Math.floor(currentIndex / cardsPerView), pages - 1);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    const newIndex = currentIndex - cardsPerView;
    setCurrentIndex(newIndex < 0 ? (pages - 1) * cardsPerView : newIndex);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    const newIndex = currentIndex + cardsPerView;
    setCurrentIndex(newIndex > maxStartIndex ? 0 : newIndex);
  };

  // Translate percentage per step
  const translatePercent = (currentIndex / cardsPerView) * 100;
  const showNavigation = packages.length > cardsPerView;

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

        {/* Slider Container */}
        <div className="relative">
          {/* Package Cards Slider */}
          <div className="overflow-hidden pb-4">
            <div
              className="flex transition-transform duration-700 items-stretch"
              style={{ transform: `translateX(-${translatePercent}%)` }}
            >
              {packages.map((pkg: Package) => (
                <div
                  key={pkg.id}
                  className="w-full lg:w-1/3 px-2 flex-shrink-0 flex"
                >
                  <PackageCard
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
                    accommodationList={pkg.accommodationList}
                    specialServicesList={pkg.specialServicesList}
                    primaryButtonText="View All Detail"
                    secondaryButtonText="Enquire Now"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls - Centered with arrows and dots inline */}
          {showNavigation && (
            <div className="flex items-center justify-center gap-4 mt-8">
              {/* Left Arrow */}
              <button
                onClick={handlePrevious}
                className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-primary hover:bg-gray-50 transition"
                aria-label="Previous packages"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots Indicator */}
              <div className="flex items-center gap-2">
                {Array.from({ length: pages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(index * cardsPerView);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentPage
                        ? 'bg-primary w-8'
                        : 'bg-gray-300 w-2 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-primary hover:bg-gray-50 transition"
                aria-label="Next packages"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PackageShowcase;
