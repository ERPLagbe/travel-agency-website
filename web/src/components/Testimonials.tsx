import React, { useEffect, useMemo, useState } from 'react';
import { useWebsiteCMS, useTestimonials } from '../hooks/useWebsiteCMS';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();
  const { data: testimonialsData, error, isValidating } = useTestimonials();

  const testimonials = useMemo(() => (testimonialsData || []), [testimonialsData]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);

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

  const title = cmsData?.testimonials_title || "WHAT OUR CLIENTS SAY?";
  const subtitle = cmsData?.testimonials_subtitle || "Creating Unforgettable Experiences";

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  const prev = () => {
    if (!testimonials || testimonials.length === 0) return;
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    if (!testimonials || testimonials.length === 0) return;
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

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
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {(testimonials || []).map((testimonial: any) => (
                <div key={testimonial.name} className="w-full px-2 flex-shrink-0">
                  <div className="bg-white rounded-xl p-8 shadow-lg relative max-w-3xl mx-auto overflow-visible">
                    {/* Quote Mark */}
                    <div className="absolute top-4 left-4 z-10 w-10 h-10 bg-secondary rounded-full flex items-center justify-center shadow-md">
                      <span className="text-primary text-xl font-bold">"</span>
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 text-center mb-6 italic">
                      "{testimonial.testimonial_text}"
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                        {testimonial.customer_avatar ? (
                          <img 
                            src={testimonial.customer_avatar} 
                            alt={testimonial.customer_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-primary font-bold text-lg">
                            {testimonial.customer_name?.charAt(0) || '?'}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary text-center">{testimonial.customer_name}</h4>
                        {testimonial.customer_location && (
                          <p className="text-gray-500 text-sm text-center">{testimonial.customer_location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          {testimonials && testimonials.length > 1 && (
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
                {testimonials.map((_: any, index: number) => (
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