import { TrendingUp, TrendingDown } from "lucide-react";

// Donut chart component
const DonutChart = ({ percentage }: { percentage: number }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-20 h-20">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} stroke="hsl(var(--muted))" strokeWidth="6" fill="none" />
        <circle
          cx="40" cy="40" r={radius}
          stroke="hsl(var(--primary))"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-foreground">{percentage}%</span>
      </div>
    </div>
  );
};

interface MetricCardProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const MetricCard = ({ label, children, className = "" }: MetricCardProps) => (
  <div className={`bg-card rounded-lg p-6 shadow-card flex flex-col justify-between min-h-[162px] ${className}`}>
    <span className="text-sm font-semibold text-foreground leading-[22px]">{label}</span>
    <div className="flex-1 flex flex-col justify-center">{children}</div>
  </div>
);

const UpArrow = () => <TrendingUp size={14} className="text-success" />;
const DownArrow = () => <TrendingDown size={14} className="text-loss" />;

const MetricCards = () => {
  return (
    <div className="space-y-6">
      {/* Row 1 - 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Win Rate */}
        <MetricCard label="Win Rate">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-bold text-foreground">0</span>
                <span className="text-sm text-muted-foreground">Trades</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <DownArrow />
                <span className="text-sm text-muted-foreground">0 Trades</span>
              </div>
            </div>
            <DonutChart percentage={0} />
          </div>
        </MetricCard>

        {/* PnL */}
        <MetricCard label="PnL">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-bold text-foreground">0</span>
              <span className="text-sm text-muted-foreground">Net</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg">🐸</span>
              <span className="text-sm text-muted-foreground">0</span>
              <span className="text-sm text-muted-foreground">Gross</span>
            </div>
          </div>
        </MetricCard>

        {/* Account Balance */}
        <MetricCard label="Account Balance">
          <div>
            <span className="text-[28px] font-bold text-foreground">0</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg">🐸</span>
              <span className="text-sm text-muted-foreground">+0</span>
              <span className="text-sm text-muted-foreground">Net PnL</span>
            </div>
          </div>
        </MetricCard>

        {/* Trade Count */}
        <MetricCard label="Trade Count">
          <div>
            <span className="text-[28px] font-bold text-foreground">0</span>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1">
                <UpArrow />
                <span className="text-sm text-foreground">0</span>
                <span className="text-sm text-muted-foreground">Trades</span>
              </div>
              <div className="flex items-center gap-1">
                <DownArrow />
                <span className="text-sm text-foreground">0</span>
                <span className="text-sm text-muted-foreground">Trades</span>
              </div>
            </div>
          </div>
        </MetricCard>
      </div>

      {/* Row 2 - 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Profit Factor */}
        <MetricCard label="Profit Factor">
          <div>
            <span className="text-[28px] font-bold text-foreground">0</span>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                <UpArrow />
                <span className="text-sm text-muted-foreground">0</span>
              </div>
              <div className="flex items-center gap-1">
                <DownArrow />
                <span className="text-sm text-muted-foreground">0</span>
              </div>
            </div>
          </div>
        </MetricCard>

        {/* Volume */}
        <MetricCard label="Volume">
          <div>
            <span className="text-[28px] font-bold text-foreground">0</span>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                <UpArrow />
                <span className="text-sm text-muted-foreground">0</span>
              </div>
              <div className="flex items-center gap-1">
                <DownArrow />
                <span className="text-sm text-muted-foreground">0</span>
              </div>
            </div>
          </div>
        </MetricCard>

        {/* Average Holding Time */}
        <MetricCard label="Average Holding Time">
          <div>
            <span className="text-[28px] font-bold text-primary">0s</span>
            <div className="space-y-1 mt-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">🐸</span>
                <span className="text-sm text-muted-foreground">0s</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">😡</span>
                <span className="text-sm text-muted-foreground">0s</span>
              </div>
            </div>
          </div>
        </MetricCard>

        {/* Streak */}
        <MetricCard label="Streak">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-bold text-foreground">0</span>
              <span className="text-sm text-muted-foreground">Day</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-bold text-foreground">0</span>
              <span className="text-sm text-muted-foreground">Trade</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-bold text-foreground">0</span>
              <span className="text-sm text-muted-foreground">Day</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-bold text-foreground">0</span>
              <span className="text-sm text-muted-foreground">Trade</span>
            </div>
          </div>
        </MetricCard>
      </div>
    </div>
  );
};

export default MetricCards;
