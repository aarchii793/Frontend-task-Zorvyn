import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Transaction, TransactionKind, SpendingCategory } from '../types/finance';
import { seedTransactions } from '../data/seedTransactions';

interface TransactionState {
  transactions: Transaction[];
  /** Add a new transaction entry with auto-generated id */
  addEntry: (entry: Omit<Transaction, 'id'>) => void;
  /** Modify an existing transaction by id */
  modifyEntry: (id: string, updates: Omit<Transaction, 'id'>) => void;
  /** Remove a transaction by id */
  removeEntry: (id: string) => void;
}

/** Zustand store for managing transactions with localStorage persistence */
export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: seedTransactions,

      addEntry: (entry: Omit<Transaction, 'id'>) =>
        set((state) => ({
          transactions: [
            { ...entry, id: uuidv4() },
            ...state.transactions,
          ],
        })),

      modifyEntry: (id: string, updates: Omit<Transaction, 'id'>) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...updates, id } : t
          ),
        })),

      removeEntry: (id: string) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    { name: 'fin-transactions' }
  )
);

// Re-export types used by the store consumers to avoid direct type imports
export type { Transaction, TransactionKind, SpendingCategory };
