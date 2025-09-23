// Type definitions for the travel agency website
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
  category: 'hajj' | 'umrah' | 'tour' | 'package';
  isFeatured: boolean;
  rating: number;
  reviews: number;
}

// Re-export for easier importing
export type { TravelPackage as Package };
