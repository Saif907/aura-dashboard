import { Bell, Calendar, ChevronDown, Eye, MessageCircle, Palette, Users, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  onOpenTheme?: () => void;
}

const DashboardHeader = ({ onOpenTheme }: DashboardHeaderProps) => {
  const { uiDesign } = useTheme();

  return (
    <header className={cn(
      "header-design sticky top-0 z-40 bg-sidebar backdrop-blur-[20px] border-b border-border flex items-center justify-between px-6",
      uiDesign === "phantom-noir" ? "h-14" : "h-16",
      uiDesign === "phantom-noir" ? "shadow-none" : "shadow-header"
    )}>
      {/* Left side */}
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-8 h-8 bg-muted flex items-center justify-center",
          uiDesign === "phantom-noir" ? "rounded" : "rounded-full"
        )}>
          <Users size={16} className="text-muted-foreground" />
        </div>
        <span className="text-sm font-medium text-foreground">No Accounts</span>
        <ChevronDown size={16} className="text-muted-foreground" />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors relative">
          <Users size={20} className="text-success" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-loss rounded-full" />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Eye size={20} />
        </button>

        {/* Date filter */}
        <div className={cn(
          "flex items-center gap-2 bg-card border border-border px-3 py-2",
          uiDesign === "phantom-noir" ? "rounded" : "rounded-lg"
        )}>
          <Calendar size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">All Time</span>
          <X size={14} className="text-muted-foreground cursor-pointer" />
        </div>

        <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Bell size={20} />
        </button>
        <button
          onClick={onOpenTheme}
          className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <Palette size={20} />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors relative">
          <MessageCircle size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-loss rounded-full" />
        </button>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-foreground" style={{ backgroundColor: "hsl(36, 90%, 50%)" }}>
          T
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
