import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { Button } from '../components/Button';

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
      specialServices: pkg.custom_bustaxi_information || '',
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

  // Calculate pages for slider
  const pages = Math.max(1, Math.ceil(packages.length / cardsPerView));

  // Auto-play functionality for slider
  useEffect(() => {
    if (!isAutoPlaying || packages.length <= cardsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextPage = Math.floor(prev / cardsPerView) + 1;
        if (nextPage >= pages) return 0;
        return nextPage * cardsPerView;
      });
    }, 5000);

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

  const translatePercent = (currentIndex / cardsPerView) * 100;
  const showNavigation = packages.length > cardsPerView;

  return (
    <section className="py-16 bg-white">
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

        {/* Slider Container */}
        <div className="relative">
          {/* Package Cards Slider */}
          <div className="overflow-hidden pb-4">
            <div
              className="flex transition-transform duration-700 items-stretch"
              style={{ transform: `translateX(-${translatePercent}%)` }}
            >
              {packages.map((pkg: any) => (
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

        {/* View All Packages Button */}
        <div className="text-center mt-12">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/category/all')}
            className="px-8 py-3"
          >
            View All Packages
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AllPackages;
