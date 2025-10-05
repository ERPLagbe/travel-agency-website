import React, { useState } from 'react';
import { Plane, Hotel, Utensils, Sparkles, Calendar } from 'lucide-react';

interface PackageCardProps {
  id: string | number;
  title: string;
  nights?: string;
  rating?: number;
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
  const [isHovered, setIsHovered] = useState(false);

  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      window.location.href = `/packages/${id}`;
    }
  };

  return (
    <div 
      className="w-full bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Image */}
      <div className="relative h-48 overflow-hidden">
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
        </div>
      </div>

      {/* Price Section */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 text-center bg-gradient-to-br from-purple-50 to-white group cursor-default">
        <div className="inline-block">
          <span className="text-3xl sm:text-5xl font-bold text-purple-700 animate-countUp transition-all duration-300 group-hover:text-purple-800 group-hover:scale-110 inline-block">
            £{price.toLocaleString()}
          </span>
          <span className="ml-2 sm:ml-3 text-gray-500 text-xs sm:text-sm font-medium animate-fadeIn transition-colors duration-300 group-hover:text-gray-700" style={{ animationDelay: '0.3s' }}>
            STARTS FROM
          </span>
        </div>
      </div>

      {/* Features - Compact Grid Layout - This grows to fill space */}
      <div className="px-4 sm:px-6 py-4 flex-grow">
        {/* Basic Info Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="animate-slideIn py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg transition-all duration-300 hover:bg-purple-50 cursor-pointer group border-l-4 border-transparent hover:border-purple-600 bg-gray-50" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-purple-700 transition-all duration-300 group-hover:scale-110" />
              <span className="text-xs text-gray-500 font-medium">Duration</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-purple-700">{duration}</p>
          </div>

          <div className="animate-slideIn py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg transition-all duration-300 hover:bg-purple-50 cursor-pointer group border-l-4 border-transparent hover:border-purple-600 bg-gray-50" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              <Plane className="w-3 h-3 sm:w-4 sm:h-4 text-purple-700 transition-all duration-300 group-hover:scale-110" />
              <span className="text-xs text-gray-500 font-medium">Direct Flight</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-purple-700">{airInfo}</p>
          </div>

          {/* Dynamic Accommodations or Fallback */}
          {accommodationList && accommodationList.length > 0 ? (
            accommodationList.map((accommodation, index) => (
              <div key={index} className="animate-slideIn py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg transition-all duration-300 hover:bg-purple-50 cursor-pointer group border-l-4 border-transparent hover:border-purple-600 bg-gray-50" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <Hotel className="w-3 h-3 sm:w-4 sm:h-4 text-purple-700 transition-all duration-300 group-hover:scale-110" />
                  <span className="text-xs text-gray-500 font-medium">{accommodation.hotel}</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-purple-700">{accommodation.distance}</p>
              </div>
            ))
          ) : (
            <>
              <div className="animate-slideIn py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg transition-all duration-300 hover:bg-purple-50 cursor-pointer group border-l-4 border-transparent hover:border-purple-600 bg-gray-50" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <Hotel className="w-3 h-3 sm:w-4 sm:h-4 text-purple-700 transition-all duration-300 group-hover:scale-110" />
                  <span className="text-xs text-gray-500 font-medium">Hotel Makkah</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-purple-700">{hotelMakkah}</p>
              </div>

              <div className="animate-slideIn py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg transition-all duration-300 hover:bg-purple-50 cursor-pointer group border-l-4 border-transparent hover:border-purple-600 bg-gray-50" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <Hotel className="w-3 h-3 sm:w-4 sm:h-4 text-purple-700 transition-all duration-300 group-hover:scale-110" />
                  <span className="text-xs text-gray-500 font-medium">Hotel Madinah</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-purple-700">{hotelMadinah}</p>
              </div>
            </>
          )}
        </div>

        {/* Food */}
        <div className="animate-slideIn py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg transition-all duration-300 hover:bg-purple-50 cursor-pointer group border-l-4 border-transparent hover:border-purple-600 bg-gray-50 mb-2 sm:mb-3" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-1 sm:gap-2 mb-1">
            <Utensils className="w-3 h-3 sm:w-4 sm:h-4 text-purple-700 transition-all duration-300 group-hover:scale-110" />
            <span className="text-xs text-gray-500 font-medium">Food Included</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-purple-700">{foodInfo}</p>
        </div>

        {/* Special Services - Highlighted */}
        {specialServicesList && specialServicesList.length > 0 ? (
          specialServicesList.map((service, index) => (
            <div key={index} className="relative animate-slideIn py-2 sm:py-3 px-2 sm:px-3 rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer group overflow-hidden bg-gradient-to-r from-amber-50 to-purple-50 border-2 border-amber-300 hover:border-purple-500 mb-2" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
              <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-bl-lg">
                ⭐ PREMIUM
              </div>
              <div className="flex items-center gap-1 sm:gap-2 mb-1 mt-1">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-700 animate-pulse" />
                <span className="text-xs text-purple-700 font-semibold">Special Services</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-purple-900 transition-colors duration-300 group-hover:text-purple-700">{service.title}</p>
            </div>
          ))
        ) : (
          <div className="relative animate-slideIn py-2 sm:py-3 px-2 sm:px-3 rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer group overflow-hidden bg-gradient-to-r from-amber-50 to-purple-50 border-2 border-amber-300 hover:border-purple-500" style={{ animationDelay: '0.6s' }}>
            <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-bl-lg">
              ⭐ PREMIUM
            </div>
            <div className="flex items-center gap-1 sm:gap-2 mb-1 mt-1">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-700 animate-pulse" />
              <span className="text-xs text-purple-700 font-semibold">Special Services</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-purple-900 transition-colors duration-300 group-hover:text-purple-700">{specialServices}</p>
          </div>
        )}
      </div>

      {/* Button */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
        <button 
          onClick={handlePrimaryClick}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-sm sm:text-base"
        >
          SELECT PACKAGE
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-countUp {
          animation: countUp 0.8s ease-out forwards;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default PackageCard;