import React from 'react';
import { Link } from 'react-router-dom';
import PackageCard from './PackageCard';
import { useWebsiteCMS, useFeaturedPackages } from '../hooks/useWebsiteCMS';
import { useFrappeGetDocList } from 'frappe-react-sdk';

interface Package {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  duration: string;
  destination: string;
  description: string;
  rating: number;
  reviews: number;
  features: string[];
}

interface PackageShowcaseProps {
  title?: string;
  subtitle?: string;
  packages?: Package[];
  showViewAll?: boolean;
}

const PackageShowcase: React.FC<PackageShowcaseProps> = ({ 
  title,
  subtitle,
  packages: propPackages,
  showViewAll = true
}) => {
  const { data: cmsData } = useWebsiteCMS();
  const { data: featuredPackages } = useFeaturedPackages();
  
  // Fetch all Items (same as HajjDeals section)
  const { data: allItems } = useFrappeGetDocList('Item', {
    fields: ['name', 'item_name', 'item_group', 'standard_rate', 'image'],
    filters: [['disabled', '=', 0]],
    limit: 1000
  });

  // Use CMS data if available, otherwise fall back to props or defaults
  const displayTitle = title || cmsData?.featured_packages_title || "Featured Packages";
  const displaySubtitle = subtitle || cmsData?.featured_packages_subtitle || "Discover our most popular travel experiences";
  
  // Filter all items to only show featured packages
  const packages = propPackages || (() => {
    if (!featuredPackages || !allItems) return [];
    
    // Get the item names from featured packages
    const featuredItemNames = featuredPackages.map((pkg: any) => pkg.item);
    
    // Filter all items to only include featured ones
    const featuredItems = allItems.filter((item: any) => 
      featuredItemNames.includes(item.name)
    );
    
    // Convert to package format
    return featuredItems.map((item: any) => ({
      id: item.name,
      title: item.item_name,
      category: "Featured",
      image: item.image || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
      price: item.standard_rate || 0,
      duration: "7 Nights",
      destination: "Makkah & Madinah",
      description: "Premium travel package",
      rating: 5,
      reviews: 0,
      features: []
    }));
  })();
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-primary text-4xl md:text-5xl font-bold uppercase mb-4">
            {displayTitle}
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            {displaySubtitle}
          </p>
          
          {showViewAll && (
            <Link to="/packages">
              <button className="bg-secondary hover:bg-yellow-500 text-primary font-bold py-3 px-8 rounded-lg text-lg transition-colors">
                View All Packages
              </button>
            </Link>
          )}
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              title={pkg.title}
              nights={pkg.duration}
              rating={pkg.rating}
              price={pkg.price}
              image={pkg.image}
              primaryButtonText="View All Detail"
              secondaryButtonText="Enquire Now"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageShowcase;
