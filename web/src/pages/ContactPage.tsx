import React, { useState } from 'react';
import { SectionContainer, Typography, Button, Card } from '../components';
import { Clock, Shield, Star } from 'lucide-react';
import { useCreateLead } from '../hooks/useCreateLead';

const CompleteContactPage: React.FC = () => {
  const { createLead, isLoading, error } = useCreateLead();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    packageInterest: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
        notes: `Package Interest: ${formData.packageInterest}\n\nMessage: ${formData.message}`
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
            Contact Us
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
                <option value="hajj">Hajj Packages</option>
                <option value="umrah">Umrah Packages</option>
                <option value="tour">Cultural Tours</option>
                <option value="custom">Custom Package</option>
                <option value="other">Other</option>
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
              <div>
                <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>Address</Typography>
                <Typography variant="body">
                  123 Travel Lane<br />
                  Spiritual City, World 12345<br />
                  United States
                </Typography>
              </div>
              <div>
                <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>Phone</Typography>
                <Typography variant="body">+1 (555) 123-4567</Typography>
                <Typography variant="body-small" color="muted">Available 24/7 for emergencies</Typography>
              </div>
              <div>
                <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>Email</Typography>
                <Typography variant="body">info@travelagency.com</Typography>
                <Typography variant="body-small" color="muted">We respond within 24 hours</Typography>
              </div>
              <div>
                <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>Business Hours</Typography>
                <Typography variant="body">
                  Monday - Friday: 9:00 AM - 5:00 PM<br />
                  Saturday: 10:00 AM - 3:00 PM<br />
                  Sunday: Closed
                </Typography>
              </div>
              <div>
                <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>Emergency Contact</Typography>
                <Typography variant="body">+1 (555) 999-8888</Typography>
                <Typography variant="body-small" color="muted">For urgent travel assistance</Typography>
              </div>
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
