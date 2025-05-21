"use client";

import { useAppStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SIDEBAR_ITEMS } from "@/lib/constants";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command";
import {
  Code2,
  FileCode,
  LayoutDashboard,
  CheckSquare,
  GitBranch,
  Plug,
  Terminal,
  FileText,
  Settings,
  Moon,
  Sun,
  Laptop,
} from "lucide-react";

export default function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, toggleCommandPalette, setTheme } = useAppStore();

  // Handle keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleCommandPalette();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggleCommandPalette]);

  // Map icon names to components
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      LayoutDashboard: <LayoutDashboard className="mr-2 h-4 w-4" />,
      Code2: <Code2 className="mr-2 h-4 w-4" />,
      FileCode: <FileCode className="mr-2 h-4 w-4" />,
      CheckSquare: <CheckSquare className="mr-2 h-4 w-4" />,
      GitBranch: <GitBranch className="mr-2 h-4 w-4" />,
      Plug: <Plug className="mr-2 h-4 w-4" />,
      Terminal: <Terminal className="mr-2 h-4 w-4" />,
      FileText: <FileText className="mr-2 h-4 w-4" />,
      Settings: <Settings className="mr-2 h-4 w-4" />,
    };
    return icons[iconName] || <Code2 className="mr-2 h-4 w-4" />;
  };

  return (
    <CommandDialog
      open={commandPaletteOpen}
      onOpenChange={toggleCommandPalette}
    >
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {SIDEBAR_ITEMS.map((item) => (
              <CommandItem
                key={item.path}
                onSelect={() => {
                  router.push(item.path);
                  toggleCommandPalette();
                }}
              >
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => setTheme("system")}>
              <Laptop className="mr-2 h-4 w-4" />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
