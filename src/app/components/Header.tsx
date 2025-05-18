"use client";

import React, { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAppSelector } from "@/app/hooks/redux";
import type { Font } from "@/app/store/themeSlice";
import Image from "next/image";
import libroIconNegro from "../assets/libro100.png";
import libroIconBlanco from "../assets/libro100blanco.png";

type FontOption = { label: string; value: Font };

type HeaderProps = {
  fonts: FontOption[];
  font: Font;
  setFont: (font: Font) => void;
  darkMode?: boolean;
  setDarkMode?: (value: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({
  fonts,
  font,
  setFont,
  darkMode,
  setDarkMode,
}) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const [showBlack, setShowBlack] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBlack(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [theme]);

  return (
    <header className="flex justify-between items-center mb-6 pt-0 mt-0 md:px-0">
      <div className="flex items-center">
        <button
          className="text-3xl font-bold cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 rounded transition mr-4"
          aria-label="Go to home"
          type="button"
        >
          {theme === "dark" ? (
            <Image
              src={libroIconBlanco}
              alt="Libro Icon"
              width={40}
              height={40}
            />
          ) : (
            <Image
              src={libroIconNegro}
              alt="Libro Icon"
              width={40}
              height={40}
            />
          )}
        </button>
      </div>
      <div className="flex items-center space-x-4">
        {" "}
        {/* Reduced space-x for mobile */}
        {/* Font selector */}
        <select
          aria-label="Select font"
          className={`rounded px-3 py-1 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 transition-colors text-sm ${
            // Reduced font size
            theme === "dark"
              ? "bg-gray-800 text-gray-100"
              : "bg-[#f4f4f4] text-black"
          }`}
          value={font}
          onChange={(e) => {
            const selectedFont = fonts.find((f) => f.value === e.target.value);
            if (selectedFont) setFont(selectedFont.value);
          }}
        >
          {fonts.map((f) => (
            <option key={f.value} value={f.value} className="text-sm">
              {f.label}
            </option>
          ))}
        </select>
        {/* Toggle dark mode */}
        <ThemeToggle />
        {/* Moon icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5" // Reduced size for mobile
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
          />
        </svg>
      </div>
    </header>
  );
};

export default Header;
