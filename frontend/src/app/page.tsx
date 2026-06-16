import DashboardLayout from "@/components/DashboardLayout";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <Hero />
        <FeatureCards />
      </div>
    </DashboardLayout>
  );
}