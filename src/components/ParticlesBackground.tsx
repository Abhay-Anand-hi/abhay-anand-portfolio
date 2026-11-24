import { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  char?: string;
}

export default function ParticlesBackground() {
  const { theme } = useTheme();

  // Generate lightweight memoized particles per theme
  const particles = useMemo(() => {
    let count = 18;
    let chars: string[] | undefined;

    if (theme === 'cute') {
      count = 16;
      chars = ['✨', '✦', '⋆', '♡'];
    } else if (theme === 'dreamy') {
      count = 20;
      chars = ['✦', '•', '⋆'];
    } else if (theme === 'devil') {
      count = 18;
    } else if (theme === 'sakura') {
      count = 16;
      chars = ['🌸', '•', '✦'];
    } else if (theme === 'candy') {
      count = 18;
      chars = ['✨', '🍭', '✦'];
    }

    const items: Particle[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        x: (i * 5.5 + 7) % 95,
        y: (i * 7.3 + 12) % 95,
        size: chars ? 11 + (i % 5) * 2 : 2 + (i % 3) * 1.5,
        duration: 10 + (i % 6) * 2.5,
        delay: (i % 5) * 0.8,
        char: chars ? chars[i % chars.length] : undefined,
      });
    }
    return items;
  }, [theme]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none">
      {/* Background Deep Base */}
      <div className="absolute inset-0 bg-bg-deep transition-colors duration-500" />

      {/* Theme Ambient Auroras - GPU Accelerated */}
      <AnimatePresence mode="wait">
        {theme === 'original' && (
          <motion.div
            key="bg-original"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-[-8%] left-[-8%] w-[50%] h-[50%] bg-indigo-600/15 blur-[80px] rounded-full transform-gpu" />
            <div className="absolute bottom-[-8%] right-[-8%] w-[50%] h-[50%] bg-cyan-500/15 blur-[80px] rounded-full transform-gpu" />
          </motion.div>
        )}

        {theme === 'cute' && (
          <motion.div
            key="bg-cute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-[-10%] left-[-8%] w-[52%] h-[52%] bg-pink-500/20 blur-[85px] rounded-full transform-gpu" />
            <div className="absolute bottom-[-10%] right-[-8%] w-[52%] h-[52%] bg-purple-400/15 blur-[85px] rounded-full transform-gpu" />
          </motion.div>
        )}

        {theme === 'dreamy' && (
          <motion.div
            key="bg-dreamy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-[-12%] left-[-10%] w-[55%] h-[55%] bg-indigo-500/20 blur-[90px] rounded-full transform-gpu" />
            <div className="absolute bottom-[-12%] right-[-10%] w-[55%] h-[55%] bg-violet-600/20 blur-[90px] rounded-full transform-gpu" />
          </motion.div>
        )}

        {theme === 'devil' && (
          <motion.div
            key="bg-devil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-[-10%] left-[-8%] w-[50%] h-[50%] bg-red-700/20 blur-[90px] rounded-full transform-gpu" />
            <div className="absolute bottom-[-10%] right-[-8%] w-[50%] h-[50%] bg-orange-700/15 blur-[90px] rounded-full transform-gpu" />
          </motion.div>
        )}

        {theme === 'sakura' && (
          <motion.div
            key="bg-sakura"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-[-10%] left-[-8%] w-[52%] h-[52%] bg-rose-600/18 blur-[85px] rounded-full transform-gpu" />
            <div className="absolute bottom-[-10%] right-[-8%] w-[52%] h-[52%] bg-pink-400/15 blur-[85px] rounded-full transform-gpu" />
          </motion.div>
        )}

        {theme === 'candy' && (
          <motion.div
            key="bg-candy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-[-10%] left-[-8%] w-[52%] h-[52%] bg-sky-500/18 blur-[85px] rounded-full transform-gpu" />
            <div className="absolute bottom-[-10%] right-[-8%] w-[52%] h-[52%] bg-purple-500/15 blur-[85px] rounded-full transform-gpu" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Particles */}
      {particles.map((p) => {
        if (p.char) {
          return (
            <motion.div
              key={`${theme}-${p.id}`}
              className="absolute select-none pointer-events-none font-light opacity-30 will-change-transform"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                fontSize: `${p.size}px`,
                color:
                  theme === 'cute' || theme === 'sakura'
                    ? '#f472b6'
                    : theme === 'dreamy'
                    ? '#c084fc'
                    : theme === 'candy'
                    ? '#38bdf8'
                    : '#818cf8',
              }}
              animate={{
                y: [0, -35, 0],
                opacity: [0.2, 0.65, 0.2],
                rotate: [0, p.id % 2 === 0 ? 12 : -12, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            >
              {p.char}
            </motion.div>
          );
        }

        if (theme === 'devil') {
          return (
            <motion.div
              key={`${theme}-${p.id}`}
              className="absolute rounded-full pointer-events-none will-change-transform"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                backgroundColor: p.id % 2 === 0 ? '#ef4444' : '#f97316',
                boxShadow: `0 0 6px ${p.id % 2 === 0 ? '#dc2626' : '#ea580c'}`,
              }}
              animate={{
                y: [0, -45, 0],
                opacity: [0.2, 0.8, 0.15],
              }}
              transition={{
                duration: p.duration * 0.75,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          );
        }

        return (
          <motion.div
            key={`${theme}-${p.id}`}
            className="absolute rounded-full bg-white/25 pointer-events-none will-change-transform"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.15, 0.5, 0.15],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}
