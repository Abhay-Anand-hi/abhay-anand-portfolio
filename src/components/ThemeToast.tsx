import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToast() {
  const { toastMessage, theme } = useTheme();

  return (
    <div className="fixed bottom-24 right-6 sm:bottom-28 sm:right-10 z-[9990] pointer-events-none">
      <AnimatePresence mode="wait">
        {toastMessage && (
          <motion.div
            key={toastMessage}
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`px-4 py-2.5 rounded-2xl backdrop-blur-xl border flex items-center gap-2.5 text-sm font-medium tracking-wide shadow-2xl ${
              theme === 'cute'
                ? 'bg-[#1e0e33]/90 border-pink-400/50 text-pink-100 shadow-[0_10px_30px_rgba(244,114,182,0.3)]'
                : theme === 'dreamy'
                ? 'bg-[#080724]/90 border-violet-400/50 text-violet-100 shadow-[0_10px_30px_rgba(167,139,250,0.3)]'
                : theme === 'devil'
                ? 'bg-[#150407]/95 border-red-600/50 text-red-100 shadow-[0_10px_30px_rgba(239,68,68,0.35)]'
                : theme === 'sakura'
                ? 'bg-[#200c17]/90 border-pink-300/60 text-pink-50 shadow-[0_10px_30px_rgba(251,113,133,0.3)]'
                : theme === 'candy'
                ? 'bg-[#0d172e]/90 border-cyan-300/50 text-purple-100 shadow-[0_10px_30px_rgba(56,189,248,0.3)]'
                : 'bg-[#09051d]/90 border-indigo-500/40 text-slate-100 shadow-[0_10px_30px_rgba(99,102,241,0.25)]'
            }`}
          >
            <span className="text-base">{toastMessage.split(' ').slice(-1)[0]}</span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
