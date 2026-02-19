import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import MetricCards from "@/components/MetricCards";
import BottomSection from "@/components/BottomSection";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 80 : 280 }}
      >
        <DashboardHeader />
        <main className="p-6 pb-16 space-y-6">
          <MetricCards />
          <BottomSection />
        </main>
      </div>
    </div>
  );
};

export default Index;
