"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";

type Font = {
  label: string;
  className: string;
};

type HeaderProps = {
  fonts: Font[];
  font: Font;
  setFont: (font: Font) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({
  fonts,
  font,
  setFont,
  darkMode,
  setDarkMode,
}) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="text-3xl font-bold cursor-pointer select-none">
        {/* Icon libro simple */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-6-6h12"
          />
        </svg>
      </div>

      <div className="flex items-center space-x-6">
        {/* Font selector */}
        <select
          aria-label="Select font"
          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-1 cursor-pointer"
          value={font.label}
          onChange={(e) => {
            const selectedFont = fonts.find((f) => f.label === e.target.value);
            if (selectedFont) setFont(selectedFont);
          }}
        >
          {fonts.map((f) => (
            <option key={f.label} value={f.label}>
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
          className="w-6 h-6"
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
