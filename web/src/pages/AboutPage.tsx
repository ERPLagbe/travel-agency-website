import React from 'react';
import { SectionContainer, Typography } from '../components';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';

const AboutPage: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();

  return (
    <div>
      {/* Hero Section */}
      <SectionContainer size="lg" className="text-center hero-section" style={{
        backgroundImage: cmsData?.about_background_image 
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('${getFileUrlWithFallback(cmsData.about_background_image)}')`
          : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop')`,
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
            {cmsData?.about_title || "About Travel Agency"}
          </Typography>
          <Typography variant="body-large" color="white" align="center" className="text-muted">
            {cmsData?.about_subtitle || "Your trusted partner in spiritual journeys since 2008"}
          </Typography>
        </div>
      </SectionContainer>

      {/* Dynamic About Sections with Alternating Layout */}
      <SectionContainer>
        {cmsData?.about_sections && cmsData.about_sections.length > 0 ? (
          cmsData.about_sections
            .sort((a: any, b: any) => (a.display_order || 1) - (b.display_order || 1))
            .map((section: any, index: number) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} style={{ 
                  marginBottom: 'var(--spacing-20)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: 'var(--spacing-8)',
                  alignItems: 'center'
                }}>
                  {/* Image Section */}
                  <div style={{ order: isEven ? 1 : 2 }}>
                    {section.image ? (
                      <img 
                        src={getFileUrlWithFallback(section.image)} 
                        alt={section.heading}
                        style={{ 
                          width: '100%', 
                          height: 'auto',
                          borderRadius: 'var(--border-radius-lg)',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '400px',
                        backgroundColor: 'var(--color-gray-200)',
                        borderRadius: 'var(--border-radius-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Typography variant="body" color="muted">No Image</Typography>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div style={{ order: isEven ? 2 : 1 }}>
                    <Typography variant="h2" style={{ marginBottom: 'var(--spacing-4)' }}>
                      {section.heading}
                    </Typography>
                    <Typography variant="body-large" color="muted" style={{ lineHeight: '1.8' }}>
                      {section.content}
                    </Typography>
                  </div>
                </div>
              );
            })
        ) : (
          <Typography variant="body" align="center" color="muted">
            No about sections configured yet.
          </Typography>
        )}
      </SectionContainer>
    </div>
  );
};

export default AboutPage;
