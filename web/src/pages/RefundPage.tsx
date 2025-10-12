import React from 'react';
import { SectionContainer, Typography } from '../components';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';

const RefundPage: React.FC = () => {
  const { data: cmsData, isValidating, error } = useWebsiteCMS();

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <Typography variant="body" color="muted">Loading refund policy...</Typography>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" color="primary" style={{ marginBottom: 'var(--spacing-4)' }}>
            Error Loading Refund Policy
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
            Refund Policy Not Available
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
            {cmsData.refund?.title || cmsData.refund_title}
          </Typography>
        </div>
      

      {/* Refund Content */}
     
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {(cmsData.refund?.content || cmsData.refund_content) ? (
            <div
              className="terms-content"
              style={{
                fontSize: 'var(--font-size-lg)',
                lineHeight: 'var(--line-height-lg)',
                color: 'var(--color-gray-700)'
              }}
              dangerouslySetInnerHTML={{ __html: cmsData.refund?.content || cmsData.refund_content }}
            />
          ) : (
            <div className="text-center" style={{ padding: 'var(--spacing-8) 0' }}>
              <Typography variant="h3" style={{ marginBottom: 'var(--spacing-4)' }}>
                Refund Policy Coming Soon
              </Typography>
              <Typography variant="body" color="muted">
                We are currently updating our refund policy. Please check back later.
              </Typography>
            </div>
          )}
        </div>
      </SectionContainer>
    </div>
  );
};

export default RefundPage;
