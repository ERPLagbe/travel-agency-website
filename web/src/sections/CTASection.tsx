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
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hajj Travelers */}
          {cmsData?.stat_hajj_travelers && (
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {cmsData.stat_hajj_travelers} +
              </div>
              <div className="text-white font-medium text-sm lg:text-base">
                Working Visa Count
              </div>
            </div>
          )}

          {/* Umrah Travelers */}
          {cmsData?.stat_umrah_travelers && (
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {cmsData.stat_umrah_travelers} +
              </div>
              <div className="text-white font-medium text-sm lg:text-base">
                Student Visa Count
              </div>
            </div>
          )}

          {/* Satisfied Pilgrims */}
          {cmsData?.stat_satisfied_pilgrims && (
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {cmsData.stat_satisfied_pilgrims} %
              </div>
              <div className="text-white font-medium text-sm lg:text-base">
                Satisfied Customers Percentage
              </div>
            </div>
          )}

          {/* Years of Experience */}
          {cmsData?.stat_years_experience && (
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {cmsData.stat_years_experience} +
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
