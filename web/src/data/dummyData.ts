// Dummy data for travel packages - will be replaced with CMS data later
// Updated to fix module resolution issue
export interface TravelPackage {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  duration: string;
  destination: string;
  image: string;
  features: string[];
  includes: string[];
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  category: 'packages';
  isFeatured: boolean;
  rating: number;
  reviews: number;
}

export const dummyPackages: TravelPackage[] = [
  {
    id: '1',
    title: '3 Star 7 Nights Umrah Package',
    description: 'Experience the spiritual journey of Umrah with our 3-star package including comfortable accommodation, guided tours, and all necessary arrangements.',
    shortDescription: '3-star Umrah experience with comfortable accommodation and guided tours.',
    price: 685,
    duration: '7 Nights',
    destination: 'Makkah & Madinah',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    features: ['3-Star Hotel', 'Guided Tours', 'Visa Assistance', 'Transportation'],
    includes: ['Return Flights', 'Hotel Accommodation', 'Meals', 'Transportation', 'Visa'],
    highlights: [
      'Visit the Holy Kaaba',
      'Pray at Masjid al-Haram',
      'Explore Masjid an-Nabawi',
      'Visit historical sites'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Jeddah', description: 'Arrive at King Abdulaziz International Airport and transfer to Makkah.' },
      { day: 2, title: 'Umrah Performance', description: 'Perform Umrah rituals with guidance from our experienced team.' },
      { day: 3, title: 'Makkah Exploration', description: 'Visit historical sites and learn about Islamic history.' },
      { day: 4, title: 'Travel to Madinah', description: 'Transfer to Madinah and check into hotel.' },
      { day: 5, title: 'Madinah Tour', description: 'Visit Masjid an-Nabawi and historical sites.' }
    ],
    category: 'packages',
    isFeatured: true,
    rating: 3,
    reviews: 156
  },
  {
    id: '2',
    title: '3 Star 10 Nights Umrah Package',
    description: 'Extended Umrah package with 10 nights accommodation, perfect for those who want to spend more time in the holy cities.',
    shortDescription: 'Extended 3-star Umrah experience with 10 nights accommodation.',
    price: 735,
    duration: '10 Nights',
    destination: 'Makkah & Madinah',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    features: ['3-Star Hotel', 'Extended Stay', 'Guided Tours', 'All Meals'],
    includes: ['Return Flights', 'Hotel Accommodation', 'All Meals', 'Transportation', 'Visa', 'Guide Services'],
    highlights: [
      'Extended stay in holy cities',
      'More time for prayers',
      'Visit historical sites',
      'Comfortable accommodation'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Jeddah', description: 'Arrive and transfer to Makkah for preparation.' },
      { day: 2, title: 'Makkah Orientation', description: 'Get familiar with the holy city and perform Umrah.' },
      { day: 3, title: 'Makkah Exploration', description: 'Visit historical sites and learn about Islamic history.' },
      { day: 4, title: 'Travel to Madinah', description: 'Transfer to Madinah and check into hotel.' },
      { day: 5, title: 'Madinah Tour', description: 'Visit Masjid an-Nabawi and historical sites.' }
    ],
    category: 'packages',
    isFeatured: true,
    rating: 3,
    reviews: 89
  },
  {
    id: '3',
    title: '4 Star 7 Nights Umrah Package',
    description: 'Premium 4-star Umrah package with luxury accommodation and exceptional service for a comfortable spiritual journey.',
    shortDescription: 'Premium 4-star Umrah experience with luxury accommodation.',
    price: 749,
    duration: '7 Nights',
    destination: 'Makkah & Madinah',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop',
    features: ['4-Star Hotel', 'Premium Service', 'Luxury Transport', 'VIP Treatment'],
    includes: ['Return Flights', '4-Star Hotel', 'Premium Meals', 'Luxury Transportation', 'Visa', 'VIP Services'],
    highlights: [
      '4-star luxury accommodation',
      'Premium service throughout',
      'Luxury transportation',
      'VIP treatment and guidance'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Jeddah', description: 'VIP arrival and transfer to luxury hotel in Makkah.' },
      { day: 2, title: 'Umrah Performance', description: 'Perform Umrah with VIP guidance and support.' },
      { day: 3, title: 'Makkah Luxury Tour', description: 'Explore Makkah with premium transportation and guide.' },
      { day: 4, title: 'Travel to Madinah', description: 'Luxury transfer to Madinah and check into 4-star hotel.' },
      { day: 5, title: 'Madinah Premium Tour', description: 'Visit Masjid an-Nabawi with VIP access and guidance.' }
    ],
    category: 'packages',
    isFeatured: true,
    rating: 4,
    reviews: 73
  }
];

export const getFeaturedPackages = () => dummyPackages.filter(pkg => pkg.isFeatured);
export const getPackageById = (id: string) => dummyPackages.find(pkg => pkg.id === id);
export const getPackagesByCategory = (category: string) => dummyPackages.filter(pkg => pkg.category === category);
