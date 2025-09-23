import React from 'react';
import { SectionContainer, Typography, Card, Button } from '../components';
import { Users, Award, Shield, Heart, Globe, Clock } from 'lucide-react';

const AboutPage: React.FC = () => {
  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '15+', label: 'Years Experience' },
    { number: '50+', label: 'Destinations' },
    { number: '99%', label: 'Success Rate' }
  ];

  const values = [
    {
      icon: <Heart size={32} />,
      title: 'Passion for Service',
      description: 'We are passionate about providing exceptional travel experiences that create lasting memories and spiritual fulfillment.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Trust & Reliability',
      description: 'Your trust is our foundation. We maintain the highest standards of service and ensure your journey is safe and secure.'
    },
    {
      icon: <Users size={32} />,
      title: 'Customer First',
      description: 'Every decision we make is guided by what\'s best for our customers. Your satisfaction is our ultimate goal.'
    },
    {
      icon: <Award size={32} />,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from planning to execution, ensuring every detail is perfect.'
    }
  ];

  const team = [
    {
      name: 'Ahmed Hassan',
      role: 'Founder & CEO',
      experience: '15+ years in travel industry',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Fatima Al-Zahra',
      role: 'Operations Director',
      experience: '12+ years in Hajj & Umrah',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Mohammed Ali',
      role: 'Customer Relations Manager',
      experience: '10+ years customer service',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <SectionContainer size="lg" className="text-center hero-section" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop')`,
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
            About Travel Agency
          </Typography>
          <Typography variant="body-large" color="white" align="center" className="text-muted">
            Your trusted partner in spiritual journeys since 2008
          </Typography>
        </div>
      </SectionContainer>

      {/* Stats Section */}
      <SectionContainer className="bg-primary">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 'var(--spacing-8)',
          textAlign: 'center',
          color: 'var(--color-white)'
        }}>
          {stats.map((stat, index) => (
            <div key={index}>
              <Typography variant="h1" color="white" style={{ marginBottom: 'var(--spacing-2)' }}>
                {stat.number}
              </Typography>
              <Typography variant="body-large" color="white">
                {stat.label}
              </Typography>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Our Story */}
      <SectionContainer>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: 'var(--spacing-12)',
          alignItems: 'center'
        }}>
          <div>
            <Typography variant="h2" style={{ marginBottom: 'var(--spacing-6)' }}>
              Our Story
            </Typography>
            <Typography variant="body-large" style={{ marginBottom: 'var(--spacing-6)' }}>
              Founded in 2008, Travel Agency began with a simple mission: to make spiritual journeys accessible, comfortable, and meaningful for Muslims in the UK and beyond.
            </Typography>
            <Typography variant="body" style={{ marginBottom: 'var(--spacing-6)' }}>
              What started as a small family business has grown into one of the most trusted names in Islamic travel. Our founders, having experienced the challenges of organizing Hajj and Umrah themselves, understood the need for a service that truly cares about the spiritual aspect of travel.
            </Typography>
            <Typography variant="body" style={{ marginBottom: 'var(--spacing-8)' }}>
              Today, we are proud to have helped over 10,000 pilgrims fulfill their religious obligations with comfort, dignity, and peace of mind. Our team of experienced professionals works tirelessly to ensure every journey is not just a trip, but a transformative spiritual experience.
            </Typography>
            <Button variant="primary" size="lg">
              Learn More About Our Services
            </Button>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop" 
              alt="Our Story" 
              style={{ 
                width: '100%', 
                height: '400px', 
                objectFit: 'cover', 
                borderRadius: 'var(--radius-lg)' 
              }} 
            />
          </div>
        </div>
      </SectionContainer>

      {/* Our Values */}
      <SectionContainer className="bg-gray-100">
        <Typography variant="h2" align="center" style={{ marginBottom: 'var(--spacing-12)' }}>
          Our Values
        </Typography>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 'var(--spacing-8)' 
        }}>
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--spacing-4) auto',
                color: 'var(--color-white)'
              }}>
                {value.icon}
              </div>
              <Typography variant="h4" style={{ marginBottom: 'var(--spacing-3)' }}>
                {value.title}
              </Typography>
              <Typography variant="body" color="muted">
                {value.description}
              </Typography>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* Our Team */}
      <SectionContainer>
        <Typography variant="h2" align="center" style={{ marginBottom: 'var(--spacing-12)' }}>
          Meet Our Team
        </Typography>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 'var(--spacing-8)' 
        }}>
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <img 
                src={member.image} 
                alt={member.name} 
                style={{ 
                  width: '150px', 
                  height: '150px', 
                  borderRadius: 'var(--radius-full)', 
                  objectFit: 'cover',
                  margin: '0 auto var(--spacing-4) auto'
                }} 
              />
              <Typography variant="h4" style={{ marginBottom: 'var(--spacing-2)' }}>
                {member.name}
              </Typography>
              <Typography variant="h5" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>
                {member.role}
              </Typography>
              <Typography variant="body" color="muted">
                {member.experience}
              </Typography>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* Certifications */}
      <SectionContainer className="bg-primary">
        <div style={{ textAlign: 'center', color: 'var(--color-white)' }}>
          <Typography variant="h2" color="white" style={{ marginBottom: 'var(--spacing-8)' }}>
            Our Certifications & Accreditations
          </Typography>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 'var(--spacing-8)' 
          }}>
            <div>
              <Shield size={48} color="var(--color-white)" style={{ margin: '0 auto var(--spacing-4) auto' }} />
              <Typography variant="h4" color="white">ATOL Protected</Typography>
              <Typography variant="body" color="white">License #12345</Typography>
            </div>
            <div>
              <Award size={48} color="var(--color-white)" style={{ margin: '0 auto var(--spacing-4) auto' }} />
              <Typography variant="h4" color="white">Ministry Approved</Typography>
              <Typography variant="body" color="white">Hajj & Umrah Agent</Typography>
            </div>
            <div>
              <Globe size={48} color="var(--color-white)" style={{ margin: '0 auto var(--spacing-4) auto' }} />
              <Typography variant="h4" color="white">IATA Member</Typography>
              <Typography variant="body" color="white">International Standards</Typography>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default AboutPage;
