"use client";
import React from "react";
import WordHeader from "./WordHeader";
import DefinitionGroup from "./DefinitionGroup";

type ResultsProps = {
  search: string;
};

const Results: React.FC<ResultsProps> = ({ search }) => {
  if (!search) return null;

  // Mock de data (luego vendrá de API)
  const data = {
    phonetic: "/ˈkiːbɔːrd/",
    noun: {
      meanings: [
        "A set of keys used to operate a typewriter, computer etc.",
        "A component of many instruments including the piano, organ, and harpsichord...",
        "A device with keys of a musical keyboard, used to control electronic sound devices.",
      ],
      synonyms: ["electronic keyboard"],
    },
    verb: {
      meanings: ["To type on a computer keyboard."],
      quote: "“Keyboarding is the part of this job I hate the most.”",
    },
  };

  return (
    <article className="flex-grow">
      <WordHeader
        word={search}
        phonetic={data.phonetic}
        onPlay={() => alert("Playing pronunciation for: " + search)}
      />

      <section className="space-y-6">
        <DefinitionGroup
          partOfSpeech="noun"
          meanings={data.noun.meanings}
          synonyms={data.noun.synonyms}
        />
        <DefinitionGroup
          partOfSpeech="verb"
          meanings={data.verb.meanings}
          quote={data.verb.quote}
        />
      </section>

      <footer className="mt-10 text-sm text-gray-400 dark:text-gray-500">
        Source{" "}
        <a
          href={`https://en.wiktionary.org/wiki/${search}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-purple-600"
        >
          https://en.wiktionary.org/wiki/{search}
        </a>
      </footer>
    </article>
  );
};

export default Results;
