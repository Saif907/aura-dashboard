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
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

interface NavItem {
  icon: React.ElementType;
  label: string;
  badge?: string;
  hasArrow?: boolean;
  path?: string;
}

const mainNavItems: NavItem[] = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Monitor, label: "Accounts", hasArrow: true },
  { icon: CreditCard, label: "Plans", badge: "NEW", hasArrow: true },
  { icon: TrendingUp, label: "Live Trade" },
  { icon: PenLine, label: "Daily Journal" },
  { icon: Table2, label: "Close Trade" },
  { icon: BookOpen, label: "Notebook", path: "/notebook" },
  { icon: BarChart3, label: "Reports" },
  { icon: Radio, label: "News & Sessions" },
  { icon: FolderOpen, label: "File Manager", badge: "NEW" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar shadow-sidebar z-50 transition-all duration-300 flex flex-col border-r border-border",
          collapsed ? "w-[80px]" : "w-[280px]"
        )}
      >
        {/* Logo area */}
        <div className="flex items-center h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
          </div>
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
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-sidebar">
          {mainNavItems.map((item) => (
            <NavItemRow
              key={item.label}
              item={item}
              collapsed={collapsed}
              active={item.path ? location.pathname === item.path : false}
            />
          ))}
        </nav>
      </aside>

      {/* Toggle button at the edge of sidebar */}
      <button
        onClick={onToggle}
        className={cn(
          "fixed top-1/2 -translate-y-1/2 z-[51] w-6 h-6 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300 shadow-sm",
          collapsed ? "left-[68px]" : "left-[268px]"
        )}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </>
  );
};

function NavItemRow({ item, collapsed, active }: { item: NavItem; collapsed: boolean; active: boolean }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => item.path && navigate(item.path)}
      className={cn(
        "w-full flex items-center gap-3 h-11 rounded-lg px-3 transition-colors text-sm font-normal",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
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
