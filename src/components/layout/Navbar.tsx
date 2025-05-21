"use client";

import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Command, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../theme-switcher";
import { Button } from "../ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const { toggleCommandPalette } = useAppStore();

  // Don't show navbar on landing page
  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <div className="h-6 w-6 rounded-full bg-[#9F5BFF] flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <span className="hidden md:inline-flex">DevVerse</span>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={() => toggleCommandPalette()}
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden md:inline-flex">Search</span>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
