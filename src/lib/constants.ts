// DevVerse color palette
export const COLORS = {
  black: "#000",
  purple: "#9F5BFF",
  white: "#FFF",
  gray: "#B0B0B0",
  darkGray: "#2A2A2A",
};

// Navigation items for sidebar
export const SIDEBAR_ITEMS = [
  { name: "Dashboard", icon: "LayoutDashboard", path: "/dashboard" },
  { name: "Workspace", icon: "Code2", path: "/workspace" },
  { name: "Snippets", icon: "FileCode", path: "/snippets" },
  { name: "Tasks", icon: "CheckSquare", path: "/tasks" },
  { name: "Changelog", icon: "GitBranch", path: "/changelog" },
  { name: "Integrations", icon: "Plug", path: "/integrations" },
  { name: "Terminal", icon: "Terminal", path: "/terminal" },
  { name: "Docs", icon: "FileText", path: "/docs" },
  { name: "Settings", icon: "Settings", path: "/settings" },
];

// Module cards for dashboard
export const MODULE_CARDS = [
  {
    title: "Workspace",
    description: "Code editor, preview, and terminal in one place",
    icon: "Code2",
    path: "/workspace",
    color: "bg-purple-500",
  },
  {
    title: "Snippets",
    description: "Save and organize code snippets",
    icon: "FileCode",
    path: "/snippets",
    color: "bg-blue-500",
  },
  {
    title: "Tasks",
    description: "Manage your tasks and projects",
    icon: "CheckSquare",
    path: "/tasks",
    color: "bg-green-500",
  },
  {
    title: "Terminal",
    description: "Access your terminal remotely",
    icon: "Terminal",
    path: "/terminal",
    color: "bg-amber-500",
  },
  {
    title: "Docs",
    description: "Generate and manage documentation",
    icon: "FileText",
    path: "/docs",
    color: "bg-red-500",
  },
  {
    title: "Integrations",
    description: "Connect with other tools and services",
    icon: "Plug",
    path: "/integrations",
    color: "bg-indigo-500",
  },
];

// Workspace layouts
export const WORKSPACE_LAYOUTS = [
  { id: "default", name: "Default Layout" },
  { id: "coding", name: "Coding Focus" },
  { id: "preview", name: "Preview Mode" },
  { id: "terminal", name: "Terminal Focus" },
];
