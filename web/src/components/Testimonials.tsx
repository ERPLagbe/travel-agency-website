import React from 'react';
import { useWebsiteCMS, useTestimonials } from '../hooks/useWebsiteCMS';

const Testimonials: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();
  const { data: testimonials, error, isValidating } = useTestimonials();

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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(testimonials || []).map((testimonial, index) => (
            <div key={testimonial.name} className="bg-white rounded-xl p-8 shadow-lg relative">
              {/* Quote Mark */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-primary text-2xl font-bold">"</span>
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
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  {testimonial.customer_avatar ? (
                    <img 
                      src={testimonial.customer_avatar} 
                      alt={testimonial.customer_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-primary font-bold text-lg">
                      {testimonial.customer_name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-primary">{testimonial.customer_name}</h4>
                  <p className="text-gray-500 text-sm">Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show message if no testimonials */}
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