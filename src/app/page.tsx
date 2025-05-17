"use client";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "@/app/hooks/redux";
import { setFont } from "@/app/store/themeSlice";
import { fetchWord } from "@/app/store/dictionarySlice";
import type { Font } from "@/app/store/themeSlice";

const fontOptions: { label: string; value: Font }[] = [
  { label: "Serif", value: "serif" },
  { label: "Sans-serif", value: "sans" },
  { label: "Monospace", value: "mono" },
];

export default function HomePage() {
  const dispatch = useAppDispatch();
  const font = useAppSelector((state) => state.theme.font);

  const [search, setSearch] = useState("keyboard");

  const handleSetFont = (newFont: Font) => {
    dispatch(setFont(newFont));
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    dispatch(fetchWord(search));
  };

  return (
    <main
      className={`max-w-5xl mx-auto p-4 md:p-8 ${`font-${font}`} flex flex-col min-h-screen`}
    >
      {/* Header: Icon + Controls */}
      <Header fonts={fontOptions} font={font} setFont={handleSetFont} />

      {/* Search input */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />

      {/* Results */}
      <Results />
    </main>
  );
}
