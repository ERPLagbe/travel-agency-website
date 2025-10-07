import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';
import { ChevronDown, X, Menu } from 'lucide-react';

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
  const [mobileExpandedItems, setMobileExpandedItems] = useState<Set<string>>(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { data: cmsData } = useWebsiteCMS();

  // Determine login state from Frappe cookie (user_id)
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift() || null;
    return null;
  };

  // Check login status on component mount and when location changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const userId = getCookie('user_id');
      const loggedIn = !!userId && userId !== 'Guest';
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
    
    // Also check when location changes (in case user logs in/out on another tab)
    const interval = setInterval(checkLoginStatus, 1000);
    
    return () => clearInterval(interval);
  }, [location.pathname]);

  // Get navigation data from Website CMS (child tables)
  const navigationDropdowns = cmsData?.navigation_dropdowns || [];
  const navigationDropdownItems = cmsData?.navigation_dropdown_items || [];

  const isActive = (path: string) => location.pathname === path;

  // Mobile menu helper functions
  const toggleMobileExpanded = (itemPath: string) => {
    const newExpanded = new Set(mobileExpandedItems);
    if (newExpanded.has(itemPath)) {
      newExpanded.delete(itemPath);
    } else {
      newExpanded.add(itemPath);
    }
    setMobileExpandedItems(newExpanded);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setMobileExpandedItems(new Set());
  };

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
                {cmsData?.logo && <img className='w-[150px] lg:w-full h-10 object-contain' src={getFileUrlWithFallback(cmsData?.logo)} alt="Logo" /> }
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
                    <ChevronDown 
                      className={`w-4 h-4 text-white transition-transform duration-200 ${
                        activeDropdown === item.path ? 'rotate-180' : ''
                      }`} 
                    />
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
                {item.submenu && (
                  <div 
                    className={`absolute top-full left-0 bg-white shadow-xl rounded-lg p-2 min-w-[220px] z-50 border border-gray-200 transition-all duration-300 ease-in-out ${
                      activeDropdown === item.path 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                    }`}
                    onMouseEnter={() => setActiveDropdown(item.path)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    role="menu"
                    aria-label={`${item.label} submenu`}
                  >
                    {item.submenu.map((subItem: NavSubItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="flex items-center px-4 py-3 no-underline text-gray-700 rounded-md transition-all duration-200 hover:bg-primary/5 hover:text-primary font-medium min-h-[44px] text-sm"
                        role="menuitem"
                        aria-label={`Navigate to ${subItem.label}`}
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

        {/* Action Buttons - Right */}
        <div className="desktop-nav flex-shrink-0 flex items-center gap-4">
          {/* Get Appointment Button */}
          <Link
            to="/contact"
            className="btn btn-secondary-fill btn-md no-underline"
            aria-label="Book an appointment"
          >
            Get Appointment
          </Link>

          {/* Login / Dashboard Button */}
          {isLoggedIn ? (
            <a
              href="/app/home"
              className="btn btn-secondary btn-md no-underline"
              aria-label="Go to your dashboard"
            >
              Dashboard
            </a>
          ) : (
            <a
              href="/login"
              className="btn btn-secondary btn-md no-underline"
              aria-label="Login to your account"
            >
              Login
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-btn bg-transparent border-0 text-white cursor-pointer p-2 flex items-center gap-2 transition-colors duration-200 hover:bg-white/10 rounded-lg"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={closeMobileMenu}
        />
        
        {/* Drawer */}
        <div 
          id="mobile-navigation"
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col h-full">
            {/* Action Buttons Section */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col gap-3">
                <Link
                  to="/contact"
                  className="btn btn-primary w-full no-underline"
                  onClick={closeMobileMenu}
                  aria-label="Book an appointment"
                >
                  Get Appointment
                </Link>

                {isLoggedIn ? (
                  <a
                    href="/app/home"
                    className="btn btn-secondary-fill w-full no-underline"
                    onClick={closeMobileMenu}
                    aria-label="Go to your dashboard"
                  >
                    Dashboard
                  </a>
                ) : (
                  <a
                    href="/login"
                    className="btn btn-secondary-fill w-full no-underline"
                    onClick={closeMobileMenu}
                    aria-label="Login to your account"
                  >
                    Login
                  </a>
                )}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <div key={item.path} className="border-b border-gray-100 last:border-b-0">
                    {item.submenu ? (
                      // Collapsible dropdown items
                      <div>
                        <button
                          onClick={() => toggleMobileExpanded(item.path)}
                          className="w-full flex items-center justify-between py-4 text-left font-medium text-gray-900 hover:text-primary transition-colors duration-200"
                          aria-expanded={mobileExpandedItems.has(item.path)}
                        >
                          <span>{item.label}</span>
                          <ChevronDown 
                            className={`w-5 h-5 transition-transform duration-200 ${
                              mobileExpandedItems.has(item.path) ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        {/* Collapsible submenu */}
                        <div 
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            mobileExpandedItems.has(item.path) 
                              ? 'max-h-96 opacity-100' 
                              : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="pb-2 pl-4 space-y-1">
                            {item.submenu.map((subItem: NavSubItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className={`block py-3 px-4 text-gray-600 rounded-lg transition-all duration-200 hover:bg-primary/5 hover:text-primary ${
                                  isActive(subItem.path) ? 'bg-primary/10 text-primary font-medium' : ''
                                }`}
                                onClick={closeMobileMenu}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Regular navigation items
                      <Link
                        to={item.path}
                        className={`block py-4 font-medium transition-colors duration-200 ${
                          isActive(item.path) 
                            ? 'text-primary' 
                            : 'text-gray-900 hover:text-primary'
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;