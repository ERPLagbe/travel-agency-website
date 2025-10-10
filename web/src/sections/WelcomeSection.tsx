import React from 'react';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';

const WelcomeSection: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6">
              {cmsData?.welcome_title}
            </h2>
            
            <div 
              className="prose prose-lg max-w-none text-gray-700 max-h-96 overflow-y-auto pr-4"
              dangerouslySetInnerHTML={{ __html: cmsData?.welcome_description || '' }}
            />
          </div>

          {/* Right Side - Image */}
          <div className="order-first lg:order-last">
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
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
