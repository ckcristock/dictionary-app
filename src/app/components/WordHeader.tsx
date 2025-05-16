type WordHeaderProps = {
  word: string;
  phonetic: string;
  onPlay: () => void;
};

const WordHeader: React.FC<WordHeaderProps> = ({ word, phonetic, onPlay }) => (
  <>
    <h1 className="text-5xl font-extrabold tracking-tight mb-1">{word}</h1>
    <p className="text-purple-600 text-xl mb-6">{phonetic}</p>
    <button
      aria-label="Play pronunciation"
      className="bg-purple-200 hover:bg-purple-300 rounded-full w-16 h-16 flex items-center justify-center mb-8 shadow-md"
      onClick={onPlay}
    >
      ▶
    </button>
  </>
);

export default WordHeader;
