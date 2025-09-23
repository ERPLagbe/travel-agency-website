import React from 'react';
import { TravelPackage } from '../data/dummyData';

interface PackageCardProps {
  pkg: TravelPackage;
  onViewDetails?: (id: string) => void;
  onEnquire?: (id: string) => void;
  className?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  onViewDetails,
  onEnquire,
  className = ''
}) => {
  // Generate star rating display
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`text-lg ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}>
      {/* Image Section */}
      <div className="relative">
        <img 
          src={pkg.image} 
          alt={pkg.title}
          className="w-full h-48 object-cover"
        />
        {/* Nights Badge */}
        <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full flex items-center gap-2">
          <span className="text-secondary text-sm">☪</span>
          <span className="text-white text-sm font-semibold">{pkg.duration}</span>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-2">
          {renderStars(pkg.rating)}
        </div>
        
        {/* Package Title */}
        <h3 className="text-primary font-semibold text-lg mb-3">
          {pkg.title}
        </h3>
        
        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-secondary text-sm font-medium">USD</span>
            <span className="text-secondary text-2xl font-bold">{pkg.price}</span>
            <span className="text-secondary text-sm font-medium">PP</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => onViewDetails?.(pkg.id)}
            className="flex-1 bg-primary text-white py-2 px-4 rounded-md font-medium hover:bg-opacity-90 transition-colors duration-300"
          >
            View All Detail
          </button>
          <button 
            onClick={() => onEnquire?.(pkg.id)}
            className="flex-1 bg-primary text-white py-2 px-4 rounded-md font-medium hover:bg-opacity-90 transition-colors duration-300"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
