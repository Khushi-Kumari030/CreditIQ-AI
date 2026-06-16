import DashboardLayout from "@/components/DashboardLayout";
import LeadModelCard from "@/components/LeadModelCard";
import BenchmarkTable from "@/components/BenchmarkTable";
import StrategyGovernance from "@/components/StrategyGovernance";
import VariableGuide from "@/components/VariableGuide";
import LifecycleTimeline from "@/components/LifecycleTimeline";

export default function ModelsPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Page Header */}

        <section>

          <h1 className="text-4xl font-bold text-white">
            Model Governance & Risk Analytics
          </h1>

          <p
            className="
              mt-4
              text-slate-400
              max-w-4xl
              leading-8
            "
          >
            Review model performance, understand borrower
            variables, and examine the governance framework
            supporting deployment decisions.
          </p>

        </section>

        <LeadModelCard />

        <BenchmarkTable />

        <StrategyGovernance />

        <VariableGuide />

        <LifecycleTimeline />

      </div>

    </DashboardLayout>
  );
}