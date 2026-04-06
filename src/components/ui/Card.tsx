import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  children: ReactNode;
}

/** Reusable card container with optional hover-lift effect */
const Card = ({ hover = false, className, children, ...props }: CardProps) => {
  return (
    <div className={cn(hover ? 'card-hover' : 'card', 'p-5', className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
