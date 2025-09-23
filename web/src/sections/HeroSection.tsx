import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <div className="relative h-[60vh] md:h-[70vh] bg-cover bg-center bg-no-repeat">
        
        {/* Overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-primary bg-opacity-40"></div> */}
        <img className='absolute inset-0 object-cover hidden md:block' src="https://www.bismillahtravel.co.uk/images/banner.webp" alt="" />
        <div className="absolute w-full h-full inset-0 bg-primary md:hidden block"></div>
        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-[30%]">
              
              {/* Left Side - Floating Image Box */}
              <div className="order-2 md:order-1">
                <div className="">
                  <img 
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop" 
                    alt="Kaaba" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
              
              {/* Right Side - Title and Description */}
              <div className="order-1 md:order-2 text-center md:text-left">
                <div className="text-secondary text-lg mb-2">Trusted</div>
                <div className="text-white text-4xl md:text-6xl font-bold mb-2">ISLAMIC TRAVEL AGENCY</div>
                <div className="text-secondary text-lg mb-8">For British Muslims</div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

 

    </div>
  );
};

export default HeroSection;
