"use client";

import {
  LayoutDashboard,
  Users,
  BarChart3,
  Search,
  Calculator,
  Bot,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCreditIQ } from "@/context/CreditIQContext";

export default function Sidebar() {
  const pathname = usePathname();
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
  } = useCreditIQ();
  return (
    <aside
      className={`
        hidden md:flex
        ${sidebarCollapsed ? "w-20" : "w-64"}
        h-[calc(100vh-64px)]
        bg-slate-950
        border-r border-slate-800
        flex-col
        p-6
        transition-all duration-300
      `}
    >

      <button
        onClick={() =>
          setSidebarCollapsed(!sidebarCollapsed)
        }
        className={`
          mb-6
          p-3
          rounded-xl
          hover:bg-slate-800
          text-slate-300
          ${
            sidebarCollapsed
              ? "self-center"
              : "self-start"
          }
        `}
      >
        {sidebarCollapsed ? (
          <ChevronRight size={20} />
        ) : (
          <ChevronLeft size={20} />
        )}
      </button>

      {!sidebarCollapsed && (
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">
          Main
        </p>
      )}

      <div className="flex flex-col gap-2">

        <Link
          href="/"
          className={`
            ${
              sidebarCollapsed
                ? "p-3"
                : "px-4 py-3"
            }
            rounded-xl
            transition

            ${
              pathname === "/"
                ? "bg-[#00D09C] text-slate-950 font-medium"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }
          `}
        >
          <div
            className={`
              flex items-center
              ${
                sidebarCollapsed
                  ? "justify-center w-full"
                  : "gap-3"
              }
            `}
          >
            <LayoutDashboard
              size={sidebarCollapsed ? 28 : 20}
              className={`
                shrink-0
                ${pathname === "/" ? "text-slate-950" : ""}
              `}
            />

            {!sidebarCollapsed && (
              <span>Dashboard</span>
            )}
          </div>
        </Link>

        <Link
          href="/borrowers"
          className={`
            ${
              sidebarCollapsed
                ? "p-3"
                : "px-4 py-3"
            }
            rounded-xl
            transition

            ${
              pathname === "/borrowers"
                ? "bg-[#00D09C] text-slate-950 font-medium"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }
          `}
        >
          <div
            className={`
              flex items-center
              ${
                sidebarCollapsed
                  ? "justify-center w-full"
                  : "gap-3"
              }
            `}
          >
            <Users
              size={26}
              className={`
                shrink-0
                ${pathname === "/borrowers" ? "text-slate-950": ""}
              `}
            />

            {!sidebarCollapsed && (
              <span>Borrower Inputs</span>
            )}
          </div>
        </Link>

      </div>

      {!sidebarCollapsed && (
        <p className="text-xs text-slate-500 uppercase tracking-widest mt-10 mb-4">
          Analytics
        </p>
      )}

      <div className="flex flex-col gap-2">

        <Link
          href="/models"
          className={`
            ${
              sidebarCollapsed
                ? "p-3"
                : "px-4 py-3"
            }
            rounded-xl
            transition

            ${
              pathname === "/models"
                ? "bg-[#00D09C] text-slate-950 font-medium"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }
          `}
        >
          <div
            className={`
              flex items-center
              ${
                sidebarCollapsed
                  ? "justify-center w-full"
                  : "gap-3"
              }
            `}
          >
            <BarChart3
              size={26}
              className={`
                shrink-0
                ${
                pathname === "/models"
                  ? "text-slate-950"
                  : ""}
              `}
            />

            {!sidebarCollapsed && (
              <span>Models</span>
            )}
          </div>
        </Link>


        <Link
          href="/simulator"
          className={`
            ${
              sidebarCollapsed
                ? "p-3"
                : "px-4 py-3"
            }
            rounded-xl
            transition

            ${
              pathname === "/simulator"
                ? "bg-[#00D09C] text-slate-950 font-medium"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }
          `}
        >
          <div
            className={`
              flex items-center
              ${
                sidebarCollapsed
                  ? "justify-center w-full"
                  : "gap-3"
              }
            `}
          >
            <Calculator
              size={26}
              className={`
                shrink-0
                ${
                pathname === "/simulator"
                  ? "text-slate-950"
                  : ""}
              `}
            />

            {!sidebarCollapsed && (
              <span>Simulator</span>
            )}
          </div>
        </Link>


        <Link
          href="/explainability"
          className={`
            ${
              sidebarCollapsed
                ? "p-3"
                : "px-4 py-3"
            }
            rounded-xl
            transition

            ${
              pathname === "/explainability"
                ? "bg-[#00D09C] text-slate-950 font-medium"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }
          `}
        >
          <div
            className={`
              flex items-center
              ${
                sidebarCollapsed
                  ? "justify-center w-full"
                  : "gap-3"
              }
            `}
          >
            <Search
              size={26}
              className={`
                shrink-0
                ${
                pathname === "/explainability"
                  ? "text-slate-950"
                  : ""}
              `}
            />

            {!sidebarCollapsed && (
              <span>Explainability</span>
            )}
          </div>
        </Link>

        
      </div>

      {!sidebarCollapsed && (
        <p className="text-xs text-slate-500 uppercase tracking-widest mt-10 mb-4">
          AI Copilot
        </p>
      )}

      <Link
          href="/copilot"
          className={`
            ${
              sidebarCollapsed
                ? "p-3"
                : "px-4 py-3"
            }
            rounded-xl
            transition

            ${
              pathname === "/copilot"
                ? "bg-[#00D09C] text-slate-950 font-medium"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }
          `}
        >
          <div
            className={`
              flex items-center
              ${
                sidebarCollapsed
                  ? "justify-center w-full"
                  : "gap-3"
              }
            `}
          >
            <Bot
              size={26}
              className={`
                shrink-0
                ${
                pathname === "/copilot"
                  ? "text-slate-950"
                  : ""}
              `}
            />

            {!sidebarCollapsed && (
              <span>Credit Copilot</span>
            )}
          </div>
        </Link>

    </aside>
  );
}