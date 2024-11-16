"use client";

import { create } from "zustand";

export const themeColors = ["blue", "green", "purple"] as const;
export type themeColorsType = (typeof themeColors)[number];

interface Props {
  theme: themeColorsType | undefined;
}

interface Actions {
  setTheme: (theme: themeColorsType) => void;
}

export const useThemeStore = create<Props & Actions>((set, get) => ({
  theme: undefined,
  setTheme: (theme: themeColorsType) => {
    document.body.classList.remove(`theme-${get().theme}`);

    set({ theme });

    document.body.classList.add(`theme-${get().theme}`);
  },
}));
