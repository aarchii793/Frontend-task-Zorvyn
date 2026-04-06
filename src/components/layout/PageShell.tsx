import { useState, useCallback, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import TopNavbar from "./TopNavbar";

interface PageShellProps {
  children: ReactNode;
}

const pageTitles: Record<string, string> = {
  "/": "Overview",
  "/transactions": "Transactions",
  "/insights": "Insights",
};

const PageShell = ({ children }: PageShellProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] ?? "SmartLedger";

  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F14] text-[#0F172A] dark:text-white">
      <AppSidebar mobileOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="md:ml-16 lg:ml-65 flex flex-col min-h-screen transition-all duration-300">
        <TopNavbar pageTitle={pageTitle} onMenuToggle={toggleSidebar} />

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-[#11161C] border border-[#E2E8F0] dark:border-[#1F2933] rounded-2xl shadow-sm p-6 lg:p-8 transition-all">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageShell;