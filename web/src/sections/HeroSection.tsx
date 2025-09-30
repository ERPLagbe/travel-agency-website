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
    <div className="relative h-[60vh] md:h-[70vh] bg-cover bg-center bg-no-repeat">
      <img 
        className='absolute object-cover w-full h-full ' 
        src={heroData.backgroundImage} 
        alt="Hero Background" 
      />

      
      {/* Overlay for better text readability */}
      <div className="absolute w-full h-full bg-black opacity-50"></div>
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-4xl">
            
            {/* Hero Content */}
            <div className="text-white text-center md:text-left">
              <div className="text-2xl md:text-3xl font-light mb-3 opacity-90">
                {heroData.trustedText}
              </div>
              <div className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {heroData.mainTitle}
              </div>
              <div className="text-3xl md:text-5xl font-light mb-8 opacity-95">
                {heroData.subtitle}
              </div>
              
              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg">
                  Explore Packages
                </button>
                <button className="border-2 border-white text-white hover:bg-accent hover:text-primary hover:border-accent px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                  Contact Us
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;