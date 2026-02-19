import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ThemePanel from "@/components/ThemePanel";
import {
  Home,
  Search,
  Plus,
  ArrowUpDown,
  ListFilter,
  FileText,
  Calendar,
  Briefcase,
  User,
  Star,
  Trash2,
  FolderPlus,
  FileIcon,
} from "lucide-react";

interface FolderItem {
  icon: React.ElementType;
  label: string;
  count: number;
}

const folders: FolderItem[] = [
  { icon: FileText, label: "All", count: 0 },
  { icon: Calendar, label: "Daily Note", count: 0 },
  { icon: Briefcase, label: "Trade Note", count: 0 },
  { icon: User, label: "Personal Note", count: 0 },
  { icon: Star, label: "Starred", count: 0 },
  { icon: Trash2, label: "Trash", count: 0 },
];

const Notebook = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState("All");

  return (
    <div className="min-h-screen bg-background scrollbar-main overflow-y-auto">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 80 : 280 }}
      >
        <DashboardHeader onOpenTheme={() => setThemePanelOpen(true)} />
        <main className="p-6 pb-16 space-y-6">
          {/* Page title & breadcrumb */}
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Notebook</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Home size={16} />
              <span>•</span>
              <span>Notebook</span>
            </div>
          </div>

          {/* 3-panel layout */}
          <div className="grid grid-cols-[240px_1fr_1fr] gap-0 rounded-lg border border-border overflow-hidden min-h-[500px]">
            {/* Left panel - Folders */}
            <div className="bg-card border-r border-border flex flex-col">
              <div className="flex items-center gap-2 p-4 border-b border-border">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <FolderPlus size={16} />
                  <span>Add Folder</span>
                </button>
                <div className="ml-auto">
                  <ListFilter size={16} className="text-muted-foreground" />
                </div>
              </div>
              <nav className="flex-1 p-2 space-y-0.5">
                {folders.map((folder) => (
                  <button
                    key={folder.label}
                    onClick={() => setActiveFolder(folder.label)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      activeFolder === folder.label
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/50"
                    }`}
                  >
                    <folder.icon size={18} />
                    <span className="flex-1 text-left">{folder.label}</span>
                    <span className="text-xs text-muted-foreground">{folder.count}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Middle panel - Notes list */}
            <div className="bg-card border-r border-border flex flex-col">
              <div className="flex items-center gap-2 p-4 border-b border-border">
                <div className="flex-1 flex items-center gap-2 bg-background rounded-lg px-3 py-2 border border-border">
                  <Search size={16} className="text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
                  />
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowUpDown size={16} />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Plus size={16} />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <ListFilter size={16} />
                </button>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center mb-4">
                  <FileIcon size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-base font-medium text-foreground">No Notes</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You have no notes in this folder.
                </p>
              </div>
            </div>

            {/* Right panel - Note detail */}
            <div className="bg-card flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center mb-4">
                <FileIcon size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-base font-medium text-foreground">No Note Selected</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Please select a note from the list to view its details.
              </p>
            </div>
          </div>
        </main>
      </div>
      <ThemePanel open={themePanelOpen} onClose={() => setThemePanelOpen(false)} />
    </div>
  );
};

export default Notebook;
