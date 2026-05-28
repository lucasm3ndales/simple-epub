import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  outputFolder: string;
  language: string;
  setOutputFolder: (folder: string) => void;
  setLanguage: (lang: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      outputFolder: "",
      language: "en",
      setOutputFolder: (folder) => set({ outputFolder: folder }),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: "simple-epub-settings",
    }
  )
);
