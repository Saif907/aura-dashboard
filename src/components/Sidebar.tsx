import { useState } from "react";
import {
  Home,
  Monitor,
  CreditCard,
  TrendingUp,
  PenLine,
  Table2,
  BookOpen,
  BarChart3,
  Radio,
  FolderOpen,
  Target,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: string;
  hasArrow?: boolean;
  comingSoon?: boolean;
}

const mainNavItems: NavItem[] = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Monitor, label: "Accounts", hasArrow: true },
  { icon: CreditCard, label: "Plans", badge: "NEW", hasArrow: true },
  { icon: TrendingUp, label: "Live Trade" },
  { icon: PenLine, label: "Daily Journal" },
  { icon: Table2, label: "Close Trade" },
  { icon: BookOpen, label: "Notebook" },
  { icon: BarChart3, label: "Reports" },
  { icon: Radio, label: "News & Sessions" },
  { icon: FolderOpen, label: "File Manager", badge: "NEW" },
];

const comingSoonItems: NavItem[] = [
  { icon: Target, label: "Goals", comingSoon: true },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar shadow-sidebar z-50 transition-all duration-300 flex flex-col",
        collapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {/* Logo area */}
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">T</span>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Menu label */}
      {!collapsed && (
        <div className="px-6 pt-4 pb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Menu
          </span>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {mainNavItems.map((item) => (
          <NavItemRow key={item.label} item={item} collapsed={collapsed} />
        ))}

        {/* Coming soon section */}
        {!collapsed && (
          <div className="px-3 pt-6 pb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Coming Soon
            </span>
          </div>
        )}
        {comingSoonItems.map((item) => (
          <NavItemRow key={item.label} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* User area at bottom */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
            👤
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground truncate">User</span>
                <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-medium">
                  User
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

function NavItemRow({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3 h-11 rounded-lg px-3 transition-colors text-sm font-normal",
        item.active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50",
        item.comingSoon && "opacity-50"
      )}
    >
      <item.icon size={20} className="shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1 text-left truncate">{item.label}</span>
          {item.badge && (
            <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-bold">
              {item.badge}
            </span>
          )}
          {item.hasArrow && <ChevronRight size={16} className="text-muted-foreground" />}
        </>
      )}
    </button>
  );
}

export default Sidebar;
