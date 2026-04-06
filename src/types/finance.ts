/** User role determining available actions */
export type Role = 'admin' | 'viewer';

/** Classification of a financial transaction */
export type TransactionKind = 'income' | 'expense';

/** Spending/income category labels used across the app */
export type SpendingCategory =
  | 'Food & Dining'
  | 'Transport'
  | 'Shopping'
  | 'Utilities'
  | 'Entertainment'
  | 'Healthcare'
  | 'Salary'
  | 'Freelance'
  | 'Investment Returns'
  | 'Other';

/** Core transaction record shape */
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  kind: TransactionKind;
  category: SpendingCategory;
}

/** Monthly breakdown used in charts */
export interface MonthlyBreakdown {
  month: string;
  income: number;
  expenses: number;
}

/** Category aggregate used in insights */
export interface CategoryTotal {
  category: string;
  total: number;
  count: number;
}
