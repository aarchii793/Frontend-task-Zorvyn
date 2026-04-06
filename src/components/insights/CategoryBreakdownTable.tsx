import { formatINR } from "../../utils/currency";
import { categoryConfig } from "../../constants/categoryConfig";
import type { CategoryTotal, SpendingCategory } from "../../types/finance";

interface CategoryBreakdownTableProps {
  categoryTotals: CategoryTotal[];
}

const CategoryBreakdownTable = ({
  categoryTotals,
}: CategoryBreakdownTableProps) => {
  const grandTotal = categoryTotals.reduce(
    (sum, c) => sum + c.total,
    0
  );

  if (categoryTotals.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14] p-10 flex items-center justify-center">
        <p className="text-sm text-[#64748B] dark:text-[#9CA3AF]">
          No expense data available
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14] overflow-hidden">
      
      <div className="px-6 py-5 border-b border-[#E2E8F0] dark:border-[#1F2933]">
        <h3 className="text-sm font-semibold text-[#0F172A] dark:text-white tracking-tight">
          Category Breakdown
        </h3>
        <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] mt-1">
          Expense distribution overview
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          
          <thead className="bg-[#F8FAFC] dark:bg-[#11161C] border-b border-[#E2E8F0] dark:border-[#1F2933]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#64748B] dark:text-[#9CA3AF]">
                Category
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#64748B] dark:text-[#9CA3AF]">
                Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#64748B] dark:text-[#9CA3AF]">
                %
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#64748B] dark:text-[#9CA3AF]">
                Count
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#64748B] dark:text-[#9CA3AF]">
                Progress
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1F2933]">
            {categoryTotals.map(({ category, total, count }) => {
              const config =
                categoryConfig[category as SpendingCategory];
              const pct =
                grandTotal > 0 ? (total / grandTotal) * 100 : 0;

              return (
                <tr
                  key={category}
                  className="hover:bg-[#F8FAFC] dark:hover:bg-[#11161C] transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            config?.hex ?? "#64748B",
                        }}
                      />
                      <span className="text-sm font-medium text-[#0F172A] dark:text-white">
                        {category}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right text-sm font-medium text-[#0F172A] dark:text-white">
                    {formatINR(total)}
                  </td>

                  <td className="px-6 py-4 text-right text-xs text-[#64748B] dark:text-[#9CA3AF]">
                    {pct.toFixed(1)}%
                  </td>

                  <td className="px-6 py-4 text-right text-xs text-[#64748B] dark:text-[#9CA3AF]">
                    {count}
                  </td>

                  <td className="px-6 py-4">
                    <div className="w-full h-2 rounded-full bg-[#F1F5F9] dark:bg-[#11161C] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(pct, 100)}%`,
                          background:
                            config?.hex ?? "#64748B",
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryBreakdownTable;