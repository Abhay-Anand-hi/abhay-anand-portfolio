import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { CursorState, BuildMetrics, ActivityLogItem } from './types';
import { CURSOR_CONFIGS, CURSOR_TIMELINES } from './cursorData';
import { CursorItem } from './CursorItem';
import { DevDashboard } from './DevDashboard';
import { ConstructionCanvas } from './ConstructionCanvas';

interface MultiCursorBuilderProps {
  onComplete: () => void;
  durationMs?: number; // Total duration in ms, default ~11000 (11s)
}

export default function MultiCursorBuilder({
  onComplete,
  durationMs = 11000,
}: MultiCursorBuilderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);
  const lastLoggedRef = useRef<Record<string, string>>({});
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Initialize all 16 cursors from CURSOR_CONFIGS
  const [cursors, setCursors] = useState<CursorState[]>(() =>
    CURSOR_CONFIGS.map((cfg) => ({
      ...cfg,
      x: cfg.initialPos.x,
      y: cfg.initialPos.y,
      activeAction: 'Connecting...',
      isClicking: false,
    }))
  );

  // Finish and smoothly transition to complete portfolio
  const handleFinish = useCallback(() => {
    if (isFinishing) return;
    setIsFinishing(true);
    setProgress(100);
    setShowToast(true);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Converge all cursors to center
    setCursors((prev) =>
      prev.map((c) => ({
        ...c,
        x: 50 + (Math.random() * 8 - 4),
        y: 50 + (Math.random() * 8 - 4),
        activeAction: 'Complete! ✨',
        isClicking: true,
      }))
    );

    // After celebratory moment, transition to actual portfolio
    setTimeout(() => {
      onComplete();
    }, 1800);
  }, [isFinishing, onComplete]);

  // Skip keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Main high-performance animation loop
  useEffect(() => {
    // Respect reduced motion preference if requested
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const effectiveDuration = prefersReducedMotion ? 4000 : durationMs;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(100, (elapsed / effectiveDuration) * 100);

      setProgress(rawProgress);

      // Compute cursor positions & active actions for this progress
      setCursors((prev) =>
        prev.map((cursor) => {
          const waypoints = CURSOR_TIMELINES[cursor.id];
          if (!waypoints || waypoints.length === 0) return cursor;

          // Find surrounding waypoints
          let prevWp = waypoints[0];
          let nextWp = waypoints[waypoints.length - 1];

          for (let i = 0; i < waypoints.length - 1; i++) {
            if (rawProgress >= waypoints[i].progress && rawProgress <= waypoints[i + 1].progress) {
              prevWp = waypoints[i];
              nextWp = waypoints[i + 1];
              break;
            }
          }

          const span = nextWp.progress - prevWp.progress || 1;
          const factor = Math.max(0, Math.min(1, (rawProgress - prevWp.progress) / span));

          // Smooth interpolation
          const curX = prevWp.x + (nextWp.x - prevWp.x) * factor;
          const curY = prevWp.y + (nextWp.y - prevWp.y) * factor;

          // Check if we should log this action to dev dashboard
          if (
            prevWp.action &&
            lastLoggedRef.current[cursor.id] !== prevWp.action &&
            rawProgress >= prevWp.progress
          ) {
            lastLoggedRef.current[cursor.id] = prevWp.action;
            setLogs((curLogs) => [
              ...curLogs.slice(-15),
              {
                id: `${cursor.id}-${Date.now()}-${Math.random()}`,
                cursorName: cursor.name,
                action: prevWp.action,
                timestamp: new Date().toLocaleTimeString(),
                color: cursor.color,
              },
            ]);
          }

          return {
            ...cursor,
            x: curX,
            y: curY,
            activeAction: prevWp.action,
            isClicking: Boolean(prevWp.isClicking && factor < 0.3),
          };
        })
      );

      if (rawProgress < 100) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        handleFinish();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [durationMs, handleFinish]);

  // Calculate live metrics
  const componentsBuilt = Math.min(14, Math.floor((progress / 100) * 14));
  const stylingOperations = Math.floor((progress / 100) * 264);
  const animations = Math.floor((progress / 100) * 24);

  const metrics: BuildMetrics = {
    activeCursors: isFinishing ? 16 : 16,
    componentsBuilt,
    totalComponents: 14,
    stylingOperations,
    animations,
    progress,
    status: isFinishing
      ? 'COMPLETED'
      : progress < 15
      ? 'INITIALIZING'
      : progress < 88
      ? 'BUILDING'
      : 'POLISHING',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-[9999] bg-bg-deep overflow-y-auto select-none"
    >
      {/* Visual Construction Canvas */}
      <ConstructionCanvas progress={progress} />

      {/* 16 Multi-Cursors Layer */}
      <div className="fixed inset-0 pointer-events-none z-[990]">
        {cursors.map((c) => (
          <CursorItem key={c.id} cursor={c} />
        ))}
      </div>

      {/* Floating Development Dashboard */}
      <DevDashboard metrics={metrics} logs={logs} onSkip={handleFinish} />

      {/* Final Celebration Modal / Toast Banner */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-[1001] px-6 py-4 rounded-2xl bg-slate-900/95 border border-brand-purple shadow-[0_0_50px_rgba(168,85,247,0.5)] backdrop-blur-2xl text-center flex flex-col items-center gap-1.5 pointer-events-none"
          >
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm tracking-wider uppercase">
              <CheckCircle2 size={18} />
              <span>BUILD COMPLETED SUCCESSFULLY</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-medium flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400" />
              <span>Built by many cursors. Powered by one curious developer. ✨</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
