import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ThemePanel from "@/components/ThemePanel";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";

// Mock trade data: date string -> { pnl: number, wins: number, losses: number }
const mockTrades: Record<string, { pnl: number; wins: number; losses: number }> = {
  "2026-01-03": { pnl: 120, wins: 2, losses: 0 },
  "2026-01-07": { pnl: -45, wins: 0, losses: 1 },
  "2026-01-14": { pnl: 230, wins: 3, losses: 1 },
  "2026-01-21": { pnl: 55, wins: 1, losses: 0 },
  "2026-02-04": { pnl: -80, wins: 0, losses: 2 },
  "2026-02-10": { pnl: 175, wins: 2, losses: 0 },
  "2026-02-14": { pnl: 87, wins: 1, losses: 0 },
  "2026-02-20": { pnl: -30, wins: 1, losses: 2 },
  "2026-02-25": { pnl: 310, wins: 4, losses: 0 },
  "2026-03-02": { pnl: 95, wins: 1, losses: 0 },
  "2026-03-15": { pnl: -120, wins: 0, losses: 3 },
  "2026-03-22": { pnl: 200, wins: 2, losses: 1 },
  "2026-04-05": { pnl: 150, wins: 2, losses: 0 },
  "2026-04-18": { pnl: -60, wins: 1, losses: 2 },
  "2026-05-10": { pnl: 400, wins: 5, losses: 0 },
  "2026-06-12": { pnl: -90, wins: 0, losses: 2 },
  "2026-07-01": { pnl: 50, wins: 1, losses: 0 },
  "2026-08-20": { pnl: 275, wins: 3, losses: 1 },
  "2026-09-14": { pnl: -150, wins: 0, losses: 3 },
  "2026-10-08": { pnl: 180, wins: 2, losses: 0 },
  "2026-11-25": { pnl: 320, wins: 4, losses: 1 },
  "2026-12-10": { pnl: -40, wins: 1, losses: 2 },
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells: { day: number; inMonth: boolean; dateStr: string }[] = [];
  for (let i = startDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const m = month === 0 ? 12 : month;
    const y = month === 0 ? year - 1 : year;
    cells.push({ day: d, inMonth: false, dateStr: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true, dateStr: `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}` });
  }
  while (cells.length < 42) {
    const d = cells.length - startDay - daysInMonth + 1;
    const m = month + 2 > 12 ? 1 : month + 2;
    const y = month + 2 > 12 ? year + 1 : year;
    cells.push({ day: d, inMonth: false, dateStr: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` });
  }
  return cells;
}

function getHeatmapColor(pnl: number) {
  if (pnl > 200) return "bg-success/40 border-success/50";
  if (pnl > 0) return "bg-success/20 border-success/30";
  if (pnl < -100) return "bg-loss/40 border-loss/50";
  if (pnl < 0) return "bg-loss/20 border-loss/30";
  return "";
}

function getMonthSummary(year: number, month: number) {
  let totalPnl = 0;
  let totalWins = 0;
  let totalLosses = 0;
  Object.entries(mockTrades).forEach(([date, trade]) => {
    const d = new Date(date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      totalPnl += trade.pnl;
      totalWins += trade.wins;
      totalLosses += trade.losses;
    }
  });
  return { totalPnl, totalWins, totalLosses, hasTrades: totalWins + totalLosses > 0 };
}

// Compact month card for yearly view
function MonthCard({ year, month, onClick, isCurrentMonth }: { year: number; month: number; onClick: () => void; isCurrentMonth: boolean }) {
  const cells = getMonthDays(year, month);
  const summary = getMonthSummary(year, month);
  const today = new Date();
  const isToday = (dateStr: string) => {
    const t = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    return dateStr === t;
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-card rounded-2xl p-4 border border-border hover:border-primary/40 transition-all duration-200 text-left group cursor-pointer",
        isCurrentMonth && "ring-1 ring-primary/30 border-primary/30"
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{MONTHS[month]}</h3>
      </div>
      {summary.hasTrades && (
        <div className="flex items-center gap-2 mb-2">
          <span className={cn("text-xs font-semibold", summary.totalPnl >= 0 ? "text-success" : "text-loss")}>
            {summary.totalPnl >= 0 ? "+" : ""}${summary.totalPnl}
          </span>
          <span className="text-[10px] text-muted-foreground">{summary.totalWins} Wins</span>
        </div>
      )}
      {!summary.hasTrades && <div className="h-5 mb-2" />}
      <div className="grid grid-cols-7 gap-px">
        {DAYS.map((d) => (
          <span key={d} className="text-[9px] text-muted-foreground text-center font-medium">{d}</span>
        ))}
        {cells.slice(0, 42).map((cell, i) => {
          const trade = mockTrades[cell.dateStr];
          return (
            <div
              key={i}
              className={cn(
                "aspect-square flex items-center justify-center text-[10px] rounded-sm relative",
                !cell.inMonth && "text-muted-foreground/30",
                cell.inMonth && !trade && "text-muted-foreground",
                cell.inMonth && trade && getHeatmapColor(trade.pnl),
                isToday(cell.dateStr) && cell.inMonth && "ring-1 ring-primary text-primary font-bold"
              )}
            >
              {cell.day}
            </div>
          );
        })}
      </div>
    </button>
  );
}

// Expanded month detail view
function MonthDetail({ year, month, onBack }: { year: number; month: number; onBack: () => void }) {
  const cells = getMonthDays(year, month);
  const summary = getMonthSummary(year, month);
  const today = new Date();
  const isToday = (dateStr: string) => {
    const t = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    return dateStr === t;
  };
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const selectedTrade = selectedDate ? mockTrades[selectedDate] : null;

  return (
    <div className="space-y-6">
      {/* Back button and title */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
          <ArrowLeft size={16} />
        </button>
        <div>
          <h2 className="text-xl font-semibold text-foreground">{MONTHS[month]} {year}</h2>
          {summary.hasTrades && (
            <div className="flex items-center gap-3 mt-0.5">
              <span className={cn("text-sm font-semibold", summary.totalPnl >= 0 ? "text-success" : "text-loss")}>
                {summary.totalPnl >= 0 ? "+" : ""}${summary.totalPnl}
              </span>
              <span className="text-xs text-muted-foreground">{summary.totalWins} Wins · {summary.totalLosses} Losses</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <div className="grid grid-cols-7 gap-1 mb-3">
            {DAYS.map((d) => (
              <span key={d} className="text-xs font-semibold text-muted-foreground text-center py-2">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.slice(0, 42).map((cell, i) => {
              const trade = mockTrades[cell.dateStr];
              const selected = selectedDate === cell.dateStr;
              return (
                <button
                  key={i}
                  onClick={() => cell.inMonth && setSelectedDate(cell.dateStr)}
                  className={cn(
                    "aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-all relative border border-transparent",
                    !cell.inMonth && "text-muted-foreground/25 cursor-default",
                    cell.inMonth && !trade && "text-muted-foreground hover:bg-muted/50 cursor-pointer",
                    cell.inMonth && trade && cn(getHeatmapColor(trade.pnl), "cursor-pointer hover:scale-105"),
                    isToday(cell.dateStr) && cell.inMonth && "ring-2 ring-primary font-bold text-primary",
                    selected && "ring-2 ring-primary scale-105"
                  )}
                >
                  <span className="text-sm">{cell.day}</span>
                  {cell.inMonth && trade && (
                    <span className={cn("text-[9px] font-semibold mt-0.5", trade.pnl >= 0 ? "text-success" : "text-loss")}>
                      {trade.pnl >= 0 ? "+" : ""}{trade.pnl}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-5 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-success/40" />
              <span className="text-[11px] text-muted-foreground">Big Win</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-success/20" />
              <span className="text-[11px] text-muted-foreground">Win</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-loss/20" />
              <span className="text-[11px] text-muted-foreground">Loss</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-loss/40" />
              <span className="text-[11px] text-muted-foreground">Big Loss</span>
            </div>
          </div>
        </div>

        {/* Side panel - trade details or stats */}
        <div className="space-y-4">
          {/* Trade detail card */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4">
              {selectedTrade ? `Trade on ${selectedDate}` : "Select a day"}
            </h4>
            {selectedTrade ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">P&L</span>
                  <div className="flex items-center gap-1.5">
                    {selectedTrade.pnl >= 0 ? <TrendingUp size={14} className="text-success" /> : <TrendingDown size={14} className="text-loss" />}
                    <span className={cn("text-lg font-bold", selectedTrade.pnl >= 0 ? "text-success" : "text-loss")}>
                      {selectedTrade.pnl >= 0 ? "+" : ""}${selectedTrade.pnl}
                    </span>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Wins</span>
                  <span className="text-sm font-semibold text-success">{selectedTrade.wins}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Losses</span>
                  <span className="text-sm font-semibold text-loss">{selectedTrade.losses}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Click on a date with trades to see details.</p>
            )}
          </div>

          {/* Monthly stats */}
          <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Monthly Stats</h4>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Total P&L</span>
              <span className={cn("text-sm font-bold", summary.totalPnl >= 0 ? "text-success" : "text-loss")}>
                {summary.totalPnl >= 0 ? "+" : ""}${summary.totalPnl}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Win Rate</span>
              <span className="text-sm font-semibold text-foreground">
                {summary.totalWins + summary.totalLosses > 0
                  ? `${Math.round((summary.totalWins / (summary.totalWins + summary.totalLosses)) * 100)}%`
                  : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Total Trades</span>
              <span className="text-sm font-semibold text-foreground">{summary.totalWins + summary.totalLosses}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CalendarPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const [year, setYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const today = new Date();

  return (
    <div className="min-h-screen bg-background scrollbar-main overflow-y-auto">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="transition-all duration-300" style={{ marginLeft: sidebarCollapsed ? 80 : 280 }}>
        <DashboardHeader onOpenTheme={() => setThemePanelOpen(true)} />
        <main className="p-6 pb-16">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
            <p className="text-sm text-muted-foreground mt-1">Visualize your trading activity across the year</p>
          </div>

          {selectedMonth !== null ? (
            <MonthDetail year={year} month={selectedMonth} onBack={() => setSelectedMonth(null)} />
          ) : (
            <>
              {/* Year navigation */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <button onClick={() => setYear(y => y - 1)} className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xl font-bold text-primary min-w-[80px] text-center">{year}</span>
                <button onClick={() => setYear(y => y + 1)} className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-success/40" />
                  <span className="text-[11px] text-muted-foreground">Big Win (&gt;$200)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-success/20" />
                  <span className="text-[11px] text-muted-foreground">Win</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-loss/20" />
                  <span className="text-[11px] text-muted-foreground">Loss</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-loss/40" />
                  <span className="text-[11px] text-muted-foreground">Big Loss (&gt;$100)</span>
                </div>
              </div>

              {/* Month grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {MONTHS.map((_, i) => (
                  <MonthCard
                    key={i}
                    year={year}
                    month={i}
                    onClick={() => setSelectedMonth(i)}
                    isCurrentMonth={year === today.getFullYear() && i === today.getMonth()}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
      <ThemePanel open={themePanelOpen} onClose={() => setThemePanelOpen(false)} />
    </div>
  );
};

export default CalendarPage;
