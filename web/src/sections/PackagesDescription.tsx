import React from 'react';

const PackagesDescription: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6">
              Umrah Packages
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Our Umrah packages are carefully crafted to provide you with a comfortable and spiritually enriching experience. We offer a range of options from budget-friendly 3-star accommodations to luxurious 5-star hotels, all located within walking distance of the Haram. Each package includes return flights from major UK airports, visa processing, accommodation, ground transportation, and comprehensive travel insurance.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Our experienced team will guide you through every step of the process, from initial consultation to your safe return home. We understand the importance of this sacred journey and ensure that all our services comply with Islamic principles and Saudi regulations.
            </p>

            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6">
              Hajj Packages
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              For the ultimate spiritual journey, our Hajj packages are designed to provide maximum comfort and convenience during this once-in-a-lifetime pilgrimage. We offer both shifting and non-shifting packages with premium accommodations in Mina, Arafat, and Muzdalifah. All packages include experienced guides, group coordination, and ATOL protection for your peace of mind.
            </p>
          </div>

          {/* Right Side - Image */}
          <div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=500&fit=crop" 
                alt="Pilgrims performing Tawaf around Kaaba"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
              
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-primary bg-opacity-20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesDescription;
