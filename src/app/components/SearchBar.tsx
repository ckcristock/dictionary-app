"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
  onSearch: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  onSearch,
}) => {
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!search.trim()) {
      setError("Please enter a word to search.");
      return;
    }

    setError(""); // Limpiar mensaje anterior si lo había
    onSearch();
  };

  return (
    <div className="mb-10 w-full relative">
      <input
        type="text"
        placeholder="Search word..."
        className={`w-full rounded-xl px-5 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 ${
          error ? "ring-2 ring-red-500" : "focus:ring-purple-600"
        }`}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if (error) setError(""); // Limpiar error al escribir
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      <button
        aria-label="Search"
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80"
        onClick={handleSearch}
        type="button"
      >
        {/* Ícono negro para modo claro */}
        <Search size={20} color="black" className="block dark:hidden" />

        {/* Ícono blanco para modo oscuro */}
        <Search size={20} color="white" className="hidden dark:block" />
      </button>

      {error && <p className="text-red-500 text-sm mt-2 pl-1">{error}</p>}
    </div>
  );
};

export default SearchBar;
