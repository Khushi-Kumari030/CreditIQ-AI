import {
  Zap,
  Search,
  BarChart3,
  Bot,
} from "lucide-react";


const features = [
  {
    icon: Zap,
    title: "Prediction Engine",
    description:
      "Real-time default probability using XGBoost.",
  },
  {
    icon: Search,
    title: "Explainability",
    description:
      "SHAP-based explanations for every decision.",
  },
  {
    icon: BarChart3,
    title: "Scenario Simulator",
    description:
      "Perform what-if analysis instantly.",
  },
  {
    icon: Bot,
    title: "Credit Copilot",
    description:
      "LLM-powered assistant for recommendations.",
  },
];

export default function FeatureCards() {
  
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {features.map((feature) => {
         const Icon = feature.icon;

        return (
        

        <div
          key={feature.title}
          className="
            bg-slate-900
            border border-slate-800
            rounded-3xl
            p-6
            hover:border-[#00D09C]
            hover:-translate-y-1
            hover:shadow-[0_10px_40px_rgba(0,208,156,0.20)]
            hover:scale-[1.02]
            transition-all
            duration-300
          "
        >

          <div className="mb-5">
            <Icon
              size={34}
              className="
                text-[#00D09C]
              "
            />
          </div>

          <h3 className="text-xl font-semibold text-white">
            {feature.title}
          </h3>

          <p className="text-slate-400 mt-3 leading-relaxed">
            {feature.description}
          </p>

        </div>
        );
    })}

    </section>
  );
}