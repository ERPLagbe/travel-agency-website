import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ 
  title = "Frequently Asked Questions", 
  subtitle = "Find answers to common questions about our travel services",
  faqs 
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [heights, setHeights] = useState<{ [key: number]: number }>({});
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    // Calculate heights for all content divs
    const newHeights: { [key: number]: number } = {};
    Object.keys(contentRefs.current).forEach((key) => {
      const index = parseInt(key);
      if (contentRefs.current[index]) {
        newHeights[index] = contentRefs.current[index]!.scrollHeight;
      }
    });
    setHeights(newHeights);
  }, [faqs]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Decorative Elements */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <div className="w-16 h-0.5 bg-secondary mx-4"></div>
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
          </div>
          
          <h2 className="text-primary text-4xl md:text-5xl font-bold uppercase mb-4">
            {title}
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-md transition-all duration-300 flex justify-between items-center hover:border-primary/30 hover:bg-gray-50"
                style={{
                  transform: 'scale(1)',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <h3 className="text-primary text-lg font-semibold pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-primary flex-shrink-0" />
                )}
              </button>
              
              <div
                style={{
                  maxHeight: openIndex === index ? `${heights[index]}px` : '0px',
                  opacity: openIndex === index ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: openIndex === index ? 'translateY(0)' : 'translateY(-10px)'
                }}
              >
                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="bg-gray-50 border-l-4 border-secondary p-6 mt-2 rounded-r-lg transition-all duration-300 hover:bg-gray-100"
                  style={{
                    transform: openIndex === index ? 'scale(1)' : 'scale(0.98)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease-in-out'
                  }}
                >
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;