import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SectionContainer, Typography, PageLayout, PackageCard } from './index';
import { usePackagesByItemGroup } from '../hooks/useWebsiteCMS';
import { useFrappeGetDocList } from 'frappe-react-sdk';

const PackageListing: React.FC = () => {
  const { itemGroup, dropdownName } = useParams<{ itemGroup?: string; dropdownName?: string }>();
  const navigate = useNavigate();
  
  const category = itemGroup || dropdownName || '';
  const properItemGroup = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const { data: packages, isValidating, error } = usePackagesByItemGroup(category);

  if (isValidating) {
    return (
      <PageLayout 
        breadcrumbItems={[
          { label: 'Home', path: '/' },
          { label: properItemGroup || 'Packages' }
        ]}
      >
        <SectionContainer>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <Typography variant="body" color="muted">Loading packages...</Typography>
            </div>
          </div>
        </SectionContainer>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout 
        breadcrumbItems={[
          { label: 'Home', path: '/' },
          { label: properItemGroup || 'Packages' }
        ]}
      >
        <SectionContainer>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Typography variant="h2" color="error" style={{ marginBottom: 'var(--spacing-4)' }}>
                Error Loading Packages
              </Typography>
              <Typography variant="body" color="muted">
                Please try again later.
              </Typography>
            </div>
          </div>
        </SectionContainer>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      breadcrumbItems={[
        { label: 'Home', path: '/' },
        { label: properItemGroup || 'Packages' }
      ]}
    >
      <SectionContainer size="lg" className="text-center bg-primary text-white py-16">
        <Typography variant="h1" color="white" align="center" style={{ marginBottom: 'var(--spacing-4)' }}>
          {properItemGroup || 'Travel Packages'}
        </Typography>
        <Typography variant="body-large" color="white" align="center">
          Discover our amazing {properItemGroup.toLowerCase()} packages
        </Typography>
      </SectionContainer>

      <SectionContainer className="py-12">
        {packages && packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg: any) => (
              <PackageCard
                key={pkg.name}
                id={pkg.name}
                title={pkg.item_name}
                nights=""
                rating={0}
                price={pkg.standard_rate || 0}
                image={pkg.image || ''}
                duration={''}
                airInfo=""
                hotelMakkah=""
                hotelMadinah=""
                foodInfo=""
                specialServices=""
                itemGroup={pkg.item_group}
                accommodationList={[]}
                specialServicesList={[]}
                primaryButtonText="View Details"
                secondaryButtonText="Enquire Now"
                onPrimaryClick={() => navigate(`/packages/${pkg.name}`)}
                onSecondaryClick={() => navigate(`/contact?package=${pkg.name}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Typography variant="h3" style={{ marginBottom: 'var(--spacing-4)' }}>
              No Packages Found
            </Typography>
            <Typography variant="body" color="muted">
              No packages available in this category at the moment.
            </Typography>
          </div>
        )}
      </SectionContainer>
    </PageLayout>
  );
};

export default PackageListing;
