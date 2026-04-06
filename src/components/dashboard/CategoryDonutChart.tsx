import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatINR } from "../../utils/currency";
import { categoryConfig } from "../../constants/categoryConfig";
import type { CategoryTotal, SpendingCategory } from "../../types/finance";

interface CategoryDonutChartProps {
  categoryTotals: CategoryTotal[];
}

const CategoryDonutChart = ({
  categoryTotals,
}: CategoryDonutChartProps) => {
  const grandTotal = categoryTotals.reduce(
    (sum, c) => sum + c.total,
    0
  );

  if (categoryTotals.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14] h-[320px] flex items-center justify-center">
        <p className="text-sm text-[#64748B] dark:text-[#9CA3AF]">
          No expense data available
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14] flex flex-col">
      
      <div className="px-6 py-5 border-b border-[#E2E8F0] dark:border-[#1F2933]">
        <h3 className="text-sm font-semibold tracking-tight text-[#0F172A] dark:text-white">
          Spending Distribution
        </h3>
        <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] mt-1">
          Category-wise expense share
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 p-6">
        
        <div className="w-full lg:w-[55%] h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryTotals}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={2}
                stroke="none"
                cornerRadius={8}
              >
                {categoryTotals.map((entry) => {
                  const config =
                    categoryConfig[
                      entry.category as SpendingCategory
                    ];
                  return (
                    <Cell
                      key={entry.category}
                      fill={config?.hex ?? "#64748B"}
                      className="transition-opacity hover:opacity-80"
                    />
                  );
                })}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#FFFFFF",
                  fontSize: "12px",
                }}
                formatter={(value: any) =>
                  formatINR(Number(value))
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-3">
          {categoryTotals.map((entry) => {
            const config =
              categoryConfig[
                entry.category as SpendingCategory
              ];
            const pct =
              grandTotal > 0
                ? (entry.total / grandTotal) * 100
                : 0;

            return (
              <div
                key={entry.category}
                className="flex items-center gap-3"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      config?.hex ?? "#64748B",
                  }}
                />

                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm text-[#0F172A] dark:text-white font-medium truncate">
                    {entry.category}
                  </span>

                  <span className="text-xs text-[#64748B] dark:text-[#9CA3AF] ml-2">
                    {pct.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryDonutChart;