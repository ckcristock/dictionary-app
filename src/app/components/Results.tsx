"use client";

import React from "react";
import { useAppSelector } from "@/app/hooks/redux";
import WordHeader from "./WordHeader";
import DefinitionGroup from "./DefinitionGroup";

const Results: React.FC = () => {
  const { result, loading, error } = useAppSelector(
    (state) => state.dictionary
  );

  if (loading)
    return (
      <div className="text-center text-neutral-500 italic mt-8">Loading...</div>
    );

  if (error)
    return <div className="text-center text-red-500 italic mt-8">{error}</div>;

  if (!result)
    return (
      <div className="text-center text-neutral-500 italic mt-8">
        No word searched yet.
      </div>
    );

  const phonetic = result.phonetic || result.phonetics?.[0]?.text || "";
  const audioUrl = result.phonetics?.find((p) => p.audio)?.audio;

  const handlePlayAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <article className="flex-grow mt-8 mb-16">
      <WordHeader
        word={result.word}
        phonetic={phonetic}
        onPlay={handlePlayAudio}
      />

      <section className="space-y-6">
        {result.meanings.map((meaning, idx) => (
          <DefinitionGroup
            key={`${meaning.partOfSpeech}-${idx}`}
            partOfSpeech={meaning.partOfSpeech}
            meanings={meaning.definitions.map((d) => d.definition)}
            synonyms={meaning.synonyms || []}
            quote={meaning.definitions.find((d) => d.example)?.example}
            isFirst={idx === 0} // This is the key line!
          />
        ))}
      </section>

      <footer className="mt-10 text-sm text-gray-400 dark:text-gray-500">
        <div className="text-[#aeb6d0]">Source</div>
        <a
          href={result.sourceUrls[0]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded block"
        >
          {result.sourceUrls[0]}
        </a>
      </footer>
    </article>
  );
};

export default Results;
