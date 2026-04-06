import { useDerivedFinancials } from "../hooks/useDerivedFinancials";
import InsightTile from "../components/insights/InsightTile";
import IncomeExpenseBarChart from "../components/insights/IncomeExpenseBarChart";
import CategoryBreakdownTable from "../components/insights/CategoryBreakdownTable";

const InsightsPage = () => {
  const {
    monthlyBreakdown,
    categoryTotals,
    savingsRate,
    avgMonthlySpend,
    topCategoryByAmount,
    topCategoryByCount,
  } = useDerivedFinancials();

  const filteredMonthly = monthlyBreakdown.filter(
    (m) => m.income > 0 || m.expenses > 0
  );

  return (
    <div className="space-y-8">
      
      <div>
        <InsightTile
          topCategoryByAmount={topCategoryByAmount}
          topCategoryByCount={topCategoryByCount}
          avgMonthlySpend={avgMonthlySpend}
          savingsRate={savingsRate}
        />
      </div>

      <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14] p-6">
        <IncomeExpenseBarChart monthlyBreakdown={filteredMonthly} />
      </div>

      <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14] p-6">
        <CategoryBreakdownTable categoryTotals={categoryTotals} />
      </div>
    </div>
  );
};

export default InsightsPage;