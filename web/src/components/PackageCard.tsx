import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Hotel, Utensils, Sparkles, Calendar, Star } from 'lucide-react';
import { Button } from './Button';

interface PackageCardProps {
  id: string | number;
  title: string;
  nights?: string;
  rating?: number; // 0-1 or 0-5
  price: number;
  image: string;
  itemGroup?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  duration?: string;
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

const PackageCard: React.FC<PackageCardProps> = ({
  id,
  title,
  price,
  image,
  rating,
  onPrimaryClick,
  duration = "35/42 Days",
  airInfo = "SA/Biman/Flynas",
  hotelMakkah = "1200/1500M",
  hotelMadinah = "1200/1500M",
  foodInfo = "Breakfast, Lunch & Dinner",
  specialServices = "Ziyarah Tour, Transportation & Guide",
  accommodationList = [],
  specialServicesList = []
}) => {
  const navigate = useNavigate();
  
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      navigate(`/packages/${id}`);
    }
  };

  // Normalize rating to 0-5 scale if value is 0-1
  const getNormalizedRating = (value?: number) => {
    if (value === undefined || value === null || isNaN(value)) return undefined;
    return value <= 1 ? value * 5 : value; // treat <=1 as 0-1 scale
  };

  const normalizedRating = getNormalizedRating(rating);
  const percent = normalizedRating !== undefined ? Math.max(0, Math.min(5, normalizedRating)) / 5 * 100 : 0;

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col h-full">
      {/* Header Image */}
      <div className="relative h-[250px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h1 className="text-lg sm:text-2xl font-bold text-white drop-shadow-lg animate-fadeIn">
            {title}
          </h1>
          {normalizedRating !== undefined && (
            <div className="mt-1 flex items-center">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => {
                  const fillPct = Math.max(0, Math.min(1, (normalizedRating - i)));
                  return (
                    <div key={i} className="relative w-4 h-4">
                      {/* Base (empty) star */}
                      <Star className="w-4 h-4 text-white/40" stroke="currentColor" fill="currentColor" />
                      {/* Filled portion */}
                      {fillPct > 0 && (
                        <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPct * 100}%` }}>
                          <Star className="w-4 h-4 text-secondary" stroke="currentColor" fill="currentColor" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <span className="ml-2 text-xs text-white/90 font-medium">{normalizedRating.toFixed(1)}/5</span>
            </div>
          )}
        </div>
      </div>

      {/* Features - Compact Grid Layout - This grows to fill space */}
      <div className="px-4 sm:px-6 py-4 flex-grow">
        <div className="grid grid-cols-1 gap-1 mb-3 sm:mb-4">
          <div className="animate-slideIn py-1 px-2 sm:px-3 rounded-lg transition-all duration-300 hover:bg-gray-50 cursor-pointer group mb-1 border-b border-gray-200" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-primary transition-all duration-300 group-hover:scale-110" />
              <span className="text-xs text-gray-500 font-medium">Duration</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-primary">{duration}</p>
          </div>

          <div className="animate-slideIn py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg transition-all duration-300 hover:bg-gray-50 cursor-pointer group mb-1 border-b border-gray-200" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              <Plane className="w-3 h-3 sm:w-4 sm:h-4 text-primary transition-all duration-300 group-hover:scale-110" />
              <span className="text-xs text-gray-500 font-medium">Direct Flight</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-primary">{airInfo}</p>
          </div>

          {/* Hotel / Accommodation blocks */}
          <div className="animate-slideIn py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg transition-all duration-300 hover:bg-gray-50 cursor-pointer group mb-1 border-b border-gray-200" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              <Hotel className="w-3 h-3 sm:w-4 sm:h-4 text-primary transition-all duration-300 group-hover:scale-110" />
              <span className="text-xs text-gray-500 font-medium">Hotel Makkah</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-primary">{hotelMakkah}</p>
          </div>
        </div>

        {/* Food */}
        <div className="animate-slideIn py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg transition-all duration-300 hover:bg-gray-50 cursor-pointer group mb-1 border-b border-gray-200" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-1 sm:gap-2 mb-1">
            <Utensils className="w-3 h-3 sm:w-4 sm:h-4 text-primary transition-all duration-300 group-hover:scale-110" />
            <span className="text-xs text-gray-500 font-medium">Food Included</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-primary">{foodInfo}</p>
        </div>

        {/* Special Services - Badge Tags */}
        <div className="animate-slideIn py-2 sm:py-3 px-2 sm:px-3 rounded-lg border-b border-gray-200" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-1 sm:gap-2 mb-2">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs text-gray-500 font-medium">Special Services</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {specialServicesList && specialServicesList.length > 0 ? (
              specialServicesList.map((service, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer"
                >
                  {service.title}
                </span>
              ))
            ) : (
              specialServices.split(',').map((service, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer"
                >
                  {service.trim()}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 text-center bg-white group cursor-default">
        <div className="inline-block">
          {price && price > 0 ? (
            <>
              <span className="text-3xl sm:text-5xl font-bold text-primary animate-countUp transition-all duration-300 group-hover:text-primary group-hover:scale-110 inline-block">
                £{price.toLocaleString()}
              </span>
              <span className="ml-2 sm:ml-3 text-gray-500 text-xs sm:text-sm font-medium animate-fadeIn transition-colors duration-300 group-hover:text-gray-700" style={{ animationDelay: '0.3s' }}>
                STARTS FROM
              </span>
            </>
          ) : (
            <span className="text-2xl sm:text-3xl font-bold text-primary">
              Price on request
            </span>
          )}
        </div>
      </div>

      {/* Button */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
        <Button
          onClick={handlePrimaryClick}
          variant="primary"
          className="w-full"
        >
          SELECT PACKAGE
        </Button>
      </div>
    </div>
  );
};

export default PackageCard;
