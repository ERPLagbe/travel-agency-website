import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, ChevronUp, MapPin, Phone, Mail } from 'lucide-react';
import { useWebsiteCMS, useFooterQuickLinks, useFooterTermsLinks, useSocialMediaLinks } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';
import { useCreateLead } from '../hooks/useCreateLead';

const Footer: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();
  const { data: footerQuickLinks } = useFooterQuickLinks();
  const { data: footerTermsLinks } = useFooterTermsLinks();
  const { data: socialMediaLinks } = useSocialMediaLinks();
  const { createLead, isLoading } = useCreateLead();

  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+1',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        phone: fullPhone,
        subject: formData.subject,
        description: formData.message,
        source: 'Website Footer',
        status: 'Open'
      });
      
      setSubmitStatus('success');
      setFormData({ name: '', countryCode: '+1', phone: '', subject: '', message: '' });
    } catch (err) {
      setSubmitStatus('error');
      console.error('Error creating lead:', err);
    }
  };

  // Use CMS data only
  const quickLinks = footerQuickLinks || [];
  const termsLinks = footerTermsLinks || [];
  const socialLinks = socialMediaLinks || [];

  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Get in Touch Form */}
          <div>
            {/* <div className="bg-secondary px-6 py-3 rounded-t-lg inline-block">
              <h3 className="text-primary font-bold text-lg">Get in Touch</h3>
            </div>
             */}
            {/* Logo & Address */}
            <div className="mt-6 mb-6">
              {cmsData?.logo && (
                <img 
                  className='h-16 w-auto object-contain mb-4' 
                  src={getFileUrlWithFallback(cmsData?.logo)} 
                  alt={cmsData?.business_name || 'Logo'} 
                />
              )}
              {cmsData?.business_name && (
                <div className="text-white text-lg font-semibold mb-3">{cmsData.business_name}</div>
              )}
              
              {/* Address */}
              {cmsData?.business_address && (
                <div className="text-gray-300 text-sm leading-relaxed mb-3">
                  <strong>Address:</strong>{' '}
                  <span dangerouslySetInnerHTML={{ __html: cmsData.business_address.replace(/\n/g, ', ') }} />
                </div>
              )}
              
              {/* Phone */}
              {cmsData?.business_phone && (
                <div className="text-white text-sm mb-2">
                  <strong>Phone:</strong>{' '}
                  <a href={`tel:${cmsData.business_phone}`} className="text-white hover:text-secondary transition-colors">
                    {cmsData.business_phone}
                  </a>
                </div>
              )}
              
              {/* Email */}
              {cmsData?.business_email && (
                <div className="text-white text-sm">
                  <strong>E-mail:</strong>{' '}
                  <a href={`mailto:${cmsData.business_email}`} className="text-white hover:text-secondary transition-colors">
                    {cmsData.business_email}
                  </a>
                </div>
              )}
            </div>
            
            {/* Social Media */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((social: any, index: number) => (
                  <a 
                    key={index}
                    href={social.platform_url} 
                    className="w-8 h-8 flex items-center justify-center text-white hover:text-secondary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.platform_name}`}
                  >
                    {social.platform_name === 'Facebook' && <Facebook className="w-5 h-5" />}
                    {social.platform_name === 'Instagram' && <Instagram className="w-5 h-5" />}
                    {social.platform_name === 'Twitter' && <Facebook className="w-5 h-5" />}
                    {social.platform_name === 'YouTube' && <Instagram className="w-5 h-5" />}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Middle Column - Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link: any, index: number) => (
                <Link 
                  key={index}
                  to={link.link_url} 
                  className=" text-white text-sm  h flex items-center gap-2"
                  aria-label={`Navigate to ${link.link_text}`}
                >
                  <span className="text-secondary">›</span> {link.link_text}
                </Link>
              ))}
            </div>
            
            {/* Our Terms */}
            <h4 className="text-white font-semibold text-base mt-6 mb-4">Our Terms</h4>
            <div className="space-y-2">
              {termsLinks.map((link: any, index: number) => (
                <Link 
                  key={index}
                  to={link.link_url} 
                  className=" text-white text-sm  hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                  aria-label={`Navigate to ${link.link_text}`}
                >
                  <span className="text-secondary">›</span> {link.link_text}
                </Link>
              ))}
            </div>
            
            {/* Payment Methods */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-blue-600">DISCOVER</div>
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-red-600">mastercard</div>
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-blue-600">VISA</div>
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-blue-600">AMEX</div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white bg-opacity-5 mb-2 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none"
              />

              {/* Phone */}
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  required
                  className="w-20 px-1 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none"
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+966">🇸🇦 +966</option>
                  <option value="+92">🇵🇰 +92</option>
                  <option value="+880">🇧🇩 +880</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="flex-1 min-w-0 px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none"
                />
              </div>

              {/* Subject */}
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none"
              >
                <option value="">Select Subject</option>
                <option value="Package Inquiry">Package Inquiry</option>
                <option value="Service Inquiry">Service Inquiry</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Visa Information">Visa Information</option>
                <option value="Booking Support">Booking Support</option>
                <option value="Others">Others</option>
              </select>

              {/* Message */}
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm resize-vertical focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none"
              ></textarea>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-2 bg-green-500 bg-opacity-20 text-white rounded text-xs">
                  ✓ Message sent!
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-2 bg-red-500 bg-opacity-20 text-white rounded text-xs">
                  ✗ Error sending.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-secondary text-white px-4 py-2 rounded font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-white border-opacity-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              {cmsData?.footer_copyright || `© ${new Date().getFullYear()} ${cmsData?.business_name || 'Travel Agency'}. All rights reserved.`}
            </div>

            {/* Legal Text */}
            {cmsData?.footer_legal_text && (
              <div className="text-gray-400 text-xs text-center md:text-right max-w-2xl leading-relaxed">
                {cmsData.footer_legal_text}
              </div>
            )}

            {/* Scroll to Top */}
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/90 text-primary flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              aria-label="Scroll to top of page"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
