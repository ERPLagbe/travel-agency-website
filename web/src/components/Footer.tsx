import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Mail, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-white">
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
                <div className="text-2xl font-bold text-secondary">بسم الله</div>
                <div className="text-2xl font-bold text-white">BISMILLAH TRAVEL</div>
              </div>
            </div>

            {/* Quick Links and Terms */}
            <div className="grid grid-cols-2 gap-8">
              {/* Quick Links */}
              <div>
                <h4 className="text-white font-bold text-lg uppercase mb-4">QUICK LINKS</h4>
                <div className="space-y-2">
                  <Link to="/" className="block text-white hover:text-secondary transition-colors">Home</Link>
                  <Link to="/visa" className="block text-white hover:text-secondary transition-colors">Visa</Link>
                  <Link to="/hajj" className="block text-white hover:text-secondary transition-colors">Hajj</Link>
                  <Link to="/umrah" className="block text-white hover:text-secondary transition-colors">Umrah</Link>
                  <Link to="/contact" className="block text-white hover:text-secondary transition-colors">Contact us</Link>
                </div>
              </div>

              {/* Our Terms */}
              <div>
                <h4 className="text-white font-bold text-lg uppercase mb-4">OUR TERMS</h4>
                <div className="space-y-2">
                  <Link to="/about" className="block text-white hover:text-secondary transition-colors">About us</Link>
                  <Link to="/terms" className="block text-white hover:text-secondary transition-colors">Terms & Conditions</Link>
                  <Link to="/privacy" className="block text-white hover:text-secondary transition-colors">Privacy Policy</Link>
                  <Link to="/payment" className="block text-white hover:text-secondary transition-colors">Payment</Link>
                  <Link to="/cookies" className="block text-white hover:text-secondary transition-colors">Cookies Policy</Link>
                </div>
              </div>
            </div>

            {/* Social Media and Payment */}
            <div>
              {/* Social Media */}
              <div className="mb-6">
                <div className="flex gap-4 mb-4">
                  <a href="#" className="text-white hover:text-secondary transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-white hover:text-secondary transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
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
              All rights reserved Flight Booking @ 2010 - 2025
            </div>

            {/* Legal Text */}
            <div className="text-white text-xs text-center md:text-right max-w-2xl">
              This website is operated by Travixum Ltd. (Company Number 13555073 and ATOL 12192) T/A registered in England and Wales. 
              ATOL protection does not apply to all holiday and travel services listed on this website. 
              Please ask us to confirm what protection may apply to your booking. 
              If you do not receive an ATOL Certificate then the booking will not be ATOL protected. 
              If you do receive an ATOL Certificate but all the parts of your trip are not listed on it, those parts will not be ATOL protected. 
              Please see our booking conditions for information, or for more information about financial protection and the ATOL Certificate go to: 
              <a href="https://www.atol.org/about-atol/atol-certificates/" className="text-secondary hover:underline" target="_blank" rel="noopener noreferrer">
                https://www.atol.org/about-atol/atol-certificates/
              </a>
            </div>

            {/* Scroll to Top */}
            <button 
              onClick={scrollToTop}
              className="bg-secondary hover:bg-yellow-500 text-primary p-2 rounded transition-colors"
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
