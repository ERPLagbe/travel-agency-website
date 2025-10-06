import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider data - you can replace with CMS data
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=1920&q=80',
      title: 'Experience Sacred Hajj',
      subtitle: 'Journey to the Holy Cities with Expert Guidance'
    },
    {
      image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1920&q=80',
      title: 'Blessed Umrah Packages',
      subtitle: 'Comfortable & Affordable Pilgrimage Solutions'
    },
    {
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1920&q=80',
      title: 'Trusted Since 2008',
      subtitle: 'Serving British Muslims with Excellence'
    }
  ];

  const heroData = {
    trustedText: "Trusted Since 2008",
    primaryButtonText: "Explore Packages",
    secondaryButtonText: "Contact Us",
    yearsExperience: "17+",
    happyPilgrims: "50K+",
    customerRating: "4.9★",
    businessPhone: "020 8123 4567"
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-advance slider
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative overflow-hidden" style={{ minHeight: 'calc(100vh - 200px)' }}>
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex items-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <div className="w-full">
          {/* Left Aligned Content */}
          <div className={`text-white max-w-3xl transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-4 shadow-lg bg-secondary animate-fadeIn">
              <Award className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">{heroData.trustedText}</span>
            </div>

            {/* Animated Title & Subtitle - Fixed height container to prevent overlap */}
            <div className="mb-6 relative" style={{ minHeight: '220px' }}>
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full transition-all duration-700 ${
                    index === currentSlide 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-12 pointer-events-none'
                  }`}
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight">
                    <span className="text-white drop-shadow-2xl">
                      {slide.title}
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-secondary drop-shadow-lg">
                    {slide.subtitle}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-gray-200 text-base md:text-lg mb-6 max-w-2xl leading-relaxed">
              Experience the spiritual journey of a lifetime with expert guidance, comfortable accommodations, 
              and comprehensive packages tailored for your sacred pilgrimage.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button 
                className="group relative text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden bg-primary"
              >
                <span className="relative flex items-center gap-2">
                  <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  {heroData.primaryButtonText}
                  <span className="inline-block transition-transform group-hover:translate-x-2 duration-300">→</span>
                </span>
              </button>
              
              <button 
                className="relative px-8 py-4 rounded-full font-semibold border-2 border-secondary text-white transition-all duration-300 transform hover:scale-105 hover:bg-secondary hover:text-white"
              >
                <span className="relative flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  {heroData.secondaryButtonText}
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
              <div className="backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold mb-1 text-secondary">{heroData.yearsExperience}</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold mb-1 text-secondary">{heroData.happyPilgrims}</div>
                <div className="text-sm text-gray-300">Happy Pilgrims</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-12 h-3 bg-secondary'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
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

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;