import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionContainer, Typography, Button, Card } from '../components';
import { Clock, Shield, Star, Phone, Mail, MapPin } from 'lucide-react';
import { useCreateLead } from '../hooks/useCreateLead';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';
import { useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';

const CompleteContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('package');
  
  const { createLead, isLoading } = useCreateLead();
  const { data: cmsData, isValidating: cmsLoading, error: cmsError } = useWebsiteCMS();
  const { data: packageData } = useFrappeGetDoc('Item', packageId || '', {
    fields: ['name', 'item_name', 'item_group'],
    shouldFetch: !!packageId
  });
  
  // Fetch all available packages for dropdown
  const { data: allPackages } = useFrappeGetDocList('Item', {
    fields: ['name', 'item_name', 'item_group'],
    filters: [['disabled', '=', 0]],
    limit: 1000
  });
  
  // Fallback contact data if CMS is not available
  const fallbackContactData = {
    business_name: "Bismillah Travel",
    business_phone: "+44 20 1234 5678",
    business_email: "info@bismillahtravel.co.uk",
    business_address: "Suite No.5, The Old Dispensary<br />30 Romford Road, Stratford<br />London, England, E15 4BZ<br />United Kingdom",
    company_number: "12345678",
    atol_number: "ATOL1234",
    whatsapp_number: "+44 7700 900000"
  };

  // Use CMS data if available, otherwise use fallback
  const contactData = cmsData || fallbackContactData;

  // Show error state if CMS data failed to load
  if (cmsError) {
    console.error('CMS Error:', cmsError);
    // Continue with fallback data instead of showing error
  }
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    packageInterest: packageId || ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Update packageInterest when packageId changes
  useEffect(() => {
    if (packageId) {
      setFormData(prev => ({ ...prev, packageInterest: packageId }));
    }
  }, [packageId]);

  // Show loading state if CMS data is still being fetched
  if (cmsLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3', 
            borderTop: '4px solid var(--color-primary)', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto var(--spacing-4) auto'
          }}></div>
          <Typography variant="body">Loading contact information...</Typography>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    
    try {
      await createLead({
        lead_name: formData.name,
        email_id: formData.email,
        phone: formData.phone,
        company_name: formData.subject,
        source: 'Website',
        status: 'Open',
        notes: `Package Interest: ${formData.packageInterest}\n\nMessage: ${formData.message}`,
        package_id: formData.packageInterest
      });
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', packageInterest: '' });
    } catch (err) {
      setSubmitStatus('error');
      console.error('Error creating lead:', err);
    }
  };

  return (
    <div>
      {/* Hero Section - Clean Design */}
      <SectionContainer size="lg" className="text-center hero-section contact-hero">
        <div style={{ paddingTop: 'var(--spacing-16)', paddingBottom: 'var(--spacing-16)' }}>
          <Typography variant="h1" color="white" align="center" style={{ marginBottom: 'var(--spacing-6)' }}>
            Contact {contactData?.business_name || 'Us'}
          </Typography>
          <Typography variant="body-large" color="white" align="center">
            Get in touch with us to start planning your spiritual journey
          </Typography>
        </div>
      </SectionContainer>

      {/* Contact Form and Info */}
      <SectionContainer>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: 'var(--spacing-12)' 
        }}>
          {/* Contact Form */}
          <Card>
            <Typography variant="h2" style={{ marginBottom: 'var(--spacing-8)' }}>
              Send us a Message
            </Typography>
            
            {packageData && (
              <div style={{ 
                padding: 'var(--spacing-4)', 
                backgroundColor: 'var(--color-primary)', 
                color: 'white',
                borderRadius: 'var(--radius-md)', 
                marginBottom: 'var(--spacing-4)'
              }}>
                <Typography variant="body" color="white">
                  Enquiring about: <strong>{packageData.item_name}</strong>
                </Typography>
              </div>
            )}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ 
                  padding: 'var(--spacing-3)', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--color-gray-300)',
                  fontSize: 'var(--font-size-base)'
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ 
                  padding: 'var(--spacing-3)', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--color-gray-300)',
                  fontSize: 'var(--font-size-base)'
                }}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                style={{ 
                  padding: 'var(--spacing-3)', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--color-gray-300)',
                  fontSize: 'var(--font-size-base)'
                }}
              />
              <select
                name="packageInterest"
                value={formData.packageInterest}
                onChange={handleChange}
                style={{ 
                  padding: 'var(--spacing-3)', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--color-gray-300)',
                  fontSize: 'var(--font-size-base)',
                  backgroundColor: 'var(--color-white)'
                }}
              >
                <option value="">Select Package Interest</option>
                {allPackages && allPackages.length > 0 ? (
                  allPackages.map((pkg: any) => (
                    <option key={pkg.name} value={pkg.name}>
                      {pkg.item_name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>Loading packages...</option>
                )}
              </select>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{ 
                  padding: 'var(--spacing-3)', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--color-gray-300)',
                  fontSize: 'var(--font-size-base)'
                }}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                style={{ 
                  padding: 'var(--spacing-3)', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--color-gray-300)', 
                  resize: 'vertical',
                  fontSize: 'var(--font-size-base)'
                }}
              ></textarea>
              {submitStatus === 'success' && (
                <div style={{ 
                  padding: 'var(--spacing-3)', 
                  backgroundColor: 'var(--color-green-100)', 
                  color: 'var(--color-green-800)',
                  borderRadius: 'var(--border-radius-md)',
                  marginBottom: 'var(--spacing-4)'
                }}>
                  ✅ Thank you! Your message has been sent successfully. We will contact you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div style={{ 
                  padding: 'var(--spacing-3)', 
                  backgroundColor: 'var(--color-red-100)', 
                  color: 'var(--color-red-800)',
                  borderRadius: 'var(--border-radius-md)',
                  marginBottom: 'var(--spacing-4)'
                }}>
                  ❌ Sorry, there was an error sending your message. Please try again.
                </div>
              )}
              
              <Button 
                type="submit" 
                variant="primary" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <Card>
            <Typography variant="h2" style={{ marginBottom: 'var(--spacing-8)' }}>
              Our Contact Details
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
              {/* Address from CMS */}
              <div>
                <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>
                  <MapPin size={20} style={{ marginRight: 'var(--spacing-2)', display: 'inline' }} />
                  Address
                </Typography>
                {contactData?.business_address ? (
                  <div 
                    style={{ 
                      fontSize: 'var(--font-size-base)', 
                      lineHeight: 'var(--line-height-base)',
                      color: 'var(--color-gray-700)'
                    }}
                    dangerouslySetInnerHTML={{ __html: contactData.business_address.replace(/\n/g, '<br />') }}
                  />
                ) : (
                  <Typography variant="body">Address information not available</Typography>
                )}
              </div>
              
              {/* Phone from CMS */}
              {contactData?.business_phone && (
                <div>
                  <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>
                    <Phone size={20} style={{ marginRight: 'var(--spacing-2)', display: 'inline' }} />
                    Phone
                  </Typography>
                  <Typography variant="body">{contactData.business_phone}</Typography>
                  <Typography variant="body-small" color="muted">Available 24/7 for emergencies</Typography>
                </div>
              )}
              
              {/* Email from CMS */}
              {contactData?.business_email && (
                <div>
                  <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>
                    <Mail size={20} style={{ marginRight: 'var(--spacing-2)', display: 'inline' }} />
                    Email
                  </Typography>
                  <Typography variant="body">{contactData.business_email}</Typography>
                  <Typography variant="body-small" color="muted">We respond within 24 hours</Typography>
                </div>
              )}
              
              {/* Company Number from CMS */}
              {contactData?.company_number && (
                <div>
                  <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>
                    Company Number
                  </Typography>
                  <Typography variant="body">{contactData.company_number}</Typography>
                </div>
              )}
              
              {/* ATOL Number from CMS */}
              {contactData?.atol_number && (
                <div>
                  <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>
                    ATOL Protected
                  </Typography>
                  <Typography variant="body">ATOL Number: {contactData.atol_number}</Typography>
                  <Typography variant="body-small" color="muted">Your financial protection is guaranteed</Typography>
                </div>
              )}
              
              {/* WhatsApp from CMS */}
              {contactData?.whatsapp_number && (
                <div>
                  <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>
                    WhatsApp
                  </Typography>
                  <Typography variant="body">{contactData.whatsapp_number}</Typography>
                  <Typography variant="body-small" color="muted">Quick messaging for inquiries</Typography>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Additional Info Section */}
        <div style={{ marginTop: 'var(--spacing-16)' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: 'var(--spacing-8)' 
          }}>
            <Card className="text-center">
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
                <Clock size={32} />
              </div>
              <Typography variant="h3" style={{ marginBottom: 'var(--spacing-3)' }}>
                Quick Response
              </Typography>
              <Typography variant="body" color="muted">
                We respond to all inquiries within 24 hours during business days.
              </Typography>
            </Card>

            <Card className="text-center">
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
                <Shield size={32} />
              </div>
              <Typography variant="h3" style={{ marginBottom: 'var(--spacing-3)' }}>
                Licensed & Insured
              </Typography>
              <Typography variant="body" color="muted">
                Fully licensed travel agency with comprehensive insurance coverage.
              </Typography>
            </Card>

            <Card className="text-center">
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
                <Star size={32} />
              </div>
              <Typography variant="h3" style={{ marginBottom: 'var(--spacing-3)' }}>
                5-Star Service
              </Typography>
              <Typography variant="body" color="muted">
                Rated 5 stars by thousands of satisfied customers worldwide.
              </Typography>
            </Card>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default CompleteContactPage;
