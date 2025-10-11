import React, { useState } from 'react';
import { SectionContainer, Typography, PageLayout } from '../components';
import { useWebsiteCMS, useGalleryImages } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GalleryPage: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();
  const { data: galleryImages, isValidating } = useGalleryImages();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Filter active images and sort by creation date (latest first) - NO SLICE LIMIT
  const activeImages = galleryImages
    ?.filter((image: any) => image.is_active === 1)
    ?.sort((a: any, b: any) => new Date(b.creation).getTime() - new Date(a.creation).getTime()) || [];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : activeImages.length - 1);
    } else {
      setSelectedImage(selectedImage < activeImages.length - 1 ? selectedImage + 1 : 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateImage('prev');
    if (e.key === 'ArrowRight') navigateImage('next');
  };

  if (isValidating) {
    return (
      <PageLayout 
        breadcrumbItems={[
          { label: 'Home', path: '/' },
          { label: 'Gallery' }
        ]}
      >
        <SectionContainer>
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <Typography variant="body">Loading gallery...</Typography>
            </div>
          </div>
        </SectionContainer>
      </PageLayout>
    );
  }

  if (!activeImages.length) {
    return (
      <PageLayout 
        breadcrumbItems={[
          { label: 'Home', path: '/' },
          { label: 'Gallery' }
        ]}
      >
        <SectionContainer>
          <div className="text-center py-16">
            <Typography variant="h2" style={{ marginBottom: 'var(--spacing-4)' }}>
              {cmsData?.gallery_title || 'Our Gallery'}
            </Typography>
            <Typography variant="body" color="muted">
              No gallery images available at the moment.
            </Typography>
          </div>
        </SectionContainer>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      breadcrumbItems={[
        { label: 'Home', path: '/' },
        { label: 'Gallery' }
      ]}
    >
      {/* Hero Section */}
      <SectionContainer size="lg" className="text-center bg-primary text-white py-16">
        <Typography variant="h1" color="white" align="center" style={{ marginBottom: 'var(--spacing-4)' }}>
          {cmsData?.gallery_title || 'Our Gallery'}
        </Typography>
        <Typography variant="body-large" color="white" align="center">
          {cmsData?.gallery_subtitle || 'Explore our travel memories and experiences'}
        </Typography>
      </SectionContainer>

      {/* Gallery Grid */}
      <SectionContainer className="py-12">
        <div className="text-center mb-8">
          <Typography variant="h2" style={{ marginBottom: 'var(--spacing-4)' }}>
            Travel Memories
          </Typography>
          <Typography variant="body" color="muted">
            {activeImages.length} {activeImages.length === 1 ? 'photo' : 'photos'} in our gallery
          </Typography>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {activeImages.map((image: any, index: number) => {
            // Random heights for Pinterest-style layout
            const heights = ['h-48', 'h-56', 'h-64', 'h-72', 'h-80'];
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
      </SectionContainer>

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

          {/* Navigation Buttons */}
          {activeImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

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
              <p className="text-sm text-gray-300 mt-2">
                {selectedImage + 1} of {activeImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default GalleryPage;


