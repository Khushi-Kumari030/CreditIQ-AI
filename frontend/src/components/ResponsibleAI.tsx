"use client";

import {
  Eye,
  ShieldCheck,
  Users,
  ClipboardCheck,
} from "lucide-react";

const principles = [
  {
    title: "Transparency",
    description:
      "Every prediction is accompanied by feature-level explanations to improve interpretability.",
    icon: Eye,
  },
  {
    title: "Human Oversight",
    description:
      "Insights are designed to support analysts rather than replace expert judgement.",
    icon: Users,
  },
  {
    title: "Consistency",
    description:
      "Identical borrower profiles receive consistent evaluations under the same model settings.",
    icon: ShieldCheck,
  },
  {
    title: "Accountability",
    description:
      "Decision pathways remain auditable through explainability outputs and governance controls.",
    icon: ClipboardCheck,
  },
];

export default function ResponsibleAI() {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

      <div className="mb-10">

        <h2 className="text-3xl font-bold text-white">
          Responsible AI Principles
        </h2>

        <p className="mt-3 text-slate-400 max-w-3xl leading-7">
          CreditIQ AI has been designed to encourage transparent,
          accountable, and human-centric decision support.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {principles.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                bg-slate-800/50
                border border-slate-700
                rounded-3xl
                p-6
              "
            >

              <div
                className="
                  w-14 h-14
                  rounded-2xl
                  bg-emerald-500/10
                  flex items-center justify-center
                "
              >
                <Icon
                  className="
                    w-7 h-7
                    text-[#00D09C]
                  "
                />
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-4 text-slate-400 leading-7">
                {item.description}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}