import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

interface SpeechBubbleProps {
  message: string;
  onDismiss?: () => void;
  onClick?: () => void;
}

export default function SpeechBubble({ message, onClick }: SpeechBubbleProps) {
  const { theme } = useTheme();

  const themeStylesConfig = {
    original: {
      bg: 'bg-[#0e0a29]/95',
      border: 'border-cyan-400/40',
      shadow: 'shadow-[0_0_20px_rgba(56,189,248,0.35)]',
      text: 'text-cyan-200',
      dot: 'bg-cyan-400',
      tail: 'border-t-[#0e0a29]',
    },
    cute: {
      bg: 'bg-[#220d33]/95',
      border: 'border-pink-400/50',
      shadow: 'shadow-[0_0_20px_rgba(244,114,182,0.4)]',
      text: 'text-pink-200',
      dot: 'bg-pink-400',
      tail: 'border-t-[#220d33]',
    },
    dreamy: {
      bg: 'bg-[#0a0728]/95',
      border: 'border-violet-400/50',
      shadow: 'shadow-[0_0_20px_rgba(167,139,250,0.4)]',
      text: 'text-violet-200',
      dot: 'bg-violet-400',
      tail: 'border-t-[#0a0728]',
    },
    devil: {
      bg: 'bg-[#180407]/95',
      border: 'border-red-600/50',
      shadow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
      text: 'text-red-200',
      dot: 'bg-red-500',
      tail: 'border-t-[#180407]',
    },
    sakura: {
      bg: 'bg-[#240c1a]/95',
      border: 'border-pink-300/60',
      shadow: 'shadow-[0_0_20px_rgba(251,113,133,0.45)]',
      text: 'text-pink-100',
      dot: 'bg-pink-400',
      tail: 'border-t-[#240c1a]',
    },
    candy: {
      bg: 'bg-[#0e1738]/95',
      border: 'border-cyan-300/50',
      shadow: 'shadow-[0_0_20px_rgba(56,189,248,0.4)]',
      text: 'text-cyan-100',
      dot: 'bg-cyan-400',
      tail: 'border-t-[#0e1738]',
    },
  };

  const themeStyles = themeStylesConfig[theme] || themeStylesConfig.original;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ type: 'spring', damping: 18, stiffness: 280 }}
      onClick={onClick}
      className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 cursor-pointer pointer-events-auto select-none"
    >
      <div
        className={`relative px-3.5 py-1.5 rounded-2xl backdrop-blur-md border ${themeStyles.bg} ${themeStyles.border} ${themeStyles.shadow} ${themeStyles.text} text-xs font-bold whitespace-nowrap flex items-center gap-1.5 hover:scale-105 transition-all duration-300`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${themeStyles.dot} animate-ping`} />
        <span>{message}</span>

        {/* Speech Bubble Tail */}
        <div
          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] ${themeStyles.tail}`}
        />
      </div>
    </motion.div>
  );
}
