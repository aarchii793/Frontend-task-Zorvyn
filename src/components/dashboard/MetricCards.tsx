import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { formatINR } from "../../utils/currency";
import { cn } from "../../utils/cn";

type DeltaResult = {
  text: string;
  trend: "up" | "down" | "flat" | "none";
  value: number | null;
};

interface MetricCardsProps {
  currentBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactionCount: number;
  incomeDelta: DeltaResult;
  expenseDelta: DeltaResult;
}

const MetricCards = ({
  currentBalance,
  totalIncome,
  totalExpenses,
  transactionCount,
  incomeDelta,
  expenseDelta,
}: MetricCardsProps) => {
  const cards = [
    {
      label: "Balance",
      value: formatINR(currentBalance),
      icon: Wallet,
      tone:
        currentBalance >= 0 ? "neutral" : "negative",
      delta: null,
    },
    {
      label: "Income",
      value: formatINR(totalIncome),
      icon: TrendingUp,
      tone: "positive",
      delta: incomeDelta,
    },
    {
      label: "Expenses",
      value: formatINR(totalExpenses),
      icon: TrendingDown,
      tone: "negative",
      delta: expenseDelta,
    },
    {
      label: "Transactions",
      value: transactionCount.toString(),
      icon: ArrowLeftRight,
      tone: "neutral",
      delta: null,
    },
  ];

  const toneMap: Record<
    string,
    { icon: string; value: string }
  > = {
    neutral: {
      icon: "bg-[#F1F5F9] dark:bg-[#11161C] text-[#64748B] dark:text-[#9CA3AF]",
      value: "text-[#0F172A] dark:text-white",
    },
    positive: {
      icon: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      value: "text-[#0F172A] dark:text-white",
    },
    negative: {
      icon: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
      value:
        "text-rose-600 dark:text-rose-400",
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map(
        ({ label, value, icon: Icon, tone, delta }) => (
          <div
            key={label}
            className="relative rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14] p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-[1px]"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-[#64748B] dark:text-[#9CA3AF]">
                  {label}
                </p>
              </div>

              <div
                className={cn(
                  "p-2.5 rounded-xl",
                  toneMap[tone].icon
                )}
              >
                <Icon size={18} />
              </div>
            </div>

            <div className="space-y-1">
              <p
                className={cn(
                  "text-xl font-semibold tracking-tight",
                  toneMap[tone].value
                )}
              >
                {value}
              </p>

              {delta && delta.trend !== "none" && (
                <p
                  className={cn(
                    "text-xs flex items-center",
                    delta.trend === "up"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : delta.trend === "down"
                      ? "text-rose-600 dark:text-rose-400"
                      : "text-[#64748B]"
                  )}
                >
                  {delta.trend === "up" && (
                    <ArrowUp
                      size={14}
                      className="mr-1"
                    />
                  )}
                  {delta.trend === "down" && (
                    <ArrowDown
                      size={14}
                      className="mr-1"
                    />
                  )}
                  {delta.text}
                </p>
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#E2E8F0] dark:via-[#1F2933] to-transparent" />
          </div>
        )
      )}
    </div>
  );
};

export default MetricCards;
