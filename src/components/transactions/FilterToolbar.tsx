import { Search, X } from "lucide-react";
import { useFilterStore } from "../../store/filterStore";
import { ALL_CATEGORIES } from "../../constants/categoryConfig";
import { cn } from "../../utils/cn";
import type { TransactionKind, SpendingCategory } from "../../types/finance";

const FilterToolbar = () => {
  const {
    keyword,
    setKeyword,
    kindFilter,
    setKindFilter,
    categoryFilter,
    setCategoryFilter,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    clearAllFilters,
  } = useFilterStore();

  const kindOptions = [
    { value: "all", label: "All" },
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...ALL_CATEGORIES.map((c) => ({ value: c, label: c })),
  ];

  const sortOptions = [
    { value: "date", label: "Date" },
    { value: "amount", label: "Amount" },
  ];

  const hasActiveFilters =
    keyword !== "" ||
    kindFilter !== "all" ||
    categoryFilter !== "all" ||
    fromDate !== null ||
    toDate !== null;

  return (
    <div className="sticky top-16 z-20 bg-white dark:bg-[#0B0F14] border-b border-[#E2E8F0] dark:border-[#1F2933] rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 ">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Search */}
          <div className="relative flex-1 min-w-[220px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] dark:text-[#6B7280]"
            />
            <input
              type="text"
              placeholder="Search transactions"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#11161C] text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center bg-[#F1F5F9] dark:bg-[#11161C] border border-[#E2E8F0] dark:border-[#1F2933] rounded-xl p-1">
            {kindOptions.map(({ value, label }) => (
              <button
                key={value}
                onClick={() =>
                  setKindFilter(value as "all" | TransactionKind)
                }
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
                  kindFilter === value
                    ? "bg-white dark:bg-[#1F2933] text-[#0F172A] dark:text-white shadow-sm"
                    : "text-[#64748B] dark:text-[#9CA3AF] hover:text-[#0F172A] dark:hover:text-white"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value as "all" | SpendingCategory)
            }
            className="w-40 py-2.5 px-3 text-sm rounded-xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#11161C] text-[#0F172A] dark:text-white"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={fromDate ?? ""}
              onChange={(e) => setFromDate(e.target.value || null)}
              className="w-[130px] py-2.5 px-2 text-sm rounded-xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#11161C]"
            />
            <span className="text-[#94A3B8]">-</span>
            <input
              type="date"
              value={toDate ?? ""}
              onChange={(e) => setToDate(e.target.value || null)}
              className="w-[130px] py-2.5 px-2 text-sm rounded-xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#11161C]"
            />
          </div>

          {/* Sort */}
          <select
            value={sortField}
            onChange={(e) =>
              setSortField(e.target.value as "date" | "amount")
            }
            className="w-32 py-2.5 px-3 text-sm rounded-xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#11161C]"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
            className="px-3 py-2.5 text-sm rounded-xl border border-[#E2E8F0] dark:border-[#1F2933] bg-white dark:bg-[#11161C] hover:bg-[#F8FAFC] dark:hover:bg-[#1F2933] transition"
          >
            {sortDirection === "asc" ? "↑" : "↓"}
          </button>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-3 py-2.5 text-sm rounded-xl text-[#64748B] dark:text-[#9CA3AF] hover:text-[#0F172A] dark:hover:text-white border border-transparent hover:border-[#E2E8F0] dark:hover:border-[#1F2933]"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;