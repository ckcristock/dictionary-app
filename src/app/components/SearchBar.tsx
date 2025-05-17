"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, Trash2, X } from "lucide-react";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import {
  clearHistory,
  setHistoryFromStorage,
  removeHistoryItem,
} from "../store/dictionarySlice";

type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
  onSearch: (term?: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  onSearch,
}) => {
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.dictionary.history);

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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSuggestions(false);
      }
    };
    if (showSuggestions) {
      window.addEventListener("keydown", handleEsc);
    } else {
      window.removeEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showSuggestions]);

  const handleBlur = (e: React.FocusEvent) => {
    if (
      suggestionsRef.current &&
      suggestionsRef.current.contains(e.relatedTarget as Node)
    ) {
      return;
    }
    if (
      inputRef.current &&
      inputRef.current.contains(e.relatedTarget as Node)
    ) {
      return;
    }
    setShowSuggestions(false);
  };

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
    setShowSuggestions(false);
    onSearch(word);
  };

  const handleRemoveHistoryItem = (word: string) => {
    dispatch(removeHistoryItem(word));
  };

  const filteredHistory =
    search.trim() === ""
      ? history
      : history.filter((item) =>
          item.word.toLowerCase().includes(search.toLowerCase())
        );

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
          const value = e.target.value;
          setSearch(value);
          if (error) setError("");
          setShowSuggestions(true);
        }}
        onFocus={() => {
          setShowSuggestions(true);
        }}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      <button
        aria-label="Search"
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded cursor-pointer"
        onClick={handleSearch}
        type="button"
      >
        <Search size={20} color="black" className="block dark:hidden" />
        <Search size={20} color="white" className="hidden dark:block" />
      </button>

      {error && <p className="text-red-500 text-sm mt-2 pl-1">{error}</p>}

      {showSuggestions && filteredHistory.length > 0 && (
        <div
          ref={suggestionsRef}
          tabIndex={-1}
          className="absolute left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-xl shadow-md z-10 max-h-60 overflow-y-auto"
        >
          <ul>
            {filteredHistory.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm text-gray-800 dark:text-gray-200"
                onClick={() => handleSelectHistory(item.word)} // CAMBIO de onMouseDown a onClick
              >
                <span>{item.word}</span>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveHistoryItem(item.word);
                    }}
                    className="p-1 hover:text-red-600 dark:hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded cursor-pointer"
                    aria-label={`Remove ${item.word} from history`}
                    type="button"
                  >
                    <X size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-end px-3 py-2 border-t border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800">
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                dispatch(clearHistory());
              }}
              className="flex items-center gap-2 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded transition-colors cursor-pointer"
              type="button"
            >
              <Trash2 size={14} /> Clear history
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
