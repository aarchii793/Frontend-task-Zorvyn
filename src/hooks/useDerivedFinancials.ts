import { useMemo } from 'react';
import { parseISO, isAfter, isBefore, startOfDay } from 'date-fns';
import { useTransactionStore } from '../store/transactionStore';
import { useFilterStore } from '../store/filterStore';
import { computeMonthlyBreakdown, computeCategoryTotals } from '../utils/aggregations';
import type { Transaction, MonthlyBreakdown, CategoryTotal } from '../types/finance';

interface DerivedFinancials {
  visibleTransactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  monthlyBreakdown: MonthlyBreakdown[];
  categoryTotals: CategoryTotal[];
  incomeDelta: { text: string; trend: 'up' | 'down' | 'flat' | 'none'; value: number | null };
  expenseDelta: { text: string; trend: 'up' | 'down' | 'flat' | 'none'; value: number | null };
  savingsRate: number | null;
  avgMonthlySpend: number;
  topCategoryByAmount: CategoryTotal | null;
  topCategoryByCount: CategoryTotal | null;
}

/** Derives filtered, sorted transactions and computed financial metrics */
export const useDerivedFinancials = (): DerivedFinancials => {
  const transactions = useTransactionStore((s) => s.transactions);
  const keyword = useFilterStore((s) => s.keyword);
  const kindFilter = useFilterStore((s) => s.kindFilter);
  const categoryFilter = useFilterStore((s) => s.categoryFilter);
  const fromDate = useFilterStore((s) => s.fromDate);
  const toDate = useFilterStore((s) => s.toDate);
  const sortField = useFilterStore((s) => s.sortField);
  const sortDirection = useFilterStore((s) => s.sortDirection);

  const visibleTransactions = useMemo(() => {
    let result = [...transactions];

    // 1. Keyword filter
    if (keyword.trim()) {
      const lowerKeyword = keyword.toLowerCase();
      result = result.filter((t) =>
        t.description.toLowerCase().includes(lowerKeyword)
      );
    }

    // 2. Kind filter
    if (kindFilter !== 'all') {
      result = result.filter((t) => t.kind === kindFilter);
    }

    // 3. Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((t) => t.category === categoryFilter);
    }

    // 4. Date range filter
    if (fromDate) {
      const from = startOfDay(parseISO(fromDate));
      result = result.filter((t) => !isBefore(parseISO(t.date), from));
    }
    if (toDate) {
      const to = startOfDay(parseISO(toDate));
      result = result.filter((t) => !isAfter(parseISO(t.date), to));
    }

    // 5. Sort
    result.sort((a, b) => {
      let cmp: number;
      if (sortField === 'date') {
        cmp = a.date.localeCompare(b.date);
      } else {
        cmp = a.amount - b.amount;
      }
      return sortDirection === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [transactions, keyword, kindFilter, categoryFilter, fromDate, toDate, sortField, sortDirection]);

  const totalIncome = useMemo(
    () => visibleTransactions.filter((t) => t.kind === 'income').reduce((sum, t) => sum + t.amount, 0),
    [visibleTransactions]
  );

  const totalExpenses = useMemo(
    () => visibleTransactions.filter((t) => t.kind === 'expense').reduce((sum, t) => sum + t.amount, 0),
    [visibleTransactions]
  );

  const currentBalance = totalIncome - totalExpenses;

  const monthlyBreakdown = useMemo(
    () => computeMonthlyBreakdown(transactions),
    [transactions]
  );

  const categoryTotals = useMemo(
    () => computeCategoryTotals(visibleTransactions),
    [visibleTransactions]
  );

  const topCategoryByAmount = categoryTotals.length > 0 ? categoryTotals[0] : null;
  const topCategoryByCount = useMemo(() => {
    if (categoryTotals.length === 0) return null;
    return [...categoryTotals].sort((a, b) => b.count - a.count)[0];
  }, [categoryTotals]);

  const computeDelta = (field: 'income' | 'expenses') => {
    if (monthlyBreakdown.length < 2) return { text: 'No data', trend: 'none' as const, value: null };
    const current = monthlyBreakdown[monthlyBreakdown.length - 1][field];
    const previous = monthlyBreakdown[monthlyBreakdown.length - 2][field];
    
    if (previous === 0 && current === 0) return { text: 'No data', trend: 'none' as const, value: null };
    if (previous === 0 && current > 0) return { text: 'New this month', trend: 'up' as const, value: null };
    
    const delta = ((current - previous) / previous) * 100;
    if (delta > 0) return { text: ` ${Math.abs(delta).toFixed(1)}% vs last month`, trend: 'up' as const, value: delta };
    if (delta < 0) return { text: ` ${Math.abs(delta).toFixed(1)}% vs last month`, trend: 'down' as const, value: delta };
    return { text: '— vs last month', trend: 'flat' as const, value: 0 };
  };

  const incomeDelta = useMemo(() => computeDelta('income'), [monthlyBreakdown]);
  const expenseDelta = useMemo(() => computeDelta('expenses'), [monthlyBreakdown]);

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : null;

  const avgMonthlySpend = useMemo(() => {
    const monthsWithExpenses = monthlyBreakdown.filter(m => m.expenses > 0).length;
    return monthsWithExpenses > 0 ? totalExpenses / monthsWithExpenses : 0;
  }, [monthlyBreakdown, totalExpenses]);

  return {
    visibleTransactions,
    totalIncome,
    totalExpenses,
    currentBalance,
    monthlyBreakdown,
    categoryTotals,
    incomeDelta,
    expenseDelta,
    savingsRate,
    avgMonthlySpend,
    topCategoryByAmount,
    topCategoryByCount,
  };
};
