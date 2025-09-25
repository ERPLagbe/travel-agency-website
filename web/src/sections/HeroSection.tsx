import React from 'react';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';

const HeroSection: React.FC = () => {
  const { data, error, isValidating } = useWebsiteCMS();

  if (isValidating) {
    return (
      <div className="relative h-[60vh] md:h-[70vh] bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-[60vh] md:h-[70vh] bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading content</p>
          <p className="text-gray-600 text-sm">{JSON.stringify(error)}</p>
        </div>
      </div>
    );
  }

  // Fallback to default values if no data
  const heroData = {
    backgroundImage: data?.hero_background_image || "https://www.bismillahtravel.co.uk/images/banner.webp",
    floatingImage: data?.hero_floating_image || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    trustedText: data?.hero_trusted_text || "Trusted",
    mainTitle: data?.hero_main_title || "ISLAMIC TRAVEL AGENCY",
    subtitle: data?.hero_subtitle || "For British Muslims"
  };

  return (
    <div>
      {/* Hero Section with Background Image */}
      <div className="relative h-[60vh] md:h-[70vh] bg-cover bg-center bg-no-repeat">
        <img 
          className='absolute inset-0 object-cover hidden md:block' 
          src={heroData.backgroundImage} 
          alt="Hero Background" 
        />
        <div className="absolute w-full h-full inset-0 bg-primary md:hidden block"></div>
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-[30%]">
              
              {/* Left Side - Floating Image Box */}
              <div className="order-2 md:order-1">
                <div className="">
                  <img 
                    src={heroData.floatingImage} 
                    alt="Kaaba" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
              
              {/* Right Side - Title and Description */}
              <div className="order-1 md:order-2 text-center md:text-left">
                <div className="text-secondary text-lg mb-2">{heroData.trustedText}</div>
                <div className="text-white text-4xl md:text-6xl font-bold mb-2">{heroData.mainTitle}</div>
                <div className="text-secondary text-lg mb-8">{heroData.subtitle}</div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;