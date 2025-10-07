import React from 'react';
import { Link } from 'react-router-dom';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';

const CTASection: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();

  // Get CTA data from CMS
  const ctaData = {
    title: cmsData?.cta_title,
    description: cmsData?.cta_description,
    subtitle: cmsData?.cta_subtitle,
    buttonText: cmsData?.cta_button_text,
    buttonLink: cmsData?.cta_button_link
  };

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          {/* Decorative Elements */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <div className="w-16 h-0.5 bg-secondary mx-4"></div>
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
          </div>
          
          <h2 className="text-white text-4xl md:text-5xl font-bold uppercase mb-4">
            {ctaData.title}
          </h2>
          
          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-8">
            {ctaData.description}
          </p>
          
          <p className="text-secondary text-lg max-w-2xl mx-auto mb-12">
            {ctaData.subtitle}
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            to={ctaData.buttonLink || '/contact'}
            className="btn btn-secondary-fill btn-lg no-underline"
          >
            {ctaData.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;