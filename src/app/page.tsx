"use client";

import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";

const fonts = [
  { label: "Serif", className: "font-serif" },
  { label: "Sans-serif", className: "font-sans" },
  { label: "Monospace", className: "font-mono" },
];

export default function HomePage() {
  const [font, setFont] = useState(fonts[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("keyboard");

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}
    >
      <main
        className={`max-w-5xl mx-auto p-4 md:p-8 ${font.className} flex flex-col min-h-screen`}
      >
        {/* Header: Icon + Controls */}
        <Header
          fonts={fonts}
          font={font}
          setFont={setFont}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Search input */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          onSearch={() => alert("Searching for: " + search)}
        />

        {/* Results */}
        <Results search={search} />
      </main>
    </div>
  );
}
