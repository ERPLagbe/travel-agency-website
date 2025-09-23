import React from 'react';
import PackageCard from '../components/PackageCard';

const HajjDeals: React.FC = () => {
  const hajjPackages = [
    {
      id: 1,
      title: "11 Nights 5 Stars Shifting Hajj Package",
      nights: "11 Nights",
      rating: 5,
      price: 6318,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "14 Nights 5 Stars Non Shifting Hajj Package",
      nights: "14 Nights",
      rating: 5,
      price: 9086,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "14 Nights 5 Stars Non Shifting Hajj Package",
      nights: "14 Nights",
      rating: 5,
      price: 10668,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Decorative Elements */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <div className="w-16 h-0.5 bg-secondary mx-4"></div>
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
          </div>
          
          <h2 className="text-primary text-4xl md:text-5xl font-bold uppercase mb-4">
            Cheap Deals for Hajj 2026
          </h2>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hajjPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              title={pkg.title}
              nights={pkg.nights}
              rating={pkg.rating}
              price={pkg.price}
              image={pkg.image}
              primaryButtonText="View All Deal"
              secondaryButtonText="Enquire Now"
              onPrimaryClick={() => window.location.href = `/hajj/${pkg.id}`}
              onSecondaryClick={() => window.location.href = `/contact?package=${pkg.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HajjDeals;
