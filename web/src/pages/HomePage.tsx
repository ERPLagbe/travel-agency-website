import React from 'react';
import { FAQ, PackageShowcase, Testimonials, CustomizePackage, HajjDeals, WelcomeSection, PackagesDescription } from '../components';
import HeroSection from '../sections/HeroSection';
import { useFAQItems } from '../hooks/useWebsiteCMS';

const HomePage: React.FC = () => {
  const { data: faqItems } = useFAQItems();

  // Fallback FAQ data if CMS data is not available
  const fallbackFAQs = [
    {
      question: 'What is Umrah?',
      answer: 'Umrah is a journey that Muslims take to Makkah. Unlike Hajj, which has a specific time, Umrah can be done any time of the year. It involves doing certain acts of worship, including Tawaf (walking around the Kaaba) and Sa\'i (walking between the hills of Safa and Marwa).'
    },
    {
      question: 'How long does it take to perform Umrah?',
      answer: 'Umrah is a relatively short process that will only take a few hours to complete. But we recommend staying for 3-6 nights in Makkah so you can visit other important religious sites as well.'
    },
    {
      question: 'Can I get direct flights to Saudi Arabia from the UK?',
      answer: 'Yes, you can get direct flights with British Airways and Saudi Arabian Airlines. We arrange all flight bookings as part of our comprehensive packages.'
    },
    {
      question: 'What accommodation options are available?',
      answer: 'We offer a range of accommodation options to suit every budget, from economy to luxury hotels conveniently located in Mecca and Medina, all within walking distance of the holy sites.'
    },
    {
      question: 'What sets Bismillah Travel apart from other agencies?',
      answer: 'At Bismillah Travel, we prioritize customer satisfaction, reliability, and service excellence. Our experienced team ensures a hassle-free pilgrimage experience, guiding you every step of the way with personalized attention.'
    },
    {
      question: 'What are the payment options available?',
      answer: 'We accept various payment methods, including credit/debit cards, bank transfers, and online payment gateways. We also offer flexible payment plans to make your spiritual journey more accessible.'
    }
  ];

  // Use CMS data if available, otherwise use fallback
  const faqs = (faqItems && faqItems.length > 0) 
    ? faqItems.map((faq: any) => ({
        question: faq.question,
        answer: faq.answer
      }))
    : fallbackFAQs;

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Packages Showcase */}
      <PackageShowcase />

      {/* Customise Your Package Section */}
      <CustomizePackage />

      {/* Cheap Deals for Hajj 2026 Section */}
      <HajjDeals />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Welcome to Bismillah Travel Section */}
      <WelcomeSection />

      {/* Umrah/Hajj Packages Description Section */}
      <PackagesDescription />

      {/* FAQ Section */}
      <FAQ faqs={faqs} />
    </div>
  );
};

export default HomePage;