import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = '',
  size = 'md',
  style
}) => {
  const sizeClasses = {
    sm: 'section-sm',
    md: 'section',
    lg: 'section-lg'
  };

  return (
    <section className={`${sizeClasses[size]} ${className}`.trim()} style={style}>
      <div className="section-container">
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
