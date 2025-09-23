import React from 'react';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-large' | 'body-small';
  color?: 'primary' | 'secondary' | 'muted' | 'white' | 'black';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color,
  align,
  weight,
  className = '',
  as,
  ...props
}) => {
  const variantClasses = {
    h1: 'heading-primary',
    h2: 'heading-secondary',
    h3: 'heading-tertiary',
    h4: 'heading-quaternary',
    h5: 'heading-quinary',
    h6: 'heading-senary',
    body: 'body-text',
    'body-large': 'body-text-large',
    'body-small': 'body-text-small'
  };

  const colorClasses = color ? {
    primary: 'text-primary',
    secondary: 'text-secondary',
    muted: 'text-muted',
    white: 'text-white',
    black: 'text-black'
  }[color] : '';

  const alignClasses = align ? {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[align] : '';

  const weightClasses = weight ? {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }[weight] : '';

  const allClasses = [
    variantClasses[variant],
    colorClasses,
    alignClasses,
    weightClasses,
    className
  ].filter(Boolean).join(' ');

  // Default HTML elements for variants
  const defaultElements = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body: 'p',
    'body-large': 'p',
    'body-small': 'p'
  };

  const Element = as || (defaultElements[variant] as keyof React.JSX.IntrinsicElements) || 'p';

  return React.createElement(Element, { className: allClasses, ...props }, children);
};

export default Typography;
