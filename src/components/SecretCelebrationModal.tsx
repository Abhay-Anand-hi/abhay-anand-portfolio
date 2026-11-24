import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Gamepad2, X, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { triggerRobotReaction } from '../utils/easterEggs';

export type SecretEventType = 'konami' | 'abhay_code' | 'milestone';

interface SecretEventData {
  type: SecretEventType;
  title: string;
  subtitle: string;
  badge: string;
  icon: 'konami' | 'abhay' | 'trophy';
}

export default function SecretCelebrationModal() {
  const { theme } = useTheme();
  const [activeSecret, setActiveSecret] = useState<SecretEventData | null>(null);

  useEffect(() => {
    const handleKonami = () => {
      triggerRobotReaction('konami', 'CONGRATULATIONS! You entered the legendary Konami Code! 🎮✨', '🎮');
      setActiveSecret({
        type: 'konami',
        title: 'WAIT...',
        subtitle: 'YOU FOUND THE SECRET LEVEL 😭🤖',
        badge: 'KONAMI CODE DISCOVERED',
        icon: 'konami',
      });
    };

    const handleAbhayTyped = () => {
      triggerRobotReaction('abhay_typed', "👀 You typed my name! Welcome to the secret layer!", '✨');
      setActiveSecret({
        type: 'abhay_code',
        title: '👀 You found me.',
        subtitle: "Welcome to the secret layer of Abhay's portfolio.",
        badge: 'CREATOR SEQUENCE UNLOCKED',
        icon: 'abhay',
      });
    };

    const handleEasterEggUnlocked = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.isSecretLevel) {
        triggerRobotReaction('secret_level', '🏆 Okay... you are officially too curious! 🤖', '🏆');
        setActiveSecret({
          type: 'milestone',
          title: '🏆 SECRET LEVEL UNLOCKED',
          subtitle: "Okay... you're officially too curious. 🤖",
          badge: `SECRETS DISCOVERED: ${customEvent.detail.count}/${customEvent.detail.total}`,
          icon: 'trophy',
        });
      }
    };

    window.addEventListener('secret-konami', handleKonami);
    window.addEventListener('secret-abhay-code', handleAbhayTyped);
    window.addEventListener('easter-egg-unlocked', handleEasterEggUnlocked);

    return () => {
      window.removeEventListener('secret-konami', handleKonami);
      window.removeEventListener('secret-abhay-code', handleAbhayTyped);
      window.removeEventListener('easter-egg-unlocked', handleEasterEggUnlocked);
    };
  }, []);

  // Auto-dismiss after 6.5 seconds
  useEffect(() => {
    if (activeSecret) {
      const timer = setTimeout(() => {
        setActiveSecret(null);
      }, 6500);
      return () => clearTimeout(timer);
    }
  }, [activeSecret]);

  if (!activeSecret) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] pointer-events-none flex items-center justify-center p-4">
        {/* Subtle sparkle overlay particles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
          onClick={() => setActiveSecret(null)}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative pointer-events-auto max-w-md w-full bg-[#0b0f1d] border-2 border-cyan-400/40 p-6 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(34,211,238,0.35)] text-center overflow-hidden"
        >
          {/* Top colored accent glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-500" />

          {/* Close button */}
          <button
            onClick={() => setActiveSecret(null)}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>

          {/* Icon badge */}
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.3)] mb-4">
            {activeSecret.icon === 'konami' && <Gamepad2 size={30} className="animate-bounce" />}
            {activeSecret.icon === 'abhay' && <Eye size={30} className="animate-pulse" />}
            {activeSecret.icon === 'trophy' && <Trophy size={30} className="animate-bounce text-amber-400" />}
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2.5">
            <Sparkles size={12} />
            <span>{activeSecret.badge}</span>
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight mb-2">
            {activeSecret.title}
          </h2>
          <p className="text-sm text-slate-300 font-medium leading-relaxed mb-4">
            {activeSecret.subtitle}
          </p>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
            <span>🤖 Mascots & Easter Eggs Active</span>
            <span className="text-emerald-400 font-bold">· 100% ONLINE</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
