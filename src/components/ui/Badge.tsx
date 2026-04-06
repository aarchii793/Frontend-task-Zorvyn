import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  color?: string;
  textColor?: string;
  children: ReactNode;
  className?: string;
}

/** Small colored badge for category labels and status pills */
const Badge = ({ color = 'bg-gray-100 dark:bg-gray-800', textColor = 'text-gray-700 dark:text-gray-300', className, children }: BadgeProps) => {
  return (
    <span className={cn('badge', color, textColor, className)}>
      {children}
    </span>
  );
};

export default Badge;
