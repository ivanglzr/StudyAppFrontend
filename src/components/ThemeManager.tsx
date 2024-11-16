"use client";

import { useThemeStore } from "@/store/theme.store";
import { useEffect } from "react";

export function ThemeManager() {
  const setInitialTheme = useThemeStore((state) => state.setInitialTheme);

  useEffect(setInitialTheme, [setInitialTheme]);

  return false;
}
