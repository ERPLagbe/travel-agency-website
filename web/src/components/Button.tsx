import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'secondary-fill';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
 
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  className = '',
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    'secondary-fill': 'btn-secondary-fill'
  };
  
  const sizeClasses = {
    sm: 'btn-sm',
    md: '', // Default size
    lg: 'btn-lg'
  };

  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  if (as === 'a' && href) {
    return (
      <a href={href} className={allClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={allClasses } {...props}>
      {children}
    </button>
  );
};

export default Button;
