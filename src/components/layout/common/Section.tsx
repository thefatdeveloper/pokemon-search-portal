import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Controls whether the section takes up full viewport height
   * @default false
   */
  fullHeight?: boolean;
  
  /**
   * Additional padding for the section
   * @default 'default'
   */
  padding?: 'none' | 'sm' | 'default' | 'lg';
  
  /**
   * Background color variant for the section
   * @default 'default'
   */
  background?: 'default' | 'alternate' | 'primary' | 'muted';
  
  /**
   * Optional CSS classes
   */
  className?: string;
  
  /**
   * Section content
   */
  children: React.ReactNode;
}

export function Section({
  fullHeight = false,
  padding = 'default',
  background = 'default',
  className,
  children,
  ...props
}: SectionProps) {
  // Define padding classes based on the padding prop
  const paddingClasses = {
    none: '',
    sm: 'py-4',
    default: 'py-8 md:py-12',
    lg: 'py-16 md:py-24',
  };

  // Define background classes based on the background prop
  const backgroundClasses = {
    default: 'bg-white dark:bg-gray-900',
    alternate: 'bg-gray-50 dark:bg-gray-800',
    primary: 'bg-red-50 dark:bg-red-900/20',
    muted: 'bg-gray-100 dark:bg-gray-800/50',
  };

  return (
    <section
      className={cn(
        // Apply height classes conditionally
        fullHeight && 'min-h-screen flex flex-col justify-center',
        // Apply padding based on prop
        paddingClasses[padding],
        // Apply background based on prop
        backgroundClasses[background],
        // Apply any additional className overrides
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}