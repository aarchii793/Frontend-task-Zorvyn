import { useState, useEffect, useCallback } from "react";
import { Menu, Sun, Moon, Download } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useRoleStore } from "../../store/roleStore";
import { useTransactionStore } from "../../store/transactionStore";
import { useDerivedFinancials } from "../../hooks/useDerivedFinancials";
import { downloadAsCSV } from "../../utils/fileExport";
import SelectInput from "../ui/SelectInput";
import Button from "../ui/Button";
import type { Role } from "../../types/finance";

interface TopNavbarProps {
  pageTitle: string;
  onMenuToggle: () => void;
}

const TopNavbar = ({ pageTitle, onMenuToggle }: TopNavbarProps) => {
  const { activeRole, switchRole } = useRoleStore();
  const { visibleTransactions } = useDerivedFinancials();
  const rawTransactions = useTransactionStore((s) => s.transactions);
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("fin-theme");
    const prefersDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("fin-theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  const handleExport = useCallback(() => {
    const toExport =
      location.pathname === "/transactions"
        ? visibleTransactions
        : rawTransactions;

    downloadAsCSV(
      toExport,
      `SmartLedger-${new Date().toISOString().slice(0, 10)}.csv`
    );
  }, [visibleTransactions, rawTransactions, location.pathname]);

  const handleRoleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      switchRole(e.target.value as Role);
    },
    [switchRole]
  );

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-10 bg-white dark:bg-[#0B0F14] border-b border-[#E2E8F0] dark:border-[#1F2933]">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition"
        >
          <Menu size={18} className="text-gray-600 dark:text-gray-300" />
        </button>

        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0F172A] dark:text-white">
            {pageTitle}
          </h1>
          <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] hidden sm:block">
            Manage your financial data
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <SelectInput
            id="role-switcher"
            value={activeRole}
            onChange={handleRoleChange}
            options={[
              { value: "admin", label: "Admin" },
              { value: "viewer", label: "Viewer" },
            ]}
            className="w-28 text-xs py-1.5 bg-white dark:bg-[#11161C] border border-[#E2E8F0] dark:border-[#1F2933] rounded-lg text-[#0F172A] dark:text-white"
          />
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-[#E2E8F0] dark:border-[#1F2933] hover:bg-gray-100 dark:hover:bg-white/10 transition"
        >
          {isDark ? (
            <Sun size={16} className="text-gray-700 dark:text-gray-300" />
          ) : (
            <Moon size={16} className="text-gray-700 dark:text-gray-300" />
          )}
        </button>

        <Button
          onClick={handleExport}
          className="hidden sm:flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          <Download size={16} />
          Export
        </Button>

        <button
          onClick={handleExport}
          className="sm:hidden p-2 rounded-lg border border-[#E2E8F0] dark:border-[#1F2933] hover:bg-gray-100 dark:hover:bg-white/10 transition"
        >
          <Download size={16} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;