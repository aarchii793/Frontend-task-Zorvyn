import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { useRoleStore } from "../../store/roleStore";

const navItems = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/insights", label: "Insights", icon: Lightbulb },
];

interface AppSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const AppSidebar = ({ mobileOpen, onClose }: AppSidebarProps) => {
  const activeRole = useRoleStore((s) => s.activeRole);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-72 flex flex-col transition-transform duration-300",
          "bg-white dark:bg-[#0B0F14]",
          "border-r border-[#E2E8F0] dark:border-[#1F2933]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#E2E8F0] dark:border-[#1F2933]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0EA5E9] to-[#14B8A6] flex items-center justify-center shadow-md">
              <Wallet size={18} className="text-white" />
            </div>

            <div className="leading-tight">
              <h1 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-white">
                SmartLedger
              </h1>
              <p className="text-xs text-[#64748B] dark:text-[#9CA3AF]">
                Finance Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            <X size={18} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-[#E0F2FE] text-[#0284C7] dark:bg-[#0EA5E9]/10 dark:text-[#38BDF8]"
                    : "text-[#64748B] dark:text-[#9CA3AF] hover:bg-[#F1F5F9] dark:hover:bg-white/5 hover:text-[#0F172A] dark:hover:text-white"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    className={cn(
                      isActive
                        ? "text-[#0284C7] dark:text-[#38BDF8]"
                        : "text-[#94A3B8] dark:text-[#6B7280]"
                    )}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-[#E2E8F0] dark:border-[#1F2933]">
          <div className="rounded-xl border border-[#E2E8F0] dark:border-[#1F2933] p-4 bg-[#F8FAFC] dark:bg-[#11161C]">
            <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] mb-1">
              Current Role
            </p>

            <p className="text-sm font-semibold text-[#0F172A] dark:text-white mb-3">
              {activeRole === "admin" ? "Admin Access" : "Viewer Access"}
            </p>

            <div
              className={cn(
                "text-xs font-medium px-3 py-1.5 rounded-lg w-fit",
                activeRole === "admin"
                  ? "bg-[#E0F2FE] text-[#0284C7] dark:bg-[#0EA5E9]/10 dark:text-[#38BDF8]"
                  : "bg-gray-200 text-gray-600 dark:bg-[#1F2933] dark:text-[#9CA3AF]"
              )}
            >
              {activeRole === "admin" ? "Full Control" : "Read Only"}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;