import React from 'react';
import { SectionContainer, Typography } from '../components';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';

const PrivacyPage: React.FC = () => {
  const { data: cmsData, isValidating, error } = useWebsiteCMS();

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <Typography variant="body" color="muted">Loading privacy policy...</Typography>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" color="primary" style={{ marginBottom: 'var(--spacing-4)' }}>
            Error Loading Privacy Policy
          </Typography>
          <Typography variant="body" color="muted">
            Please try again later.
          </Typography>
        </div>
      </div>
    );
  }

  if (!cmsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" style={{ marginBottom: 'var(--spacing-4)' }}>
            Privacy Policy Not Available
          </Typography>
          <Typography variant="body" color="muted">
            Please contact us for more information.
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <SectionContainer>
        <div >
          <Typography variant="h1" align="center" style={{ marginBottom: 'var(--spacing-2)' }}>
            {cmsData.privacy?.title || cmsData.privacy_title}
          </Typography>
        </div>
      

      {/* Privacy Content */}
     
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {(cmsData.privacy?.content || cmsData.privacy_content) ? (
            <div
              className="terms-content"
              style={{
                fontSize: 'var(--font-size-lg)',
                lineHeight: 'var(--line-height-lg)',
                color: 'var(--color-gray-700)'
              }}
              dangerouslySetInnerHTML={{ __html: cmsData.privacy?.content || cmsData.privacy_content }}
            />
          ) : (
            <div className="text-center" style={{ padding: 'var(--spacing-8) 0' }}>
              <Typography variant="h3" style={{ marginBottom: 'var(--spacing-4)' }}>
                Privacy Policy Coming Soon
              </Typography>
              <Typography variant="body" color="muted">
                We are currently updating our privacy policy. Please check back later.
              </Typography>
            </div>
          )}
        </div>
      </SectionContainer>
    </div>
  );
};

export default PrivacyPage;
