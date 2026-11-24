import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CursorState } from './types';

interface CursorItemProps {
  cursor: CursorState;
}

export const CursorItem: React.FC<CursorItemProps> = React.memo(({ cursor }) => {
  return (
    <div
      className="absolute pointer-events-none transition-all duration-300 ease-out z-[999]"
      style={{
        left: `${cursor.x}%`,
        top: `${cursor.y}%`,
        transform: 'translate(-2px, -2px)',
        willChange: 'left, top, transform',
      }}
    >
      {/* Click ripple & spark effect */}
      <AnimatePresence>
        {cursor.isClicking && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute -top-3 -left-3 w-8 h-8 rounded-full pointer-events-none"
            style={{
              border: `2px solid ${cursor.color}`,
              boxShadow: `0 0 12px ${cursor.color}`,
            }}
          />
        )}
      </AnimatePresence>

      {/* SVG Cursor Pointer */}
      <svg
        className="w-5 h-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] filter"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
          fill={cursor.color}
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Cursor Label Pill & Active Action */}
      <div
        className="absolute left-4 top-3 flex flex-col items-start gap-0.5 select-none"
        style={{
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))',
        }}
      >
        <div
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-tight text-white whitespace-nowrap shadow-sm backdrop-blur-md"
          style={{
            backgroundColor: cursor.color,
            color: '#ffffff',
          }}
        >
          <span>{cursor.name}</span>
          {cursor.isClicking && (
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          )}
        </div>

        {cursor.activeAction && (
          <div className="px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] font-mono text-slate-300 whitespace-nowrap shadow-md max-w-[200px] truncate">
            {cursor.activeAction}
          </div>
        )}
      </div>
    </div>
  );
});

CursorItem.displayName = 'CursorItem';
