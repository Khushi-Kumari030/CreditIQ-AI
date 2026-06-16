"use client";

import { benchmarkData } from "@/data/benchmarkData";

export default function BenchmarkTable() {
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-500/10 text-[#00D09C]";

      case "SHORTLISTED":
        return "bg-cyan-500/10 text-cyan-400";

      case "ARCHIVED":
        return "bg-slate-700/40 text-slate-400";

      default:
        return "bg-slate-700 text-white";
    }
  };

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
          Candidate Model Benchmarking
        </h2>

        <p className="mt-3 text-slate-400 max-w-3xl">
          Comparative evaluation of candidate models developed during
          experimentation using multiple performance indicators.
        </p>

      </div>

      {/* Desktop Table */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-800">

              <th className="text-left py-4 text-slate-400 font-medium">
                Status
              </th>

              <th className="text-left py-4 text-slate-400 font-medium">
                Model
              </th>

              <th className="text-center py-4 text-slate-400 font-medium">
                ROC-AUC
              </th>

              <th className="text-center py-4 text-slate-400 font-medium">
                Precision
              </th>

              <th className="text-center py-4 text-slate-400 font-medium">
                Recall
              </th>

              <th className="text-center py-4 text-slate-400 font-medium">
                F1 Score
              </th>

            </tr>

          </thead>

          <tbody>

            {benchmarkData.map((model) => (

              <tr
                key={model.model}
                className="
                  border-b border-slate-800/60
                  hover:bg-slate-800/40
                  transition
                "
              >

                <td className="py-6">

                  <span
                    className={`
                      px-3 py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${getBadgeStyle(model.status)}
                    `}
                  >
                    {model.status}
                  </span>

                </td>

                <td className="py-6 text-white font-medium">
                  {model.model}
                </td>

                <td className="py-6 text-center text-white">
                  {model.rocAuc.toFixed(3)}
                </td>

                <td className="py-6 text-center text-white">
                  {model.precision.toFixed(3)}
                </td>

                <td className="py-6 text-center text-white">
                  {model.recall.toFixed(3)}
                </td>

                <td className="py-6 text-center text-white">
                  {model.f1.toFixed(3)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}

      <div className="grid gap-4 lg:hidden">

        {benchmarkData.map((model) => (

          <div
            key={model.model}
            className="
              bg-slate-800/50
              border border-slate-700
              rounded-2xl
              p-5
            "
          >

            <div className="flex justify-between items-center">

              <h3 className="text-white font-semibold">
                {model.model}
              </h3>

              <span
                className={`
                  px-3 py-1
                  rounded-full
                  text-xs
                  font-semibold
                  ${getBadgeStyle(model.status)}
                `}
              >
                {model.status}
              </span>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">

              <Metric label="ROC-AUC" value={model.rocAuc} />

              <Metric label="Precision" value={model.precision} />

              <Metric label="Recall" value={model.recall} />

              <Metric label="F1 Score" value={model.f1} />

            </div>

          </div>

        ))}

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
    <div>

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="text-white font-semibold mt-1">
        {value.toFixed(3)}
      </p>

    </div>
  );
}