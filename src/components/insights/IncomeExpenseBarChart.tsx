import { useMemo, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatINR, abbreviateINR } from "../../utils/currency";
import type { MonthlyBreakdown } from "../../types/finance";

interface IncomeExpenseBarChartProps {
  monthlyBreakdown: MonthlyBreakdown[];
}

const IncomeExpenseBarChart = ({
  monthlyBreakdown,
}: IncomeExpenseBarChartProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const data = useMemo(() => {
    return (monthlyBreakdown || []).map((item) => ({
      month: item.month,
      income: Number(item.income) || 0,
      expenses: Number(item.expenses) || 0,
    }));
  }, [monthlyBreakdown]);

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14] h-[360px] flex items-center justify-center">
        <p className="text-sm text-[#64748B] dark:text-[#9CA3AF]">
          No data available
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14]">
      
      <div className="px-6 py-5 border-b border-[#E2E8F0] dark:border-[#1F2933]">
        <h3 className="text-sm font-semibold text-[#0F172A] dark:text-white tracking-tight">
          Income vs Expenses
        </h3>
        <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] mt-1">
          Monthly financial trend
        </p>
      </div>

      <div className="px-4 pb-6 pt-2 h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap="18%"
            barGap={6}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={isDark ? "#1F2933" : "#E2E8F0"}
            />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 12,
                fill: isDark ? "#9CA3AF" : "#64748B",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={abbreviateINR}
              tick={{
                fontSize: 12,
                fill: isDark ? "#9CA3AF" : "#64748B",
              }}
              axisLine={false}
              tickLine={false}
              width={60}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                backgroundColor: isDark ? "#0F141A" : "#FFFFFF",
                color: isDark ? "#FFFFFF" : "#0F172A",
                fontSize: "12px",
              }}
              formatter={(value: any, name: any) => [
                formatINR(Number(value)),
                name === "income" ? "Income" : "Expenses",
              ]}
            />

            <Bar
              dataKey="income"
              fill={isDark ? "#34D399" : "#10B981"}
              radius={[8, 8, 0, 0]}
              barSize={20}
            />

            <Bar
              dataKey="expenses"
              fill={isDark ? "#FB7185" : "#F43F5E"}
              radius={[8, 8, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpenseBarChart;