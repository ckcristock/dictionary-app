"use client";

import { useTheme } from "@/app/providers/theme-provider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle Theme"
      className={`relative flex items-center w-14 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
        isDark ? "bg-gray-700" : "bg-[#757575]"
      }`}
    >
      <span
        className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-transform duration-300 ${
          isDark ? "translate-x-6" : "translate-x-0"
        } bg-[#ededed]`}
      />
    </button>
  );
}
