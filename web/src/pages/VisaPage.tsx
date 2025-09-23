import React, { useState } from 'react';
import { SectionContainer, Typography, Button, Card } from '../components';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const VisaPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('saudi-arabia');

  const visaTypes = [
    {
      id: 'saudi-arabia',
      name: 'Saudi Arabia',
      flag: '🇸🇦',
      types: [
        {
          name: 'Umrah Visa',
          duration: '30 days',
          processingTime: '3-5 business days',
          requirements: [
            'Valid passport (6 months validity)',
            'Passport-size photographs',
            'Completed application form',
            'Proof of accommodation',
            'Return flight tickets',
            'Travel insurance'
          ],
          price: '£150'
        },
        {
          name: 'Hajj Visa',
          duration: '45 days',
          processingTime: '5-7 business days',
          requirements: [
            'Valid passport (6 months validity)',
            'Passport-size photographs',
            'Completed application form',
            'Proof of accommodation in Makkah and Madinah',
            'Return flight tickets',
            'Travel insurance',
            'Health certificate',
            'Proof of vaccination'
          ],
          price: '£200'
        },
        {
          name: 'Tourist Visa',
          duration: '90 days',
          processingTime: '7-10 business days',
          requirements: [
            'Valid passport (6 months validity)',
            'Passport-size photographs',
            'Completed application form',
            'Proof of accommodation',
            'Return flight tickets',
            'Travel insurance',
            'Bank statements (3 months)',
            'Employment letter'
          ],
          price: '£180'
        }
      ]
    },
    {
      id: 'turkey',
      name: 'Turkey',
      flag: '🇹🇷',
      types: [
        {
          name: 'Tourist Visa',
          duration: '90 days',
          processingTime: '5-7 business days',
          requirements: [
            'Valid passport (6 months validity)',
            'Passport-size photographs',
            'Completed application form',
            'Proof of accommodation',
            'Return flight tickets',
            'Travel insurance',
            'Bank statements'
          ],
          price: '£80'
        }
      ]
    },
    {
      id: 'uae',
      name: 'UAE',
      flag: '🇦🇪',
      types: [
        {
          name: 'Tourist Visa',
          duration: '30 days',
          processingTime: '3-5 business days',
          requirements: [
            'Valid passport (6 months validity)',
            'Passport-size photographs',
            'Completed application form',
            'Proof of accommodation',
            'Return flight tickets',
            'Travel insurance'
          ],
          price: '£120'
        }
      ]
    }
  ];

  const selectedVisaData = visaTypes.find(v => v.id === selectedCountry);

  return (
    <div>
      {/* Hero Section */}
      <SectionContainer size="lg" className="text-center hero-section" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&h=1080&fit=crop')`,
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
            Visa Services
          </Typography>
          <Typography variant="body-large" color="white" align="center" className="text-muted">
            Professional visa processing for all your travel needs
          </Typography>
        </div>
      </SectionContainer>

      <SectionContainer>
        <Typography variant="h2" align="center" style={{ marginBottom: 'var(--spacing-8)' }}>
          Visa Processing Services
        </Typography>
        <Typography variant="body-large" color="muted" align="center" style={{ marginBottom: 'var(--spacing-12)' }}>
          We handle all the paperwork and requirements for your visa applications, making your travel planning stress-free.
        </Typography>

        {/* Country Selection */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 'var(--spacing-3)', 
          justifyContent: 'center', 
          marginBottom: 'var(--spacing-12)' 
        }}>
          {visaTypes.map((country) => (
            <Button
              key={country.id}
              variant={selectedCountry === country.id ? 'primary' : 'secondary'}
              onClick={() => setSelectedCountry(country.id)}
              style={{ textTransform: 'capitalize' }}
            >
              {country.flag} {country.name}
            </Button>
          ))}
        </div>

        {/* Visa Types */}
        {selectedVisaData && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: 'var(--spacing-8)' 
          }}>
            {selectedVisaData.types.map((visa, index) => (
              <Card key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-6)' }}>
                  <Typography variant="h3">{visa.name}</Typography>
                  <div style={{ textAlign: 'right' }}>
                    <Typography variant="h4" color="primary">{visa.price}</Typography>
                    <Typography variant="body-small" color="muted">{visa.duration}</Typography>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-6)', marginBottom: 'var(--spacing-6)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                    <Clock size={16} color="var(--color-primary)" />
                    <Typography variant="body-small">{visa.processingTime}</Typography>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                    <FileText size={16} color="var(--color-primary)" />
                    <Typography variant="body-small">{visa.requirements.length} documents</Typography>
                  </div>
                </div>

                <div style={{ marginBottom: 'var(--spacing-6)' }}>
                  <Typography variant="h5" style={{ marginBottom: 'var(--spacing-3)' }}>Required Documents:</Typography>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {visa.requirements.map((requirement, reqIndex) => (
                      <li key={reqIndex} style={{ marginBottom: 'var(--spacing-2)', display: 'flex', alignItems: 'center' }}>
                        <CheckCircle size={16} color="var(--color-accent)" style={{ marginRight: 'var(--spacing-2)' }} />
                        <Typography variant="body-small">{requirement}</Typography>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="primary" style={{ width: '100%' }}>
                  Apply for {visa.name}
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Important Information */}
        <div style={{ marginTop: 'var(--spacing-16)' }}>
          <Card style={{ backgroundColor: 'var(--color-gray-100)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
              <AlertCircle size={24} color="var(--color-accent)" style={{ marginTop: 'var(--spacing-1)' }} />
              <div>
                <Typography variant="h4" style={{ marginBottom: 'var(--spacing-3)' }}>
                  Important Information
                </Typography>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: 'var(--spacing-2)' }}>
                    <Typography variant="body">• Processing times may vary based on embassy workload and peak seasons</Typography>
                  </li>
                  <li style={{ marginBottom: 'var(--spacing-2)' }}>
                    <Typography variant="body">• All documents must be in English or officially translated</Typography>
                  </li>
                  <li style={{ marginBottom: 'var(--spacing-2)' }}>
                    <Typography variant="body">• Visa fees are non-refundable once application is submitted</Typography>
                  </li>
                  <li style={{ marginBottom: 'var(--spacing-2)' }}>
                    <Typography variant="body">• We provide full support throughout the application process</Typography>
                  </li>
                  <li>
                    <Typography variant="body">• Contact us for urgent processing options</Typography>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </SectionContainer>
    </div>
  );
};

export default VisaPage;
