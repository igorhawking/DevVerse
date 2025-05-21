import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import CommandPalette from "@/components/common/CommandPalette";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevVerse - Modern Developer Workspace",
  description:
    "A comprehensive, modular development environment for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="min-h-[calc(100vh-3.5rem)] w-full pl-[60px] transition-all duration-300">
              {children}
            </main>
          </div>
          <CommandPalette />
          <TempoInit />
        </ThemeProvider>
      </body>
    </html>
  );
}
