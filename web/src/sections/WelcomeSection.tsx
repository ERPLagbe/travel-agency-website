import React from 'react';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';

const WelcomeSection: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image (col-4) */}
          <div className="lg:col-span-4 order-first lg:order-first">
            <div className="relative">
              <img 
                src={getFileUrlWithFallback(
                  cmsData?.welcome_image, 
                  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=500&fit=crop"
                )} 
                alt="Pilgrims at Kaaba"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Right Side - Content (col-8) */}
          <div className="mt-6 lg:mt-0 lg:col-span-8 order-last lg:order-last overflow-y-auto">
            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6">
              {cmsData?.welcome_title}
            </h2>
            
            <div 
              className="prose prose-lg max-w-none text-gray-700 max-h-96 pr-4"
              dangerouslySetInnerHTML={{ __html: cmsData?.welcome_description || '' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
