"use client";

import React from "react";

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
  return (
    <div className="mb-10 w-full relative">
      <input
        type="search"
        placeholder="Search word..."
        className={`w-full rounded-xl px-5 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        aria-label="Search"
        className="absolute right-6 top-[calc(50%-12px)] text-purple-600 cursor-pointer"
        onClick={onSearch}
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
