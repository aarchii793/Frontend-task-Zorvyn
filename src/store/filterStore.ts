import { create } from 'zustand';
import type { TransactionKind, SpendingCategory } from '../types/finance';

interface FilterState {
  keyword: string;
  kindFilter: 'all' | TransactionKind;
  categoryFilter: 'all' | SpendingCategory;
  fromDate: string | null;
  toDate: string | null;
  sortField: 'date' | 'amount';
  sortDirection: 'asc' | 'desc';
  /** Set search keyword */
  setKeyword: (keyword: string) => void;
  /** Set income/expense/all filter */
  setKindFilter: (kind: 'all' | TransactionKind) => void;
  /** Set category filter */
  setCategoryFilter: (category: 'all' | SpendingCategory) => void;
  /** Set start date for range filter */
  setFromDate: (date: string | null) => void;
  /** Set end date for range filter */
  setToDate: (date: string | null) => void;
  /** Set field to sort by */
  setSortField: (field: 'date' | 'amount') => void;
  /** Set sort direction */
  setSortDirection: (dir: 'asc' | 'desc') => void;
  /** Reset all filters to defaults */
  clearAllFilters: () => void;
}

const initialState = {
  keyword: '',
  kindFilter: 'all' as const,
  categoryFilter: 'all' as const,
  fromDate: null,
  toDate: null,
  sortField: 'date' as const,
  sortDirection: 'desc' as const,
};

/** Zustand store for transaction filtering and sorting — no persistence */
export const useFilterStore = create<FilterState>()((set) => ({
  ...initialState,
  setKeyword: (keyword: string) => set({ keyword }),
  setKindFilter: (kindFilter: 'all' | TransactionKind) => set({ kindFilter }),
  setCategoryFilter: (categoryFilter: 'all' | SpendingCategory) => set({ categoryFilter }),
  setFromDate: (fromDate: string | null) => set({ fromDate }),
  setToDate: (toDate: string | null) => set({ toDate }),
  setSortField: (sortField: 'date' | 'amount') => set({ sortField }),
  setSortDirection: (sortDirection: 'asc' | 'desc') => set({ sortDirection }),
  clearAllFilters: () => set(initialState),
}));
