import { Play } from "lucide-react"; // o el ícono que prefieras

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
        <p className="text-purple-600 text-xl mt-3">{phonetic}</p>
      </div>

      <button
        aria-label="Play pronunciation"
        className="bg-purple-200 hover:bg-purple-300 rounded-full w-16 h-16 flex items-center justify-center 
  shadow-md ml-4 cursor-pointer focus:outline-none 
  focus-visible:ring-2 focus-visible:ring-purple-400 transition-colors"
        onClick={onPlay}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#a444ed"
          className="w-6 h-6 translate-x-[1px]"
        >
          <path d="M5 3.868v16.264c0 .795.863 1.291 1.548.894l13.017-8.132a1.032 1.032 0 000-1.788L6.548 2.974A1.032 1.032 0 005 3.868z" />
        </svg>
      </button>
    </div>
  </>
);

export default WordHeader;
