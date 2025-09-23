import React from 'react';

interface PackageCardProps {
  id: string | number;
  title: string;
  nights: string;
  rating: number;
  price: number;
  image: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  id,
  title,
  nights,
  rating,
  price,
  image,
  primaryButtonText = "View All Detail",
  secondaryButtonText = "Enquire Now",
  onPrimaryClick,
  onSecondaryClick
}) => {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      window.location.href = `/packages/${id}`;
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      window.location.href = `/contact?package=${id}`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow overflow-hidden">
      {/* Image */}
      <div className="relative h-64">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Nights Badge */}
        <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 rounded-lg">
          <span className="text-base font-semibold">{nights}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        {/* Star Rating */}
        <div className="flex justify-center mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <span 
              key={i} 
              className={`text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-primary mb-5">
          {title}
        </h3>

        {/* Price */}
        <div className="mb-8">
          <span className="text-lg text-gray-400">FR </span>
          <span className="text-4xl font-bold text-primary">£{price.toLocaleString()}.00</span>
          <span className="text-lg text-gray-400"> pp</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button 
            className=" text-white py-3 px-6 rounded-lg text-lg font-semibold transition-colors hover:opacity-90"
            style={{ backgroundColor: '#432b7c' }}
            onClick={handlePrimaryClick}
          >
            {primaryButtonText}
          </button>
          <button 
            className="py-3 px-6 rounded-lg text-lg font-semibold transition-colors hover:opacity-90"
            style={{ backgroundColor: '#d4af37', color: '#432b7c' }}
            onClick={handleSecondaryClick}
          >
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
