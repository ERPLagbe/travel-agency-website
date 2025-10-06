import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, ChevronUp } from 'lucide-react';
import { useWebsiteCMS, useFooterQuickLinks, useFooterTermsLinks, useSocialMediaLinks } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';

const Footer: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();
  const { data: footerQuickLinks } = useFooterQuickLinks();
  const { data: footerTermsLinks } = useFooterTermsLinks();
  const { data: socialMediaLinks } = useSocialMediaLinks();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Use CMS data only
  const quickLinks = footerQuickLinks || [];
  const termsLinks = footerTermsLinks || [];
  const socialLinks = socialMediaLinks || [];

  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        {/* Contact Info Blocks */}
        {/* <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
            <div className="bg-primary rounded-lg p-6 text-center">
              <Phone className="w-8 h-8 mx-auto mb-3 text-white" />
              <h3 className="text-white font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-white text-lg">0208 145 7860</p>
            </div>

        
            <div className="bg-primary rounded-lg p-6 text-center">
              <Mail className="w-8 h-8 mx-auto mb-3 text-white" />
              <h3 className="text-white font-semibold text-lg mb-2">Write To Us</h3>
              <p className="text-white text-lg">info@bismillahtravel.co.uk</p>
            </div>

         
        
            <div className="bg-primary rounded-lg p-6 text-center">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-white" />
              <h3 className="text-white font-semibold text-lg mb-2">Address</h3>
              <p className="text-white text-sm leading-relaxed">
                Suite No.5, The Old Dispensary,<br />
                30 Romford Road, Stratford<br />
                London, England, E15 4BZ,<br />
                United Kingdom
              </p>
            </div>
          </div>
        </div> */}

        {/* Main Footer Content */}
        <div className="py-12 border-t border-white border-opacity-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo */}
            <div>
              <div className="text-white mb-6">
                <div className="text-2xl font-bold text-secondary">{cmsData?.logo && <img className='w-1/2 h-full object-contain' src={getFileUrlWithFallback(cmsData?.logo)} alt="Logo" /> }
              </div>
                {cmsData?.business_name && <div className="text-2xl font-bold text-white">{cmsData?.business_name}</div> }
              </div>
            </div>

            {/* Quick Links and Terms */}
            <div className="grid grid-cols-2 gap-8">
              {/* Quick Links */}
              <div>
                <h4 className="text-white font-bold text-lg uppercase mb-4">QUICK LINKS</h4>
                <div className="space-y-2">
                  {quickLinks.map((link: any, index: number) => (
                    <Link 
                      key={index}
                      to={link.link_url} 
                      className="block text-white"
                      aria-label={`Navigate to ${link.link_text}`}
                    >
                      {link.link_text}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Our Terms */}
              <div>
                <h4 className="text-white font-bold text-lg uppercase mb-4">OUR TERMS</h4>
                <div className="space-y-2">
                  {termsLinks.map((link: any, index: number) => (
                    <Link 
                      key={index}
                      to={link.link_url} 
                      className="block text-white"
                      aria-label={`Navigate to ${link.link_text}`}
                    >
                      {link.link_text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Media and Payment */}
            <div>
              {/* Social Media */}
              <div className="mb-6">
                <div className="flex gap-4 mb-4">
                  {socialLinks.map((social: any, index: number) => (
                    <a 
                      key={index}
                      href={social.platform_url} 
                      className="text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.platform_name}`}
                    >
                      {social.platform_name === 'Facebook' && <Facebook className="w-6 h-6" />}
                      {social.platform_name === 'Instagram' && <Instagram className="w-6 h-6" />}
                      {social.platform_name === 'Twitter' && <Facebook className="w-6 h-6" />}
                      {social.platform_name === 'YouTube' && <Instagram className="w-6 h-6" />}
                    </a>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <div className="flex gap-2 flex-wrap">
                  <div className="bg-white rounded px-2 py-1 text-xs font-bold text-blue-600">DISCOVER</div>
                  <div className="bg-white rounded px-2 py-1 text-xs font-bold text-red-600">mastercard</div>
                  <div className="bg-white rounded px-2 py-1 text-xs font-bold text-blue-600">VISA</div>
                  <div className="bg-white rounded px-2 py-1 text-xs font-bold text-blue-600">AMERICAN EXPRESS</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-white border-opacity-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-white text-sm">
              {cmsData?.footer_copyright}
            </div>

            {/* Legal Text */}
            <div className="text-white text-xs text-center md:text-right max-w-2xl">
              {cmsData?.footer_legal_text}
            </div>

            {/* Scroll to Top */}
            <button 
              onClick={scrollToTop}
              className="bg-secondary text-primary p-2 rounded"
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
