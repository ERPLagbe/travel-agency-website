export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

export const dummyTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Amarah Ali',
    location: 'London',
    rating: 5,
    text: 'Booking my Umrah trip with Bismillah Travel was a smooth process. The website was easy to navigate, and their customer support was prompt in addressing my queries. Everything went as planned, and I am satisfied with their service.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Issa Malik',
    location: 'Manchester',
    rating: 5,
    text: 'Absolutely fantastic service from Bismillah Travel! Everything was well-organized, from our flights to our stay. The spiritual guidance provided was invaluable. Thank you for making our Umrah journey so special.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Aun Osman',
    location: 'London, UK',
    rating: 5,
    text: 'We had a great experience with Bismillah Travel. The booking process was straightforward, and the team was always available to answer our questions. The accommodations were comfortable, and the prices were excellent. Will definitely use their services again.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
];
