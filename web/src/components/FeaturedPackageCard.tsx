import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from './Button';

interface FeaturedPackageCardProps {
  id: string | number;
  name: string;
  price: number;
  rating?: number; // 0-1 or 0-5
  image: string;
  onSelectPackage?: () => void;
}

const FeaturedPackageCard: React.FC<FeaturedPackageCardProps> = ({
  id,
  name,
  price,
  rating,
  image,
  onSelectPackage
}) => {
  const navigate = useNavigate();
  
  const handleSelectPackage = () => {
    if (onSelectPackage) {
      onSelectPackage();
    } else {
      navigate(`/packages/${id}`);
    }
  };

  // Normalize rating to 0-5 scale if value is 0-1
  const getNormalizedRating = (value?: number) => {
    if (value === undefined || value === null || isNaN(value)) return undefined;
    return value <= 1 ? value * 5 : value; // treat <=1 as 0-1 scale
  };

  const normalizedRating = getNormalizedRating(rating);

  return (
    <div 
      className="w-full bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 flex flex-col h-full cursor-pointer"
      onClick={handleSelectPackage}
    >
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden group/image">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {name}
        </h3>

        {/* Rating */}
        {normalizedRating !== undefined && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => {
                const fillPct = Math.max(0, Math.min(1, (normalizedRating - i)));
                return (
                  <div key={i} className="relative w-4 h-4">
                    {/* Base (empty) star */}
                    <Star className="w-4 h-4 text-gray-300" stroke="currentColor" fill="currentColor" />
                    {/* Filled portion */}
                    {fillPct > 0 && (
                      <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPct * 100}%` }}>
                        <Star className="w-4 h-4 text-yellow-500" stroke="currentColor" fill="currentColor" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <span className="text-sm text-gray-600 font-medium">{normalizedRating.toFixed(1)}/5</span>
          </div>
        )}

        {/* Price */}
        <div className="mb-6">
          {price && price > 0 ? (
            <div className="text-center">
              <span className="text-3xl font-bold text-primary">
                £{price.toLocaleString()}
              </span>
              <span className="block text-sm text-gray-500 mt-1">
                STARTS FROM
              </span>
            </div>
          ) : (
            <div className="text-center">
              <span className="text-2xl font-bold text-primary">
                Price on request
              </span>
            </div>
          )}
        </div>

        {/* Select Package Button */}
        <div className="mt-auto">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleSelectPackage();
            }}
            variant="primary"
            className="w-full"
          >
            SELECT PACKAGE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPackageCard;
