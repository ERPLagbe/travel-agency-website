import React from 'react';
import { Link } from 'react-router-dom';
import PackageCard from './PackageCard';

interface Package {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  duration: string;
  destination: string;
  description: string;
  rating: number;
  reviews: number;
  features: string[];
}

interface PackageShowcaseProps {
  title?: string;
  subtitle?: string;
  packages: Package[];
  showViewAll?: boolean;
}

const PackageShowcase: React.FC<PackageShowcaseProps> = ({ 
  title = "Featured Packages", 
  subtitle = "Discover our most popular travel experiences",
  packages,
  showViewAll = true
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-primary text-4xl md:text-5xl font-bold uppercase mb-4">
            {title}
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>
          
          {showViewAll && (
            <Link to="/packages">
              <button className="bg-secondary hover:bg-yellow-500 text-primary font-bold py-3 px-8 rounded-lg text-lg transition-colors">
                View All Packages
              </button>
            </Link>
          )}
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              title={pkg.title}
              nights={pkg.duration}
              rating={pkg.rating}
              price={pkg.price}
              image={pkg.image}
              primaryButtonText="View All Detail"
              secondaryButtonText="Enquire Now"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageShowcase;
