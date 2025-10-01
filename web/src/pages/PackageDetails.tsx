import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Check, Star, Clock, Users, Plane, Hotel, Car, Utensils } from 'lucide-react';
import { usePackageDetails } from '../hooks/usePackageDetails';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';

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
  const navigate = useNavigate();
  
  // Get package data from ERPNext
  const { data: packageData, isValidating, error } = usePackageDetails(id || '');
  
  if (isValidating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }
  
  if (error || !packageData) {
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
      <div className="relative h-96 bg-cover bg-center" style={{ 
        backgroundImage: `url(${packageData.image ? getFileUrlWithFallback(packageData.image) : 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=600&fit=crop'})` 
      }}>
        <div className="absolute inset-0 bg-primary bg-opacity-60"></div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{packageData.item_name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{packageData.item_group}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg">£{packageData.standard_rate?.toLocaleString() || '0'}</span>
                </div>
              </div>
              <p className="text-xl max-w-3xl">{packageData.description || 'Premium travel package with comprehensive services.'}</p>
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
                {packageData.custom_features && packageData.custom_features.length > 0 ? (
                  packageData.custom_features.map((feature: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium">{feature.title}</span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500 py-8">
                    No features available for this package.
                  </div>
                )}
              </div>
            </div>

            {/* ERPNext Custom Fields Information */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Package Inclusions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packageData.custom_air && packageData.custom_air_information && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Plane className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-bold text-primary">Flight Information</h3>
                    </div>
                    <p className="text-gray-700">{packageData.custom_air_information}</p>
                  </div>
                )}
                
                {packageData.custom_hotel && packageData.custom_hotel_information && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Hotel className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-bold text-primary">Hotel Information</h3>
                    </div>
                    <p className="text-gray-700">{packageData.custom_hotel_information}</p>
                  </div>
                )}
                
                {packageData.custom_bustaxi && packageData.custom_bustaxi_information && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Car className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-bold text-primary">Transportation</h3>
                    </div>
                    <p className="text-gray-700">{packageData.custom_bustaxi_information}</p>
                  </div>
                )}
                
                {packageData.custom_food_child_food_except && packageData.custom_food_information && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Utensils className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-bold text-primary">Meal Information</h3>
                    </div>
                    <p className="text-gray-700">{packageData.custom_food_information}</p>
                  </div>
                )}

                {/* Show custom inclusions from table */}
                {packageData.custom_inclusions && packageData.custom_inclusions.length > 0 && (
                  packageData.custom_inclusions.map((inclusion: any, index: number) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Check className="w-6 h-6 text-primary" />
                        <h3 className="text-lg font-bold text-primary">{inclusion.title}</h3>
                      </div>
                      <p className="text-gray-700">{inclusion.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Accommodation Information */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Accommodation</h2>
              {packageData.custom_accommodation_information && (
                <div className="mb-6">
                  <p className="text-gray-700">{packageData.custom_accommodation_information}</p>
                </div>
              )}
              
              {packageData.custom_accommodation_list && packageData.custom_accommodation_list.length > 0 ? (
                packageData.custom_accommodation_list.map((accommodation: any, index: number) => {
                  // Use hotel_details if available (enriched data), otherwise fall back to link name
                  const hotelName = accommodation.hotel_details?.hotel_name || accommodation.hotel
                  const location = accommodation.hotel_details?.location || ''
                  const description = accommodation.hotel_details?.description || ''
                  const images = accommodation.images || []
                  
                  return (
                    <div key={index} className="mb-8 last:mb-0 p-6 bg-white rounded-lg shadow-md border-l-4 border-primary">
                      <div className="flex items-start gap-3 mb-4">
                        <Hotel className="w-6 h-6 text-primary mt-1" />
                        <div>
                          <h3 className="text-xl font-bold text-primary mb-2">{hotelName}</h3>
                          {location && (
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span>{location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {description && (
                        <p className="text-gray-700 mb-4">{description}</p>
                      )}
                      
                      {/* Hotel Images */}
                      {images.length > 0 && (
                        <div className="mb-4">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {images.map((image: any, imgIndex: number) => (
                              <div key={imgIndex} className="relative aspect-video rounded-lg overflow-hidden">
                                <img 
                                  src={getFileUrlWithFallback(image.file_url)} 
                                  alt={image.file_name || `Hotel image ${imgIndex + 1}`}
                                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {accommodation.amenities && (
                        <div className="flex flex-wrap gap-2">
                          {accommodation.amenities.map((amenity: string, amenityIndex: number) => (
                            <span key={amenityIndex} className="px-3 py-1 bg-secondary text-primary text-sm rounded-full">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No accommodation details available for this package.
                </div>
              )}
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Itinerary</h2>
              <div className="space-y-4">
                {packageData.custom_itinerary && packageData.custom_itinerary.length > 0 ? (
                  packageData.custom_itinerary.map((day: any, index: number) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-1">{day.title}</h3>
                        <p className="text-gray-700">{day.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    No itinerary available for this package.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Package Price & Info */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-4">Package Details</h3>
              <div className="mb-6">
                <div className="text-3xl font-bold text-primary mb-2">£{packageData.standard_rate?.toLocaleString() || '0'}</div>
                <div className="text-gray-600 mb-4">{packageData.item_group}</div>
                {packageData.custom_processing_time && (
                  <div className="text-sm text-gray-500 mb-4">
                    Processing Time: {packageData.custom_processing_time}
                  </div>
                )}
                {packageData.custom_commission_rate && packageData.custom_commission_rate > 0 && (
                  <div className="text-sm text-gray-500 mb-4">
                    Commission Rate: {packageData.custom_commission_rate}%
                  </div>
                )}
              </div>
              
              <button 
                className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors mb-4"
                style={{ backgroundColor: '#432b7c' }}
                onClick={() => navigate(`/contact?package=${id}`)}
              >
                Enquire Now
              </button>
              
              <button 
                className="w-full py-3 px-4 rounded-lg font-semibold transition-colors"
                style={{ backgroundColor: '#d4af37', color: '#432b7c' }}
              >
                Call Now
              </button>
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
