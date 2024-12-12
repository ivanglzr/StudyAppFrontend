"use client";

import { create } from "zustand";

export const themeColors = ["blue", "green", "purple"] as const;
export type ThemeColors = (typeof themeColors)[number];

interface Theme {
  darkMode: boolean;
  colorTheme: ThemeColors | undefined;
}

interface Props {
  theme: Theme;
}

interface Actions {
  setTheme: (newTheme: Partial<Theme>) => void;
  setInitialTheme: () => void;
  toggleDarkMode: () => void;
  setColorTheme: (colorTheme: ThemeColors) => void;
}

function getThemeFromLocalStorage() {
  const theme = window?.localStorage.getItem("theme");

  if (!theme) return undefined;

  try {
    const parsedTheme = JSON.parse(theme) as Theme;

    return parsedTheme;
  } catch {
    return undefined;
  }
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

function toggleDarkMode(darkMode: boolean) {
  document.body.classList.toggle("dark", darkMode);
}

function applyColorTheme(
  prevColor: ThemeColors | undefined,
  newColor: ThemeColors
) {
  if (themeColors.includes(newColor)) {
    if (prevColor !== undefined)
      document.body.classList.remove(`theme-${prevColor}`);

    document.body.classList.add(`theme-${newColor}`);

    return newColor;
  } else {
    document.body.classList.remove(`theme-${prevColor}`);

    return undefined;
  }
}

export const useThemeStore = create<Props & Actions>((set, get) => ({
  theme: {
    darkMode: false,
    colorTheme: undefined,
  },
  setTheme: (newTheme: Partial<Theme>) => {
    const actualTheme = get().theme;

    const updatedTheme = {
      ...actualTheme,
      ...newTheme,
    };

    const darkMode = newTheme.darkMode;

    if (darkMode !== undefined) toggleDarkMode(darkMode);

    const colorTheme = newTheme.colorTheme;

    if (colorTheme !== undefined) {
      const newColorTheme = applyColorTheme(actualTheme.colorTheme, colorTheme);

      updatedTheme.colorTheme = newColorTheme;
    }

    set({ theme: updatedTheme });

    saveThemeInLocalStorage(updatedTheme);
  },
  setInitialTheme: () => {
    const theme = setInitialTheme();

    if (!theme) return;

    get().setTheme(theme);
  },
  toggleDarkMode: () => {
    const { theme, setTheme } = get();

    setTheme({ darkMode: !theme.darkMode });
  },
  setColorTheme: (colorTheme: ThemeColors) => get().setTheme({ colorTheme }),
}));
