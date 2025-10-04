import React, { useState } from 'react';
import { SectionContainer, Typography, Button, Card } from '../components';
import { Check } from 'lucide-react';

const CompletePackagesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Dummy packages data
  const packages = [
    {
      id: '1',
      title: 'Premium Umrah Package',
      category: 'packages',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      price: 2500,
      duration: '7 Days',
      description: 'Experience the spiritual journey of Umrah with our premium package including 5-star accommodation, guided tours, and all necessary arrangements.',
      features: ['5-Star Accommodation', 'Guided Tours', 'All Meals Included', 'Airport Transfers']
    },
    {
      id: '2',
      title: 'Complete Hajj Package',
      category: 'packages',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      price: 4500,
      duration: '14 Days',
      description: 'The ultimate spiritual journey with comprehensive Hajj package including all rituals, accommodation, and expert guidance.',
      features: ['Complete Hajj Rituals', 'Expert Guidance', 'Premium Accommodation', 'All Transportation']
    },
    {
      id: '3',
      title: 'Turkey Cultural Tour',
      category: 'tour',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop',
      price: 1800,
      duration: '10 Days',
      description: 'Explore the rich cultural heritage of Turkey with visits to historical sites, mosques, and traditional markets.',
      features: ['Historical Sites', 'Cultural Experiences', 'Local Cuisine', 'Professional Guide']
    },
    {
      id: '4',
      title: 'Malaysia Package',
      category: 'package',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      price: 1200,
      duration: '8 Days',
      description: 'Discover the beauty of Malaysia with visits to Kuala Lumpur, Penang, and Langkawi with comfortable accommodations.',
      features: ['Multiple Cities', 'Beach Resorts', 'City Tours', 'Shopping']
    }
  ];

  const categories = ['all', 'packages'];
  
  const filteredPackages = selectedCategory === 'all' 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedCategory);

  return (
    <div>
      {/* Hero Section - Clean Design */}
      <SectionContainer size="lg" className="text-center hero-section packages-hero">
        <div style={{ paddingTop: 'var(--spacing-16)', paddingBottom: 'var(--spacing-16)' }}>
          <Typography variant="h1" color="white" align="center" style={{ marginBottom: 'var(--spacing-6)' }}>
            Travel Packages
          </Typography>
          <Typography variant="body-large" color="white" align="center">
            Discover our comprehensive range of spiritual and cultural journeys
          </Typography>
        </div>
      </SectionContainer>

      <SectionContainer>
        <Typography variant="h2" align="center" style={{ marginBottom: 'var(--spacing-8)' }}>
          Our Packages
        </Typography>

        {/* Category Filters */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 'var(--spacing-3)', 
          justifyContent: 'center', 
          marginBottom: 'var(--spacing-12)' 
        }}>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'secondary'}
              onClick={() => setSelectedCategory(category)}
              style={{ textTransform: 'capitalize' }}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Packages Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: 'var(--spacing-8)' 
        }}>
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className="hover:shadow-lg transition-shadow duration-300">
              <div style={{ position: 'relative' }}>
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: 'var(--radius-md)', 
                    marginBottom: 'var(--spacing-4)' 
                  }} 
                />
                <div style={{ 
                  position: 'absolute', 
                  top: 'var(--spacing-3)', 
                  right: 'var(--spacing-3)', 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'var(--color-white)', 
                  padding: 'var(--spacing-1) var(--spacing-3)', 
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-sm)',
                  textTransform: 'capitalize'
                }}>
                  {pkg.category}
                </div>
              </div>
              <Typography variant="h3" style={{ marginBottom: 'var(--spacing-2)' }}>
                {pkg.title}
              </Typography>
              <Typography variant="body-small" color="muted" style={{ marginBottom: 'var(--spacing-4)' }}>
                {pkg.duration} | Starting from ${pkg.price}
              </Typography>
              <Typography variant="body" style={{ marginBottom: 'var(--spacing-6)' }}>
                {pkg.description}
              </Typography>

              <div style={{ marginBottom: 'var(--spacing-6)' }}>
                <Typography variant="h4" style={{ marginBottom: 'var(--spacing-3)' }}>Features:</Typography>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {pkg.features.map((feature, index) => (
                    <li key={index} style={{ marginBottom: 'var(--spacing-1)', display: 'flex', alignItems: 'center' }}>
                      <Check size={14} color="var(--color-accent)" style={{ marginRight: 'var(--spacing-2)' }} />
                      <Typography variant="body-small">{feature}</Typography>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="primary" style={{ width: '100%' }}>
                View Details
              </Button>
            </Card>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-12)' }}>
            <Typography variant="h3" color="muted">
              No packages found for this category
            </Typography>
            <Typography variant="body" color="muted">
              Try selecting a different category or check back later for new packages.
            </Typography>
          </div>
        )}
      </SectionContainer>
    </div>
  );
};

export default CompletePackagesPage;
