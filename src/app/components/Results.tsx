"use client";

import React from "react";

type ResultsProps = {
  search: string;
};

const Results: React.FC<ResultsProps> = ({ search }) => {
  if (!search) return null; // Opcional: no mostrar si está vacío

  return (
    <article className="flex-grow">
      {/* Word & pronunciation */}
      <h1 className="text-5xl font-extrabold tracking-tight mb-1">{search}</h1>
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
              (etc.) A set of keys used to operate a typewriter, computer etc.
            </li>
            <li>
              A component of many instruments including the piano, organ, and
              harpsichord consisting of usually black and white keys that cause
              different tones to be produced when struck.
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
  );
};

export default Results;
