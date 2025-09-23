import React from 'react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ 
  title = "WHAT OUR CLIENTS SAY?", 
  subtitle = "Creating Unforgettable Experiences",
  testimonials 
}) => {
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
        {/* Header with decorative elements */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
              <span className="text-primary text-xl">❋</span>
            </div>
            <h2 className="text-primary text-3xl md:text-4xl font-bold uppercase">
              {title}
            </h2>
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center ml-4">
              <span className="text-primary text-xl">❋</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            {subtitle}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-purple-100 rounded-xl p-6 shadow-lg relative">
              {/* Quote Icon */}
              <div className="text-center mb-4">
                <span className="text-secondary text-4xl">"</span>
              </div>
              
              {/* Testimonial Text */}
              <p className="text-gray-700 text-base leading-relaxed mb-6 text-center">
                {testimonial.text}
              </p>
              
              {/* Name and Location */}
              <div className="text-center mb-4">
                <h4 className="text-primary font-semibold text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-gray-600 text-sm">
                  {testimonial.location}
                </p>
              </div>
              
              {/* Star Rating */}
              <div className="flex justify-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Profile Image */}
              <div className="flex justify-end">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
