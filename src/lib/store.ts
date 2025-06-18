import { create } from "zustand";

type ThemeMode = "light" | "dark" | "system";

interface AppState {
  // UI State
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  activeTheme: ThemeMode;

  // Workspace State
  currentWorkspaceId: string | null;
  currentWorkspaceLayout: string;
  workspaceLayouts: Array<{ id: string; name: string; config: any }>;

  // IA State
  apiKey: string | null;
  setApiKey: (key: string) => void;
  history: any[];
  addHistory: (item: any) => void;
  aiModalOpen: boolean;
  setAIModalOpen: (open: boolean) => void;

  // Actions
  toggleSidebar: () => void;
  toggleCommandPalette: () => void;
  setTheme: (theme: ThemeMode) => void;
  setWorkspaceId: (id: string | null) => void;
  setWorkspaceLayout: (layout: string) => void;
  saveWorkspaceLayout: (layout: {
    id: string;
    name: string;
    config: any;
  }) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // UI State
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  activeTheme: "dark",

  // Workspace State
  currentWorkspaceId: null,
  currentWorkspaceLayout: "default",
  workspaceLayouts: [
    { id: "default", name: "Default Layout", config: {} },
    { id: "coding", name: "Coding Focus", config: {} },
  ],

  // Estado IA
  apiKey: null,
  setApiKey: (key: string) => set(() => ({ apiKey: key })),
  history: [],
  addHistory: (item: any) => set((state) => ({ history: [...state.history, item] })),
  aiModalOpen: false,
  setAIModalOpen: (open: boolean) => set(() => ({ aiModalOpen: open })),

  // Actions
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleCommandPalette: () =>
    set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
  setTheme: (theme) => set({ activeTheme: theme }),
  setWorkspaceId: (id) => set({ currentWorkspaceId: id }),
  setWorkspaceLayout: (layout) => set({ currentWorkspaceLayout: layout }),
  saveWorkspaceLayout: (layout) =>
    set((state) => ({
      workspaceLayouts: [
        ...state.workspaceLayouts.filter((l) => l.id !== layout.id),
        layout,
      ],
    })),
}));
