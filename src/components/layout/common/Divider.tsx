import { cn } from '@/lib/utils';
import React from 'react';

interface DividerProps {
  /**
   * The orientation of the divider
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * The visual style of the divider
   * @default 'solid'
   */
  variant?: 'solid' | 'dashed' | 'dotted';
  
  /**
   * Controls the spacing around the divider
   * @default 'default'
   */
  spacing?: 'none' | 'sm' | 'default' | 'lg';
  
  /**
   * Optional text to display in the center of the divider
   */
  text?: string;
  
  /**
   * Color theme for the divider
   * @default 'default'
   */
  color?: 'default' | 'muted' | 'primary';
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  spacing = 'default',
  text,
  color = 'default',
  className,
}: DividerProps) {
  // Define spacing variants
  const spacingClasses = {
    none: 'my-0',
    sm: 'my-2',
    default: 'my-4',
    lg: 'my-8',
  };

  // Define color variants
  const colorClasses = {
    default: 'border-gray-200',
    muted: 'border-gray-100',
    primary: 'border-blue-200',
  };

  // Define border style variants
  const borderStyles = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  // If there's text, we need to create a more complex divider
  if (text) {
    return (
      <div 
        className={cn(
          'w-full flex items-center',
          spacingClasses[spacing],
          className
        )}
      >
        <div className={cn(
          'flex-grow border-t',
          borderStyles[variant],
          colorClasses[color]
        )} />
        <span className="px-4 text-sm text-gray-500">
          {text}
        </span>
        <div className={cn(
          'flex-grow border-t',
          borderStyles[variant],
          colorClasses[color]
        )} />
      </div>
    );
  }

  // For vertical orientation, we need different spacing classes
  const verticalSpacingClasses = {
    none: 'mx-0',
    sm: 'mx-2',
    default: 'mx-4',
    lg: 'mx-8',
  };

  return (
    <hr
      className={cn(
        // Base styles
        'border-0',
        // Orientation-specific styles
        orientation === 'horizontal' ? [
          'w-full border-t',
          spacingClasses[spacing]
        ] : [
          'h-full border-l inline-block',
          verticalSpacingClasses[spacing]
        ],
        // Apply variants
        borderStyles[variant],
        colorClasses[color],
        className
      )}
      aria-orientation={orientation}
    />
  );
}

// Additional components for specific use cases
export function TextDivider({ text, ...props }: Omit<DividerProps, 'orientation'> & { text: string }) {
  return <Divider text={text} orientation="horizontal" {...props} />;
}

export function VerticalDivider(props: Omit<DividerProps, 'orientation' | 'text'>) {
  return <Divider orientation="vertical" {...props} />;
}