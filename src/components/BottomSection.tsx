import { TrendingUp, BarChart3 } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const BottomSection = () => {
  const [pnlView, setPnlView] = useState<"net" | "gross">("net");
  const [pnlTab, setPnlTab] = useState<"daily" | "cumulative">("daily");
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const { uiDesign } = useTheme();

  const cardRadius = uiDesign === "phantom-noir" ? "rounded" : "rounded-lg";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Account Balances */}
      <div className={cn("card-design bg-card p-6 shadow-card min-h-[300px]", cardRadius)}>
        <h3 className="text-lg font-semibold text-foreground">Account Balances</h3>
        <p className="text-sm text-muted-foreground mt-1">Total Balance by Account Number</p>
        <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
          No data available
        </div>
      </div>

      {/* Daily PnL */}
      <div className={cn("card-design bg-card p-6 shadow-card min-h-[300px]", cardRadius)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-semibold text-foreground">Daily PnL</h3>
            <span className="text-lg font-semibold text-foreground">0</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setChartType("line")}
              className={cn("w-9 h-9 flex items-center justify-center transition-colors", cardRadius,
                chartType === "line" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <TrendingUp size={18} />
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={cn("w-9 h-9 flex items-center justify-center transition-colors", cardRadius,
                chartType === "bar" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <BarChart3 size={18} />
            </button>

            <div className={cn("flex overflow-hidden border border-border", cardRadius)}>
              <button
                onClick={() => setPnlView("net")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  pnlView === "net" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Net PnL
              </button>
              <button
                onClick={() => setPnlView("gross")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  pnlView === "gross" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Gross PnL
              </button>
            </div>
          </div>
        </div>

        <div className={cn("flex overflow-hidden border border-border mb-4", cardRadius)}>
          <button
            onClick={() => setPnlTab("daily")}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              pnlTab === "daily" ? "bg-card text-foreground border-r border-border" : "text-muted-foreground bg-background"
            }`}
          >
            Daily PnL
          </button>
          <button
            onClick={() => setPnlTab("cumulative")}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              pnlTab === "cumulative" ? "bg-card text-foreground" : "text-muted-foreground bg-background"
            }`}
          >
            Cumulative Daily PnL
          </button>
        </div>

        <div className="h-32 border-l border-b border-border relative">
          {[5, 4, 3, 2, 1, 0].map((val) => (
            <div key={val} className="absolute left-0 right-0 flex items-center" style={{ bottom: `${(val / 5) * 100}%` }}>
              <span className="text-[10px] text-muted-foreground w-4 -ml-1">{val}</span>
              <div className="flex-1 border-b border-dashed border-border ml-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomSection;
