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
            
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {cmsData?.welcome_description}
            </p>
            
            {/* <p className="text-gray-700 text-lg leading-relaxed mb-8">
              With years of experience in Islamic travel, we have built strong relationships with trusted partners in Saudi Arabia, ensuring that every aspect of your journey - from flights and accommodation to ground transportation and spiritual guidance - is handled with the utmost care and attention to detail.
            </p> */}

            <h3 className="text-primary text-2xl font-bold mb-4">
              {cmsData?.welcome_services_title}
            </h3>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              {cmsData?.welcome_services_description}
            </p>
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
