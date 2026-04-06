import { useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { useDerivedFinancials } from "../hooks/useDerivedFinancials";
import { useRoleStore } from "../store/roleStore";
import TransactionList from "../components/transactions/TransactionList";
import FilterToolbar from "../components/transactions/FilterToolbar";
import TransactionFormModal from "../components/transactions/TransactionFormModal";
import Button from "../components/ui/Button";
import type { Transaction } from "../types/finance";

const TransactionsPage = () => {
  const { visibleTransactions } = useDerivedFinancials();
  const activeRole = useRoleStore((s) => s.activeRole);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const handleAdd = useCallback(() => {
    setEditingTx(null);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((tx: Transaction) => {
    setEditingTx(tx);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setEditingTx(null);
  }, []);

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[#0F172A] dark:text-white tracking-tight">
            Transactions
          </h2>
          <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] mt-1">
            {visibleTransactions.length}{" "}
            {visibleTransactions.length === 1
              ? "record"
              : "records"}
          </p>
        </div>

        {activeRole === "admin" && (
          <Button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            <Plus size={16} />
            Add
          </Button>
        )}
      </div>

      <div>
        <FilterToolbar />
      </div>

      <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14] overflow-hidden">
        <TransactionList
          transactions={visibleTransactions}
          onEdit={handleEdit}
        />
      </div>

      {activeRole === "admin" && (
        <TransactionFormModal
          open={modalOpen}
          onClose={handleCloseModal}
          editingTransaction={editingTx}
        />
      )}
    </div>
  );
};

export default TransactionsPage;  