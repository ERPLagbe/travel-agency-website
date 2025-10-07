import React from 'react';
import { FAQ, PackageShowcase, Testimonials, WelcomeSection, PackagesDescription } from '../components';
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

  return (
    <div>
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