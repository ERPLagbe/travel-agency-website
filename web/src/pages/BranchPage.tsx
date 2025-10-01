import React from 'react';
import { SectionContainer, Typography } from '../components';
import { useBranches } from '../hooks/useBranches';
import { MapPin, Phone, Mail, Building, Star, ExternalLink } from 'lucide-react';

const BranchPage: React.FC = () => {
  const { data: branches, isValidating, error } = useBranches();

  // Sort branches: Head office first, then alphabetically
  const sortedBranches = branches ? [...branches].sort((a, b) => {
    if (a.custom_head_office && !b.custom_head_office) return -1;
    if (!a.custom_head_office && b.custom_head_office) return 1;
    return a.branch.localeCompare(b.branch);
  }) : [];

  // Open Google Maps with branch location
  const openInGoogleMaps = (branch: any) => {
    if (branch.custom_map_location) {
      const [lat, lng] = branch.custom_map_location.split(',').map((coord: string) => coord.trim());
      const address = [
        branch.custom_address_line_1,
        branch.custom_address_line_2,
        branch.custom_city,
        branch.custom_postal_code,
        branch.custom_country
      ].filter(Boolean).join(', ');
      
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      window.open(googleMapsUrl, '_blank');
    } else {
      // Fallback to address search
      const address = [
        branch.custom_address_line_1,
        branch.custom_address_line_2,
        branch.custom_city,
        branch.custom_postal_code,
        branch.custom_country
      ].filter(Boolean).join(', ');
      
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <Typography variant="body" color="muted">Loading branches...</Typography>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" color="error" style={{ marginBottom: 'var(--spacing-4)' }}>
            Error Loading Branches
          </Typography>
          <Typography variant="body" color="muted">
            Please try again later.
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ 
        backgroundColor: 'var(--color-primary)', 
        padding: 'var(--spacing-16) 0',
        textAlign: 'center'
      }}>
        <SectionContainer>
          <Typography variant="h1" color="white" style={{ marginBottom: 'var(--spacing-4)' }}>
            Our Branches
          </Typography>
          <Typography variant="body-large" color="white" style={{ opacity: 0.9 }}>
            Visit us at any of our convenient locations
          </Typography>
        </SectionContainer>
      </div>

      {/* Branches Section */}
      <SectionContainer>
        <div style={{ paddingTop: 'var(--spacing-16)', paddingBottom: 'var(--spacing-16)' }}>
          {sortedBranches.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: 'var(--spacing-8)' 
            }}>
              {sortedBranches.map((branch: any, index: number) => (
                <div 
                  key={index}
                  style={{
                    backgroundColor: branch.custom_head_office ? '#f8fafc' : 'white',
                    borderRadius: 'var(--border-radius-lg)',
                    padding: 'var(--spacing-8)',
                    boxShadow: branch.custom_head_office 
                      ? '0 8px 25px rgba(0, 123, 255, 0.15)' 
                      : '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: branch.custom_head_office 
                      ? '2px solid var(--color-primary)' 
                      : '1px solid var(--color-gray-200)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = branch.custom_head_office 
                      ? '0 12px 35px rgba(0, 123, 255, 0.25)' 
                      : '0 8px 25px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = branch.custom_head_office 
                      ? '0 8px 25px rgba(0, 123, 255, 0.15)' 
                      : '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {/* Branch Header */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: 'var(--spacing-6)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                      <Building size={24} style={{ color: 'var(--color-primary)' }} />
                      <Typography variant="h3" style={{ margin: 0 }}>
                        {branch.branch}
                      </Typography>
                    </div>
                    {branch.custom_head_office && (
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 'var(--spacing-2)',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        padding: 'var(--spacing-2) var(--spacing-4)',
                        borderRadius: 'var(--border-radius-full)',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        boxShadow: '0 2px 8px rgba(0, 123, 255, 0.3)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        <Star size={16} fill="currentColor" />
                        Head Office
                      </div>
                    )}
                  </div>

                  {/* Branch Code */}
                  {branch.custom_branch_code && (
                    <div style={{ marginBottom: 'var(--spacing-4)' }}>
                      <Typography variant="body" color="muted" style={{ fontSize: '0.875rem' }}>
                        Branch Code: {branch.custom_branch_code}
                      </Typography>
                    </div>
                  )}

                  {/* Address */}
                  <div style={{ marginBottom: 'var(--spacing-6)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-3)' }}>
                      <MapPin size={20} style={{ color: 'var(--color-gray-600)', marginTop: '2px' }} />
                      <div>
                        {branch.custom_address_line_1 && (
                          <Typography variant="body" style={{ marginBottom: 'var(--spacing-1)' }}>
                            {branch.custom_address_line_1}
                          </Typography>
                        )}
                        {branch.custom_address_line_2 && (
                          <Typography variant="body" style={{ marginBottom: 'var(--spacing-1)' }}>
                            {branch.custom_address_line_2}
                          </Typography>
                        )}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
                          {branch.custom_city && (
                            <Typography variant="body" color="muted">
                              {branch.custom_city}
                            </Typography>
                          )}
                          {branch.custom_postal_code && (
                            <Typography variant="body" color="muted">
                              {branch.custom_postal_code}
                            </Typography>
                          )}
                        </div>
                        {branch.custom_country && (
                          <Typography variant="body" color="muted" style={{ marginTop: 'var(--spacing-1)' }}>
                            {branch.custom_country}
                          </Typography>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Map Location */}
                  <div style={{ 
                    marginTop: 'var(--spacing-4)',
                    padding: 'var(--spacing-4)',
                    backgroundColor: 'var(--color-gray-50)',
                    borderRadius: 'var(--border-radius)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '1px solid var(--color-gray-200)'
                  }}
                  onClick={() => openInGoogleMaps(branch)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-gray-50)';
                    e.currentTarget.style.color = 'inherit';
                    e.currentTarget.style.borderColor = 'var(--color-gray-200)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-2)' }}>
                    <MapPin size={20} />
                    <Typography variant="body" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                      {branch.custom_map_location ? 'View on Google Maps' : 'Open in Google Maps'}
                    </Typography>
                    <ExternalLink size={16} />
                  </div>
                </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-16) 0' }}>
              <Typography variant="h3" color="muted" style={{ marginBottom: 'var(--spacing-4)' }}>
                No Branches Found
              </Typography>
              <Typography variant="body" color="muted">
                Please check back later for branch information.
              </Typography>
            </div>
          )}
        </div>
      </SectionContainer>
    </div>
  );
};

export default BranchPage;
