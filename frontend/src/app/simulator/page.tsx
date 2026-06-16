"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useCreditIQ } from "@/context/CreditIQContext";
import { ScanSearch } from "lucide-react";
import Link from "next/link";

export default function SimulatorPage() {

  const {
    formData,
    setFormData,

    strategy,
    setStrategy,

    result,
    setResult,

    setPrediction,
    setExplanation,

    resetAnalysis,

    createCopilotSession,
  } = useCreditIQ();
  
  const labels = {
    RevolvingUtilizationOfUnsecuredLines: "Credit Utilization Ratio",
    age: "Age",
    NumberOfTime30_59DaysPastDueNotWorse: "30–59 Days Past Due",
    DebtRatio: "Debt Ratio",
    MonthlyIncome: "Monthly Income",
    NumberOfOpenCreditLinesAndLoans: "Open Credit Lines",
    NumberOfTimes90DaysLate: "90+ Days Late",
    NumberRealEstateLoansOrLines: "Real Estate Loans",
    NumberOfTime60_89DaysPastDueNotWorse: "60–89 Days Past Due",
    NumberOfDependents: "Dependents",
  };

  
  const [loading, setLoading] = useState(false);

  async function analyzeRisk() {
    setLoading(true);

    try {

      const payload = {
        ...formData,
        model: "XGBoost",
        strategy,
      };

      /* Prediction */

      const predictionResponse = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const predictionData =
        await predictionResponse.json();

      setResult(predictionData);
      setPrediction(predictionData);
      

      /* Explainability */

      const explainResponse = await fetch(
        "http://127.0.0.1:8000/explain",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const explainData =
        await explainResponse.json();
      
      setExplanation(explainData);

      createCopilotSession(
        formData,
        predictionData,
        explainData,
        strategy
      );

      
    } catch (error) {

      console.error(error);

      alert(
        "Prediction failed. Make sure FastAPI is running."
      );

    }
    
    setLoading(false);
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            Credit Simulator
          </h1>

          <p className="text-slate-400 mt-2">
            Analyze borrower default risk using the Lead XGBoost model.
          </p>
        </div>

        <div className="grid xl:grid-cols-[1.6fr_1fr] gap-8 items-start">

          {/* Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <h2 className="text-2xl font-semibold text-white mb-6">
              Borrower Profile
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              {Object.entries(formData).map(([key, value]) => (

                <div key={key}>

                  <label className="block text-slate-300 mb-2 text-sm">
                    {labels[key as keyof typeof labels]}
                  </label>

                  <input
                    type="number"

                    value={value}

                    min={
                      key === "age"
                        ? 18
                        : 0
                    }

                    max={
                      key === "age"
                        ? 120
                        : key === "DebtRatio"
                        ? 1
                        : key === "RevolvingUtilizationOfUnsecuredLines"
                        ? 1
                        : undefined
                    }

                    step={
                      key === "DebtRatio" ||
                      key === "RevolvingUtilizationOfUnsecuredLines"
                        ? 0.01
                        : 1
                    }

                    onChange={(e) => {

                      const val = Number(e.target.value);

                      if (val < 0) return;

                      resetAnalysis();

                      setFormData({
                        ...formData,
                        [key]: val,
                      });
                    }}

                    className="
                      w-full
                      bg-slate-950
                      border border-slate-700
                      rounded-xl
                      px-4 py-3
                      text-white
                      focus:outline-none
                      focus:border-[#00D09C]
                    "
                  />

                </div>

              ))}

            </div>

            {/* Strategy */}
            <div className="mt-8">

              <p className="text-white font-medium mb-4">
                Decision Strategy
              </p>

              <div className="flex flex-wrap gap-4">

                <button
                  onClick={() => {
                    resetAnalysis();
                    setStrategy("Lead");}}
                  className={`px-5 py-3 rounded-2xl font-medium transition ${
                    strategy === "Lead"
                      ? "bg-[#00D09C] text-slate-950"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}
                >
                  Lead (0.50)
                </button>

                <button
                  onClick={() => {
                    resetAnalysis();
                    setStrategy("Balanced");}}
                  className={`px-5 py-3 rounded-2xl font-medium transition ${
                    strategy === "Balanced"
                      ? "bg-[#00D09C] text-slate-950"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}
                >
                  Balanced (0.60)
                </button>

              </div>

            </div>

            {/* Submit */}
            <button
              onClick={analyzeRisk}
              disabled={loading}
              className="
                mt-8
                w-full
                bg-[#00D09C]
                text-slate-950
                py-4
                rounded-2xl
                font-semibold
                hover:scale-[1.01]
                transition
              "
            >
              {loading
                ? "Analyzing..."
                : "Analyze Applicant"}
            </button>

          </div>

          {/* Results */}
          <div
            className="
              sticky
              top-24
              bg-slate-900
              border border-slate-800
              rounded-3xl
              p-6
              h-fit
            "
          >

            {!result ? (

              <div className="flex flex-col items-center justify-center h-[420px]">

                <div className="mb-6 flex justify-center">
                  <ScanSearch
                    size={64}
                    className="text-[#00D09C]"
                  />
                </div>

                <h2 className="text-3xl font-semibold text-white">
                  Awaiting Analysis
                </h2>

                <p className="text-slate-400 mt-4 text-center max-w-sm">
                  Complete the borrower profile and click
                  "Analyze Applicant" to generate the risk assessment.
                </p>

              </div>

            ) : (

              <div className="text-center">

                <p className="text-slate-400">
                  Default Probability
                </p>

                <h1 className="text-5xl font-bold text-[#00D09C] mt-4">
                  {(result.probability * 100).toFixed(1)}%
                </h1>

                <p className="text-2xl text-white mt-3">
                  {result.risk_category}
                </p>

                {/* Gauge */}
                <div className="mt-6">

                  <div className="w-full bg-slate-700 rounded-full h-4">

                    <div
                      className={`
                        h-4 rounded-full
                        ${
                          result.probability < 0.3
                            ? "bg-green-500"
                            : result.probability < 0.6
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }
                      `}
                      style={{
                        width: `${result.probability * 100}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Decision */}
                <div
                  className={`
                    mt-8
                    inline-block
                    px-6 py-3
                    rounded-full
                    font-semibold
                    ${
                      result.decision === "Approve"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }
                  `}
                >
                  {result.decision}
                </div>

                {/* Details */}
                <div className="mt-8 grid grid-cols-2 gap-4">

                  <div className="bg-slate-800 rounded-2xl p-4">

                    <p className="text-slate-400 text-sm">
                      Strategy
                    </p>

                    <p className="text-white mt-2">
                      {result.strategy}
                    </p>

                  </div>

                  <div className="bg-slate-800 rounded-2xl p-4">

                    <p className="text-slate-400 text-sm">
                      Threshold
                    </p>

                    <p className="text-white mt-2">
                      {result.threshold}
                    </p>

                  </div>

                </div>

                <Link
                  href="/explainability"
                  className="
                    mt-6
                    block
                    w-full
                    bg-[#00D09C]
                    text-slate-950
                    py-4
                    rounded-2xl
                    font-semibold
                    text-center
                    hover:scale-[1.01]
                    transition
                  "
                >
                  View Detailed Explainability
                </Link>

                
                

              </div>

            )}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}