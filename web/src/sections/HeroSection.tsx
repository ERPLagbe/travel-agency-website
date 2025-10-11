import { useState, useEffect } from 'react';
import { Sparkles, Phone, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { data: cmsData } = useWebsiteCMS();

  // Get slides from CMS
  const slides = cmsData?.sliders
    ?.filter((slide: any) => slide.is_active === 1)
    ?.sort((a: any, b: any) => (a.slide_order || 0) - (b.slide_order || 0))
    ?.map((slide: any) => ({
      image: slide.slide_image,
      title: slide.slide_title,
      subtitle: slide.slide_subtitle,
      description: slide.slide_description
    })) || [];

  // Get hero data from CMS
  const firstSlider = cmsData?.sliders?.[0];
  
  const heroData = {
    trustedText: firstSlider?.top_badge_text || cmsData?.hero_trusted_text,
    primaryButtonText: firstSlider?.primary_button_text || cmsData?.hero_primary_button_text,
    secondaryButtonText: firstSlider?.secondary_button_text || cmsData?.hero_secondary_button_text,
    yearsExperience: firstSlider?.years_experience || cmsData?.hero_years_experience,
    happyPilgrims: firstSlider?.happy_pilgrims || cmsData?.hero_happy_pilgrims,
    customerRating: firstSlider?.customer_rating || cmsData?.hero_customer_rating,
    businessPhone: cmsData?.business_phone,
    description: firstSlider?.slide_description || cmsData?.hero_description
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-advance slider only if there are slides
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  const nextSlide = () => {
    if (slides.length > 1) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (slides.length > 1) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const goToSlide = (index: number) => {
    if (slides.length > 0 && index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  };

  // Don't render if no slides available
  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden min-h-[70vh] lg:min-h-[80vh] flex items-center">
      {/* Background Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        {slides.length > 0 ? (
          slides.map((slide: any, index: number) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {slide.image && (
                <img
                  src={slide.image}
                  alt={slide.title || 'Hero slide'}
                  className="block w-full h-full object-cover"
                />
              )}
            </div>
          ))
        ) : null}
        </div>

      {/* Overlay - Keep gradient */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full">
            {/* Left Aligned Content */}
          <div className={`text-white max-w-3xl transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}>
            {/* Badge */}
            {heroData.trustedText && (
              <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-4 shadow-lg bg-secondary">
                <Award className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white">{heroData.trustedText}</span>
              </div>
            )}

            {/* Animated Title & Subtitle */}
            <div className="mb-6 relative">
              {slides.length > 0 ? (
                slides.map((slide: any, index: number) => (
                  <div
                    key={index}
                    className={`transition-opacity duration-700 ${
                      index === currentSlide 
                        ? 'opacity-100 relative' 
                        : 'opacity-0 absolute top-0 left-0 w-full pointer-events-none'
                    }`}
                  >
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
                      <span className="text-white drop-shadow-2xl">
                        {slide.title}
                </span>
              </h1>
                    <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-secondary drop-shadow-lg">
                      {slide.subtitle}
                    </p>
                  </div>
                ))
              ) : null}
            </div>

            {/* Description - Animated with fade effect */}
            <div className="mb-6 relative">
              {slides.length > 0 ? (
                slides.map((slide: any, index: number) => (
                  <div
                    key={index}
                    className={`transition-opacity duration-700 ${
                      index === currentSlide 
                        ? 'opacity-100 relative' 
                        : 'opacity-0 absolute top-0 left-0 w-full pointer-events-none'
                    }`}
                  >
                    {slide.description && (
                      <p className="text-gray-200 text-sm xs:text-base md:text-lg max-w-2xl leading-relaxed">
                        {slide.description.length > 100 
                          ? `${slide.description.substring(0, 100)}...` 
                          : slide.description}
                      </p>
                    )}
                  </div>
                ))
              ) : null}
            </div>

            {/* CTA Buttons */}
            {(heroData.primaryButtonText || heroData.secondaryButtonText) && (
              <div className="flex flex-col md:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
                {heroData.primaryButtonText && (
                  <button 
                    onClick={() => navigate('/category/all')}
                    className="group relative text-white px-4 py-2 xs:px-6 xs:py-3 sm:px-8 sm:py-4 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden bg-primary cursor-pointer text-xs xs:text-sm sm:text-base"
                  >
                  <span className="relative flex items-center gap-2">
                      <Sparkles className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" />
                      {heroData.primaryButtonText}
                    <span className="inline-block transition-transform group-hover:translate-x-2 duration-300">→</span>
                  </span>
                </button>
                )}
                
                {heroData.secondaryButtonText && (
                  <button 
                    onClick={() => navigate('/contact')}
                    className="relative px-4 py-2 xs:px-6 xs:py-3 sm:px-8 sm:py-4 rounded-full font-semibold border-2 border-secondary text-white transition-all duration-300 transform hover:scale-105 hover:bg-secondary hover:text-white cursor-pointer text-xs xs:text-sm sm:text-base"
                  >
                  <span className="relative flex items-center gap-2">
                      <Phone className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                      {heroData.secondaryButtonText}
                  </span>
                </button>
                )}
              </div>
            )}

            {/* Stats */}
            {(heroData.yearsExperience || heroData.happyPilgrims) && (
              <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-6 max-w-2xl">
                {heroData.yearsExperience && (
                  <div className="backdrop-blur-md rounded-lg sm:rounded-xl p-2 xs:p-3 sm:p-4 md:p-5 border border-white/20 hover:bg-white/10 transition-all duration-300">
                    <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-secondary">{heroData.yearsExperience}</div>
                    <div className="text-xs xs:text-xs sm:text-sm text-gray-300">Years Experience</div>
                  </div>
                )}
                {heroData.happyPilgrims && (
                  <div className="backdrop-blur-md rounded-lg sm:rounded-xl p-2 xs:p-3 sm:p-4 md:p-5 border border-white/20 hover:bg-white/10 transition-all duration-300">
                    <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-secondary">{heroData.happyPilgrims}</div>
                    <div className="text-xs xs:text-xs sm:text-sm text-gray-300">Happy Pilgrims</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slider Controls - Only show if there are multiple slides */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {slides.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'w-12 h-3 bg-secondary'
                    : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HeroSection;