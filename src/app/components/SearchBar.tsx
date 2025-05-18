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

const validateSearch = (term: string): string | null => {
  const raw = term.trim();
  if (!raw) return "Please enter a word to search.";
  if (raw.length < 2) return "Please enter at least 2 characters.";
  if (raw.length > 30) return "Please enter no more than 30 characters.";

  const ALPHA = /^[A-Za-zÀ-ÿñÑ\s'-]+$/;
  if (!ALPHA.test(raw))
    return "Please use only letters, spaces, apostrophes or hyphens.";
  if (/\s{2,}/.test(raw) || /-{2,}/.test(raw))
    return "Avoid multiple consecutive spaces or hyphens.";

  const normalized = raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const blacklist = new Set([
    "nigger",
    "faggot",
    "chink",
    "kike",
    "spic",
    "fuck",
    "cock",
    "pussy",
    "bitch",
    "dick",
    "anal",
    "cunnilingus",
    "rape",
    "torture",
    "murder",
    "cocaine",
    "heroin",
    "meth",
    "lsd",
  ]);

  const tokens = normalized.match(/\b[a-z0-9'-]+\b/g) || [];
  if (tokens.some((token) => blacklist.has(token))) {
    return "Your search contains prohibited terms.";
  }

  return null;
};

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  onSearch,
}) => {
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);
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
        inputRef.current?.focus();
      }
    };
    if (showSuggestions) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showSuggestions]);

  const handleSearch = () => {
    const errorMsg = validateSearch(search);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    const normalized = search
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    setError("");
    setSearch(normalized);
    onSearch(normalized);
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

  const handleBlur = () => {
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (
        suggestionsRef.current?.contains(active) ||
        inputRef.current?.contains(active) ||
        searchBtnRef.current?.contains(active)
      )
        return;
      setShowSuggestions(false);
    });
  };

  const handleSuggestionKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !suggestionsRef.current) return;
    const focusables = Array.from(
      suggestionsRef.current.querySelectorAll("li[tabindex='0'], button")
    ) as HTMLElement[];
    const currentIndex = focusables.findIndex(
      (el) => el === document.activeElement
    );
    let next = e.shiftKey ? currentIndex - 1 : currentIndex + 1;

    if (!e.shiftKey && next >= focusables.length) {
      e.preventDefault();
      setShowSuggestions(false);
      searchBtnRef.current?.focus();
      return;
    }
    if (e.shiftKey && next < 0) {
      e.preventDefault();
      setShowSuggestions(false);
      searchBtnRef.current?.focus();
      return;
    }
    if (next < 0) next = focusables.length - 1;
    if (next >= focusables.length) next = 0;

    e.preventDefault();
    focusables[next].focus();
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a word…"
        className={`w-full rounded-xl px-5 py-3 text-base sm:text-lg shadow-sm focus:outline-none focus:ring-2 ${
          error ? "ring-2 ring-red-500" : "focus:ring-purple-600"
        }`}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if (error) setError("");
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <button
        ref={searchBtnRef}
        aria-label="Search"
        tabIndex={showSuggestions ? -1 : 0}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded cursor-pointer"
        onClick={handleSearch}
        type="button"
      >
        <Search
          size={20}
          className={theme === "dark" ? "text-white" : "text-black"}
        />
      </button>
      <div className="absolute left-0 w-full mt-1 h-5">
        {error && <p className="text-red-500 text-sm pl-1">{error}</p>}
      </div>

      {showSuggestions && filteredHistory.length > 0 && (
        <div
          ref={suggestionsRef}
          tabIndex={-1}
          onKeyDown={handleSuggestionKeyDown}
          className={`absolute left-0 right-0 mt-1 rounded-xl shadow-md z-10 max-h-60 overflow-y-auto text-sm sm:text-base ${
            theme === "dark"
              ? "bg-zinc-900 border border-zinc-700"
              : "bg-white border border-gray-300"
          }`}
        >
          <ul>
            {filteredHistory.map((item) => (
              <li
                key={item.word}
                tabIndex={0}
                className={`flex justify-between items-center px-4 py-2 cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                  theme === "dark"
                    ? "text-gray-200 hover:bg-zinc-800"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => handleSelectHistory(item.word)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSelectHistory(item.word);
                }}
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
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleRemoveHistoryItem(item.word);
                      }
                    }}
                    className="p-1 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded cursor-pointer"
                    aria-label={`Remove ${item.word} from history`}
                    type="button"
                  >
                    <X size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div
            className={`flex justify-end px-3 py-2 border-t ${
              theme === "dark"
                ? "border-zinc-700 bg-zinc-800"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <button
              tabIndex={0}
              onMouseDown={(e) => {
                e.preventDefault();
                dispatch(clearHistory());
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  dispatch(clearHistory());
                }
              }}
              className="flex items-center gap-2 text-xs font-medium text-red-600 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded transition-colors cursor-pointer"
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
