import { useState, FormEvent, KeyboardEvent } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const { theme } = useTheme();
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const inputStylesConfig = {
    original: {
      inputBg: 'bg-[#120e30]/90 border-indigo-500/30 focus:border-cyan-400/80 focus:ring-cyan-400/40',
      sparkle: 'text-indigo-400/60',
      btnBg: 'bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 shadow-indigo-600/30',
    },
    cute: {
      inputBg: 'bg-[#200d33]/90 border-pink-500/30 focus:border-pink-400/80 focus:ring-pink-400/40',
      sparkle: 'text-pink-400/60',
      btnBg: 'bg-gradient-to-tr from-pink-600 via-rose-500 to-purple-500 shadow-pink-600/30',
    },
    dreamy: {
      inputBg: 'bg-[#0d0933]/90 border-violet-500/30 focus:border-cyan-400/80 focus:ring-cyan-400/40',
      sparkle: 'text-violet-400/60',
      btnBg: 'bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-500 shadow-violet-600/30',
    },
    devil: {
      inputBg: 'bg-[#180407]/90 border-red-600/35 focus:border-red-500/80 focus:ring-red-500/40',
      sparkle: 'text-red-400/60',
      btnBg: 'bg-gradient-to-tr from-red-700 via-red-600 to-orange-600 shadow-red-600/30',
    },
    sakura: {
      inputBg: 'bg-[#220a1b]/90 border-pink-400/35 focus:border-pink-300/80 focus:ring-pink-300/40',
      sparkle: 'text-pink-300/60',
      btnBg: 'bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 shadow-rose-500/30',
    },
    candy: {
      inputBg: 'bg-[#0e1634]/90 border-cyan-400/35 focus:border-sky-300/80 focus:ring-sky-300/40',
      sparkle: 'text-sky-300/60',
      btnBg: 'bg-gradient-to-tr from-sky-500 via-purple-500 to-pink-400 shadow-sky-500/30',
    },
  };

  const inputStyles = inputStylesConfig[theme] || inputStylesConfig.original;

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? 'AI is thinking...' : 'Ask anything about Abhay...'}
          disabled={isLoading}
          className={`w-full ${inputStyles.inputBg} border rounded-xl pl-4 pr-10 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-inner`}
        />
        <div className={`absolute right-3 top-1/2 -translate-y-1/2 ${inputStyles.sparkle} pointer-events-none`}>
          <Sparkles size={16} />
        </div>
      </div>

      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        aria-label="Send message"
        className={`w-11 h-11 rounded-xl ${inputStyles.btnBg} text-white flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shrink-0 cursor-pointer`}
      >
        <Send size={16} className={isLoading ? 'animate-pulse' : 'translate-x-[-1px] translate-y-[1px]'} />
      </button>
    </form>
  );
}
