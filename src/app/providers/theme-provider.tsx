/* File: app/providers/theme-provider.tsx */
"use client";

import { useEffect, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

export type Font = "serif" | "sans" | "mono";

export default function ThemeProvider({ children }: PropsWithChildren<{}>) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const font = useSelector((state: RootState) => state.theme.font);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.remove("serif", "sans", "mono");
    root.classList.add(font);
  }, [theme, font]);

  return <>{children}</>;
}
