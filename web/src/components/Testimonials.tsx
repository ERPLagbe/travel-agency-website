import React, { useEffect, useMemo, useState } from 'react';
import { useWebsiteCMS, useTestimonials } from '../hooks/useWebsiteCMS';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();
  const { data: testimonialsData, error, isValidating } = useTestimonials();

  const testimonials = useMemo(() => (testimonialsData || []), [testimonialsData]);

  const [current, setCurrent] = useState(0); // index of first visible card
  const [itemsPerView, setItemsPerView] = useState(1); // 1 on mobile, 3 on desktop

  useEffect(() => {
    const updateItemsPerView = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches; // lg breakpoint
      setItemsPerView(isDesktop ? 3 : 1);
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Auto-advance with proper loop handling
  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const maxStartIndex = Math.max(0, testimonials.length - itemsPerView);
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const nextIndex = prev + 1;
        return nextIndex > maxStartIndex ? 0 : nextIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials, itemsPerView]);

  if (isValidating) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading testimonials</p>
            <p className="text-gray-600 text-sm">{JSON.stringify(error)}</p>
          </div>
        </div>
      </div>
    );
  }

  const title = cmsData?.testimonials_title;
  const subtitle = cmsData?.testimonials_subtitle;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`text-2xl transition-all duration-300 group-hover:scale-110 ${index < rating ? 'text-yellow-400 group-hover:text-yellow-500' : 'text-gray-300 group-hover:text-gray-400'}`}
      >
        ★
      </span>
    ));
  };

  const prev = () => {
    if (!testimonials || testimonials.length === 0) return;
    const maxStartIndex = Math.max(0, testimonials.length - itemsPerView);
    const newIndex = current - 1;
    setCurrent(newIndex < 0 ? maxStartIndex : newIndex);
  };

  const next = () => {
    if (!testimonials || testimonials.length === 0) return;
    const maxStartIndex = Math.max(0, testimonials.length - itemsPerView);
    const newIndex = current + 1;
    setCurrent(newIndex > maxStartIndex ? 0 : newIndex);
  };

  // Translate percentage per step (one card width)
  const translatePercent = (current / itemsPerView) * 100;

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-0.5 bg-secondary mr-4"></div>
            <span className="text-secondary text-lg font-medium">Testimonials</span>
            <div className="w-12 h-0.5 bg-secondary ml-4"></div>
          </div>
          <h2 className="text-4xl font-bold text-primary mb-4">{title}</h2>
          <p className="text-gray-600 text-lg">{subtitle}</p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Slides */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700"
              style={{ transform: `translateX(-${translatePercent}%)` }}
            >
              {(testimonials || []).map((testimonial: any) => (
                <div key={testimonial.name} className="w-full lg:w-1/3 px-2 flex-shrink-0">
                  <div className="bg-white rounded-xl p-8 shadow-lg relative max-w-3xl mx-auto overflow-visible transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 group cursor-pointer">
                    {/* Quote Mark */}
                    <div className="absolute top-4 left-4 z-10 w-10 h-10 bg-secondary rounded-full flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-primary">
                      <span className="text-primary text-xl font-bold transition-colors duration-300 group-hover:text-white">"</span>
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 text-center mb-6 italic transition-all duration-300 group-hover:text-gray-800 group-hover:font-medium">
                      "{testimonial.testimonial_text}"
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4 overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                        {testimonial.customer_avatar ? (
                          <img 
                            src={testimonial.customer_avatar} 
                            alt={testimonial.customer_name}
                            className="w-12 h-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <span className="text-primary font-bold text-lg transition-colors duration-300 group-hover:text-secondary">
                            {testimonial.customer_name?.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary text-center transition-all duration-300 group-hover:text-secondary group-hover:scale-105">{testimonial.customer_name}</h4>
                        {testimonial.customer_location && (
                          <p className="text-gray-500 text-sm text-center transition-colors duration-300 group-hover:text-gray-600">{testimonial.customer_location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          {testimonials && testimonials.length > itemsPerView && (
            <>
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-primary hover:bg-gray-50 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-primary hover:bg-gray-50 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="mt-6 flex items-center justify-center gap-2">
                {Array.from({ length: Math.max(1, testimonials.length - itemsPerView + 1) }).map((_, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      index === current ? 'w-8 bg-secondary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Empty state */}
        {(!testimonials || testimonials.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500">No testimonials available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;