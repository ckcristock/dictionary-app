"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { toggleTheme } from "@/app/store/themeSlice";

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const [mounted, setMounted] = useState(false); // Para evitar problemas de hidratación

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleToggle = () => {
    dispatch(toggleTheme());
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
