import React from 'react';
import { Link } from 'react-router-dom';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';

const HeroSection: React.FC = () => {
  const { data, error, isValidating } = useWebsiteCMS();

  // Show loading state only briefly, then show hero with fallback data
  if (isValidating && !data) {
    return (
      <div className="relative min-h-[60vh] md:min-h-[70vh] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://www.bismillahtravel.co.uk/images/banner.webp)' }}>
        <div className="absolute w-full h-full bg-black opacity-30"></div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to default values if no data or error
  const heroData = {
    backgroundImage: data?.hero_background_image || "https://www.bismillahtravel.co.uk/images/banner.webp",
    floatingImage: data?.hero_floating_image || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    trustedText: data?.hero_trusted_text || "Trusted",
    mainTitle: data?.hero_main_title || "ISLAMIC TRAVEL AGENCY",
    subtitle: data?.hero_subtitle || "For British Muslims"
  };

  // Always show hero content, even if there's an error (with fallback data)
  if (error) {
    console.warn('HeroSection CMS Error:', error);
  }

  return (
    <div className="relative min-h-[60vh] md:min-h-[70vh] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroData.backgroundImage})` }}>
      {/* Overlay for better text readability */}
      <div className="absolute w-full h-full bg-black opacity-30"></div>
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-4xl">
            
            {/* Hero Content */}
            <div className="mt-[20%] text-white text-center md:text-left">
              <div className="text-xl md:text-2xl lg:text-3xl font-light mb-3 opacity-90">
                {heroData.trustedText}
              </div>
              <div className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {heroData.mainTitle}
              </div>
              <div className="text-2xl md:text-4xl lg:text-5xl font-light mb-8 opacity-95">
                {heroData.subtitle}
              </div>
              
              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/category/all" className="hero-button bg-primary hover:bg-primary-dark text-white px-6 py-3 md:px-8 md:py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg text-center no-underline text-sm md:text-base">
                  Explore Packages
                </Link>
                <Link to="/contact" className="hero-button border-2 border-white text-white px-6 py-3 md:px-8 md:py-3 rounded-lg font-semibold transition-colors duration-300 text-center no-underline text-sm md:text-base">
                  Contact Us
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;