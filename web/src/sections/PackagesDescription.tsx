import React from 'react';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';

const PackagesDescription: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6">
              {cmsData?.umrah_title}
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {cmsData?.umrah_description}
            </p>
            
            {/* <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Our experienced team will guide you through every step of the process, from initial consultation to your safe return home. We understand the importance of this sacred journey and ensure that all our services comply with Islamic principles and Saudi regulations.
            </p> */}

            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6">
              {cmsData?.hajj_title}
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              {cmsData?.hajj_description}
            </p>
          </div>

          {/* Right Side - Image */}
          <div>
            <div className="relative">
              <img 
                src={getFileUrlWithFallback(cmsData?.packages_image, "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=500&fit=crop")} 
                alt="Pilgrims performing Tawaf around Kaaba"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesDescription;
