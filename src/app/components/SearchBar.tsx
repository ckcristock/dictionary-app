"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, Trash2 } from "lucide-react";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { clearHistory, setHistoryFromStorage } from "../store/dictionarySlice";

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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.dictionary.history);

  // Cargar historial desde localStorage al montar el componente (cliente)
  useEffect(() => {
    const historyJson = localStorage.getItem("searchHistory");
    if (historyJson) {
      try {
        const parsed = JSON.parse(historyJson);
        if (Array.isArray(parsed)) {
          dispatch(setHistoryFromStorage(parsed));
        }
      } catch (err) {
        console.error("Invalid history JSON:", err);
      }
    }
  }, [dispatch]);

  const handleSearch = () => {
    if (!search.trim()) {
      setError("Please enter a word to search.");
      return;
    }

    setError("");
    onSearch();
    setShowSuggestions(false);
  };

  const handleSelectHistory = (word: string) => {
    setSearch(word);
    onSearch();
    setShowSuggestions(false);
  };

  return (
    <div className="mb-10 w-full relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search word..."
        className={`w-full rounded-xl px-5 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 ${
          error ? "ring-2 ring-red-500" : "focus:ring-purple-600"
        }`}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if (error) setError("");
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
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
        <Search size={20} color="black" className="block dark:hidden" />
        <Search size={20} color="white" className="hidden dark:block" />
      </button>

      {error && <p className="text-red-500 text-sm mt-2 pl-1">{error}</p>}

      {showSuggestions && history.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-xl shadow-md z-10 max-h-60 overflow-y-auto">
          <ul>
            {history.map((item, idx) => (
              <li
                key={idx}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm text-gray-800 dark:text-gray-200"
                onClick={() => handleSelectHistory(item.word)}
              >
                {item.word}
                <span className="ml-2 text-xs text-gray-400">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>

          <button
            onMouseDown={(e) => {
              // evitar que el input pierda foco **antes** de disparar el dispatch
              e.preventDefault();
              dispatch(clearHistory());
            }}
            className="flex items-center gap-2 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors cursor-pointer"
          >
            <Trash2 size={14} /> Clear history
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
