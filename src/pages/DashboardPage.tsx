import { useDerivedFinancials } from "../hooks/useDerivedFinancials";
import { useRoleStore } from "../store/roleStore";
import { useTransactionStore } from "../store/transactionStore";
import MetricCards from "../components/dashboard/MetricCards";
import TrendLineChart from "../components/dashboard/TrendLineChart";
import CategoryDonutChart from "../components/dashboard/CategoryDonutChart";
import RecentTransactionsMini from "../components/dashboard/RecentTransactionsMini";
import { Wallet, Plus } from "lucide-react";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const {
    visibleTransactions,
    totalIncome,
    totalExpenses,
    currentBalance,
    monthlyBreakdown,
    categoryTotals,
    incomeDelta,
    expenseDelta,
  } = useDerivedFinancials();

  const transactions = useTransactionStore((s) => s.transactions);
  const activeRole = useRoleStore((s) => s.activeRole);
  const navigate = useNavigate();

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] border border-dashed border-[#E2E8F0] dark:border-[#1F2933] rounded-2xl bg-white dark:bg-[#0B0F14] p-10">
        
        <div className="w-16 h-16 rounded-2xl bg-[#F1F5F9] dark:bg-[#11161C] flex items-center justify-center mb-6">
          <Wallet size={28} className="text-[#64748B] dark:text-[#9CA3AF]" />
        </div>

        <h2 className="text-lg font-semibold text-[#0F172A] dark:text-white tracking-tight mb-2">
          Welcome to SmartLedger
        </h2>

        <p className="text-sm text-[#64748B] dark:text-[#9CA3AF] text-center max-w-sm mb-8">
          {activeRole === "admin"
            ? "Add your first transaction to start tracking your finances."
            : "No data available yet. Please wait for transactions to be added."}
        </p>

        {activeRole === "admin" && (
          <Button
            onClick={() => navigate("/transactions")}
            className="flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            <Plus size={16} />
            Add Transaction
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      <MetricCards
        currentBalance={currentBalance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        transactionCount={visibleTransactions.length}
        incomeDelta={incomeDelta}
        expenseDelta={expenseDelta}
      />

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3">
          <TrendLineChart monthlyBreakdown={monthlyBreakdown} />
        </div>

        <div className="xl:col-span-2">
          <CategoryDonutChart categoryTotals={categoryTotals} />
        </div>
      </div>

      <div>
        <RecentTransactionsMini transactions={visibleTransactions} />
      </div>
    </div>
  );
};

export default DashboardPage;