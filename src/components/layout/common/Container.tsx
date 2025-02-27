import { cn } from '@/lib/utils';
import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines the maximum width of the container
   * @default 'default'
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'default';
  
  /**
   * If true, removes horizontal padding
   * @default false
   */
  noPadding?: boolean;
  
  /**
   * Optional class names to be merged with the default styles
   */
  className?: string;
  
  /**
   * Container content
   */
  children: React.ReactNode;
}

export function Container({
  maxWidth = 'default',
  noPadding = false,
  className,
  children,
  ...props
}: ContainerProps) {
  // Define maximum width classes based on the maxWidth prop
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    default: 'max-w-7xl',
  };

  return (
    <div
      className={cn(
        // Base styles for the container
        'w-full mx-auto',
        // Apply maximum width based on prop
        maxWidthClasses[maxWidth],
        // Apply horizontal padding unless disabled
        !noPadding && 'px-4 sm:px-6 lg:px-8',
        // Allow additional className overrides
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}