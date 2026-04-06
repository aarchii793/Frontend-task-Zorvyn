import { useState, useCallback, useEffect } from "react";
import Modal from "../ui/Modal";
import { ALL_CATEGORIES } from "../../constants/categoryConfig";
import { useTransactionStore } from "../../store/transactionStore";
import type {
  Transaction,
  TransactionKind,
  SpendingCategory,
} from "../../types/finance";

interface TransactionFormModalProps {
  open: boolean;
  onClose: () => void;
  editingTransaction: Transaction | null;
}

interface FormData {
  description: string;
  amount: string;
  kind: TransactionKind;
  category: SpendingCategory;
  date: string;
}

const initialFormData: FormData = {
  description: "",
  amount: "",
  kind: "expense",
  category: "Food & Dining",
  date: new Date().toISOString().slice(0, 10),
};

const TransactionFormModal = ({
  open,
  onClose,
  editingTransaction,
}: TransactionFormModalProps) => {
  const { addEntry, modifyEntry } = useTransactionStore();
  const [form, setForm] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  const isEditMode = editingTransaction !== null;

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        description: editingTransaction.description,
        amount: editingTransaction.amount.toString(),
        kind: editingTransaction.kind,
        category: editingTransaction.category,
        date: editingTransaction.date,
      });
    } else {
      setForm(initialFormData);
    }
    setErrors({});
  }, [editingTransaction, open]);

  const validate = useCallback(() => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.description.trim()) newErrors.description = "Required";
    const amt = parseFloat(form.amount);
    if (isNaN(amt) || amt <= 0) newErrors.amount = "Invalid amount";
    if (!form.date) newErrors.date = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      const entry = {
        description: form.description.trim(),
        amount: parseFloat(form.amount),
        kind: form.kind,
        category: form.category,
        date: form.date,
      };

      if (isEditMode && editingTransaction) {
        modifyEntry(editingTransaction.id, entry);
      } else {
        addEntry(entry);
      }

      onClose();
    },
    [form, validate, isEditMode, editingTransaction, addEntry, modifyEntry, onClose]
  );

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const categoryOptions = ALL_CATEGORIES.map((c) => ({
    value: c,
    label: c,
  }));

  return (
    <Modal 
      open={open} 
      onClose={onClose}
      title={isEditMode ? "Edit Transaction" : "New Transaction"}
      className="bg-white dark:bg-[#0F141A] text-[#0F172A] dark:text-white"
    >
      <div className="">
        <div className="mb-6">
          <p className="text-sm text-[#64748B] dark:text-[#9CA3AF]">
            Enter transaction details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              value={form.description}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
              placeholder="Description"
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#11161C] text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20"
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => updateField("amount", e.target.value)}
              placeholder="Amount"
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#11161C]"
            />
            {errors.amount && (
              <p className="text-xs text-red-500 mt-1">
                {errors.amount}
              </p>
            )}
          </div>

          <div className="flex rounded-xl p-1 bg-[#F1F5F9] dark:bg-[#11161C] border border-[#E2E8F0] dark:border-[#1F2933]">
            {(["income", "expense"] as TransactionKind[]).map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => updateField("kind", kind)}
                className={`flex-1 py-2 text-sm rounded-lg transition ${
                  form.kind === kind
                    ? "bg-white dark:bg-[#1F2933] text-[#0F172A] dark:text-white shadow-sm"
                    : "text-[#64748B] dark:text-[#9CA3AF]"
                }`}
              >
                {kind}
              </button>
            ))}
          </div>

          <select
            value={form.category}
            onChange={(e) =>
              updateField(
                "category",
                e.target.value as SpendingCategory
              )
            }
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#11161C]"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div>
            <input
              type="date"
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#11161C]"
            />
            {errors.date && (
              <p className="text-xs text-red-500 mt-1">
                {errors.date}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#1F2933] text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-medium transition"
            >
              {isEditMode ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TransactionFormModal;