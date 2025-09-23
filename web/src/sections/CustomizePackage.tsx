import React from 'react';

const CustomizePackage: React.FC = () => {
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
            Customise Your Package
          </h2>
          
          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-8">
            We are specialists in Customised packages according to your needs.
          </p>
          
          <p className="text-secondary text-lg max-w-2xl mx-auto mb-12">
            Allow us to offer Umrah according to your Budget, Travel Dates, Hotel Choice.
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="bg-secondary hover:bg-yellow-500 text-primary font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            Customise Your Package
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomizePackage;
