import React from 'react';
import { SectionContainer, Typography } from '../components';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';

const TermsPage: React.FC = () => {
  const { data: cmsData, isValidating, error } = useWebsiteCMS();

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <Typography variant="body" color="muted">Loading terms and conditions...</Typography>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" color="error" style={{ marginBottom: 'var(--spacing-4)' }}>
            Error Loading Terms and Conditions
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
            Terms and Conditions Not Available
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
        <div style={{ paddingTop: 'var(--spacing-6)', paddingBottom: 'var(--spacing-4)' }}>
          <Typography variant="h1" align="center" style={{ marginBottom: 'var(--spacing-2)' }}>
            {cmsData.terms_title || 'Terms and Conditions'}
          </Typography>
        </div>
      </SectionContainer>

      {/* Terms Content */}
      <SectionContainer>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {cmsData.terms_content ? (
            <div
              className="terms-content"
              style={{
                fontSize: 'var(--font-size-lg)',
                lineHeight: 'var(--line-height-lg)',
                color: 'var(--color-gray-700)'
              }}
              dangerouslySetInnerHTML={{ __html: cmsData.terms_content }}
            />
          ) : (
            <div className="text-center" style={{ padding: 'var(--spacing-8) 0' }}>
              <Typography variant="h3" style={{ marginBottom: 'var(--spacing-4)' }}>
                Terms and Conditions Coming Soon
              </Typography>
              <Typography variant="body" color="muted">
                We are currently updating our terms and conditions. Please check back later.
              </Typography>
            </div>
          )}
        </div>
      </SectionContainer>
    </div>
  );
};

export default TermsPage;


