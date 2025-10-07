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
  const { data: cmsData, isValidating: cmsLoading } = useWebsiteCMS();
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
  
  // Use CMS data only
  const contactData = cmsData;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+1',
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
      const fullPhone = `${formData.countryCode}${formData.phone}`;
      await createLead({
        lead_name: formData.name,
        email_id: formData.email,
        phone: fullPhone,
        subject: formData.subject,
        description: formData.message,
        source: 'Website',
        status: 'Open',
        package_id: formData.packageInterest
      });
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', countryCode: '+1', phone: '', subject: '', message: '', packageInterest: '' });
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
            Contact {contactData?.business_name}
          </Typography>
          <Typography variant="body-large" color="white" align="center">
            Get in touch with us to start planning your spiritual journey
          </Typography>
        </div>
      </SectionContainer>

      {/* Contact Form and Info */}
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
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
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    required
                    className="w-24 sm:w-28 px-2 sm:px-3 py-3 border border-gray-300 rounded-lg text-sm sm:text-base bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  >
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+92">🇵🇰 +92</option>
                    <option value="+880">🇧🇩 +880</option>
                    <option value="+20">🇪🇬 +20</option>
                    <option value="+90">🇹🇷 +90</option>
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+62">🇮🇩 +62</option>
                    <option value="+234">🇳🇬 +234</option>
                    <option value="+27">🇿🇦 +27</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+82">🇰🇷 +82</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+7">🇷🇺 +7</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="flex-1 min-w-0 px-3 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                >
                  <option value="">Select Subject</option>
                  <option value="Package Inquiry">Package Inquiry</option>
                  <option value="Service Inquiry">Service Inquiry</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Visa Information">Visa Information</option>
                  <option value="Booking Support">Booking Support</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Package Interest
                </label>
                <select
                  name="packageInterest"
                  value={formData.packageInterest}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                >
                  <option value="">Select Package (Optional)</option>
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
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base resize-vertical focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                ></textarea>
              </div>
              {submitStatus === 'success' && (
                <div className="p-3 bg-green-100 text-green-800 rounded-lg mb-4">
                  ✅ Thank you! Your message has been sent successfully. We will contact you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-3 bg-red-100 text-red-800 rounded-lg mb-4">
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
              {/* {contactData?.atol_number && (
                <div>
                  <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>
                    ATOL Protected
                  </Typography>
                  <Typography variant="body">ATOL Number: {contactData.atol_number}</Typography>
                  <Typography variant="body-small" color="muted">Your financial protection is guaranteed</Typography>
                </div>
              )} */}
              
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
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-white">
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
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-white">
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
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-white">
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
