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

  const [search, setSearch] = useState("");

  const handleSetFont = (newFont: Font) => {
    dispatch(setFont(newFont));
  };

  const handleSearch = (term?: string) => {
    const wordToSearch = term ?? search;
    if (!wordToSearch.trim()) return;
    setSearch(wordToSearch);
    dispatch(fetchWord(wordToSearch));
  };

  return (
    <main
      className={`max-w-5xl mx-auto p-0 px-6 mt-6 pb-16 md:p-0 md:pb-16 md:mx-8 md:mt-10 lg:mx-auto lg:px-48 lg:mt-11 lg:pb-16 font-${font} flex flex-col`}
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
