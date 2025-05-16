"use client";

import { useTheme } from "@/app/providers/theme-provider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    console.log("Cambiando tema a:", newTheme); // ✅ Log para depurar
    setTheme(newTheme);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle Theme"
      className="flex items-center justify-center w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer relative p-0"
    >
      <span
        className={`w-4 h-4 bg-purple-600 rounded-full shadow-md transform duration-300 ease-in-out ${
          theme === "dark" ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}
