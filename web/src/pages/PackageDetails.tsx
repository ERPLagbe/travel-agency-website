import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Check, Star, Clock, Users, Plane, Hotel, Car, Utensils } from 'lucide-react';
import { getPackageDetails } from '../data/packageDetails';

interface PackageDetails {
  id: string;
  title: string;
  category: 'hajj' | 'umrah';
  image: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  includes: {
    air: boolean;
    hotel: boolean;
    qurbani: boolean;
    temporaryStay: boolean;
    visa: boolean;
    transportation: boolean;
    mealType: string;
  };
  airInformation?: string;
  hotelInformation?: string;
  transportationInformation?: string;
  foodInformation?: string;
  hotels: {
    name: string;
    location: string;
    description: string;
    images: string[];
    amenities: string[];
  }[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  packages: {
    type: string;
    price: number;
    features: string[];
  }[];
}

const PackageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Get package data from data source
  const packageData = getPackageDetails(id || '1');
  
  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Package Not Found</h1>
          <p className="text-gray-600 mb-4">The package you're looking for doesn't exist.</p>
          <Link to="/" className="text-primary hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${packageData.image})` }}>
        <div className="absolute inset-0 bg-primary bg-opacity-60"></div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{packageData.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < packageData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-lg">({packageData.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg">{packageData.duration}</span>
                </div>
              </div>
              <p className="text-xl max-w-3xl">{packageData.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Package Features */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Package Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {packageData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ERPNext Custom Fields Information */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Package Inclusions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packageData.customAir && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Plane className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-bold text-primary">Flight Information</h3>
                    </div>
                    <p className="text-gray-700">{packageData.customAirInformation}</p>
                  </div>
                )}
                
                {packageData.customHotel && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Hotel className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-bold text-primary">Hotel Information</h3>
                    </div>
                    <p className="text-gray-700">{packageData.customHotelInformation}</p>
                  </div>
                )}
                
                {packageData.customBusTaxi && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Car className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-bold text-primary">Transportation</h3>
                    </div>
                    <p className="text-gray-700">{packageData.customBusTaxiInformation}</p>
                  </div>
                )}
                
                {packageData.customFoodChildFoodExcept && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Utensils className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-bold text-primary">Meal Information</h3>
                    </div>
                    <p className="text-gray-700">{packageData.customFoodInformation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Hotel Information */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Accommodation</h2>
              {packageData.hotels.map((hotel, index) => (
                <div key={index} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-bold text-primary mb-2">{hotel.name}</h3>
                  <p className="text-gray-600 mb-4">{hotel.location}</p>
                  <p className="text-gray-700 mb-4">{hotel.description}</p>
                  
                  {/* Hotel Images */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {hotel.images.map((image, imgIndex) => (
                      <img key={imgIndex} src={image} alt={hotel.name} className="w-full h-32 object-cover rounded-lg" />
                    ))}
                  </div>
                  
                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, amenityIndex) => (
                      <span key={amenityIndex} className="px-3 py-1 bg-secondary text-primary text-sm rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Itinerary</h2>
              <div className="space-y-4">
                {packageData.itinerary.map((day, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      {day.day}
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">{day.title}</h3>
                      <p className="text-gray-700">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Package Options */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-4">Package Options</h3>
              {packageData.packages.map((pkg, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-bold text-primary mb-2">{pkg.type}</h4>
                  <div className="text-2xl font-bold text-primary mb-2">FR £{pkg.price.toLocaleString()}.00 pp</div>
                  <ul className="text-sm text-gray-600 mb-4">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 mb-1">
                        <Check className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors"
                    style={{ backgroundColor: '#432b7c' }}
                  >
                    Enquire Now
                  </button>
                </div>
              ))}
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-4">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>0208 145 7860</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>info@bismillahtravel.co.uk</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div className="text-sm">
                    Suite No.5, The Old Dispensary,<br />
                    30 Romford Road, Stratford<br />
                    London, England, E15 4BZ,<br />
                    United Kingdom
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors"
                  style={{ backgroundColor: '#432b7c' }}
                >
                  Call Now
                </button>
                <button 
                  className="w-full py-3 px-4 rounded-lg font-semibold transition-colors"
                  style={{ backgroundColor: '#d4af37', color: '#432b7c' }}
                >
                  WhatsApp
                </button>
                <button 
                  className="w-full py-3 px-4 rounded-lg font-semibold transition-colors"
                  style={{ backgroundColor: '#d4af37', color: '#432b7c' }}
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
