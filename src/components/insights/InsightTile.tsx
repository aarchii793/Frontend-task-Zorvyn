import { Crown, Hash, Calculator, PiggyBank } from "lucide-react";
import { formatINR } from "../../utils/currency";
import { cn } from "../../utils/cn";
import type { CategoryTotal } from "../../types/finance";

interface InsightTileProps {
  topCategoryByAmount: CategoryTotal | null;
  topCategoryByCount: CategoryTotal | null;
  avgMonthlySpend: number;
  savingsRate: number | null;
}

const InsightTile = ({
  topCategoryByAmount,
  topCategoryByCount,
  avgMonthlySpend,
  savingsRate,
}: InsightTileProps) => {
  const tiles = [
    {
      label: "Top Category",
      icon: Crown,
      value: topCategoryByAmount
        ? topCategoryByAmount.category
        : "—",
      sub: topCategoryByAmount
        ? formatINR(topCategoryByAmount.total)
        : "",
      accent: "amber",
    },
    {
      label: "Most Transactions",
      icon: Hash,
      value: topCategoryByCount
        ? topCategoryByCount.category
        : "—",
      sub: topCategoryByCount
        ? `${topCategoryByCount.count} entries`
        : "",
      accent: "blue",
    },
    {
      label: "Avg Monthly Spend",
      icon: Calculator,
      value: formatINR(avgMonthlySpend),
      sub: "per month",
      accent: "violet",
    },
    {
      label: "Savings Rate",
      icon: PiggyBank,
      value:
        savingsRate !== null
          ? `${savingsRate.toFixed(1)}%`
          : "—",
      sub:
        savingsRate !== null
          ? savingsRate > 20
            ? "Healthy"
            : savingsRate >= 0
            ? "Moderate"
            : "Overspending"
          : "",
      accent:
        savingsRate !== null
          ? savingsRate > 20
            ? "emerald"
            : savingsRate >= 0
            ? "yellow"
            : "rose"
          : "gray",
    },
  ];

  const accentMap: Record<string, string> = {
    amber:
      "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
    blue:
      "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
    violet:
      "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
    emerald:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    yellow:
      "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    rose:
      "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
    gray:
      "bg-gray-100 dark:bg-[#1F2933] text-gray-500 dark:text-gray-400",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {tiles.map(({ label, icon: Icon, value, sub, accent }) => (
        <div
          key={label}
          className="relative rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14] p-5 transition-all hover:shadow-md"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-1">
              <p className="text-[11px] font-medium text-[#64748B] dark:text-[#9CA3AF] uppercase tracking-wide">
                {label}
              </p>
            </div>

            <div
              className={cn(
                "p-2.5 rounded-xl",
                accentMap[accent]
              )}
            >
              <Icon size={18} />
            </div>
          </div>

          <div>
            <p className="text-xl font-semibold tracking-tight text-[#0F172A] dark:text-white">
              {value}
            </p>

            {sub && (
              <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] mt-1">
                {sub}
              </p>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#E2E8F0] dark:via-[#1F2933] to-transparent" />
        </div>
      ))}
    </div>
  );
};

export default InsightTile;