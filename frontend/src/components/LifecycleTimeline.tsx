"use client";

import {
  Database,
  Settings2,
  Brain,
  BarChart3,
  ShieldCheck,
  Rocket,
  SearchCheck,
} from "lucide-react";

const steps = [
  {
    title: "Data Preparation",
    description:
      "Borrower records were cleaned, validated, and prepared for modelling.",
    icon: Database,
  },
  {
    title: "Feature Engineering",
    description:
      "Relevant borrower attributes were transformed into predictive inputs.",
    icon: Settings2,
  },
  {
    title: "Candidate Development",
    description:
      "Multiple algorithms were trained and evaluated under varying conditions.",
    icon: Brain,
  },
  {
    title: "Performance Validation",
    description:
      "Models were benchmarked using discrimination and classification metrics.",
    icon: BarChart3,
  },
  {
    title: "Lead Model Selection",
    description:
      "The most suitable model was selected based on deployment objectives.",
    icon: ShieldCheck,
  },
  {
    title: "Production Deployment",
    description:
      "The approved model was integrated into the decision workflow.",
    icon: Rocket,
  },
  {
    title: "Explainability Review",
    description:
      "Predictions are complemented with explanations to support transparency.",
    icon: SearchCheck,
  },
];

export default function LifecycleTimeline() {
  return (
    <section
      className="
        bg-slate-900
        border border-slate-800
        rounded-3xl
        p-8
      "
    >
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white">
          Model Development Lifecycle
        </h2>

        <p className="mt-3 text-slate-400 max-w-3xl leading-7">
          Governance framework followed prior to deployment to ensure
          robust performance, transparency, and responsible adoption.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="flex gap-5 items-start"
            >
              {/* Icon */}

              <div
                className="
                  flex-shrink-0
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

              {/* Content */}

              <div className="flex-1">

                <div className="flex items-center gap-3">

                  <span
                    className="
                      text-sm
                      font-medium
                      text-slate-500
                    "
                  >
                    Step {index + 1}
                  </span>

                  <div className="h-px flex-1 bg-slate-800" />

                </div>

                <h3
                  className="
                    mt-2
                    text-xl
                    font-semibold
                    text-white
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-slate-400
                    leading-7
                  "
                >
                  {step.description}
                </p>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}