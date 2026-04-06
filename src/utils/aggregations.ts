import { format, parseISO, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import type { Transaction, MonthlyBreakdown, CategoryTotal } from '../types/finance';

export const computeMonthlyBreakdown = (transactions: Transaction[]): MonthlyBreakdown[] => {
  if (transactions.length === 0) return [];

  // Anchor to the most recent transaction date so past seed data works
  const latestDate = new Date(Math.max(...transactions.map(t => parseISO(t.date).getTime())));
  const months: MonthlyBreakdown[] = [];

  for (let i = 5; i >= 0; i--) {
    const monthDate = subMonths(latestDate, i);
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    const label = format(monthDate, 'MMM yyyy');

    let income = 0;
    let expenses = 0;

    for (const t of transactions) {
      const tDate = parseISO(t.date);
      if (isWithinInterval(tDate, { start, end })) {
        if (t.kind === 'income') income += t.amount;
        else expenses += t.amount;
      }
    }

    months.push({ month: label, income, expenses });
  }

  return months;
};

/** Compute category-level expense totals, sorted by total descending */
export const computeCategoryTotals = (transactions: Transaction[]): CategoryTotal[] => {
  const expenseOnly = transactions.filter((t) => t.kind === 'expense');
  const map = new Map<string, { total: number; count: number }>();

  for (const t of expenseOnly) {
    const existing = map.get(t.category) ?? { total: 0, count: 0 };
    existing.total += t.amount;
    existing.count += 1;
    map.set(t.category, existing);
  }

  return Array.from(map.entries())
    .map(([category, data]) => ({ category, ...data }))
    .sort((a, b) => b.total - a.total);
};
