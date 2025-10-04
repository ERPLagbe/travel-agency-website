import React from 'react';

interface PackageCardProps {
  id: string | number;
  title: string;
  nights: string;
  rating: number;
  price: number;
  image: string;
  itemGroup?: string; // Add item group to determine category
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  // Additional fields for new design
  duration?: string;
  airInfo?: string;
  hotelMakkah?: string;
  hotelMadinah?: string;
  foodInfo?: string;
  specialServices?: string;
  // Dynamic accommodation list
  accommodationList?: Array<{
    hotel: string;
    distance: string;
  }>;
  // Dynamic special services list
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
  // New design fields
  duration = "35/42 Days",
  airInfo = "SA/Biman/Flynas",
  hotelMakkah = "1200/1500M",
  hotelMadinah = "1200/1500M", 
  foodInfo = "Breakfast, Lunch & Dinner",
  specialServices = "Ziyarah Tour, Transportation & Guide",
  accommodationList = [],
  specialServicesList = []
}) => {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      // Always use packages route
      window.location.href = `/packages/${id}`;
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-200 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-full sm:h-52">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
          <h3 className="text-white text-base sm:text-lg font-semibold leading-tight">{title}</h3>
        </div>
      </div>

      {/* Price Section */}
      <div className="p-4 sm:p-6 text-center border-b border-gray-100">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-2 gap-1 sm:gap-2">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: '#432b7c' }}>£{price.toLocaleString()}</span>
          <span className="text-xs sm:text-sm" style={{ color: '#432b7c' }}>STARTS FROM</span>
        </div>
      </div>

      {/* Package Details List - This will grow to fill available space */}
      <div className="p-4 sm:p-6 flex-grow">
        <div className="space-y-2 sm:space-y-3">
          {/* Duration */}
          <div className="flex items-start sm:items-center">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0" style={{ backgroundColor: '#432b7c' }}>
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700 text-sm sm:text-base">Duration: {duration}</span>
          </div>

          {/* Direct Flight */}
          <div className="flex items-start sm:items-center">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0" style={{ backgroundColor: '#432b7c' }}>
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </div>
            <span className="text-gray-700 text-sm sm:text-base">Direct Flight: {airInfo}</span>
          </div>

          {/* Dynamic Accommodations */}
          {accommodationList && accommodationList.length > 0 ? (
            accommodationList.map((accommodation, index) => (
              <div key={index} className="flex items-start sm:items-center">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0" style={{ backgroundColor: '#432b7c' }}>
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm sm:text-base">{accommodation.hotel}: {accommodation.distance}</span>
              </div>
            ))
          ) : (
            <>
              {/* Fallback to old hotel sections if no accommodation list */}
              <div className="flex items-start sm:items-center">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0" style={{ backgroundColor: '#432b7c' }}>
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm sm:text-base">Hotel Makkah: {hotelMakkah}</span>
              </div>

              <div className="flex items-start sm:items-center">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0" style={{ backgroundColor: '#432b7c' }}>
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm sm:text-base">Hotel Madinah: {hotelMadinah}</span>
              </div>
            </>
          )}

          {/* Food */}
          <div className="flex items-start sm:items-center">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0" style={{ backgroundColor: '#432b7c' }}>
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700 text-sm sm:text-base">Food: {foodInfo}</span>
          </div>

          {/* Dynamic Special Services */}
          {specialServicesList && specialServicesList.length > 0 ? (
            specialServicesList.map((service, index) => (
              <div key={index} className="flex items-start sm:items-center">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0" style={{ backgroundColor: '#432b7c' }}>
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-6 4a1 1 0 011-1h.01a1 1 0 110 2H5a1 1 0 01-1-1zm7 0a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm sm:text-base">Special Services: {service.title}</span>
              </div>
            ))
          ) : (
            <div className="flex items-start sm:items-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0" style={{ backgroundColor: '#432b7c' }}>
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-6 4a1 1 0 011-1h.01a1 1 0 110 2H5a1 1 0 01-1-1zm7 0a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700 text-sm sm:text-base">Special Services: {specialServices}</span>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action Button */}
      <div className="p-4 sm:p-6 pt-0">
        <button 
          className="w-full text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors hover:opacity-90 text-sm sm:text-base"
          style={{ backgroundColor: '#432b7c' }}
          onClick={handlePrimaryClick}
        >
          SELECT PACKAGE
        </button>
      </div>

      {/* Disclaimer */}
      {/* <div className="px-6 pb-4">
        <p className="text-xs text-gray-500 text-center">*Terms & Conditions Applicable</p>
      </div> */}
    </div>
  );
};

export default PackageCard;
