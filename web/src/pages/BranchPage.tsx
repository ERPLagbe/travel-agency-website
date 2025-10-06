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
      <div className="bg-primary py-16 text-center">
        <SectionContainer>
          <Typography variant="h1" color="white" className="mb-4">
            Our Branches
          </Typography>
          <Typography variant="body-large" color="white" className="opacity-90">
            Visit us at any of our convenient locations
          </Typography>
        </SectionContainer>
      </div>

      {/* Branches Section */}
      <SectionContainer>
        <div className="py-16">
          {sortedBranches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedBranches.map((branch: any, index: number) => (
                <div 
                  key={index}
                  className={`p-8 rounded-xl transition-all duration-200 cursor-pointer relative hover:-translate-y-1 ${
                    branch.custom_head_office === 1 
                      ? 'bg-gray-50 border-2 border-primary shadow-lg hover:shadow-xl' 
                      : 'bg-white border border-gray-200 shadow-md hover:shadow-lg'
                  }`}
                >
                  {/* Branch Header */}
                  <div className="flex flex-col gap-4 justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Building size={24} className="text-primary" />
                      <Typography variant="h4" className="m-0">
                        {branch.branch}
                      </Typography>
                    </div>
                    {branch.custom_head_office === 1 && (
                      <div className="flex w-4/6 items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg uppercase tracking-wide ">
                        <Star size={16} fill="currentColor" />
                        <Typography variant="h4" color="white" className="m-0">Head Office</Typography>
                      </div>
                    )}
                  </div>

                  {/* Branch Code */}
                  {branch.custom_branch_code && (
                    <div className="mb-4">
                      <Typography variant="body" color="muted" className="text-sm">
                        Branch Code: {branch.custom_branch_code}
                      </Typography>
                    </div>
                  )}

                  {/* Address */}
                  <div className="mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-gray-600 mt-0.5" />
                      <div>
                        {branch.custom_address_line_1 && (
                          <Typography variant="body" className="mb-1">
                            {branch.custom_address_line_1}
                          </Typography>
                        )}
                        {branch.custom_address_line_2 && (
                          <Typography variant="body" className="mb-1">
                            {branch.custom_address_line_2}
                          </Typography>
                        )}
                        <div className="flex flex-wrap gap-2">
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
                          <Typography variant="body" color="muted" className="mt-1">
                            {branch.custom_country}
                          </Typography>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Map Location */}
                  <div 
                    className="mt-4 p-4 bg-gray-50 rounded-lg cursor-pointer transition-all duration-200 border border-gray-200 hover:bg-primary hover:text-white hover:border-primary"
                    onClick={() => openInGoogleMaps(branch)}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <MapPin size={20} />
                      <span className="text-sm font-semibold">
                        {branch.custom_map_location ? 'View on Google Maps' : 'Open in Google Maps'}
                      </span>
                      <ExternalLink size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Typography variant="h3" color="muted" className="mb-4">
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
