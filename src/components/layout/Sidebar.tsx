"use client";

import { SIDEBAR_ITEMS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  FileCode,
  LayoutDashboard,
  CheckSquare,
  GitBranch,
  Plug,
  Terminal,
  FileText,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  // Don't show sidebar on landing page
  if (pathname === "/") return null;

  // Map icon names to components
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      LayoutDashboard: <LayoutDashboard size={20} />,
      Code2: <Code2 size={20} />,
      FileCode: <FileCode size={20} />,
      CheckSquare: <CheckSquare size={20} />,
      GitBranch: <GitBranch size={20} />,
      Plug: <Plug size={20} />,
      Terminal: <Terminal size={20} />,
      FileText: <FileText size={20} />,
      Settings: <Settings size={20} />,
    };
    return icons[iconName] || <Code2 size={20} />;
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 z-30 flex h-[calc(100vh-3.5rem)] flex-col border-r border-border/40 bg-background transition-all duration-300",
        sidebarCollapsed ? "w-[60px]" : "w-[240px]",
      )}
    >
      <div className="flex flex-col gap-2 p-2">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <TooltipProvider key={item.path} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.path} passHref>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className={cn(
                        "w-full justify-start gap-3",
                        isActive && "bg-secondary/80",
                      )}
                    >
                      {getIcon(item.icon)}
                      {!sidebarCollapsed && <span>{item.name}</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {sidebarCollapsed && (
                  <TooltipContent side="right">{item.name}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      <div className="mt-auto p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="w-full justify-center"
        >
          {sidebarCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </Button>
      </div>
    </aside>
  );
}
