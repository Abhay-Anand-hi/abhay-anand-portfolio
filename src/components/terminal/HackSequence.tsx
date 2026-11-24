import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { triggerRobotReaction } from '../../utils/easterEggs';

interface HackSequenceProps {
  onFinish?: () => void;
}

export default function HackSequence({ onFinish }: HackSequenceProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 0: Initializing
    const t1 = setTimeout(() => setStep(1), 600);
    // 1: Connecting
    const t2 = setTimeout(() => setStep(2), 1200);
    // 2: Accessing mainframe
    const t3 = setTimeout(() => setStep(3), 1900);
    // 3: Decrypting portfolio
    const t4 = setTimeout(() => setStep(4), 2600);
    // 4: WAIT...
    const t5 = setTimeout(() => setStep(5), 3300);
    // 5: Relax & Robot reaction
    const t6 = setTimeout(() => {
      setStep(6);
      triggerRobotReaction('hack', 'Bro really tried to hack my portfolio 💀', '💀');
      if (onFinish) onFinish();
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onFinish]);

  return (
    <div className="space-y-2 font-mono text-xs sm:text-sm py-1.5 selection:bg-red-500/30 selection:text-white">
      {step >= 0 && (
        <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="text-red-400">
          <p>Initializing...</p>
          <p className="text-red-500 font-bold tracking-widest">████████████████ 100%</p>
        </motion.div>
      )}

      {step >= 1 && (
        <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="text-amber-400">
          <p>Connecting...</p>
          <p className="text-amber-500 font-bold tracking-widest">████████████████ 100%</p>
        </motion.div>
      )}

      {step >= 2 && (
        <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="text-cyan-400">
          <p>Accessing mainframe...</p>
          <p className="text-cyan-500 font-bold tracking-widest">████████████████ 100%</p>
        </motion.div>
      )}

      {step >= 3 && (
        <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="text-purple-400">
          <p>Decrypting portfolio...</p>
          <p className="text-purple-500 font-bold tracking-widest">████████████████ 100%</p>
        </motion.div>
      )}

      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="pt-2 text-yellow-300 font-bold text-sm tracking-wider"
        >
          WAIT...
        </motion.div>
      )}

      {step >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1 pt-1 text-slate-300"
        >
          <p className="text-emerald-400 font-bold">Relax 😭</p>
          <p className="text-slate-300">It's just a portfolio.</p>
          <div className="mt-2 p-2 rounded bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
            <span>🤖 Robot:</span>
            <span className="font-semibold italic">"Bro really tried to hack my portfolio 💀"</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
