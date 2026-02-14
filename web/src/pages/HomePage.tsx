import React from 'react';
import { FAQ, PackageShowcase, Testimonials, WelcomeSection, PackagesDescription, SEO } from '../components';
import AllPackages from '../sections/AllPackages';
import HeroSection from '../sections/HeroSection';
import CTASection from '../sections/CTASection';
import Gallery from '../sections/Gallery';
import { useFAQItems, useWebsiteCMS } from '../hooks/useWebsiteCMS';

const HomePage: React.FC = () => {
  const { data: faqItems } = useFAQItems();
  const { data: cmsData } = useWebsiteCMS();

  // Use CMS data only
  const faqs = faqItems?.map((faq: any) => ({
    question: faq.question,
    answer: faq.answer
  })) || [];

  const faqTitle = cmsData?.faq_title;
  const faqSubtitle = cmsData?.faq_subtitle;

  const siteName = cmsData?.business_name || 'Travel Agency';
  const siteDescription = cmsData?.meta_description || 'Discover amazing travel packages, tours, and visa services. Book your dream vacation with our trusted travel agency.';
  const siteKeywords = cmsData?.meta_keywords || 'travel, tours, packages, visa, hajj, umrah, travel agency';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteName,
    description: siteDescription,
    url: typeof window !== 'undefined' ? window.location.origin : '',
    ...(cmsData?.business_phone && { telephone: cmsData.business_phone }),
    ...(cmsData?.business_email && { email: cmsData.business_email }),
    ...(cmsData?.business_address && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: cmsData.business_address
      }
    })
  };

  return (
    <div>
      <SEO
        title={`${siteName} - Best Travel Packages & Tours`}
        description={siteDescription}
        keywords={siteKeywords}
        url="/"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Packages Showcase */}
      <PackageShowcase />

      {/* CTA Section */}
      <CTASection />

      {/* All Packages Section */}
      <AllPackages />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Welcome to Bismillah Travel Section */}
      <WelcomeSection />

      {/* Umrah/Hajj Packages Description Section */}
      <PackagesDescription />

      {/* Photo Gallery Section */}
      <Gallery />

      {/* FAQ Section */}
      <FAQ title={faqTitle} subtitle={faqSubtitle} faqs={faqs} />
    </div>
  );
};

export default HomePage;