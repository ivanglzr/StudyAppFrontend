"use client";

import { create } from "zustand";

export const themeColors = ["blue", "green", "purple"] as const;
export type themeColorsType = (typeof themeColors)[number];

interface Theme {
  darkMode: boolean;
  colorTheme: themeColorsType | undefined;
}

interface Props {
  theme: Theme;
}

interface Actions {
  setTheme: (newTheme: Partial<Theme>) => void;
  setInitialTheme: () => void;
}

function getThemeFromLocalStorage() {
  const theme = window?.localStorage.getItem("theme");

  if (!theme) return undefined;

  const parsedTheme = JSON.parse(theme) as Theme;

  return parsedTheme;
}

function setInitialTheme() {
  const theme = getThemeFromLocalStorage();

  if (!theme) return;

  if (theme.darkMode) document.body.classList.add("dark");
  else document.body.classList.remove("dark");

  if (!theme.colorTheme) return;

  document.body.classList.add(`theme-${theme.colorTheme}`);

  return theme;
}

function saveThemeInLocalStorage(theme: Theme) {
  window.localStorage.setItem("theme", JSON.stringify(theme));
}

export const useThemeStore = create<Props & Actions>((set, get) => ({
  theme: {
    darkMode: true,
    colorTheme: undefined,
  },
  setTheme: (newTheme: Partial<Theme>) => {
    const actualTheme = get().theme;

    if (Object.hasOwn(newTheme, "darkMode") && newTheme.darkMode)
      document.body.classList.add("dark");
    else if (Object.hasOwn(newTheme, "darkMode") && !newTheme.darkMode)
      document.body.classList.remove("dark");

    if (newTheme.colorTheme && newTheme.colorTheme !== actualTheme.colorTheme) {
      document.body.classList.remove(`theme-${actualTheme.colorTheme}`);

      set({ theme: { ...actualTheme, ...newTheme } });

      document.body.classList.add(`theme-${newTheme.colorTheme}`);
    }

    set({ theme: { ...actualTheme, ...newTheme } });

    saveThemeInLocalStorage(get().theme);
  },
  setInitialTheme: () => {
    const theme = setInitialTheme();

    if (!theme) return;

    set({ theme });
  },
}));
