"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useCreditIQ } from "@/context/CreditIQContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarCollapsed } = useCreditIQ();
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">

        <div
          className={`
            sticky top-16
            h-[calc(100vh-64px)]
            transition-all duration-300
          `}
        >
          <Sidebar />
        </div>

        <div
          className={`
            flex-1
            overflow-y-auto
            p-6 lg:p-8
            transition-all duration-300
          `}
        >
            {children}
        </div>

        </div>
    </main>
  );
}