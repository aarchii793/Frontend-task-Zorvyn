import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Zap,
  Film,
  HeartPulse,
  Banknote,
  Briefcase,
  TrendingUp,
  MoreHorizontal,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SpendingCategory } from '../types/finance';

/** Visual configuration for each spending category */
export interface CategoryStyle {
  color: string;
  textColor: string;
  hex: string;
  icon: LucideIcon;
}

/** Map of every SpendingCategory to its visual config */
export const categoryConfig: Record<SpendingCategory, CategoryStyle> = {
  'Food & Dining': {
    color: 'bg-orange-100 dark:bg-orange-900/30',
    textColor: 'text-orange-700 dark:text-orange-300',
    hex: '#f97316',
    icon: UtensilsCrossed,
  },
  Transport: {
    color: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-700 dark:text-blue-300',
    hex: '#3b82f6',
    icon: Car,
  },
  Shopping: {
    color: 'bg-pink-100 dark:bg-pink-900/30',
    textColor: 'text-pink-700 dark:text-pink-300',
    hex: '#ec4899',
    icon: ShoppingBag,
  },
  Utilities: {
    color: 'bg-yellow-100 dark:bg-yellow-900/30',
    textColor: 'text-yellow-700 dark:text-yellow-300',
    hex: '#eab308',
    icon: Zap,
  },
  Entertainment: {
    color: 'bg-purple-100 dark:bg-purple-900/30',
    textColor: 'text-purple-700 dark:text-purple-300',
    hex: '#a855f7',
    icon: Film,
  },
  Healthcare: {
    color: 'bg-red-100 dark:bg-red-900/30',
    textColor: 'text-red-700 dark:text-red-300',
    hex: '#ef4444',
    icon: HeartPulse,
  },
  Salary: {
    color: 'bg-emerald-100 dark:bg-emerald-900/30',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    hex: '#10b981',
    icon: Banknote,
  },
  Freelance: {
    color: 'bg-teal-100 dark:bg-teal-900/30',
    textColor: 'text-teal-700 dark:text-teal-300',
    hex: '#14b8a6',
    icon: Briefcase,
  },
  'Investment Returns': {
    color: 'bg-cyan-100 dark:bg-cyan-900/30',
    textColor: 'text-cyan-700 dark:text-cyan-300',
    hex: '#06b6d4',
    icon: TrendingUp,
  },
  Other: {
    color: 'bg-gray-100 dark:bg-gray-800',
    textColor: 'text-gray-700 dark:text-gray-300',
    hex: '#6b7280',
    icon: MoreHorizontal,
  },
};

/** All spending categories as an array for dropdowns and iteration */
export const ALL_CATEGORIES: SpendingCategory[] = [
  'Food & Dining',
  'Transport',
  'Shopping',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Salary',
  'Freelance',
  'Investment Returns',
  'Other',
];
