import React from 'react';
import { useParams } from 'react-router-dom';
import { SectionContainer, Typography, Card, Button } from '../components';
import { Star, Check, X } from 'lucide-react';

const CompletePackageDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Dummy package data - in real app this would come from API
  const packageData = {
    '1': {
      id: '1',
      title: 'Premium Umrah Package',
      category: 'packages',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      price: 2500,
      duration: '7 Days',
      description: 'Experience the spiritual journey of Umrah with our premium package including 5-star accommodation, guided tours, and all necessary arrangements. This comprehensive package ensures a comfortable and spiritually enriching experience.',
      highlights: [
        '5-Star Hotel Accommodation in Makkah and Madinah',
        'Guided Tours with Experienced Scholars',
        'All Meals Included (Halal Certified)',
        'Airport Transfers and Local Transportation',
        'Umrah Visa Processing Assistance',
        '24/7 Customer Support'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Jeddah', description: 'Arrive at King Abdulaziz International Airport, transfer to Makkah hotel, rest and prepare for Umrah.' },
        { day: 2, title: 'Umrah Performance', description: 'Perform Umrah rituals including Tawaf, Sa\'i, and Tahallul with guidance from our experienced team.' },
        { day: 3, title: 'Makkah Exploration', description: 'Visit historical sites in Makkah including Masjid al-Haram, Kaaba, and other significant locations.' },
        { day: 4, title: 'Travel to Madinah', description: 'Transfer to Madinah, check into hotel, visit Masjid an-Nabawi and pay respects at Prophet\'s grave.' },
        { day: 5, title: 'Madinah Tour', description: 'Explore historical sites in Madinah including Quba Mosque, Uhud Mountain, and other important locations.' },
        { day: 6, title: 'Free Day', description: 'Free day for personal prayers, shopping, and relaxation in Madinah.' },
        { day: 7, title: 'Departure', description: 'Final prayers at Masjid an-Nabawi, transfer to airport for departure.' }
      ],
      features: [
        'Premium Accommodation',
        'Expert Guidance',
        'All Meals Included',
        'Transportation',
        'Visa Assistance',
        '24/7 Support'
      ],
      includes: [
        'Round-trip airfare',
        '5-star hotel accommodation',
        'All meals (breakfast, lunch, dinner)',
        'Airport transfers',
        'Local transportation',
        'Umrah visa processing',
        'Guided tours',
        'Travel insurance'
      ],
      excludes: [
        'Personal expenses',
        'Shopping',
        'Additional meals outside package',
        'Tips and gratuities'
      ]
    }
  };

  const pkg = packageData[id as keyof typeof packageData];

  if (!pkg) {
    return (
      <SectionContainer>
        <div style={{ textAlign: 'center', padding: 'var(--spacing-16)' }}>
          <Typography variant="h1" align="center">Package Not Found</Typography>
          <Typography variant="body" align="center" style={{ marginTop: 'var(--spacing-4)' }}>
            The package you are looking for does not exist.
          </Typography>
          <Button variant="primary" style={{ marginTop: 'var(--spacing-6)' }}>
            View All Packages
          </Button>
        </div>
      </SectionContainer>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <SectionContainer size="lg" className="text-center hero-section" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('${pkg.image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'var(--color-white)'
      }}>
        <div style={{ position: 'relative', zIndex: 2, paddingTop: 'var(--spacing-16)', paddingBottom: 'var(--spacing-16)' }}>
          <Typography variant="h1" color="white" align="center">
            {pkg.title}
          </Typography>
          <Typography variant="body-large" color="white" align="center" className="text-muted">
            {pkg.duration} | Starting from ${pkg.price}
          </Typography>
        </div>
      </SectionContainer>

      {/* Package Details */}
      <SectionContainer>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: 'var(--spacing-8)' 
        }}>
          {/* Highlights */}
          <Card>
            <Typography variant="h2" style={{ marginBottom: 'var(--spacing-6)' }}>
              Package Highlights
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {pkg.highlights.map((highlight, index) => (
                <li key={index} style={{ marginBottom: 'var(--spacing-3)', display: 'flex', alignItems: 'flex-start' }}>
                  <Check size={20} color="var(--color-accent)" style={{ marginRight: 'var(--spacing-3)', marginTop: '2px' }} />
                  <Typography variant="body">{highlight}</Typography>
                </li>
              ))}
            </ul>
          </Card>

          {/* Itinerary */}
          <Card>
            <Typography variant="h2" style={{ marginBottom: 'var(--spacing-6)' }}>
              Detailed Itinerary
            </Typography>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {pkg.itinerary.map((item, index) => (
                <div key={index} style={{ marginBottom: 'var(--spacing-6)', paddingBottom: 'var(--spacing-4)', borderBottom: index < pkg.itinerary.length - 1 ? '1px solid var(--color-gray-200)' : 'none' }}>
                  <Typography variant="h4" color="primary" weight="bold">{item.day}</Typography>
                  <Typography variant="h5" style={{ marginBottom: 'var(--spacing-2)' }}>{item.title}</Typography>
                  <Typography variant="body">{item.description}</Typography>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </SectionContainer>

      {/* Package Features */}
      <SectionContainer className="bg-gray-100">
        <Typography variant="h2" align="center" style={{ marginBottom: 'var(--spacing-12)' }}>
          Package Features
        </Typography>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 'var(--spacing-6)' 
        }}>
          {pkg.features.map((feature, index) => (
            <Card key={index} className="text-center">
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--spacing-4) auto',
                color: 'var(--color-white)'
              }}>
                <Star size={24} />
              </div>
              <Typography variant="h4" align="center">{feature}</Typography>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* What's Included/Excluded */}
      <SectionContainer>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: 'var(--spacing-8)' 
        }}>
          {/* What's Included */}
          <Card>
            <Typography variant="h2" color="primary" style={{ marginBottom: 'var(--spacing-6)' }}>
              What's Included
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {pkg.includes.map((item, index) => (
                <li key={index} style={{ marginBottom: 'var(--spacing-2)', display: 'flex', alignItems: 'center' }}>
                  <Check size={16} color="var(--color-accent)" style={{ marginRight: 'var(--spacing-2)' }} />
                  <Typography variant="body">{item}</Typography>
                </li>
              ))}
            </ul>
          </Card>

          {/* What's Excluded */}
          <Card>
            <Typography variant="h2" color="secondary" style={{ marginBottom: 'var(--spacing-6)' }}>
              What's Excluded
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {pkg.excludes.map((item, index) => (
                <li key={index} style={{ marginBottom: 'var(--spacing-2)', display: 'flex', alignItems: 'center' }}>
                  <X size={16} color="var(--color-gray-500)" style={{ marginRight: 'var(--spacing-2)' }} />
                  <Typography variant="body">{item}</Typography>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </SectionContainer>

      {/* Booking Section */}
      <SectionContainer className="bg-primary">
        <div style={{ textAlign: 'center', color: 'var(--color-white)' }}>
          <Typography variant="h2" color="white" style={{ marginBottom: 'var(--spacing-4)' }}>
            Ready to Book This Package?
          </Typography>
          <Typography variant="body-large" color="white" style={{ marginBottom: 'var(--spacing-8)' }}>
            Contact us now to secure your spot and start planning your spiritual journey.
          </Typography>
          <div style={{ display: 'flex', gap: 'var(--spacing-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="secondary" size="lg">
              Get Quote
            </Button>
            <Button variant="white" size="lg" style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-primary)' }}>
              Book Now
            </Button>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default CompletePackageDetailsPage;
