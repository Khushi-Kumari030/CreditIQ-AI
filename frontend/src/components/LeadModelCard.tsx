"use client";

import { ShieldCheck, Brain, BarChart3 } from "lucide-react";

export default function LeadModelCard() {
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>
          <p className="text-sm uppercase tracking-widest text-slate-400">
            Lead Model
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            XGBoost
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">

            <span
              className="
                bg-emerald-500/10
                text-[#00D09C]
                px-4 py-1
                rounded-full
                text-sm
                font-medium
              "
            >
              ACTIVE
            </span>

            <span
              className="
                bg-cyan-500/10
                text-cyan-400
                px-4 py-1
                rounded-full
                text-sm
                font-medium
              "
            >
              PRODUCTION
            </span>

          </div>
        </div>

        {/* Icons */}
        <div className="flex gap-4">

          <div
            className="
              bg-slate-800
              border border-slate-700
              rounded-2xl
              p-4
            "
          >
            <ShieldCheck className="w-7 h-7 text-[#00D09C]" />
          </div>

          <div
            className="
              bg-slate-800
              border border-slate-700
              rounded-2xl
              p-4
            "
          >
            <Brain className="w-7 h-7 text-[#00D09C]" />
          </div>

          <div
            className="
              bg-slate-800
              border border-slate-700
              rounded-2xl
              p-4
            "
          >
            <BarChart3 className="w-7 h-7 text-[#00D09C]" />
          </div>

        </div>

      </div>

      {/* Narrative */}
      <p
        className="
          mt-8
          text-slate-300
          leading-8
          max-w-4xl
        "
      >
        XGBoost serves as the Lead Model following comparative evaluation
        across candidate approaches. Its superior discriminatory capability
        and enhanced sensitivity towards identifying potentially high-risk
        borrowers supported its selection for production deployment.
      </p>

      {/* Metrics */}
      <div
        className="
          mt-8
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >

        <div
          className="
            bg-slate-800/60
            border border-slate-700
            rounded-2xl
            p-6
          "
        >
          <p className="text-slate-400 text-sm">
            ROC–AUC
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            0.860
          </h3>
        </div>

        <div
          className="
            bg-slate-800/60
            border border-slate-700
            rounded-2xl
            p-6
          "
        >
          <p className="text-slate-400 text-sm">
            Recall
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            0.765
          </h3>
        </div>

        <div
          className="
            bg-slate-800/60
            border border-slate-700
            rounded-2xl
            p-6
          "
        >
          <p className="text-slate-400 text-sm">
            F1 Score
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            0.332
          </h3>
        </div>

      </div>
    </section>
  );
}