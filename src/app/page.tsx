"use client";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import React, { useState } from "react";

import { useTheme, Font } from "@/app/providers/theme-provider";

const fontOptions: { label: string; value: Font }[] = [
  { label: "Serif", value: "serif" },
  { label: "Sans-serif", value: "sans" },
  { label: "Monospace", value: "mono" },
];

export default function HomePage() {
  const { font, setFont } = useTheme(); // ✅ Usamos el contexto
  const [search, setSearch] = useState("keyboard");

  return (
    <main
      className={`max-w-5xl mx-auto p-4 md:p-8 ${`font-${font}`} flex flex-col min-h-screen`}
    >
      {/* Header: Icon + Controls */}
      <Header fonts={fontOptions} font={font} setFont={setFont} />

      {/* Search input */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={() => alert("Searching for: " + search)}
      />

      {/* Results */}
      <Results search={search} />

      {/* Test Tailwind */}
      <div className="bg-red-500 text-white p-4 rounded mt-4">
        Esto debe verse rojo si Tailwind está funcionando.
      </div>
    </main>
  );
}
