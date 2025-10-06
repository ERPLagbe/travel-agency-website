import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Typography } from './';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';
import { Button } from './Button';

interface NavigationProps {
  // No props needed for now, can be extended later
}

interface NavItem {
  path: string;
  label: string;
  submenu?: NavSubItem[];
}

interface NavSubItem {
  path: string;
  label: string;
}

interface NavigationDropdown {
  name: string;
  dropdown_name: string;
  display_order: number;
}

interface NavigationDropdownItem {
  name: string;
  dropdown_name: string;
  item_group: string;
  display_order: number;
}

const Navigation: React.FC<NavigationProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { data: cmsData } = useWebsiteCMS();

  // Get navigation data from Website CMS (child tables)
  const navigationDropdowns = cmsData?.navigation_dropdowns || [];
  const navigationDropdownItems = cmsData?.navigation_dropdown_items || [];

  const isActive = (path: string) => location.pathname === path;

  // Build navigation items from CMS data
  const buildNavItems = (): NavItem[] => {
    const items: NavItem[] = [
      { path: '/', label: 'Home' }
    ];

    // Add dropdown items from CMS (keep dynamic dropdown names)
    if (navigationDropdowns && navigationDropdownItems) {
      navigationDropdowns.forEach((dropdown: NavigationDropdown) => {
        // Get items for this dropdown (match by dropdown_name)
        const dropdownItems = navigationDropdownItems.filter(
          (item: NavigationDropdownItem) => item.dropdown_name === dropdown.dropdown_name
        );
        
        const submenu: NavSubItem[] = dropdownItems.map((item: NavigationDropdownItem) => ({
          path: `/category/${item.item_group.toLowerCase().replace(/\s+/g, '-')}`,
          label: item.item_group
        }));

        const navItem: NavItem = {
          path: `/${dropdown.dropdown_name.toLowerCase()}`,
          label: dropdown.dropdown_name, // Keep original dynamic dropdown name
          submenu: submenu.length > 0 ? submenu : undefined
        };

        items.push(navItem);
      });
    }

    // Add static items in the desired order: Visa > Blog > About > Contact
    items.push(
      { path: '/visa', label: 'Visa' },
      { path: '/blog', label: 'Blog' },
      { path: '/about', label: 'About' },
      { path: '/contact', label: 'Contact' }
    );

    return items;
  };

  const navItems = buildNavItems();

  return (
    <nav className="bg-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <Link to="/" className="no-underline">
            <div className="text-white">
              <div className="text-2xl font-bold">
                {cmsData?.logo && <img className='w-10 h-10 object-contain' src={getFileUrlWithFallback(cmsData?.logo)} alt="Logo" /> }
                {!cmsData?.logo && <div className="text-2xl font-bold">{cmsData?.logo_text }</div> }
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="desktop-nav flex-1 flex justify-center">
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.path} className="relative">
                {item.submenu ? (
                  // For dropdown items, use a button instead of Link to prevent navigation
                  <button
                    className={`no-underline font-medium transition-colors duration-300 flex items-center gap-1 px-3 py-2 rounded-md bg-transparent border-0 cursor-pointer ${
                      isActive(item.path) ? 'text-accent' : 'text-white'
                    }`}
                    onMouseEnter={() => setActiveDropdown(item.path)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onFocus={() => setActiveDropdown(item.path)}
                    onBlur={(e) => {
                      // Only close if focus is moving outside the dropdown
                      if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                        setActiveDropdown(null);
                      }
                    }}
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === item.path ? 'true' : 'false'}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveDropdown(activeDropdown === item.path ? null : item.path);
                    }}
                  >
                    <span className="text-white">
                      {item.label}
                    </span>
                    <span className="text-white text-xs ml-1">
                      ▼
                    </span>
                  </button>
                ) : (
                  // For regular navigation items, use Link
                  <Link
                    to={item.path}
                    className={`no-underline font-medium transition-colors duration-300 flex items-center gap-1 px-3 py-2 rounded-md ${
                      isActive(item.path) ? 'text-accent' : 'text-white'
                    }`}
                    onMouseEnter={() => setActiveDropdown(item.path)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onFocus={() => setActiveDropdown(item.path)}
                    onBlur={(e) => {
                      // Only close if focus is moving outside the dropdown
                      if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                        setActiveDropdown(null);
                      }
                    }}
                    aria-haspopup="false"
                    aria-expanded="false"
                  >
                    <span className="text-white">
                      {item.label}
                    </span>
                  </Link>
                )}
                
                {/* Dropdown Menu */}
                {item.submenu && activeDropdown === item.path && (
                  <div 
                    className="absolute top-full left-0 bg-white shadow-lg rounded-md p-2 min-w-[200px] z-50 border border-gray-200"
                    onMouseEnter={() => setActiveDropdown(item.path)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    role="menu"
                    aria-label={`${item.label} submenu`}
                  >
                    {item.submenu.map((subItem: NavSubItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="block px-3 py-2 no-underline text-gray-700 rounded-sm transition-colors duration-300 hover:bg-gray-100"
                        role="menuitem"
                        aria-label={`Navigate to ${subItem.label}`}
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

        {/* Action Buttons - Right */}
        <div className="desktop-nav flex-shrink-0 flex items-center gap-4">
          {/* Get Appointment Button */}
          <Button 
            as="a"
            href="/contact"
            variant="secondary-fill"
            size="md"
            aria-label="Book an appointment"
          >
            Get Appointment
          </Button>

          {/* Login Button */}
          <Button 
            variant="secondary"
            size="md"
            onClick={() => {
              window.location.href = '/login';
            }}
            aria-label="Login to your account"
          >
            Login
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-btn bg-transparent border-0 text-white cursor-pointer p-2 flex items-center gap-2"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="text-2xl" aria-hidden="true">☰</span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div 
          id="mobile-navigation"
          className="mobile-nav bg-primary border-t border-gray-700 p-6"
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col gap-6">
            {/* Action Buttons Section */}
            <div className="border-b border-gray-700 pb-4">
              <div className="flex flex-col gap-4">
                {/* Get Appointment Button */}
                <Button 
                  as="a"
                  href="/contact"
                  variant="secondary"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Book an appointment"
                >
                  Get Appointment
                </Button>

                {/* Login Button */}
                <Button 
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.location.href = '/login';
                  }}
                  aria-label="Login to your account"
                >
                  Login
                </Button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              {navItems.map((item) => (
                <div key={item.path}>
                  {item.submenu ? (
                    // For dropdown items in mobile, show as non-clickable header
                    <div className="font-medium py-3 block text-lg text-white">
                      {item.label}
                    </div>
                  ) : (
                    // For regular navigation items, use Link
                    <Link
                      to={item.path}
                      className={`no-underline font-medium py-3 block text-lg ${
                        isActive(item.path) ? 'text-accent' : 'text-white'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.submenu.map((subItem: NavSubItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="no-underline text-white py-2 block text-base"
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