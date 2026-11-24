import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Minus, RotateCcw, Sparkles } from 'lucide-react';
import { ChatMessage as ChatMessageType } from './types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useTheme } from '../../context/ThemeContext';

interface RobotChatProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

const INITIAL_MESSAGE: ChatMessageType = {
  id: 'welcome-1',
  role: 'assistant',
  text: "Hey! 👋 I'm Abhay's little portfolio assistant 🤖\n\nAsk me anything about his skills, projects, experience, education, or career.",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const SUGGESTED_QUESTIONS = [
  '📄 Resume',
  '💻 Terminal',
  '👨‍💻 Who is Abhay?',
  '🚀 What projects has he built?',
  '🛠️ What are his skills?',
  '💼 Tell me about his experience',
  '🎓 Where does he study?',
  '📩 How can I contact him?',
];

const CLIENT_FALLBACK_MESSAGES = [
  "Hmm... my AI brain is a little busy right now 😭🤖\nGive me a few seconds and try again!",
  "Oopsie! 🤖 My brain is currently overloaded.\nTry asking me again in a moment! ✨",
  "Ahh... Gemini is being a little busy right now 👀\nGive me another try in a few seconds!",
  "Hmm... my AI brain isn't cooperating right now 😭🤖\nTry again in a little while!",
];

const FALLBACK_ACTIONS = [
  '👨‍💻 Who is Abhay?',
  '🚀 What projects has he built?',
  '🛠️ What are his skills?',
  '💼 Tell me about his experience',
  '🎓 Where does he study?',
  '📩 How can I contact him?',
];

function getRandomClientFallback(): string {
  const index = Math.floor(Math.random() * CLIENT_FALLBACK_MESSAGES.length);
  return CLIENT_FALLBACK_MESSAGES[index];
}

export default function RobotChat({ isOpen, onClose, onMinimize }: RobotChatProps) {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<ChatMessageType[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingStage, setThinkingStage] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isRequestInFlightRef = useRef(false);

  // Progressive thinking text timer
  useEffect(() => {
    let t1: NodeJS.Timeout | null = null;
    let t2: NodeJS.Timeout | null = null;

    if (isLoading) {
      setThinkingStage(0);
      t1 = setTimeout(() => {
        setThinkingStage(1);
      }, 2400);
      t2 = setTimeout(() => {
        setThinkingStage(2);
      }, 5500);
    } else {
      setThinkingStage(0);
    }

    return () => {
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, [isLoading]);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen, thinkingStage]);

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading || isRequestInFlightRef.current) {
      return;
    }

    isRequestInFlightRef.current = true;
    setIsLoading(true);

    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);

    const trimmedLower = trimmed.toLowerCase();
    const isTerminalTrigger = trimmedLower.includes('terminal') || trimmedLower === 'cli' || trimmedLower === 'bash';
    const isResumeTrigger = trimmedLower.includes('resume') || trimmedLower.includes('cv') || trimmedLower.includes('pdf');

    if (isTerminalTrigger) {
      window.dispatchEvent(new CustomEvent('open-terminal'));
    }

    if (isResumeTrigger) {
      window.dispatchEvent(new CustomEvent('open-resume'));
    }

    try {
      // Build conversation history to send to server
      const history = messages
        .filter((m) => m.id !== 'welcome-1')
        .map((m) => ({
          role: m.role === 'assistant' ? ('model' as const) : ('user' as const),
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      let botReply = data.reply || "Beep boop! 🤖 I'm here to help you learn about Abhay.";

      if (isTerminalTrigger && !botReply.toLowerCase().includes('terminal')) {
        botReply = "💻 Opening Abhay's Developer Terminal mode! You can explore his portfolio using CLI commands like `help`, `skills`, `projects`, `about`, and `contact`.";
      } else if (isResumeTrigger && !botReply.toLowerCase().includes('resume')) {
        botReply = "📄 Opening Abhay's verified Resume PDF viewer! You can read, zoom, print, or save his complete 1-page engineering resume directly from the modal.";
      }

      const botMsg: ChatMessageType = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: botReply,
        quickActions: data.quickActions || (isResumeTrigger ? ['📄 View Resume', '🚀 Projects', '🛠️ Skills'] : isTerminalTrigger ? ['💻 Open Terminal', '🚀 Projects', '🛠️ Skills'] : undefined),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      // Never expose technical API errors or stack traces to visitors
      let fallbackText = getRandomClientFallback();
      if (isTerminalTrigger) {
        fallbackText = "💻 Opening Abhay's Developer Terminal mode! You can type commands like `help`, `skills`, `projects`, `contact`, or `about`.";
      } else if (isResumeTrigger) {
        fallbackText = "📄 Opening Abhay's verified Resume PDF viewer! You can read, print, or save his 1-page engineering resume.";
      }

      const fallbackMsg: ChatMessageType = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: fallbackText,
        quickActions: isResumeTrigger ? ['📄 View Resume', '🚀 Projects', '🛠️ Skills'] : isTerminalTrigger ? ['💻 Open Terminal', '🚀 Projects', '🛠️ Skills'] : FALLBACK_ACTIONS,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      isRequestInFlightRef.current = false;
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  if (!isOpen) return null;

  const chatThemeConfig = {
    original: {
      windowBg: 'bg-[#09051d]/95 border-indigo-500/30 shadow-[0_20px_60px_rgba(3,0,20,0.8),0_0_30px_rgba(99,102,241,0.2)]',
      topGlow: 'from-cyan-500/20 via-indigo-500/30 to-purple-500/20',
      headerBorder: 'border-indigo-500/20',
      botRing: 'from-indigo-500 via-purple-600 to-cyan-500 shadow-indigo-500/20',
      botInner: 'bg-[#0d0928] text-cyan-300',
      badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      pillsHover: 'hover:bg-indigo-600/40 hover:border-indigo-400/50',
      inputBar: 'border-indigo-500/20 bg-[#0c0824]/90',
    },
    cute: {
      windowBg: 'bg-[#180c29]/95 border-pink-400/40 shadow-[0_20px_60px_rgba(24,12,41,0.8),0_0_30px_rgba(244,114,182,0.25)]',
      topGlow: 'from-pink-500/25 via-purple-500/30 to-rose-400/25',
      headerBorder: 'border-pink-500/25',
      botRing: 'from-pink-400 via-rose-500 to-purple-500 shadow-pink-500/25',
      botInner: 'bg-[#1f0b30] text-pink-300',
      badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      pillsHover: 'hover:bg-pink-600/40 hover:border-pink-400/50',
      inputBar: 'border-pink-500/25 bg-[#1a0a2c]/90',
    },
    dreamy: {
      windowBg: 'bg-[#070624]/95 border-violet-500/40 shadow-[0_20px_60px_rgba(7,6,36,0.8),0_0_30px_rgba(167,139,250,0.25)]',
      topGlow: 'from-violet-500/25 via-indigo-500/30 to-cyan-500/20',
      headerBorder: 'border-violet-500/25',
      botRing: 'from-violet-500 via-indigo-600 to-cyan-400 shadow-violet-500/25',
      botInner: 'bg-[#0b0833] text-violet-300',
      badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
      pillsHover: 'hover:bg-violet-600/40 hover:border-violet-400/50',
      inputBar: 'border-violet-500/25 bg-[#0a0830]/90',
    },
    devil: {
      windowBg: 'bg-[#0d0306]/95 border-red-600/45 shadow-[0_20px_60px_rgba(13,3,6,0.9),0_0_30px_rgba(239,68,68,0.25)]',
      topGlow: 'from-red-600/25 via-red-700/30 to-orange-600/20',
      headerBorder: 'border-red-600/25',
      botRing: 'from-red-600 via-red-700 to-orange-500 shadow-red-600/25',
      botInner: 'bg-[#180407] text-red-400',
      badge: 'bg-red-500/20 text-red-300 border-red-500/30',
      pillsHover: 'hover:bg-red-700/50 hover:border-red-500/50',
      inputBar: 'border-red-600/25 bg-[#130307]/90',
    },
    sakura: {
      windowBg: 'bg-[#1c0918]/95 border-pink-300/45 shadow-[0_20px_60px_rgba(28,9,24,0.85),0_0_30px_rgba(251,113,133,0.25)]',
      topGlow: 'from-rose-400/25 via-pink-500/30 to-fuchsia-400/20',
      headerBorder: 'border-pink-300/25',
      botRing: 'from-pink-300 via-rose-500 to-fuchsia-400 shadow-rose-500/25',
      botInner: 'bg-[#26091e] text-pink-200',
      badge: 'bg-pink-500/20 text-pink-200 border-pink-300/30',
      pillsHover: 'hover:bg-pink-600/40 hover:border-pink-300/50',
      inputBar: 'border-pink-300/25 bg-[#1e0a1b]/90',
    },
    candy: {
      windowBg: 'bg-[#0a122c]/95 border-cyan-300/40 shadow-[0_20px_60px_rgba(10,18,44,0.85),0_0_30px_rgba(56,189,248,0.25)]',
      topGlow: 'from-sky-400/25 via-purple-500/30 to-pink-400/25',
      headerBorder: 'border-cyan-300/25',
      botRing: 'from-sky-300 via-purple-500 to-pink-400 shadow-sky-500/25',
      botInner: 'bg-[#0d163a] text-cyan-200',
      badge: 'bg-cyan-500/20 text-cyan-200 border-cyan-300/30',
      pillsHover: 'hover:bg-purple-600/40 hover:border-cyan-300/50',
      inputBar: 'border-cyan-300/25 bg-[#0c1432]/90',
    },
  };

  const chatTheme = chatThemeConfig[theme] || chatThemeConfig.original;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.92 }}
        transition={{ type: 'spring', damping: 24, stiffness: 260 }}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-[410px] md:w-[440px] h-[580px] max-h-[85vh] flex flex-col rounded-3xl backdrop-blur-2xl border ${chatTheme.windowBg} overflow-hidden transition-colors duration-500`}
      >
        {/* Ambient Top Glow */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-gradient-to-r ${chatTheme.topGlow} blur-xl pointer-events-none transition-all duration-500`}
        />

        {/* Header */}
        <div
          className={`relative px-5 py-4 border-b ${chatTheme.headerBorder} bg-white/[0.02] flex items-center justify-between z-10 transition-colors duration-500`}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${chatTheme.botRing} p-[1px] shadow-md transition-all duration-500`}
              >
                <div
                  className={`w-full h-full rounded-2xl ${chatTheme.botInner} flex items-center justify-center transition-colors duration-500`}
                >
                  <Bot size={20} className="animate-pulse" />
                </div>
              </div>
              {/* Online Indicator */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#09051d] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide">Abhay's AI Assistant</h3>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${chatTheme.badge} transition-colors duration-500`}
                >
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Ask me anything about Abhay</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleResetChat}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Reset conversation"
            >
              <RotateCcw size={15} />
            </button>
            <button
              onClick={onMinimize}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Minimize"
            >
              <Minus size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-colors cursor-pointer"
              title="Close chat"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scroll-smooth">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onQuickAction={(actionText) => handleSendMessage(actionText)}
              disabled={isLoading}
            />
          ))}

          {/* Typing Indicator with progressive status */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${chatTheme.botRing} border text-white flex items-center justify-center shrink-0 shadow-md`}
              >
                <Bot size={18} className="animate-pulse" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 text-slate-300 text-xs flex items-center gap-2 shadow-lg">
                <Sparkles size={14} className="text-brand-cyan animate-spin" />
                <span className="font-medium text-slate-300">
                  {thinkingStage === 0
                    ? '🤖 Thinking...'
                    : thinkingStage === 1
                    ? '🤖 Still thinking...'
                    : '🤖 Processing neural response...'}
                </span>
                <div className="flex gap-1 ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce" />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className={`text-[11px] font-medium text-slate-300 hover:text-white px-2.5 py-1 rounded-full bg-white/5 ${chatTheme.pillsHover} border border-white/10 whitespace-nowrap transition-all shrink-0 cursor-pointer disabled:opacity-50`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className={`p-3 sm:p-4 border-t ${chatTheme.inputBar} transition-colors duration-500`}>
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
