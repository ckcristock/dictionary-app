// src/app/components/FontWrapper.tsx
"use client";

import { useAppSelector } from "../hooks/redux";
import { ReactNode } from "react";

const fontClassMap = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
};

export default function FontWrapper({ children }: { children: ReactNode }) {
  const font = useAppSelector((state) => state.font);

  return <div className={fontClassMap[font]}>{children}</div>;
}
