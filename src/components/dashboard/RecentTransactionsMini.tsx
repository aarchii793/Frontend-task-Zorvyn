import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatINR, formatDisplayDate } from "../../utils/currency";
import { cn } from "../../utils/cn";
import type { Transaction } from "../../types/finance";

interface RecentTransactionsMiniProps {
  transactions: Transaction[];
}

const RecentTransactionsMini = ({
  transactions,
}: RecentTransactionsMiniProps) => {
  const recent = transactions
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14] p-8 flex items-center justify-center">
        <p className="text-sm text-[#64748B] dark:text-[#9CA3AF]">
          No transactions yet
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14]">
      
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0] dark:border-[#1F2933]">
        <div>
          <h3 className="text-sm font-semibold text-[#0F172A] dark:text-white tracking-tight">
            Recent Activity
          </h3>
          <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] mt-1">
            Latest transactions
          </p>
        </div>

        <Link
          to="/transactions"
          className="flex items-center gap-1 text-xs font-medium text-[#64748B] dark:text-[#9CA3AF] hover:text-[#0F172A] dark:hover:text-white transition"
        >
          View all
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="divide-y divide-[#F1F5F9] dark:divide-[#1F2933]">
        {recent.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8FAFC] dark:hover:bg-[#11161C] transition"
          >
            <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] dark:bg-[#11161C] flex items-center justify-center text-xs font-medium text-[#64748B] dark:text-[#9CA3AF]">
              {tx.description.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#0F172A] dark:text-white truncate">
                {tx.description}
              </p>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] text-[#64748B] dark:text-[#9CA3AF]">
                  {formatDisplayDate(tx.date)}
                </span>

                <span className="w-1 h-1 rounded-full bg-[#CBD5F5] dark:bg-[#374151]" />

                <span className="text-[11px] text-[#64748B] dark:text-[#9CA3AF] truncate">
                  {tx.category}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span
                className={cn(
                  "text-sm font-semibold tracking-tight",
                  tx.kind === "income"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                )}
              >
                {tx.kind === "income" ? "+" : "-"}
                {formatINR(tx.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactionsMini;
