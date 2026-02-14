import React from 'react';
import { useParams } from 'react-router-dom';
import { SEO } from '../components';
import PackageListing from '../components/PackageListing';

const PackageListingPage: React.FC = () => {
  const { itemGroup, dropdownName } = useParams<{ itemGroup?: string; dropdownName?: string }>();
  const category = itemGroup || dropdownName || 'packages';
  const categoryName = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <>
      <SEO
        title={`${categoryName} Packages - Travel Packages & Tours`}
        description={`Browse our ${categoryName} travel packages. Find the perfect tour and travel experience for your next journey.`}
        keywords={`${categoryName}, travel packages, tours, ${categoryName.toLowerCase()} packages`}
        url={`/category/${category}`}
      />
      <PackageListing />
    </>
  );
};

export default PackageListingPage;
