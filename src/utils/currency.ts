import { format, parseISO } from 'date-fns';

/** Format a number as Indian Rupees: ₹1,23,456.78 */
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/** Format an ISO date string to human-readable: "15 Jan 2025" */
export const formatDisplayDate = (isoString: string): string => {
  return format(parseISO(isoString), 'dd MMM yyyy');
};

/** Abbreviate large numbers for chart axes: 1L, 50K, etc. */
export const abbreviateINR = (value: number): string => {
  const sign = value < 0 ? '-' : '';
  const abs = Math.abs(value);
  if (abs >= 100000) return `${sign}₹${(abs / 100000).toFixed(1)}L`;
  if (abs >= 1000) return `${sign}₹${(abs / 1000).toFixed(0)}K`;
  return `${sign}₹${abs}`;
};
