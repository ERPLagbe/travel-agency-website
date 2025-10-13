import React from 'react';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';

const PackagesDescription: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content (col-8) */}
          <div className="mt-6 lg:mt-0 lg:col-span-8 order-2 lg:order-first overflow-y-auto">
            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6">
              {cmsData?.section_title}
            </h2>
            
            <div 
              className="prose prose-lg max-w-none text-gray-700 max-h-96 pr-4"
              dangerouslySetInnerHTML={{ __html: cmsData?.description || '' }}
            />
          </div>

          {/* Right Side - Image (col-4) */}
          <div className="lg:col-span-4 order-1 lg:order-last">
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
