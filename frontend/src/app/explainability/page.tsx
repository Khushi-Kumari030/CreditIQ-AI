"use client";

import { useCreditIQ } from "@/context/CreditIQContext";

import DashboardLayout from "@/components/DashboardLayout";

import ExplainabilitySummary from "@/components/ExplainabilitySummary";
import RiskDrivers from "@/components/RiskDrivers";
import ImpactRanking from "@/components/ImpactRanking";
import ResponsibleAI from "@/components/ResponsibleAI";

export default function ExplainabilityPage() {
    const {
        prediction,
        explanation,
    } = useCreditIQ();


  /* Empty State */

  if (!prediction || !explanation) {
    return (
      <DashboardLayout>

        <div
          className="
            bg-slate-900
            border border-slate-800
            rounded-3xl
            p-10
          "
        >

          <h1 className="text-4xl font-bold text-white">
            Explainability & Decision Insights
          </h1>

          <p
            className="
              mt-6
              text-slate-400
              max-w-2xl
              leading-8
            "
          >
            No decision insights are available yet.
            Run a borrower assessment in the Simulator
            to generate prediction explanations.
          </p>

        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <section>

          <h1 className="text-4xl font-bold text-white">
            Explainability & Decision Insights
          </h1>

          <p
            className="
              mt-4
              text-slate-400
              max-w-4xl
              leading-8
            "
          >
            Understand why the Lead Model reached a
            particular decision through feature-level
            explanations powered by SHAP.
          </p>

        </section>

        <ExplainabilitySummary
          prediction={prediction}
        />

        <RiskDrivers
          drivers={explanation.drivers}
        />

        <ImpactRanking
          drivers={explanation.drivers}
        />

        <ResponsibleAI />

      </div>

    </DashboardLayout>
  );
}