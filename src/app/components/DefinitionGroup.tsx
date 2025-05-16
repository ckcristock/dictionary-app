type DefinitionGroupProps = {
  partOfSpeech: string;
  meanings: string[];
  synonyms?: string[];
  quote?: string;
};

const DefinitionGroup: React.FC<DefinitionGroupProps> = ({
  partOfSpeech,
  meanings,
  synonyms,
  quote,
}) => (
  <div>
    <h2 className="italic font-semibold mb-2">{partOfSpeech}</h2>
    <p className="mb-2 font-semibold">Meaning</p>
    <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
      {meanings.map((m, i) => (
        <li key={i}>{m}</li>
      ))}
    </ul>
    {synonyms?.length && (
      <>
        <p className="mt-3 font-semibold">Synonyms</p>
        {synonyms.map((s, i) => (
          <a
            key={i}
            href={`https://en.wiktionary.org/wiki/${s}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline block"
          >
            {s}
          </a>
        ))}
      </>
    )}
    {quote && (
      <blockquote className="mt-2 pl-5 border-l-4 border-gray-300 dark:border-gray-600 italic text-gray-500 dark:text-gray-400">
        {quote}
      </blockquote>
    )}
  </div>
);

export default DefinitionGroup;
