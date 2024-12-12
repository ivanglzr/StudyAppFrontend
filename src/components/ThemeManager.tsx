"use client";

import { useEffect } from "react";

import { Moon, Sun } from "lucide-react";

import { useThemeStore, themeColors } from "@/store/theme.store";

const iconProps = {
  size: 40,
  strokeWidth: 1.5,
};

export function ThemeManager() {
  const setInitialTheme = useThemeStore((state) => state.setInitialTheme);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);
  const setColorTheme = useThemeStore((state) => state.setColorTheme);

  const theme = useThemeStore((state) => state.theme);

  useEffect(() => setInitialTheme(), []);

  return (
    <div className="flex items-center gap-6 absolute bottom-0 right-0 m-6 rounded-lg">
      <div className="flex gap-2">
        {themeColors.map((themeColor) => (
          <button
            key={themeColor}
            className="w-6 h-6 rounded-sm"
            style={{ backgroundColor: themeColor }}
            onClick={() => setColorTheme(themeColor)}
          />
        ))}
      </div>
      {theme.darkMode ? (
        <button onClick={toggleDarkMode}>
          <Moon {...iconProps} />
        </button>
      ) : (
        <button onClick={toggleDarkMode}>
          <Sun {...iconProps} />
        </button>
      )}
    </div>
  );
}
