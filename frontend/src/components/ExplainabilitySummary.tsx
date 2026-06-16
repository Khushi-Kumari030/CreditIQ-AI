"use client";

export default function ExplainabilitySummary({
  prediction,
}: {
  prediction: any;
}) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

      <h2 className="text-3xl font-bold text-white">
        Explainability & Decision Insights
      </h2>

      <p className="mt-3 text-slate-400 max-w-3xl leading-7">
        Understand why the Lead Model arrived at a particular decision
        through feature-level explanations powered by SHAP.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">

        <Metric
          title="Lead Model"
          value={prediction.model}
        />

        <Metric
          title="Decision"
          value={prediction.decision}
        />

        <Metric
          title="Probability"
          value={`${(prediction.probability * 100).toFixed(1)}%`}
        />

        <Metric
          title="Strategy"
          value={prediction.strategy}
        />

      </div>

    </section>
  );
}

function Metric({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3 className="mt-3 text-2xl font-bold text-white">
        {value}
      </h3>

    </div>
  );
}