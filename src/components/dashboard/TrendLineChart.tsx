import { useMemo, useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { formatINR, abbreviateINR } from "../../utils/currency";
import type { MonthlyBreakdown } from "../../types/finance";

interface TrendLineChartProps {
  monthlyBreakdown: MonthlyBreakdown[];
}

interface CumulativePoint {
  month: string;
  balance: number;
}

const TrendLineChart = ({
  monthlyBreakdown,
}: TrendLineChartProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(
        document.documentElement.classList.contains("dark")
      );
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const data = useMemo<CumulativePoint[]>(() => {
    let running = 0;
    return monthlyBreakdown.map(
      ({ month, income, expenses }) => {
        running += income - expenses;
        return {
          month,
          balance: running,
        };
      }
    );
  }, [monthlyBreakdown]);

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14] h-[320px] flex items-center justify-center">
        <p className="text-sm text-[#64748B] dark:text-[#9CA3AF]">
          No trend data available
        </p>
      </div>
    );
  }

  const lineColor = isDark ? "#A78BFA" : "#7C3AED";

  return (
    <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14] flex flex-col">
      
      <div className="px-6 py-5 border-b border-[#E2E8F0] dark:border-[#1F2933]">
        <h3 className="text-sm font-semibold tracking-tight text-[#0F172A] dark:text-white">
          Balance Trend
        </h3>
        <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] mt-1">
          Running balance over time
        </p>
      </div>

      <div className="px-4 pb-6 pt-2 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="trendGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={lineColor}
                  stopOpacity={0.25}
                />
                <stop
                  offset="100%"
                  stopColor={lineColor}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

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
                borderRadius: "10px",
                border: "1px solid #E2E8F0",
                backgroundColor: isDark
                  ? "#0F141A"
                  : "#FFFFFF",
                color: isDark ? "#FFFFFF" : "#0F172A",
                fontSize: "12px",
              }}
              formatter={(value: any) => [
                formatINR(value),
                "Balance",
              ]}
            />

            <Area
              type="monotone"
              dataKey="balance"
              stroke={lineColor}
              strokeWidth={2.5}
              fill="url(#trendGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: lineColor,
                strokeWidth: 0,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendLineChart;