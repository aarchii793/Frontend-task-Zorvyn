import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional Tailwind classes — combines clsx and tailwind-merge */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
