import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, Award } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Demo data
  const heroData = {
    trustedText: "Trusted Since 2008",
    mainTitle: "Islamic Travel",
    subtitle: "For British Muslims"
  };

  return (
    // <div className="min-h-screen dynamic-hero-gradient">
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Simple Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content - Full Width Left Aligned */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="flex items-start justify-between pt-20 gap-12">
            {/* Left Aligned Content */}
            <div className={`text-white max-w-2xl transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}>
              {/* Badge - Highlighted with Gold */}
              <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6 shadow-lg bg-secondary">
                <Award className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white">{heroData.trustedText}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">
                  {heroData.mainTitle}
                </span>
                <br />
                <span className="text-primary drop-shadow-lg">Agency</span>
              </h1>

              <p className="text-xl md:text-2xl mb-4 font-semibold text-secondary">
                {heroData.subtitle}
              </p>

              <p className="text-gray-300 text-lg mb-8 max-w-2xl leading-relaxed">
                Experience the spiritual journey of a lifetime with expert guidance, 
                comfortable accommodations, and comprehensive packages tailored for your sacred pilgrimage.
              </p>

              {/* CTA Buttons - Enhanced Hover with Custom Colors */}
              <div className="flex flex-wrap gap-4 mb-12">
                <button className="group relative text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl overflow-hidden bg-primary">
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    Explore Packages
                    <span className="inline-block transition-transform group-hover:translate-x-2 duration-300">→</span>
                  </span>
                </button>
                
                <button 
                  className="relative px-8 py-4 rounded-full font-semibold border-2 border-secondary transition-all duration-300 transform hover:scale-110 overflow-hidden"
                  style={{ 
                    backgroundColor: 'transparent',
                    color: 'white !important'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#111827';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  <span className="relative flex items-center gap-2">
                    <Phone className="w-5 h-5 transition-transform duration-300" />
                    Contact Us
                  </span>
                </button>
              </div>

              {/* Stats - Color Highlighted with Purple and Gold */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl">
                <div className="backdrop-blur-sm rounded-xl p-4 border hover:bg-primary/30 transition-all duration-300 bg-primary/20 border-primary/40">
                  <div className="text-3xl font-bold mb-1 text-secondary">17+</div>
                  <div className="text-sm text-gray-300">Years Experience</div>
                </div>
                <div className="backdrop-blur-sm rounded-xl p-4 border hover:bg-primary/30 transition-all duration-300 bg-primary/20 border-primary/40">
                  <div className="text-3xl font-bold mb-1 text-secondary">50K+</div>
                  <div className="text-sm text-gray-300">Happy Pilgrims</div>
                </div>
                <div className="backdrop-blur-sm rounded-xl p-4 border hover:bg-primary/30 transition-all duration-300 bg-primary/20 border-primary/40">
                  <div className="text-3xl font-bold mb-1 text-secondary">4.9★</div>
                  <div className="text-sm text-gray-300">Customer Rating</div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Card with Trust Signals */}
            <div className={`hidden lg:block flex-1 transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}>
              <div className="max-w-md ml-auto">
                {/* Main Contact Card */}
                <div className="backdrop-blur-md rounded-2xl p-8 border shadow-2xl bg-white/10 border-secondary/30">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-secondary">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Ready to Book?</h3>
                    <p className="text-gray-300 text-sm">Speak with our expert travel consultants</p>
                  </div>

                  {/* Phone Number */}
                  <a href="tel:02081234567" className="block text-center mb-6 group">
                    <div className="text-3xl font-bold mb-1 group-hover:scale-105 transition-transform text-secondary">
                      020 8123 4567
                    </div>
                    <div className="text-sm text-gray-400">Available 7 Days a Week</div>
                  </a>

                  {/* WhatsApp Button */}
                  <button className="w-full text-white py-3 rounded-full font-semibold mb-6 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2" style={{ backgroundColor: '#25D366' }}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </button>

                  {/* Trust Badges */}
                  <div className="border-t border-secondary/20 pt-6">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-secondary" />
                        <span>ATOL Protected</span>
                      </div>
                      <div className="w-px h-4 bg-gray-600"></div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span>4.9/5 Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-20 h-20 rounded-full blur-xl animate-pulse bg-primary/20"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full blur-2xl animate-pulse bg-secondary/20"></div>
      </div>
    </div>
  );
};

export default HeroSection;