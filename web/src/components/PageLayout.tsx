import React from 'react';
import { Breadcrumb } from './index';

interface PageLayoutProps {
  children: React.ReactNode;
  showBreadcrumb?: boolean;
  breadcrumbItems?: Array<{ label: string; path?: string }>;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  showBreadcrumb = true, 
  breadcrumbItems,
  className = '' 
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Breadcrumb */}
      {showBreadcrumb && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
      )}
      
      {/* Page Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
