import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebsiteCMS, useGalleryImages } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';
import { X } from 'lucide-react';

const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const { data: cmsData } = useWebsiteCMS();
  const { data: galleryImages } = useGalleryImages();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Filter active images, sort by creation date (latest first), and take only 9
  const activeImages = galleryImages
    ?.filter((image: any) => image.is_active === 1)
    ?.sort((a: any, b: any) => new Date(b.creation).getTime() - new Date(a.creation).getTime())
    ?.slice(0, 8) || [];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
  };

  if (!activeImages.length) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {cmsData?.gallery_title || 'Photo Gallery'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {cmsData?.gallery_subtitle || 'Explore our travel memories and experiences'}
          </p>
        </div>

        {/* Pinterest-style Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {activeImages.map((image: any, index: number) => {
            // Random heights for Pinterest-style layout
            const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-60', 'h-88', 'h-76', 'h-84', 'h-68'];
            const randomHeight = heights[index % heights.length];
            
            return (
              <div
                key={index}
                className="break-inside-avoid group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={getFileUrlWithFallback(image.image)}
                  alt={image.title || `Gallery image ${index + 1}`}
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${randomHeight}`}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white w-full">
                    <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-gray-200 line-clamp-2">{image.description}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        {galleryImages && galleryImages.filter((img: any) => img.is_active === 1).length > 8 && (
          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/gallery')}
              className="cursor-pointer bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors duration-200 hover:shadow-lg hover:-translate-y-0.5"
            > 
              View All Photos
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close gallery"
            >
              <X className="w-8 h-8" />
            </button>


            {/* Image */}
            <div className="max-w-4xl max-h-full">
              <img
                src={getFileUrlWithFallback(activeImages[selectedImage].image)}
                alt={activeImages[selectedImage].title || `Gallery image ${selectedImage + 1}`}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <h3 className="text-xl font-semibold mb-2">
                  {activeImages[selectedImage].title}
                </h3>
                {activeImages[selectedImage].description && (
                  <p className="text-gray-200">
                    {activeImages[selectedImage].description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
