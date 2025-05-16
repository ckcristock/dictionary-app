type WordHeaderProps = {
  word: string;
  phonetic: string;
  onPlay: () => void;
};

const WordHeader: React.FC<WordHeaderProps> = ({ word, phonetic, onPlay }) => (
  <>
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-5xl font-extrabold tracking-tight">{word}</h1>
        <p className="text-purple-600 text-xl">{phonetic}</p>
      </div>

      <button
        aria-label="Play pronunciation"
        className="bg-purple-200 hover:bg-purple-300 rounded-full w-16 h-16 flex items-center justify-center shadow-md ml-4"
        onClick={onPlay}
      >
        ▶
      </button>
    </div>
  </>
);

export default WordHeader;
