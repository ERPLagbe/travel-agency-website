// Package details data structure matching ERPNext Item doctype custom fields
export interface PackageDetails {
  id: string;
  title: string;
  category: 'hajj' | 'umrah';
  image: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  description: string;
  
  // ERPNext Item custom fields
  customAir: boolean;
  customAirInformation?: string;
  customHotel: boolean;
  customHotelInformation?: string;
  customBusTaxi: boolean;
  customBusTaxiInformation?: string;
  customFoodChildFoodExcept: boolean;
  customFoodInformation?: string;
  
  // Additional package details
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

export const getPackageDetails = (id: string): PackageDetails | null => {
  // Mock data - will be replaced with ERPNext API calls
  const packages: PackageDetails[] = [
    {
      id: '1',
      title: '11 Nights 5 Stars Shifting Hajj Package',
      category: 'hajj',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=600&fit=crop',
      price: 6318,
      duration: '11 Nights',
      rating: 5,
      reviews: 156,
      description: 'Experience the ultimate spiritual journey with our premium 5-star Hajj package. This comprehensive package includes luxury accommodation, guided tours, and all necessary arrangements for a comfortable and meaningful pilgrimage.',
      
      // ERPNext custom fields
      customAir: true,
      customAirInformation: 'Indirect Flight Included In this Package. We provide comfortable flights with reputable airlines, ensuring a smooth journey to and from Saudi Arabia.',
      customHotel: true,
      customHotelInformation: 'Luxury 5-star accommodation in both Makkah and Madinah with modern amenities and proximity to holy sites. All hotels are within walking distance of the Haram.',
      customBusTaxi: true,
      customBusTaxiInformation: 'Private transportation between cities and to all religious sites with experienced drivers. Air-conditioned vehicles for comfort during your journey.',
      customFoodChildFoodExcept: true,
      customFoodInformation: 'Full board meals including traditional and international cuisine with special arrangements during Hajj days. Halal food guaranteed.',
      
      features: [
        'Return Flight',
        'Makkah Hotel',
        'Madinah Hotel',
        'Qurbani',
        'Temporary Stay',
        'Visa included',
        'Transportation',
        'Meal Type'
      ],
      includes: {
        air: true,
        hotel: true,
        qurbani: true,
        temporaryStay: true,
        visa: true,
        transportation: true,
        mealType: 'Full Board'
      },
      hotels: [
        {
          name: 'Fairmont Clock Tower',
          location: 'Makkah',
          description: 'This hotel is famous because it is one of the tallest buildings in the world and at 76th rank. The distance between this hotel and Haram Pak is just 2 minutes\' walk. Its amenities are fitness center or gyms, hot tub and steam room and 24/7 room service is available for the customers.',
          images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop'
          ],
          amenities: ['Fitness Center', 'Hot Tub', 'Steam Room', '24/7 Room Service', 'WiFi', 'Restaurant']
        },
        {
          name: 'Dar Al Hijra InterContinental',
          location: 'Madinah',
          description: 'Dar Al Hijra InterContinental is a 5-star hotel, located in central Madinah and 300 m away from Prophet\'s Holy Mosque. They offer the special accommodations in fully modern ways such as some rooms has a great view of Ohud Mount and luxury bathroom provision.',
          images: [
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'
          ],
          amenities: ['Restaurant', 'WiFi', 'Room Service', 'Concierge', 'Business Center', 'Spa']
        }
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Jeddah', description: 'Arrive at King Abdulaziz International Airport and transfer to Makkah. Check into hotel and rest.' },
        { day: 2, title: 'Makkah Orientation', description: 'Get familiar with the holy city, visit Masjid al-Haram, and prepare for Hajj rituals.' },
        { day: 3, title: 'Hajj Preparation', description: 'Complete necessary preparations, attend Hajj briefing, and perform Umrah.' },
        { day: 4, title: 'Travel to Mina', description: 'Move to Mina for the first day of Hajj rituals.' },
        { day: 5, title: 'Day of Arafat', description: 'Spend the day in Arafat, the most important day of Hajj.' },
        { day: 6, title: 'Muzdalifah and Mina', description: 'Move to Muzdalifah for the night, then return to Mina for stoning rituals.' },
        { day: 7, title: 'Eid al-Adha', description: 'Celebrate Eid al-Adha and perform Qurbani.' },
        { day: 8, title: 'Return to Makkah', description: 'Return to Makkah and perform Tawaf al-Ifadah.' },
        { day: 9, title: 'Makkah Stay', description: 'Spend time in Makkah for additional prayers and visits.' },
        { day: 10, title: 'Travel to Madinah', description: 'Transfer to Madinah and check into hotel.' },
        { day: 11, title: 'Madinah Tour', description: 'Visit Masjid an-Nabawi and historical sites in Madinah.' },
        { day: 12, title: 'Departure', description: 'Check out and transfer to airport for departure.' }
      ],
      packages: [
        {
          type: 'Economy Package',
          price: 6318,
          features: ['3-Star Hotels', 'Basic Meals', 'Group Transportation', 'Standard Services']
        },
        {
          type: 'Premium Package',
          price: 7890,
          features: ['5-Star Hotels', 'Premium Meals', 'Private Transportation', 'VIP Services']
        }
      ]
    },
    {
      id: '2',
      title: '14 Nights 5 Stars Non Shifting Hajj Package',
      category: 'hajj',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop',
      price: 9086,
      duration: '14 Nights',
      rating: 5,
      reviews: 89,
      description: 'Extended Hajj package with 14 nights accommodation, perfect for those who want to spend more time in the holy cities and have a more comfortable pilgrimage experience.',
      
      // ERPNext custom fields
      customAir: true,
      customAirInformation: 'Direct flights available with premium airlines. Extended stay allows for more comfortable travel arrangements.',
      customHotel: true,
      customHotelInformation: 'Premium 5-star hotels in both Makkah and Madinah with extended stay options. All accommodations are within walking distance of holy sites.',
      customBusTaxi: true,
      customBusTaxiInformation: 'Luxury transportation with experienced drivers. Private vehicles for all transfers and religious site visits.',
      customFoodChildFoodExcept: true,
      customFoodInformation: 'Full board meals with extended dining options. Special arrangements for Hajj days with traditional and international cuisine.',
      
      features: [
        'Return Flight',
        'Makkah Hotel',
        'Madinah Hotel',
        'Qurbani',
        'Extended Stay',
        'Visa included',
        'Transportation',
        'Premium Meals'
      ],
      includes: {
        air: true,
        hotel: true,
        qurbani: true,
        temporaryStay: true,
        visa: true,
        transportation: true,
        mealType: 'Full Board Premium'
      },
      hotels: [
        {
          name: 'Raffles Makkah Palace',
          location: 'Makkah',
          description: 'Luxury 5-star hotel with direct access to the Haram. Features premium amenities and exceptional service for a comfortable stay.',
          images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop'
          ],
          amenities: ['Direct Haram Access', 'Luxury Spa', 'Multiple Restaurants', 'Concierge Service', 'Business Center']
        },
        {
          name: 'Madinah Hilton',
          location: 'Madinah',
          description: 'Premium hotel located near Masjid an-Nabawi with modern facilities and exceptional hospitality.',
          images: [
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop'
          ],
          amenities: ['Near Prophet\'s Mosque', 'Luxury Rooms', 'Fine Dining', 'Fitness Center', 'Spa Services']
        }
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Jeddah', description: 'Arrive at King Abdulaziz International Airport and transfer to Makkah.' },
        { day: 2, title: 'Makkah Orientation', description: 'Get familiar with the holy city and perform Umrah.' },
        { day: 3, title: 'Extended Makkah Stay', description: 'Spend additional time in Makkah for prayers and spiritual preparation.' },
        { day: 4, title: 'Hajj Preparation', description: 'Complete Hajj preparations and attend comprehensive briefing.' },
        { day: 5, title: 'Travel to Mina', description: 'Move to Mina for Hajj rituals.' },
        { day: 6, title: 'Day of Arafat', description: 'Spend the day in Arafat.' },
        { day: 7, title: 'Muzdalifah and Mina', description: 'Continue with Hajj rituals.' },
        { day: 8, title: 'Eid al-Adha', description: 'Celebrate Eid and perform Qurbani.' },
        { day: 9, title: 'Return to Makkah', description: 'Return to Makkah for additional rituals.' },
        { day: 10, title: 'Extended Makkah Stay', description: 'Spend more time in Makkah for prayers.' },
        { day: 11, title: 'Travel to Madinah', description: 'Transfer to Madinah.' },
        { day: 12, title: 'Madinah Exploration', description: 'Visit Masjid an-Nabawi and historical sites.' },
        { day: 13, title: 'Extended Madinah Stay', description: 'Additional time in Madinah for spiritual activities.' },
        { day: 14, title: 'Final Day', description: 'Last day in Madinah before departure.' },
        { day: 15, title: 'Departure', description: 'Check out and transfer to airport.' }
      ],
      packages: [
        {
          type: 'Standard Package',
          price: 9086,
          features: ['5-Star Hotels', 'Extended Stay', 'Premium Meals', 'Luxury Transportation']
        },
        {
          type: 'VIP Package',
          price: 11200,
          features: ['Luxury Hotels', 'VIP Services', 'Private Guide', 'Premium Amenities']
        }
      ]
    }
  ];

  return packages.find(pkg => pkg.id === id) || null;
};

