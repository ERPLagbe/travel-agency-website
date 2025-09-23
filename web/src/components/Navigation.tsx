import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from './';

interface NavigationProps {
  // No props needed for now, can be extended later
}

const Navigation: React.FC<NavigationProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { 
      path: '/hajj', 
      label: 'Hajj',
      submenu: [
        { path: '/hajj/shifting', label: 'Shifting Hajj' },
        { path: '/hajj/non-shifting', label: 'Non Shifting Hajj' }
      ]
    },
    { 
      path: '/umrah', 
      label: 'Umrah',
      submenu: [
        { path: '/umrah/2025', label: 'Umrah 2025' },
        { path: '/umrah/december', label: 'December Umrah' },
        { path: '/umrah/2026', label: 'Umrah 2026' },
        { path: '/umrah/ramadan', label: 'Ramadan Umrah' },
        { path: '/umrah/london', label: 'London Umrah' },
        { path: '/umrah/manchester', label: 'Manchester Umrah' },
        { path: '/umrah/birmingham', label: 'Birmingham Umrah' },
        { path: '/umrah/5-star', label: '5 Star Umrah' }
      ]
    },
    { path: '/contact', label: 'Contact Us' },
    { path: '/visa', label: 'Visa' }
  ];

  return (
    <nav className="bg-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <Link to="/" className="no-underline">
            <div className="text-white">
              <div className="text-2xl font-bold">BISMILLAH TRAVEL</div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="desktop-nav flex-1 flex justify-center">
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.path} className="relative">
                <Link
                  to={item.path}
                  className={`no-underline font-medium transition-colors duration-300 flex items-center gap-1 px-3 py-2 rounded-md ${
                    isActive(item.path) ? 'text-accent' : 'text-white'
                  }`}
                  onMouseEnter={() => setActiveDropdown(item.path)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <span className="text-white">
                    {item.label}
                  </span>
                  {item.submenu && (
                    <span className="text-white text-xs ml-1">
                      ▼
                    </span>
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                {item.submenu && activeDropdown === item.path && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-md p-2 min-w-[200px] z-50 border border-gray-200"
                  onMouseEnter={() => setActiveDropdown(item.path)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="block px-3 py-2 no-underline text-gray-700 rounded-sm transition-colors duration-300 hover:bg-gray-100"
                      >
                        <Typography variant="body-small" className="m-0">
                          {subItem.label}
                        </Typography>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info - Right */}
        <div className="desktop-nav flex-shrink-0 flex items-center gap-4">
          {/* Phone Number */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-white text-sm">📞</span>
            </div>
            <div>
              <div className="text-white font-bold text-lg">0208 145 7860</div>
              <div className="text-gray-300 text-sm">Call Me Back</div>
            </div>
          </div>

          {/* WhatsApp Icon */}
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-white text-lg">💬</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-btn bg-transparent border-0 text-white cursor-pointer p-2 flex items-center gap-2"
        >
          <span className="text-2xl">☰</span>
          {/* <span className="text-sm font-medium uppercase">MENU</span> */}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="mobile-nav bg-primary border-t border-gray-700 p-6">
          <div className="flex flex-col gap-6">
            {/* Contact Info Section */}
            <div className="border-b border-gray-700 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📞</span>
                </div>
                <div className="flex-1">
                  <div className="text-white font-bold text-lg">0208 145 7860</div>
                  <div className="text-gray-300 text-sm">Call Me Back</div>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">💬</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              {navItems.map((item) => (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    className={`no-underline font-medium py-3 block text-lg ${
                      isActive(item.path) ? 'text-accent' : 'text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="no-underline text-gray-300 py-2 block text-base"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;