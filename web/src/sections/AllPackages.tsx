import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import { useFrappeGetCall } from 'frappe-react-sdk';

const AllPackages: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();
  
  // Fetch all packages from ERPNext with accommodation data using custom API
  const { data: apiResponse } = useFrappeGetCall('travel_agency_website.api.get_items_with_accommodation');
  const allPackages = apiResponse?.message?.data || [];

  // Use all packages from ERPNext with dynamic data (limit to first 9 for slider)
  const packages = allPackages?.slice(0, 9).map((pkg: any) => {
    // Process accommodation list to get hotel names and distances
    const accommodationList = pkg.custom_accommodation_list || [];
    const hotelInfo = accommodationList.length > 0 
      ? accommodationList.map((acc: any) => `${acc.hotel || ''} (${acc.distance || ''})`).join(', ')
      : pkg.custom_hotel_information || '';

    return {
      id: pkg.name,
      title: pkg.item_name || 'Untitled Package',
      nights: "7 Nights",
      duration: pkg.custom_duration || 'N/A',
      rating: pkg.custom_package_rating,
      price: pkg.standard_rate || 0,
      image: pkg.image || '',
      itemGroup: pkg.item_group || '',
      airInfo: pkg.custom_air_information || 'N/A',
      hotelMakkah: hotelInfo,
      hotelMadinah: hotelInfo,
      foodInfo: pkg.custom_food_information || 'N/A',
      specialServices: pkg.specialServices || '',
      accommodationList: accommodationList,
      specialServicesList: pkg.custom_special_services || []
    };
  }) || [];

  const title = "All Travel Packages";

  // Determine how many cards to show based on screen size
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 1024) return 1;
    return 3;
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate max start index for slider
  const maxStartIndex = Math.max(0, packages.length - cardsPerView);
  
  // Calculate total positions for dots indicator
  const totalPositions = Math.max(1, packages.length - cardsPerView + 1);

  // Auto-play functionality for slider - slide one card at a time
  useEffect(() => {
    if (!isAutoPlaying || packages.length <= cardsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1; // Move one card at a time
        if (nextIndex > maxStartIndex) return 0; // loop to start
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, packages.length, cardsPerView, maxStartIndex]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    const newIndex = currentIndex - 1; // Move one card at a time
    setCurrentIndex(newIndex < 0 ? maxStartIndex : newIndex);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    const newIndex = currentIndex + 1; // Move one card at a time
    setCurrentIndex(newIndex > maxStartIndex ? 0 : newIndex);
  };

  const translatePercent = (currentIndex / cardsPerView) * 100;
  const showNavigation = packages.length > cardsPerView;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header - Title centered */}
        <div className="text-center mb-12">
          {/* Decorative Elements */}
          <div className="flex items-center justify-center mb-4">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <div className="w-16 h-0.5 bg-secondary mx-4"></div>
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
          </div>
          
          <h2 className="text-primary text-3xl sm:text-4xl md:text-5xl font-bold uppercase mb-8">
            {title}
          </h2>
        </div>

        {/* View All link - Below title, right aligned */}
        <div className="flex justify-end -mt-6 mb-0">
          <button
            onClick={() => navigate('/category/all')}
            className="
              inline-flex
              items-center
              text-primary
              hover:text-primary-dark
              hover:underline
              font-medium
              text-2xl
              transition-colors
              duration-200
              group
              mr-4 md:mr-0
            "
          >
            View All
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </button>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Package Cards Slider */}
          <div className="overflow-hidden pb-2">
            <div
              className="flex transition-transform duration-700 items-stretch"
              style={{ transform: `translateX(-${translatePercent}%)` }}
            >
              {packages.map((pkg: any) => (
                <div
                  key={pkg.id}
                  className="w-full lg:w-1/3 px-2 py-4 flex-shrink-0 flex"
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
                    itemGroup={pkg.itemGroup}
                    accommodationList={pkg.accommodationList}
                    specialServicesList={pkg.specialServicesList}
                    primaryButtonText="View All Deal"
                    secondaryButtonText="Enquire Now"
                    onPrimaryClick={() => navigate(`/packages/${pkg.id}`)}
                    onSecondaryClick={() => navigate(`/contact?package=${pkg.id}`)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          {showNavigation && (
            <>
              {/* Left Arrow Button */}
              <button
                onClick={handlePrevious}
                aria-label="Previous packages"
                className="
                  absolute 
                  left-1 
                  top-1/2 
                  -translate-x-1/2 
                  -translate-y-1/2
                  w-11 h-11
                  rounded-full
                  bg-white
                  shadow-lg
                  flex items-center justify-center
                  text-primary
                  hover:bg-gray-50
                  transition
                  z-20
                "  /* Removed: hidden md:flex */
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={handleNext}
                aria-label="Next packages"
                className="
                  absolute 
                  right-1 
                  top-1/2 
                  translate-x-1/2 
                  -translate-y-1/2
                  w-11 h-11
                  rounded-full
                  bg-white
                  shadow-lg
                  flex items-center justify-center
                  text-primary
                  hover:bg-gray-50
                  transition
                  z-20
                "  /* Removed: hidden md:flex */
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator - Always centered */}
        {showNavigation && (
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalPositions }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllPackages;