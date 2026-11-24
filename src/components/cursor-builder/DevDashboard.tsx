import React from 'react';
import { motion } from 'motion/react';
import { Terminal, FastForward, Activity } from 'lucide-react';
import { BuildMetrics, ActivityLogItem } from './types';

interface DevDashboardProps {
  metrics: BuildMetrics;
  logs: ActivityLogItem[];
  onSkip: () => void;
}

export const DevDashboard: React.FC<DevDashboardProps> = ({ metrics, logs, onSkip }) => {
  // Generate ASCII block progress bar (e.g. 18 characters)
  const totalBlocks = 18;
  const filledBlocks = Math.min(totalBlocks, Math.floor((metrics.progress / 100) * totalBlocks));
  const emptyBlocks = totalBlocks - filledBlocks;
  const asciiBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 right-4 z-[1000] w-[320px] sm:w-[360px] rounded-2xl bg-slate-950/90 border border-brand-purple/40 shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-xl font-mono text-xs text-slate-300 overflow-hidden select-none"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="font-bold text-white tracking-wider flex items-center gap-1.5">
            <Terminal size={14} className="text-brand-purple" />
            MULTI-CURSOR ENGINE
          </span>
        </div>
        <button
          onClick={onSkip}
          type="button"
          className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors text-[10px] font-semibold cursor-pointer"
          title="Skip construction animation [Esc]"
        >
          <FastForward size={12} className="text-cyan-400" />
          <span>Skip [Esc]</span>
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="p-3.5 space-y-3">
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
            <span className="text-slate-500 block text-[10px]">Active Cursors</span>
            <span className="font-bold text-cyan-400 text-sm tabular-nums flex items-center gap-1">
              <Activity size={12} />
              {metrics.activeCursors}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
            <span className="text-slate-500 block text-[10px]">Components Built</span>
            <span className="font-bold text-purple-400 text-sm tabular-nums">
              {String(metrics.componentsBuilt).padStart(2, '0')}/{String(metrics.totalComponents).padStart(2, '0')}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
            <span className="text-slate-500 block text-[10px]">Styling Operations</span>
            <span className="font-bold text-amber-400 text-sm tabular-nums">
              {metrics.stylingOperations}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
            <span className="text-slate-500 block text-[10px]">Animations</span>
            <span className="font-bold text-emerald-400 text-sm tabular-nums">
              {String(metrics.animations).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Progress Display */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-slate-400">
            <span>BUILD PROGRESS</span>
            <span className="text-brand-cyan tabular-nums">{Math.floor(metrics.progress)}%</span>
          </div>

          {/* ASCII Bar & Visual Bar */}
          <div className="text-cyan-400 text-xs tracking-wider font-bold overflow-hidden">
            {asciiBar}
          </div>

          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-cyan"
              style={{ width: `${metrics.progress}%` }}
              transition={{ ease: 'linear', duration: 0.15 }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
            <span className="flex items-center gap-1.5 font-bold">
              STATUS:{' '}
              <span
                className={
                  metrics.status === 'COMPLETED'
                    ? 'text-emerald-400'
                    : 'text-amber-400 animate-pulse'
                }
              >
                {metrics.status === 'COMPLETED'
                  ? 'BUILD COMPLETED SUCCESSFULLY'
                  : `${metrics.status}...`}
              </span>
            </span>
          </div>
        </div>

        {/* Live Activity Stream */}
        <div className="pt-2 border-t border-white/10">
          <div className="text-[10px] text-slate-500 font-semibold mb-1 flex items-center justify-between">
            <span>LIVE WORKER STREAM</span>
            <span className="text-[9px] text-slate-600">REALTIME</span>
          </div>
          <div className="space-y-1 max-h-[85px] overflow-hidden flex flex-col justify-end">
            {logs.slice(-4).map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-1.5 text-[10px] leading-tight truncate text-slate-300"
              >
                <span
                  className="font-bold shrink-0 text-[10px]"
                  style={{ color: log.color }}
                >
                  {log.cursorName}:
                </span>
                <span className="text-slate-400 truncate">{log.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
