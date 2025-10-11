import React from 'react';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';

const CTASection: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();

  // Check if we have statistics data from CMS
  const hasStatisticsData = cmsData?.stat_hajj_travelers || 
                           cmsData?.stat_umrah_travelers || 
                           cmsData?.stat_satisfied_pilgrims || 
                           cmsData?.stat_years_experience;

  // Don't render if no data
  if (!hasStatisticsData) {
    return null;
  }

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hajj Travelers */}
          {cmsData?.stat_hajj_travelers && (
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {cmsData.stat_hajj_travelers}
              </div>
              <div className="text-white font-medium text-sm lg:text-base">
                HAJJ TRAVELER
              </div>
            </div>
          )}

          {/* Umrah Travelers */}
          {cmsData?.stat_umrah_travelers && (
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {cmsData.stat_umrah_travelers}
              </div>
              <div className="text-white font-medium text-sm lg:text-base">
                UMRAH TRAVELER
              </div>
            </div>
          )}

          {/* Satisfied Pilgrims */}
          {cmsData?.stat_satisfied_pilgrims && (
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {cmsData.stat_satisfied_pilgrims}
              </div>
              <div className="text-white font-medium text-sm lg:text-base">
                SATISFIED PILGRIMS
              </div>
            </div>
          )}

          {/* Years of Experience */}
          {cmsData?.stat_years_experience && (
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {cmsData.stat_years_experience}
              </div>
              <div className="text-white font-medium text-sm lg:text-base">
                YEARS OF EXPERIENCE
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;