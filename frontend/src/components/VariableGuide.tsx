"use client";

import {
  CreditCard,
  User,
  Clock3,
  Wallet,
  IndianRupee,
  Landmark,
  AlertTriangle,
  Building,
  Users,
  ShieldCheck,
} from "lucide-react";

import { variableGuide } from "@/data/variableGuide";

const iconMap = {
  CreditCard,
  User,
  Clock3,
  Wallet,
  IndianRupee,
  Landmark,
  AlertTriangle,
  Building,
  Users,
  ClockAlert: ShieldCheck,
};

export default function VariableGuide() {
  return (
    <section
      className="
        bg-slate-900
        border border-slate-800
        rounded-3xl
        p-8
      "
    >
      {/* Header */}

      <div className="mb-10">

        <h2 className="text-3xl font-bold text-white">
          Understanding Borrower Variables
        </h2>

        <p className="mt-3 text-slate-400 max-w-3xl leading-7">
          Contextual guidance designed to support accurate borrower
          profiling and improve input quality during risk assessment.
        </p>

      </div>

      {/* Flashcards */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {variableGuide.map((item) => {
          const Icon =
            iconMap[item.icon as keyof typeof iconMap];

          return (
            <div
              key={item.title}
              className="
                bg-slate-800/50
                border border-slate-700
                rounded-3xl
                p-6
                hover:border-[#00D09C]/40
                hover:-translate-y-1
                transition
              "
            >
              {/* Icon */}

              <div
                className="
                  w-12 h-12
                  rounded-2xl
                  bg-emerald-500/10
                  flex items-center justify-center
                "
              >
                <Icon
                  className="
                    w-6 h-6
                    text-[#00D09C]
                  "
                />
              </div>

              {/* Title */}

              <h3
                className="
                  mt-5
                  text-xl
                  font-semibold
                  text-white
                "
              >
                {item.title}
              </h3>

              {/* Definition */}

              <p
                className="
                  mt-4
                  text-slate-300
                  leading-7
                "
              >
                {item.definition}
              </p>

              {/* Example */}

              <div
                className="
                  mt-5
                  rounded-2xl
                  bg-slate-900/60
                  border border-slate-700
                  p-4
                "
              >
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Example
                </p>

                <p className="mt-2 text-slate-300 leading-6">
                  {item.example}
                </p>
              </div>

              {/* Risk Interpretation */}

              <div className="mt-5">

                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Business Interpretation
                </p>

                <p
                  className="
                    mt-2
                    text-slate-400
                    leading-7
                  "
                >
                  {item.implication}
                </p>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}