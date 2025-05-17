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
  const searchBtnRef = useRef<HTMLButtonElement>(null);
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
        inputRef.current?.focus();
      }
    };
    if (showSuggestions) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showSuggestions]);

  const handleBlur = () => {
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (
        suggestionsRef.current?.contains(active) ||
        inputRef.current?.contains(active) ||
        searchBtnRef.current?.contains(active)
      ) {
        return;
      }
      setShowSuggestions(false);
    });
  };

  const handleSearch = () => {
    const raw = search.trim();

    // 1. No vacío
    if (!raw) {
      setError("Please enter a word to search.");
      return;
    }

    // 2. Longitud mínima y máxima
    if (raw.length < 2) {
      setError("Please enter at least 2 characters.");
      return;
    }
    if (raw.length > 30) {
      setError("Please enter no more than 30 characters.");
      return;
    }

    // 3. Sólo letras, espacios, apóstrofos y guiones
    const ALPHA = /^[A-Za-zÀ-ÿñÑ\s'-]+$/;
    if (!ALPHA.test(raw)) {
      setError("Please use only letters, spaces, apostrophes or hyphens.");
      return;
    }

    // 4. Sin múltiples espacios o guiones consecutivos
    if (/\s{2,}/.test(raw) || /-{2,}/.test(raw)) {
      setError("Avoid multiple consecutive spaces or hyphens.");
      return;
    }

    // 5. Normalizar
    const normalized = raw
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    // 6. Filtrado de “bad words" comparando tokens directos
    const blacklist = new Set([
      "nigger",
      "faggot",
      "chink",
      "kike",
      "spic",
      "fuck",
      "cock",
      "pussy",
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
      setError("Your search contains prohibited terms.");
      return;
    }

    // 7. Pasó todas las validaciones
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
        <Search size={20} color="black" className="block dark:hidden" />
        <Search size={20} color="white" className="hidden dark:block" />
      </button>
      {error && <p className="text-red-500 text-sm mt-2 pl-1">{error}</p>}
      {showSuggestions && filteredHistory.length > 0 && (
        <div
          ref={suggestionsRef}
          tabIndex={-1}
          onKeyDown={handleSuggestionKeyDown}
          className="absolute left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-xl shadow-md z-10 max-h-60 overflow-y-auto"
        >
          <ul>
            {filteredHistory.map((item, idx) => (
              <li
                key={idx}
                tabIndex={0}
                className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
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
