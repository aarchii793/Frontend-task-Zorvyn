import type { Transaction } from '../types/finance';

/** 38 hand-crafted transactions spanning the past 6 months */
export const seedTransactions: Transaction[] = [
  // ── October 2025 ──────────────────────────────────────
  { id: 'tx-001', date: '2025-10-15', description: 'HDFC salary credit', amount: 65000, kind: 'income', category: 'Salary' },
  { id: 'tx-002', date: '2025-10-03', description: 'Swiggy dinner', amount: 680, kind: 'expense', category: 'Food & Dining' },
  { id: 'tx-003', date: '2025-10-07', description: 'Ola ride to office', amount: 250, kind: 'expense', category: 'Transport' },
  { id: 'tx-004', date: '2025-10-11', description: 'Amazon headphones', amount: 3499, kind: 'expense', category: 'Shopping' },
  { id: 'tx-005', date: '2025-10-20', description: 'Electricity bill', amount: 1850, kind: 'expense', category: 'Utilities' },
  { id: 'tx-006', date: '2025-10-25', description: 'Netflix subscription', amount: 649, kind: 'expense', category: 'Entertainment' },

  // ── November 2025 ─────────────────────────────────────
  { id: 'tx-007', date: '2025-11-15', description: 'HDFC salary credit', amount: 65000, kind: 'income', category: 'Salary' },
  { id: 'tx-008', date: '2025-11-02', description: 'BigBasket groceries', amount: 2100, kind: 'expense', category: 'Food & Dining' },
  { id: 'tx-009', date: '2025-11-08', description: 'Uber cab to airport', amount: 1200, kind: 'expense', category: 'Transport' },
  { id: 'tx-010', date: '2025-11-12', description: 'Freelance UI project', amount: 18000, kind: 'income', category: 'Freelance' },
  { id: 'tx-011', date: '2025-11-18', description: 'Myntra winter jacket', amount: 4500, kind: 'expense', category: 'Shopping' },
  { id: 'tx-012', date: '2025-11-22', description: 'Gas pipeline bill', amount: 980, kind: 'expense', category: 'Utilities' },
  { id: 'tx-013', date: '2025-11-28', description: 'Dental checkup', amount: 1500, kind: 'expense', category: 'Healthcare' },

  // ── December 2025 ─────────────────────────────────────
  { id: 'tx-014', date: '2025-12-16', description: 'HDFC salary credit', amount: 68000, kind: 'income', category: 'Salary' },
  { id: 'tx-015', date: '2025-12-05', description: 'Zomato lunch order', amount: 450, kind: 'expense', category: 'Food & Dining' },
  { id: 'tx-016', date: '2025-12-10', description: 'Petrol refuel', amount: 2800, kind: 'expense', category: 'Transport' },
  { id: 'tx-017', date: '2025-12-14', description: 'Flipkart smart watch', amount: 8999, kind: 'expense', category: 'Shopping' },
  { id: 'tx-018', date: '2025-12-19', description: 'Water purifier service', amount: 1200, kind: 'expense', category: 'Utilities' },
  { id: 'tx-019', date: '2025-12-24', description: 'Movie tickets – Pushpa 2', amount: 750, kind: 'expense', category: 'Entertainment' },
  { id: 'tx-020', date: '2025-12-28', description: 'Mutual fund dividend', amount: 4200, kind: 'income', category: 'Investment Returns' },

  // ── January 2026 ──────────────────────────────────────
  { id: 'tx-021', date: '2026-01-15', description: 'HDFC salary credit', amount: 70000, kind: 'income', category: 'Salary' },
  { id: 'tx-022', date: '2026-01-04', description: 'Dominos pizza night', amount: 890, kind: 'expense', category: 'Food & Dining' },
  { id: 'tx-023', date: '2026-01-09', description: 'Rapido auto rickshaw', amount: 120, kind: 'expense', category: 'Transport' },
  { id: 'tx-024', date: '2026-01-17', description: 'Broadband bill', amount: 1100, kind: 'expense', category: 'Utilities' },
  { id: 'tx-025', date: '2026-01-22', description: 'Freelance logo design', amount: 12000, kind: 'income', category: 'Freelance' },
  { id: 'tx-026', date: '2026-01-26', description: 'Republic Day sale – shoes', amount: 3200, kind: 'expense', category: 'Shopping' },

  // ── February 2026 ─────────────────────────────────────
  { id: 'tx-027', date: '2026-02-14', description: 'HDFC salary credit', amount: 72000, kind: 'income', category: 'Salary' },
  { id: 'tx-028', date: '2026-02-03', description: 'Cafe Coffee Day meetup', amount: 520, kind: 'expense', category: 'Food & Dining' },
  { id: 'tx-029', date: '2026-02-08', description: 'Metro card recharge', amount: 500, kind: 'expense', category: 'Transport' },
  { id: 'tx-030', date: '2026-02-12', description: 'Eye checkup', amount: 2000, kind: 'expense', category: 'Healthcare' },
  { id: 'tx-031', date: '2026-02-18', description: 'Electricity bill', amount: 2200, kind: 'expense', category: 'Utilities' },
  { id: 'tx-032', date: '2026-02-25', description: 'Spotify annual plan', amount: 1189, kind: 'expense', category: 'Entertainment' },

  // ── March 2026 ────────────────────────────────────────
  { id: 'tx-033', date: '2026-03-15', description: 'HDFC salary credit', amount: 75000, kind: 'income', category: 'Salary' },
  { id: 'tx-034', date: '2026-03-02', description: 'Swiggy groceries', amount: 1650, kind: 'expense', category: 'Food & Dining' },
  { id: 'tx-035', date: '2026-03-07', description: 'Ola share ride', amount: 180, kind: 'expense', category: 'Transport' },
  { id: 'tx-036', date: '2026-03-11', description: 'Freelance API integration', amount: 25000, kind: 'income', category: 'Freelance' },
  { id: 'tx-037', date: '2026-03-20', description: 'Reliance Digital TV', amount: 11500, kind: 'expense', category: 'Shopping' },
  { id: 'tx-038', date: '2026-03-27', description: 'Stock dividend credit', amount: 3500, kind: 'income', category: 'Investment Returns' },
];
