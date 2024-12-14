"use client";

import { create } from "zustand";

export const themeColors = ["blue", "green", "purple", undefined] as const;
export type ThemeColors = (typeof themeColors)[number];

interface Theme {
  darkMode: boolean;
  colorTheme: ThemeColors;
}

interface Props {
  theme: Theme;
}

interface Actions {
  setTheme: (newTheme: Theme) => void;
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

function applyColorTheme(prevColor: ThemeColors, newColor: ThemeColors) {
  document.body.classList.remove(`theme-${prevColor}`);

  document.body.classList.add(`theme-${newColor}`);

  return newColor;
}

export const useThemeStore = create<Props & Actions>((set, get) => ({
  theme: {
    darkMode: false,
    colorTheme: undefined,
  },
  setTheme: (newTheme) => {
    const actualTheme = get().theme;

    const darkMode = newTheme.darkMode;

    toggleDarkMode(darkMode);

    const colorTheme = newTheme.colorTheme;

    const newColorTheme = applyColorTheme(actualTheme.colorTheme, colorTheme);

    newTheme.colorTheme = newColorTheme;

    set({ theme: newTheme });

    saveThemeInLocalStorage(newTheme);
  },
  setInitialTheme: () => {
    const theme = setInitialTheme();

    if (!theme) return;

    get().setTheme(theme);
  },
  toggleDarkMode: () => {
    const { theme, setTheme } = get();

    setTheme({ ...theme, darkMode: !theme.darkMode });
  },
  setColorTheme: (colorTheme: ThemeColors) => {
    const { theme, setTheme } = get();

    setTheme({ ...theme, colorTheme });
  },
}));
