"use client";

import { useTheme } from "@/app/providers/theme-provider"; // Importa el contexto
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="flex items-center justify-center w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer relative p-0"
    >
      {/* El círculo morado que se mueve */}
      <span
        className={`w-4 h-4 bg-purple-600 rounded-full shadow-md transform duration-300 ease-in-out ${
          theme === "dark" ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}
