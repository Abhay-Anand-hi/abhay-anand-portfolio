import { motion } from 'motion/react';
import { Bot, User, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { ChatMessage as ChatMessageType } from './types';
import { useTheme } from '../../context/ThemeContext';

export default function ChatMessage({
  message,
  onQuickAction,
  disabled = false,
}: {
  message: ChatMessageType;
  key?: string | number;
  onQuickAction?: (text: string) => void;
  disabled?: boolean;
}) {
  const { theme } = useTheme();
  const isBot = message.role === 'assistant';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const themeBubbleStylesConfig = {
    original: {
      botAvatar: 'bg-gradient-to-tr from-cyan-600 to-indigo-600 border-cyan-400/40 shadow-cyan-500/20',
      userAvatar: 'bg-gradient-to-tr from-purple-600 to-pink-600 border-purple-400/30 shadow-purple-500/20',
      botBubble: 'bg-[#140f35]/90 border-indigo-500/20 text-slate-200',
      userBubble: 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-indigo-950/40',
      strongColor: 'text-cyan-200',
      bulletColor: 'text-cyan-400',
    },
    cute: {
      botAvatar: 'bg-gradient-to-tr from-pink-500 to-purple-600 border-pink-400/40 shadow-pink-500/20',
      userAvatar: 'bg-gradient-to-tr from-purple-500 to-pink-500 border-pink-300/30 shadow-pink-500/20',
      botBubble: 'bg-[#220d36]/90 border-pink-500/25 text-pink-50',
      userBubble: 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-pink-950/40',
      strongColor: 'text-pink-200',
      bulletColor: 'text-pink-400',
    },
    dreamy: {
      botAvatar: 'bg-gradient-to-tr from-violet-600 to-cyan-500 border-violet-400/40 shadow-violet-500/20',
      userAvatar: 'bg-gradient-to-tr from-indigo-500 to-violet-600 border-violet-300/30 shadow-violet-500/20',
      botBubble: 'bg-[#0d0936]/90 border-violet-500/25 text-violet-50',
      userBubble: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-violet-950/40',
      strongColor: 'text-violet-200',
      bulletColor: 'text-cyan-300',
    },
    devil: {
      botAvatar: 'bg-gradient-to-tr from-red-600 to-orange-600 border-red-500/40 shadow-red-600/20',
      userAvatar: 'bg-gradient-to-tr from-stone-700 to-red-800 border-red-500/30 shadow-red-900/20',
      botBubble: 'bg-[#1a0407]/95 border-red-600/30 text-red-50',
      userBubble: 'bg-gradient-to-r from-red-700 to-red-600 text-white shadow-red-950/50',
      strongColor: 'text-red-300',
      bulletColor: 'text-red-400',
    },
    sakura: {
      botAvatar: 'bg-gradient-to-tr from-rose-500 to-pink-600 border-pink-300/40 shadow-rose-500/20',
      userAvatar: 'bg-gradient-to-tr from-fuchsia-600 to-rose-500 border-pink-200/30 shadow-pink-500/20',
      botBubble: 'bg-[#230b1e]/90 border-pink-400/30 text-pink-50',
      userBubble: 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-rose-950/40',
      strongColor: 'text-pink-200',
      bulletColor: 'text-rose-400',
    },
    candy: {
      botAvatar: 'bg-gradient-to-tr from-sky-500 to-purple-600 border-cyan-300/40 shadow-sky-500/20',
      userAvatar: 'bg-gradient-to-tr from-purple-500 to-pink-500 border-cyan-200/30 shadow-purple-500/20',
      botBubble: 'bg-[#0f1938]/90 border-cyan-400/30 text-cyan-50',
      userBubble: 'bg-gradient-to-r from-sky-600 via-purple-600 to-pink-500 text-white shadow-sky-950/40',
      strongColor: 'text-cyan-200',
      bulletColor: 'text-sky-400',
    },
  };

  const themeBubbleStyles = themeBubbleStylesConfig[theme] || themeBubbleStylesConfig.original;

  // Simple parser to render markdown bolding and bullet points cleanly
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      // Process bold markers (**text**)
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIdx} className={`font-semibold ${themeBubbleStyles.strongColor}`}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      // Render bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
            <span className={`${themeBubbleStyles.bulletColor} mt-1.5 text-xs`}>•</span>
            <span className="flex-1">{formattedParts}</span>
          </div>
        );
      }

      if (line.trim().match(/^\d+\.\s/)) {
        return (
          <div key={lineIdx} className="my-1 pl-1">
            {formattedParts}
          </div>
        );
      }

      return (
        <p key={lineIdx} className={lineIdx > 0 && line.trim() === '' ? 'h-2' : 'my-0.5'}>
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md border ${
          isBot ? themeBubbleStyles.botAvatar : themeBubbleStyles.userAvatar
        } text-white transition-all duration-300`}
      >
        {isBot ? <Bot size={18} className="animate-pulse" /> : <User size={16} />}
      </div>

      {/* Message Bubble */}
      <div
        className={`relative max-w-[82%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm font-normal leading-relaxed group border shadow-lg ${
          isBot
            ? `${themeBubbleStyles.botBubble} rounded-tl-sm`
            : `${themeBubbleStyles.userBubble} border-transparent rounded-tr-sm`
        } transition-colors duration-300`}
      >
        <div className="text-[13.5px] leading-relaxed break-words">
          {renderFormattedText(message.text)}
        </div>

        {/* Quick Action Buttons (if fallback or suggested actions provided) */}
        {message.quickActions && message.quickActions.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
            {message.quickActions.map((action) => (
              <button
                key={action}
                onClick={() => onQuickAction?.(action)}
                disabled={disabled}
                className="text-[11px] font-medium text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-left active:scale-95"
              >
                {action}
              </button>
            ))}
          </div>
        )}

        {/* Footer timestamp & copy button */}
        <div
          className={`flex items-center gap-2 mt-2 pt-1 border-t ${
            isBot ? 'border-white/5 text-slate-400' : 'border-white/10 text-white/80'
          } text-[10px] font-mono justify-between`}
        >
          <span>{message.timestamp}</span>
          {isBot && (
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
              title="Copy message"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
