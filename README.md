# SmartLedger

## What This Is

SmartLedger is a personal finance tracking dashboard built with React and TypeScript. It lets you record income and expenses, visualize spending trends with interactive charts, and gain insights into your financial habits — all wrapped in a polished, responsive UI with dark mode support and role-based access control.

## Live Preview

_(placeholder URL)_

## Feature Highlights

- **Dashboard Overview** — Four KPI metric cards (balance, income, expenses, transaction count) with month-over-month deltas
- **Balance Trend Chart** — Smooth area chart showing cumulative balance across six months
- **Category Donut Chart** — Interactive pie chart breaking down expenses by category with custom legend
- **Recent Activity Feed** — Quick-glance list of the five most recent transactions
- **Full Transaction Table** — Sortable, filterable table with inline edit/delete (admin only)
- **Advanced Filtering** — Keyword search, kind toggle, category dropdown, date range, sort controls
- **Add/Edit Modal** — Validated form with radio-style type selector and category picker
- **Insights Page** — Top spending category, most active category, average spend, savings rate tiles
- **Income vs Expense Bar Chart** — Grouped monthly comparison with INR-formatted axes
- **Category Breakdown Table** — Ranked expense categories with inline progress bars
- **Role-Based Access** — Admin can create/edit/delete; Viewer is read-only
- **Dark Mode** — System-aware with manual toggle, persisted to localStorage
- **CSV Export** — Download filtered transactions as a CSV file
- **Responsive Design** — Mobile drawer, tablet icon-only sidebar, desktop full sidebar
- **Persistent State** — Transactions and role survive page refreshes via localStorage

## Why These Tools

- **Vite** — Fastest dev server with instant HMR; minimal config needed for React + TypeScript
- **React + TypeScript** — Component-based architecture with compile-time type safety eliminates entire categories of runtime bugs
- **Tailwind CSS v4** — Utility-first styling with the new CSS-native engine; dark mode via class strategy gives full control
- **Zustand** — Minimal boilerplate state management with built-in persist middleware — far simpler than Redux for this scale
- **Recharts** — Declarative charting that integrates naturally with React's component model
- **React Router** — De facto standard for client-side routing in React SPAs
- **date-fns** — Tree-shakable date utilities; much lighter than moment.js
- **lucide-react** — Consistent, well-designed icon set as React components
- **clsx + tailwind-merge** — Safe conditional class composition without style conflicts

## Running Locally

### Prerequisites

- Node.js 18+ and npm 9+

### Steps

```bash
# Clone the repository
git clone <repo-url>
cd <repo-folder>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## How Roles Work

SmartLedger supports two roles:

| Role     | Capabilities                                                |
|----------|-------------------------------------------------------------|
| **Admin**  | Add, edit, and delete transactions; full access to all views |
| **Viewer** | Read-only access to dashboard, transactions table, and insights |

Switch roles using the dropdown in the top-right navbar. The selected role persists in `localStorage` so it survives page refreshes. When in Viewer mode, all mutation controls (add button, edit/delete icons, form modal) are hidden — even if the URL is accessed directly.

## State Architecture

The app uses three separate Zustand stores, each with a single responsibility:

1. **`transactionStore`** — Source of truth for all transaction data. Exposes `addEntry`, `modifyEntry`, and `removeEntry` actions. Persisted to `localStorage` under the key `fin-transactions` so data survives refreshes.

2. **`filterStore`** — Holds ephemeral UI state: search keyword, kind/category filters, date range, sort field and direction. Not persisted — filters reset on page reload, which is the expected UX.

3. **`roleStore`** — Stores the active user role (`admin` | `viewer`). Persisted under `fin-role` so the user doesn't have to re-select their role each time.

Derived data (filtered transactions, totals, breakdowns) lives in the `useDerivedFinancials` hook which reads from both transaction and filter stores and memoizes all computations.

## Assumptions

- Currency is Indian Rupees (₹) throughout
- Amounts are always stored as positive numbers; the `kind` field determines debit vs credit
- Seed data covers October 2025 – March 2026 (six months prior to the development date)
- UUIDs are generated client-side; no backend integration
- The app is a single-user tool; no authentication flow is included
- Dark mode defaults to system preference on first visit

## What I'd Add Next

1. **Data persistence with a backend** — Replace localStorage with a REST/GraphQL API backed by a database for multi-device sync
2. **Budget goals** — Let users set monthly spending limits per category with progress indicators and alerts
3. **Recurring transactions** — Auto-generate entries for fixed monthly expenses like rent, subscriptions, and EMIs
4. **Multi-currency support** — Allow transactions in different currencies with real-time conversion rates
