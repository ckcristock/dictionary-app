"use client";

import { useTheme } from "@/app/providers/theme-provider";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // Para evitar problemas de hidratación

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle Theme"
      className="flex items-center justify-start w-12 h-6 bg-[#757575] rounded-full cursor-pointer relative p-0"
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          theme === "dark"
            ? "translate-x-6 bg-[#ededed]"
            : "translate-x-0 bg-[#ededed]"
        }`}
      />
    </button>
  );
}
