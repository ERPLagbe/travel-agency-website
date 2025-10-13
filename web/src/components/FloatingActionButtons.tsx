import React, { useState } from 'react';
import { Mail, Phone, X, MessageSquare } from 'lucide-react';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';

const FloatingActionButtons: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: cmsData, isValidating } = useWebsiteCMS();

  const handleWhatsApp = () => {
    if (!cmsData?.whatsapp_number) {
      console.warn('WhatsApp number not configured in Website CMS');
      return;
    }
    
    const phoneNumber = cmsData.whatsapp_number;
    const message = `Hello! I'm interested in your travel services from ${cmsData.business_name || 'your website'}.`;
    window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = () => {
    if (!cmsData?.business_email) {
      console.warn('Business email not configured in Website CMS');
      return;
    }
    
    const email = cmsData.business_email;
    const subject = `Travel Inquiry - ${cmsData.business_name || 'Travel Services'}`;
    const body = `Hello!\n\nI'm interested in your travel services. Please provide me with more information about your packages.\n\nThank you!`;
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const handleCall = () => {
    if (!cmsData?.business_phone) {
      console.warn('Business phone not configured in Website CMS');
      return;
    }
    
    const phoneNumber = cmsData.business_phone;
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const toggleButtons = () => {
    setIsOpen(!isOpen);
  };

  // Don't render if still loading or no data
  if (isValidating || !cmsData) {
    return null;
  }

  // Don't render if no contact methods are configured
  if (!cmsData.whatsapp_number && !cmsData.business_email && !cmsData.business_phone) {
    return null;
  }

  // Calculate which buttons to show and their positions
  const availableButtons = [];
  let buttonIndex = 0;

  if (cmsData.whatsapp_number) {
    availableButtons.push({
      type: 'whatsapp',
      onClick: handleWhatsApp,
      title: 'WhatsApp Chat',
      // backgroundColor: '#25D366',
      icon: <img src="/image.png" alt="WhatsApp" width={56} height={56} />,
      position: buttonIndex++
    });
  }

  if (cmsData.business_email) {
    availableButtons.push({
      type: 'email',
      onClick: handleEmail,
      title: 'Send Email',
      backgroundColor: '#dc3545',
      icon: <Mail size={24} />,
      position: buttonIndex++
    });
  }

  if (cmsData.business_phone) {
    availableButtons.push({
      type: 'call',
      onClick: handleCall,
      title: 'Call Now',
      backgroundColor: '#007bff',
      icon: <Phone size={24} />,
      position: buttonIndex++
    });
  }

  return (
    <div className="floating-action-buttons">
      {/* Dynamic Contact Buttons */}
      {availableButtons.map((button) => (
        <button
          key={button.type}
          onClick={button.onClick}
          className={`fab-item ${isOpen ? 'fab-visible' : ''}`}
          style={{
            position: 'fixed',
            bottom: isOpen ? `${100 + (button.position * 70)}px` : '20px',
            right: '20px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: button.backgroundColor,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: `0 4px 12px ${button.backgroundColor}30`,
            zIndex: 999,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
            pointerEvents: isOpen ? 'auto' : 'none'
          }}
          title={button.title}
        >
          {button.icon}
        </button>
      ))}

      {/* Close Button - Always show if there are any contact buttons */}
      {availableButtons.length > 0 && (
        <button
          onClick={toggleButtons}
          className={`fab-item ${isOpen ? 'fab-visible' : ''}`}
          style={{
            position: 'fixed',
            bottom: isOpen ? `${100 + (availableButtons.length * 70)}px` : '20px',
            right: '20px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#ff6b35',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
            zIndex: 999,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
            pointerEvents: isOpen ? 'auto' : 'none'
          }}
          title="Close"
        >
          <X size={24} />
        </button>
      )}

      {/* Main Toggle Button - Shows when closed */}
      {!isOpen && availableButtons.length > 0 && (
        <button
          onClick={toggleButtons}
          className="fab-main"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)',
            zIndex: 1000,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: 'bounce 2s infinite'
          }}
          title="Quick Contact"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={toggleButtons}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            zIndex: 998,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}
    </div>
  );
};

export default FloatingActionButtons;
