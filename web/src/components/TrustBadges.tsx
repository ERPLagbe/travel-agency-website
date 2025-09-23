import React from 'react';
import { Typography } from './Typography';
import { Shield, Award, CheckCircle, Users } from 'lucide-react';

interface TrustBadge {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TrustBadgesProps {
  title?: string;
  subtitle?: string;
  badges: TrustBadge[];
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ 
  title = "Why Trust Us", 
  subtitle = "We are committed to providing safe, reliable, and exceptional travel experiences",
  badges 
}) => {
  return (
    <div style={{ padding: 'var(--spacing-16) 0', backgroundColor: 'var(--color-white)' }}>
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-12)' }}>
          <Typography variant="h2" align="center" style={{ marginBottom: 'var(--spacing-4)' }}>
            {title}
          </Typography>
          <Typography variant="body-large" color="muted" align="center">
            {subtitle}
          </Typography>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: 'var(--spacing-8)' 
        }}>
          {badges.map((badge, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--spacing-4) auto',
                color: 'var(--color-white)'
              }}>
                {badge.icon}
              </div>
              <Typography variant="h4" align="center" style={{ marginBottom: 'var(--spacing-3)' }}>
                {badge.title}
              </Typography>
              <Typography variant="body" color="muted" align="center">
                {badge.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
