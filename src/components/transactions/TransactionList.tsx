import { useState, useCallback } from "react";
import { Pencil, Trash2, ArrowUpDown, SearchX } from "lucide-react";
import { formatINR, formatDisplayDate } from "../../utils/currency";
import { categoryConfig } from "../../constants/categoryConfig";
import { cn } from "../../utils/cn";
import { useRoleStore } from "../../store/roleStore";
import { useTransactionStore } from "../../store/transactionStore";
import { useFilterStore } from "../../store/filterStore";
import type { Transaction, SpendingCategory } from "../../types/finance";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
}

const TransactionList = ({ transactions, onEdit }: TransactionListProps) => {
  const activeRole = useRoleStore((s) => s.activeRole);
  const removeEntry = useTransactionStore((s) => s.removeEntry);
  const { sortField, sortDirection, setSortField, setSortDirection } =
    useFilterStore();
  const clearAllFilters = useFilterStore((s) => s.clearAllFilters);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleSort = useCallback(
    (field: "date" | "amount") => {
      if (sortField === field) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortDirection("desc");
      }
    },
    [sortField, sortDirection, setSortField, setSortDirection]
  );

  const handleDelete = useCallback(
    (id: string) => {
      removeEntry(id);
      setConfirmDeleteId(null);
    },
    [removeEntry]
  );

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border border-dashed border-[#E2E8F0] dark:border-[#1F2933] rounded-2xl">
        <div className="w-14 h-14 rounded-xl bg-[#F1F5F9] dark:bg-[#11161C] flex items-center justify-center mb-4">
          <SearchX size={24} className="text-[#94A3B8] dark:text-[#6B7280]" />
        </div>
        <h3 className="text-sm font-semibold text-[#0F172A] dark:text-white">
          No transactions found
        </h3>
        <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] mt-1 mb-4">
          Try adjusting filters
        </p>
        <button
          onClick={clearAllFilters}
          className="px-4 py-2 text-sm rounded-xl border border-[#E2E8F0] dark:border-[#1F2933] hover:bg-[#F8FAFC] dark:hover:bg-[#1F2933]"
        >
          Clear filters
        </button>
      </div>
    );
  }

  const SortIcon = ({ field }: { field: "date" | "amount" }) => (
    <ArrowUpDown
      size={14}
      className={cn(
        "inline ml-1",
        sortField === field
          ? "text-[#0F172A] dark:text-white"
          : "text-[#94A3B8]"
      )}
    />
  );

  return (
    <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#0B0F14] overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-[#F8FAFC] dark:bg-[#11161C] border-b border-[#E2E8F0] dark:border-[#1F2933]">
          <tr>
            <th
              onClick={() => handleSort("date")}
              className="px-5 py-3 text-left text-xs font-medium text-[#64748B] dark:text-[#9CA3AF] cursor-pointer"
            >
              Date <SortIcon field="date" />
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium text-[#64748B] dark:text-[#9CA3AF]">
              Description
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium text-[#64748B] dark:text-[#9CA3AF]">
              Category
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium text-[#64748B] dark:text-[#9CA3AF]">
              Type
            </th>
            <th
              onClick={() => handleSort("amount")}
              className="px-5 py-3 text-right text-xs font-medium text-[#64748B] dark:text-[#9CA3AF] cursor-pointer"
            >
              Amount <SortIcon field="amount" />
            </th>
            {activeRole === "admin" && (
              <th className="px-5 py-3 text-right text-xs font-medium text-[#64748B] dark:text-[#9CA3AF]">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#1F2933]">
          {transactions.map((tx) => {
            const config = categoryConfig[tx.category as SpendingCategory];
            const isDeleting = confirmDeleteId === tx.id;

            return (
              <tr
                key={tx.id}
                className="hover:bg-[#F8FAFC] dark:hover:bg-[#11161C] transition"
              >
                <td className="px-5 py-3 text-xs text-[#64748B] dark:text-[#9CA3AF]">
                  {formatDisplayDate(tx.date)}
                </td>

                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] dark:bg-[#11161C] flex items-center justify-center text-xs text-[#64748B] dark:text-[#9CA3AF]">
                      {tx.description.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-[#0F172A] dark:text-white">
                      {tx.description}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-3">
                  <span
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{
                      background: config?.color + "20",
                      color: config?.textColor,
                    }}
                  >
                    {tx.category}
                  </span>
                </td>

                <td className="px-5 py-3">
                  <span
                    className={cn(
                      "text-xs font-medium",
                      tx.kind === "income"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-[#64748B] dark:text-[#9CA3AF]"
                    )}
                  >
                    {tx.kind === "income" ? "Income" : "Expense"}
                  </span>
                </td>

                <td
                  className={cn(
                    "px-5 py-3 text-right text-sm font-medium",
                    tx.kind === "income"
                      ? "text-[#0F172A] dark:text-white"
                      : "text-[#64748B] dark:text-[#9CA3AF]"
                  )}
                >
                  {tx.kind === "income" ? "+" : "-"}
                  {formatINR(tx.amount)}
                </td>

                {activeRole === "admin" && (
                  <td className="px-5 py-3 text-right">
                    {isDeleting ? (
                      <div className="flex items-center justify-end gap-2 text-xs">
                        <button
                          onClick={() => handleDelete(tx.id)}
                          className="text-red-500"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="text-[#64748B]"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => onEdit(tx)}
                          className="p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1F2933]"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(tx.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;