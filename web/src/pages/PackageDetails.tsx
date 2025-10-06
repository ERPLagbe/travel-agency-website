import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Check, Clock, Plane, Hotel, Car, Utensils, Tag, Star } from 'lucide-react';
import { usePackageDetails } from '../hooks/usePackageDetails';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';
import { Button } from '../components/Button';

interface PackageDetails {
  id: string;
  title: string;
  category: 'packages';
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
  
  // Get CMS data for contact information
  const { data: cmsData } = useWebsiteCMS();
  
  // Debug logging
  console.log('🔍 PackageDetails Debug:', {
    id,
    packageData: packageData ? {
      item_name: packageData.item_name,
      image: packageData.image,
      custom_duration: packageData.custom_duration,
      description: packageData.description,
      standard_rate: packageData.standard_rate,
      standard_rate_type: typeof packageData.standard_rate,
      standard_rate_value: packageData.standard_rate,
      item_group: packageData.item_group
    } : null,
    error,
    isValidating
  });
  
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
      {/* Hero Banner Section */}
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${packageData.image}')`,
            }}
          ></div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-purple-800/70"></div>
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-between px-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {packageData.item_name}
              </h1>
              
              <div className="flex items-center gap-3">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-md text-white text-sm font-medium">
                  {packageData.item_group}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-md text-white text-sm font-medium flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {packageData.custom_duration || '35/42 Days'}
                </span>
                {/* Rating */}
                {typeof packageData.custom_package_rating === 'number' && packageData.custom_package_rating > 0 && (
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-md text-white text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-secondary" />
                    {(Math.min(5, (packageData.custom_package_rating <= 1 ? packageData.custom_package_rating * 5 : packageData.custom_package_rating))).toFixed(1)}/5
                  </span>
                )}
                <span className="bg-amber-400 px-3 py-1 rounded-md text-purple-900 text-sm font-bold flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  {packageData.standard_rate && packageData.standard_rate > 0 ? `£${packageData.standard_rate.toLocaleString()}` : 'Price on request'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Package Description */}


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
                {/* Flight Information - Only show if custom_air is 1 and has information */}
                {packageData.custom_air === 1 && packageData.custom_air_information && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Plane className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-bold text-primary">Flight Information</h3>
                    </div>
                    <p className="text-gray-700">{packageData.custom_air_information}</p>
                  </div>
                )}
                
                {/* Hotel Information - Only show if custom_hotel is 1 and has information */}
                {packageData.custom_hotel === 1 && packageData.custom_hotel_information && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Hotel className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-bold text-primary">Hotel Information</h3>
                    </div>
                    <p className="text-gray-700">{packageData.custom_hotel_information}</p>
                  </div>
                )}
                
                {/* Transportation - Only show if custom_bustaxi is 1 and has information */}
                {packageData.custom_bustaxi === 1 && packageData.custom_bustaxi_information && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Car className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-bold text-primary">Transportation</h3>
                    </div>
                    <p className="text-gray-700">{packageData.custom_bustaxi_information}</p>
                  </div>
                )}
                
                {/* Meal Information - Only show if custom_food_child_food_except is 1 and has information */}
                {packageData.custom_food_child_food_except === 1 && packageData.custom_food_information && (
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
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Package Description</h2>
              {packageData.description ? (
                <div 
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: packageData.description }}
                />
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No description available for this package.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 ">
            {/* Package Price & Info */}
            <div className="lg:sticky lg:top-22 flex flex-col gap-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-4">Package Details</h3>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-primary">
                    {packageData.standard_rate && packageData.standard_rate > 0 ? `£${packageData.standard_rate.toLocaleString()}` : 'Price on request'}
                  </div>
                  {typeof packageData.custom_package_rating === 'number' && packageData.custom_package_rating > 0 && (
                    <div className="flex items-center gap-1" title="Rating">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const normalized = packageData.custom_package_rating <= 1 ? packageData.custom_package_rating * 5 : packageData.custom_package_rating;
                        const filled = i + 1 <= Math.round(Math.min(5, normalized));
                        return <Star key={i} className={`w-5 h-5 ${filled ? 'text-secondary fill-current' : 'text-gray-300 fill-current'}`} />
                      })}
                      <span className="ml-1 text-sm text-gray-600">
                        {(Math.min(5, (packageData.custom_package_rating <= 1 ? packageData.custom_package_rating * 5 : packageData.custom_package_rating))).toFixed(1)}/5
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-gray-600 mt-2">{packageData.item_group}</div>
              </div>
              
              <Button 
                variant="primary"
                className="w-full mb-4"
                onClick={() => navigate(`/contact?package=${id}`)}
              >
                Enquire Now
              </Button>
              
              {/* {cmsData?.business_phone && (
                <a 
                  href={`tel:${cmsData.business_phone}`}
                  className="w-full py-3 px-4 rounded-lg font-semibold transition-colors block text-center no-underline"
                  style={{ backgroundColor: '#d4af37', color: '#432b7c' }}
                >
                  Call Now
                </a>
              )} */}
            </div>

            {/* Contact Information */}
            {/* <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-4">Contact Us</h3>
              <div className="space-y-4">
                {cmsData?.business_phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>{cmsData.business_phone}</span>
                  </div>
                )}
                {cmsData?.business_email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>{cmsData.business_email}</span>
                  </div>
                )}
                {cmsData?.business_address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div className="text-sm whitespace-pre-line">
                      {cmsData.business_address}
                    </div>
                  </div>
                )}
                {cmsData?.company_number && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>Company: {cmsData.company_number}</span>
                  </div>
                )}
              </div>
            </div> */}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {cmsData?.business_phone && (
                  <Button 
                    as="a"
                    href={`tel:${cmsData.business_phone}`}
                    variant="primary"
                    className="w-full"
                  >
                    Call Now
                  </Button>
                )}
                {cmsData?.whatsapp_number && (
                  <Button 
                    as="a"
                    href={`https://wa.me/${cmsData.whatsapp_number.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary-fill"
                    className="w-full"
                  >
                    WhatsApp
                  </Button>
                )}
                {cmsData?.business_email && (
                  <Button 
                    as="a"
                    href={`mailto:${cmsData.business_email}?subject=Package Inquiry - ${packageData?.item_name || 'Travel Package'}`}
                    variant="secondary-fill"
                    className="w-full"
                  >
                    Send Email
                  </Button>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;