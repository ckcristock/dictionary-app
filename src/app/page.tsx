"use client";

import { useState } from "react";

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
        <header className="flex justify-between items-center mb-6">
          <div className="text-3xl font-bold cursor-pointer select-none">
            {/* Icon libro simple */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-6-6h12"
              />
            </svg>
          </div>

          <div className="flex items-center space-x-6">
            {/* Font selector */}
            <select
              aria-label="Select font"
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-1 cursor-pointer"
              value={font.label}
              onChange={(e) => {
                const f = fonts.find((f) => f.label === e.target.value);
                if (f) setFont(f);
              }}
            >
              {fonts.map((f) => (
                <option key={f.label} value={f.label}>
                  {f.label}
                </option>
              ))}
            </select>

            {/* Toggle dark mode */}
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-center w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer relative"
            >
              <span
                className={`w-4 h-4 bg-purple-600 rounded-full shadow-md transform duration-300 ease-in-out ${
                  darkMode ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>

            {/* Moon icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
              />
            </svg>
          </div>
        </header>

        {/* Search input */}
        <div className="mb-10 w-full">
          <input
            type="search"
            placeholder="Search word..."
            className="w-full rounded-xl px-5 py-3 text-lg dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            aria-label="Search"
            className="absolute right-6 top-[calc(50%-12px)] text-purple-600 cursor-pointer"
            onClick={() => alert("Search for: " + search)}
          >
            🔍
          </button>
        </div>

        {/* Results */}
        <article className="flex-grow">
          {/* Word & pronunciation */}
          <h1 className="text-5xl font-extrabold tracking-tight mb-1">
            {search}
          </h1>
          <p className="text-purple-600 text-xl mb-6">/ˈkiːbɔːrd/</p>

          {/* Play button */}
          <button
            aria-label="Play pronunciation"
            className="bg-purple-200 hover:bg-purple-300 rounded-full w-16 h-16 flex items-center justify-center mb-8 shadow-md"
            onClick={() => alert("Playing pronunciation for: " + search)}
          >
            ▶
          </button>

          {/* Definitions */}
          <section className="space-y-6">
            {/* Noun */}
            <div>
              <h2 className="italic font-semibold mb-2">noun</h2>
              <p className="mb-2 font-semibold">Meaning</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>
                  (etc.) A set of keys used to operate a typewriter, computer
                  etc.
                </li>
                <li>
                  A component of many instruments including the piano, organ,
                  and harpsichord consisting of usually black and white keys
                  that cause different tones to be produced when struck.
                </li>
                <li>
                  A device with keys of a musical keyboard, used to control
                  electronic sound-producing devices which may be built into or
                  separate from the keyboard device.
                </li>
              </ul>
              <p className="mt-3 font-semibold">Synonyms</p>
              <a
                href="https://en.wiktionary.org/wiki/keyboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                electronic keyboard
              </a>
            </div>

            {/* Verb */}
            <div>
              <h2 className="italic font-semibold mb-2">verb</h2>
              <p className="mb-2 font-semibold">Meaning</p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                <li>To type on a computer keyboard.</li>
              </ul>
              <blockquote className="mt-2 pl-5 border-l-4 border-gray-300 dark:border-gray-600 italic text-gray-500 dark:text-gray-400">
                “Keyboarding is the part of this job I hate the most.”
              </blockquote>
            </div>
          </section>

          {/* Source */}
          <footer className="mt-10 text-sm text-gray-400 dark:text-gray-500">
            Source{" "}
            <a
              href="https://en.wiktionary.org/wiki/keyboard"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-purple-600"
            >
              https://en.wiktionary.org/wiki/keyboard
            </a>
          </footer>
        </article>
      </main>
    </div>
  );
}
