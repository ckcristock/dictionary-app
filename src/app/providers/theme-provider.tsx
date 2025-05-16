"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark";
export type Font = "serif" | "sans" | "mono";

// Mapeo de clases CSS según la fuente
export const fontClassMap: Record<Font, string> = {
  serif: "font-serif",
  sans: "font-sans",
  mono: "font-mono",
};

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  font: Font;
  setFont: (font: Font) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [font, setFontState] = useState<Font>("sans");

  // Al montar: cargar preferencia desde localStorage o sistema
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);

    const storedFont = localStorage.getItem("font") as Font;
    setFont(storedFont || "sans");
  }, []);

  // Aplicar clase al <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Aplicar clase de fuente al <body>
  useEffect(() => {
    document.body.classList.remove("font-sans", "font-serif", "font-mono");
    document.body.classList.add(`font-${font}`);
    localStorage.setItem("font", font);
  }, [font]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);
  const setFont = (newFont: Font) => setFontState(newFont);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, font, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
