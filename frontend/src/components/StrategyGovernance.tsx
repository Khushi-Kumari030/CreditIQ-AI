"use client";

import { strategyData } from "@/data/strategyData";
import { Scale, ShieldAlert } from "lucide-react";

export default function StrategyGovernance() {
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

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          Decision Strategy Governance
        </h2>

        <p className="mt-3 text-slate-400 max-w-3xl">
          Alternative operating strategies calibrated to align with
          varying institutional risk appetites and lending objectives.
        </p>

      </div>

      {/* Strategy Cards */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {strategyData.map((strategy) => (

          <div
            key={strategy.name}
            className="
              bg-slate-800/50
              border border-slate-700
              rounded-3xl
              p-6
            "
          >

            {/* Top */}

            <div className="flex justify-between items-start">

              <div>

                <h3 className="text-2xl font-semibold text-white">
                  {strategy.name}
                </h3>

                <span
                  className="
                    inline-block
                    mt-3
                    px-3 py-1
                    rounded-full
                    bg-emerald-500/10
                    text-[#00D09C]
                    text-xs
                    font-semibold
                  "
                >
                  {strategy.badge}
                </span>

              </div>

              <Scale className="w-8 h-8 text-[#00D09C]" />

            </div>

            {/* Threshold */}

            <div className="mt-8">

              <p className="text-slate-400 text-sm">
                Decision Threshold
              </p>

              <h4 className="text-4xl font-bold text-white mt-2">
                {strategy.threshold.toFixed(2)}
              </h4>

            </div>

            {/* Metrics */}

            <div className="grid grid-cols-3 gap-4 mt-8">

              <Metric
                label="Precision"
                value={strategy.precision}
              />

              <Metric
                label="Recall"
                value={strategy.recall}
              />

              <Metric
                label="F1"
                value={strategy.f1}
              />

            </div>

            {/* Interpretation */}

            <div
              className="
                mt-8
                rounded-2xl
                bg-slate-900/70
                border border-slate-700
                p-4
              "
            >

              <div className="flex gap-3">

                <ShieldAlert
                  className="
                    w-5 h-5
                    text-[#00D09C]
                    mt-1
                    flex-shrink-0
                  "
                />

                <p className="text-slate-300 leading-7">
                  {strategy.interpretation}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Governance Note */}

      <div
        className="
          mt-8
          rounded-2xl
          border border-slate-700
          bg-slate-800/40
          p-5
        "
      >

        <p className="text-slate-400 leading-7">

          Threshold strategies modify the decision boundary of the
          deployed model and do not alter the underlying model
          architecture. Different operating thresholds allow
          institutions to balance borrower identification sensitivity
          against decision precision.

        </p>

      </div>

    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div
      className="
        rounded-2xl
        bg-slate-900/60
        border border-slate-700
        p-4
        text-center
      "
    >

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-white">
        {value.toFixed(3)}
      </p>

    </div>
  );
}