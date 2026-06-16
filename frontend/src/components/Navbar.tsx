"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { IndianRupee } from "lucide-react";

const navItems = [
  { name: "Overview", href: "/" },
  { name: "Models", href: "/models" },
  { name: "Simulator", href: "/simulator" },
  { name: "Explainability", href: "/explainability" },
  { name: "Copilot", href: "/copilot" },
];

export default function Navbar() {const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0B1120]/95 backdrop-blur">

      <div className="w-full px-8 h-16 flex items-center ">

        

          <Link
            href="/"
            className="text-2xl font-bold text-white"
          >
            <div className="flex items-center gap-3">
              <IndianRupee
                size={32}
                className="text-[#00D09C]"
              />

              <span className="text-3xl font-bold text-white">
                CreditIQ AI
              </span>
            </div>
            
          </Link>

          <nav className="
            hidden
            lg:flex
            items-center
            gap-18
            ml-auto
            mr-20
          ">

            {navItems.map((item) => (

              <Link
                key={item.name}
                href={item.href}
                className={`pb-1 border-b-2 transition
                ${
                pathname === item.href
                    ? "border-[#00D09C] text-white"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                {item.name}
              </Link>

            ))}

          </nav>

        

        <div className="flex items-center gap-4">


         

        </div>

      </div>

    </header>
  );
}