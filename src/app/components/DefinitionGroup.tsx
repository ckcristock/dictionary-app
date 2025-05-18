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
    <div className="flex items-center mb-2">
      <h2 className="italic font-semibold mr-4 whitespace-nowrap">
        {partOfSpeech}
      </h2>
      <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
    </div>
    <p className="mb-2 text-[#aeb6d0]">Meaning</p>
    <ul className="list-disc pl-5 space-y-1">
      {meanings.map((m, i) => (
        <li key={i}>{m}</li>
      ))}
    </ul>
    {synonyms && synonyms.length > 0 && (
      <div className="mt-10 flex items-center gap-6 flex-wrap">
        <p className="font-semibold whitespace-nowrap">Synonyms</p>
        <div className="flex flex-wrap gap-2">
          {synonyms.map((s, i) => (
            <a
              key={i}
              href={`https://en.wiktionary.org/wiki/${s}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline cursor-pointer focus:outline-none focus:underline"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    )}
    {quote && (
      <blockquote className="mt-2 pl-5 border-l-4 border-gray-300 dark:border-gray-600 italic text-gray-500 dark:text-gray-400">
        {quote}
      </blockquote>
    )}
  </div>
);

export default DefinitionGroup;
