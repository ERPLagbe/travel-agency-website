import React from 'react';
import { SectionContainer, Typography } from '../components';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';

const VisaPage: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();

  return (
    <div>
      {/* Hero Section */}
      <SectionContainer size="lg" className="text-center hero-section" style={{
        backgroundImage: cmsData?.visa_background_image 
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('${getFileUrlWithFallback(cmsData.visa_background_image)}')`
          : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&h=1080&fit=crop')`,
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
            {cmsData?.visa_title || "Visa Services"}
          </Typography>
          <Typography variant="body-large" color="white" align="center" className="text-muted">
            {cmsData?.visa_subtitle || "Professional visa processing for all your travel needs"}
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
          /* Fallback content if no sections are configured */
          <>
            <div style={{ marginBottom: 'var(--spacing-16)' }}>
              <Typography variant="h2" align="center" style={{ marginBottom: 'var(--spacing-8)' }}>
                Working Visa
              </Typography>
              <div style={{ 
                backgroundColor: 'var(--color-gray-100)', 
                padding: 'var(--spacing-8)', 
                borderRadius: 'var(--border-radius-lg)',
                textAlign: 'center'
              }}>
                <Typography variant="body-large" color="muted">
                  Our working visa services help you secure the necessary documentation for employment opportunities abroad. We handle all the paperwork and requirements to make your work visa application process smooth and efficient.
                </Typography>
              </div>
            </div>

            <div>
              <Typography variant="h2" align="center" style={{ marginBottom: 'var(--spacing-8)' }}>
                Travel Visa
              </Typography>
              <div style={{ 
                backgroundColor: 'var(--color-gray-100)', 
                padding: 'var(--spacing-8)', 
                borderRadius: 'var(--border-radius-lg)',
                textAlign: 'center'
              }}>
                <Typography variant="body-large" color="muted">
                  Whether you're planning a vacation, visiting family, or exploring new destinations, our travel visa services ensure you have all the necessary documentation for your journey. We provide comprehensive support for tourist, business, and transit visas.
                </Typography>
              </div>
            </div>
          </>
        )}
      </SectionContainer>
    </div>
  );
};

export default VisaPage;
