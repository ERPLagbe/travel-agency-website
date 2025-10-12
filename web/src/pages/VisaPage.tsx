import React from 'react';
import { SectionContainer, Typography, PageLayout } from '../components';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';

const VisaPage: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();

  return (
    <PageLayout breadcrumbItems={[
      { label: 'Home', path: '/' },
      { label: 'Visa Services' }
    ]}>
      {/* Hero Section */}
      <SectionContainer size="lg" className="text-center hero-section" style={{
        backgroundImage: cmsData?.visa_background_image 
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('${getFileUrlWithFallback(cmsData.visa_background_image)}')`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'var(--color-white)'
      }}>
        <div style={{ position: 'relative', zIndex: 2, paddingTop: 'var(--spacing-16)', paddingBottom: 'var(--spacing-16)' }}>
          <Typography variant="h1" color="white" align="center">
            {cmsData?.visa_title}
          </Typography>
          <Typography variant="body-large" color="white" align="center" className="">
            {cmsData?.visa_subtitle}
          </Typography>
        </div>
      </SectionContainer>

      <SectionContainer>
        {/* Dynamic Visa Sections with Alternating Layout */}
        {cmsData?.visa_sections && cmsData.visa_sections.length > 0 ? (
          cmsData.visa_sections
            .sort((a: any, b: any) => (a.display_order || 1) - (b.display_order || 1))
            .map((section: any, index: number) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="mb-16 lg:mb-20">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Image Section - Alternating position */}
                    <div className={`lg:col-span-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      {section.image ? (
                        <img 
                          src={getFileUrlWithFallback(section.image)} 
                          alt={section.heading}
                          className="w-full h-auto rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                          <Typography variant="body" color="muted">No Image</Typography>
                        </div>
                      )}
                    </div>

                    {/* Content Section - Alternating position */}
                    <div className={`lg:col-span-8 ${isEven ? 'lg:order-2' : 'lg:order-1'} overflow-y-auto max-h-96 pr-4`}>
                      <Typography variant="h2" className="mb-4">
                        {section.heading}
                      </Typography>
                      <Typography variant="body-large" color="muted" className="leading-relaxed">
                        {section.content}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <Typography variant="body" align="center" color="muted">
            No visa sections configured yet.
          </Typography>
        )}
      </SectionContainer>
    </PageLayout>
  );
};

export default VisaPage;
