import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SpeechBubble from './SpeechBubble';
import RobotChat from './RobotChat';
import { useTheme } from '../../context/ThemeContext';

const SPEECH_MESSAGES = [
  'HELP!?',
  'Need help?',
  'Hey! 👋',
  'Lost?',
  'Ask me anything!',
  'Hi there!',
  'Need a tour? 🤖',
  'Ask about Abhay! ✨',
  'Drag me around! 🚀',
];

const VIEWPORT_PADDING_X = 38;
const VIEWPORT_PADDING_Y = 48;
const POST_DRAG_ROAM_DELAY = 22000; // 22 seconds before autonomous roaming resumes
const ROAM_INTERVAL_MS = 11000;

export default function RobotMascot() {
  const { theme } = useTheme();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [speechMessage, setSpeechMessage] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [reactionType, setReactionType] = useState<'bounce' | 'shake' | 'heart' | 'glow' | 'spin' | null>(null);

  // Position in viewport pixels
  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    if (typeof window !== 'undefined') {
      const initX = Math.min(window.innerWidth - 75, Math.max(VIEWPORT_PADDING_X, window.innerWidth * 0.82));
      const initY = Math.min(window.innerHeight - 90, Math.max(VIEWPORT_PADDING_Y, window.innerHeight * 0.76));
      return { x: initX, y: initY };
    }
    return { x: 300, y: 500 };
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const positionRef = useRef(position);
  positionRef.current = position;

  // Pointer drag tracking refs
  const isPointerDownRef = useRef(false);
  const hasMovedRef = useRef(false);
  const dragStartPointerRef = useRef({ x: 0, y: 0 });
  const robotStartPosRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);

  const bubbleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const speechIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const roamTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const postDragResumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPostDragPausedRef = useRef(false);

  // Clamp coordinate helper
  const clampPosition = useCallback((x: number, y: number) => {
    if (typeof window === 'undefined') return { x, y };
    const maxX = Math.max(VIEWPORT_PADDING_X, window.innerWidth - VIEWPORT_PADDING_X);
    const maxY = Math.max(VIEWPORT_PADDING_Y, window.innerHeight - VIEWPORT_PADDING_Y);
    return {
      x: Math.min(Math.max(VIEWPORT_PADDING_X, x), maxX),
      y: Math.min(Math.max(VIEWPORT_PADDING_Y, y), maxY),
    };
  }, []);

  // Handle window resizing to keep robot within visible bounds
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => clampPosition(prev.x, prev.y));
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [clampPosition]);

  // Initial welcome bubble
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerSpeech('Hey! 👋');
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const triggerSpeech = (customMsg?: string) => {
    if (isChatOpen || isDragging || isPressed) return;
    const msg = customMsg || SPEECH_MESSAGES[Math.floor(Math.random() * SPEECH_MESSAGES.length)];
    setSpeechMessage(msg);

    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = setTimeout(() => {
      setSpeechMessage(null);
    }, 4500);
  };

  // Listen to terminal & global Easter Egg events
  useEffect(() => {
    const handleEasterEgg = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { action, message } = customEvent.detail || {};

      if (isChatOpen) return;

      // Set speech bubble
      if (message) {
        setSpeechMessage(message);
        if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
        bubbleTimeoutRef.current = setTimeout(() => {
          setSpeechMessage(null);
          setReactionType(null);
        }, 5000);
      }

      // Trigger custom motion reaction
      if (action === 'sudo' || action === 'hack') {
        setReactionType('shake');
      } else if (action === 'coffee' || action === 'bounce' || action === 'theme' || action === 'secret') {
        setReactionType('bounce');
      } else if (action === 'robot' || action === 'konami' || action === 'abhay.exe' || action === 'secret_level') {
        setReactionType('spin');
      } else if (action === 'love') {
        setReactionType('heart');
      } else {
        setReactionType('glow');
      }

      // Reset reaction animation after 3.5s
      setTimeout(() => {
        setReactionType(null);
      }, 3500);
    };

    window.addEventListener('robot-easter-egg', handleEasterEgg);
    return () => window.removeEventListener('robot-easter-egg', handleEasterEgg);
  }, [isChatOpen]);

  // Periodic random speech bubble
  useEffect(() => {
    speechIntervalRef.current = setInterval(() => {
      if (Math.random() > 0.35 && !isChatOpen && !isDragging && !isPressed) {
        triggerSpeech();
      }
    }, 36000);

    return () => {
      if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    };
  }, [isChatOpen, isDragging, isPressed]);

  // Roaming step function
  const roamNext = useCallback(() => {
    if (
      isChatOpen ||
      isDragging ||
      isPressed ||
      isHovered ||
      isPostDragPausedRef.current ||
      typeof window === 'undefined'
    ) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const minX = Math.max(VIEWPORT_PADDING_X, window.innerWidth * 0.12);
    const maxX = Math.max(minX, window.innerWidth * 0.86);
    const minY = Math.max(VIEWPORT_PADDING_Y, window.innerHeight * 0.16);
    const maxY = Math.max(minY, window.innerHeight * 0.82);

    const targetX = minX + Math.random() * (maxX - minX);
    const targetY = minY + Math.random() * (maxY - minY);

    setPosition(clampPosition(targetX, targetY));
  }, [isChatOpen, isDragging, isPressed, isHovered, clampPosition]);

  // Continuous autonomous roaming cycle
  useEffect(() => {
    if (isChatOpen || isDragging || isPressed || isHovered) {
      if (roamTimeoutRef.current) clearTimeout(roamTimeoutRef.current);
      return;
    }

    const interval = setInterval(() => {
      roamNext();
    }, ROAM_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isChatOpen, isDragging, isPressed, isHovered, roamNext]);

  // Open chatbot with click animation
  const handleOpenChat = () => {
    if (isChatOpen) return;
    setIsClicking(true);
    setSpeechMessage(null);

    setTimeout(() => {
      setIsClicking(false);
      setIsChatOpen(true);
    }, 320);
  };

  // Schedule roaming resume after dragging
  const scheduleRoamResume = (delayMs: number) => {
    isPostDragPausedRef.current = true;
    if (postDragResumeTimeoutRef.current) clearTimeout(postDragResumeTimeoutRef.current);

    postDragResumeTimeoutRef.current = setTimeout(() => {
      isPostDragPausedRef.current = false;
      roamNext();
    }, delayMs);
  };

  // --- Pointer Event Handlers for Dragging vs Clicking ---
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only respond to primary button (left-click) or touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    // If chat is open and user clicks robot, don't drag
    if (isChatOpen) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignored if capture unsupported
    }

    isPointerDownRef.current = true;
    hasMovedRef.current = false;
    dragStartPointerRef.current = { x: e.clientX, y: e.clientY };
    robotStartPosRef.current = { ...positionRef.current };

    setIsPressed(true);
    setSpeechMessage(null); // Dismiss speech bubble immediately on grab

    if (roamTimeoutRef.current) clearTimeout(roamTimeoutRef.current);
    if (postDragResumeTimeoutRef.current) clearTimeout(postDragResumeTimeoutRef.current);
    isPostDragPausedRef.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;

    const dx = e.clientX - dragStartPointerRef.current.x;
    const dy = e.clientY - dragStartPointerRef.current.y;

    // Detect if movement exceeds drag threshold (6px)
    if (!hasMovedRef.current) {
      if (Math.hypot(dx, dy) >= 6) {
        hasMovedRef.current = true;
        setIsDragging(true);
      }
    }

    if (hasMovedRef.current) {
      const rawX = robotStartPosRef.current.x + dx;
      const rawY = robotStartPosRef.current.y + dy;
      const clamped = clampPosition(rawX, rawY);

      positionRef.current = clamped;

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        setPosition(clamped);
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore release error
    }

    const wasDragging = hasMovedRef.current;
    isPointerDownRef.current = false;
    hasMovedRef.current = false;
    setIsPressed(false);
    setIsDragging(false);

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    if (wasDragging) {
      // DRAG: stay in place, resume roaming after delay
      scheduleRoamResume(POST_DRAG_ROAM_DELAY);
    } else {
      // CLICK: trigger chatbot opening
      handleOpenChat();
    }
  };

  const handlePointerCancel = () => {
    isPointerDownRef.current = false;
    hasMovedRef.current = false;
    setIsPressed(false);
    setIsDragging(false);
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    scheduleRoamResume(15000);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpenChat();
    }
  };

  // Theme visual styling tokens
  const mascotThemeConfig = {
    original: {
      antennaGlow: 'bg-cyan-400 shadow-[0_0_12px_#38bdf8]',
      antennaPole: 'from-cyan-400 to-slate-400',
      headBg: 'from-slate-800 via-indigo-950 to-slate-900',
      headBorder: 'border-cyan-400/40',
      headShadow: 'shadow-[0_0_20px_rgba(56,189,248,0.25)]',
      visorBorder: 'border-cyan-500/30',
      eyesBg: 'bg-cyan-400 shadow-[0_0_8px_#38bdf8]',
      scanline: 'via-cyan-400/10',
      ears: 'bg-indigo-500/80 border-cyan-400/50',
      torsoBg: 'from-slate-900 to-indigo-950 border-indigo-400/40',
      core: 'from-cyan-400 to-indigo-400 shadow-[0_0_10px_#818cf8]',
      thrusterPrimary: 'bg-cyan-400/70',
      thrusterGlow: 'bg-indigo-500/30',
      dragAura: 'shadow-[0_0_35px_rgba(56,189,248,0.55)]',
      hasBlush: false,
    },
    cute: {
      antennaGlow: 'bg-pink-400 shadow-[0_0_12px_#f472b6]',
      antennaPole: 'from-pink-400 to-purple-400',
      headBg: 'from-purple-900/90 via-pink-950/80 to-slate-900',
      headBorder: 'border-pink-400/50',
      headShadow: 'shadow-[0_0_20px_rgba(244,114,182,0.35)]',
      visorBorder: 'border-pink-500/35',
      eyesBg: 'bg-pink-400 shadow-[0_0_8px_#f472b6]',
      scanline: 'via-pink-400/15',
      ears: 'bg-pink-500/80 border-pink-300/50',
      torsoBg: 'from-purple-950 to-pink-950 border-pink-400/40',
      core: 'from-pink-400 to-purple-400 shadow-[0_0_10px_#f472b6]',
      thrusterPrimary: 'bg-pink-400/80',
      thrusterGlow: 'bg-purple-500/40',
      dragAura: 'shadow-[0_0_35px_rgba(244,114,182,0.6)]',
      hasBlush: true,
    },
    dreamy: {
      antennaGlow: 'bg-violet-400 shadow-[0_0_12px_#a78bfa]',
      antennaPole: 'from-violet-400 to-cyan-400',
      headBg: 'from-indigo-950 via-violet-950 to-slate-950',
      headBorder: 'border-violet-400/45',
      headShadow: 'shadow-[0_0_20px_rgba(167,139,250,0.3)]',
      visorBorder: 'border-violet-500/35',
      eyesBg: 'bg-violet-300 shadow-[0_0_8px_#a78bfa]',
      scanline: 'via-violet-400/15',
      ears: 'bg-violet-600/80 border-cyan-400/50',
      torsoBg: 'from-slate-900 to-violet-950 border-violet-400/40',
      core: 'from-violet-400 to-cyan-400 shadow-[0_0_10px_#67e8f9]',
      thrusterPrimary: 'bg-cyan-400/80',
      thrusterGlow: 'bg-violet-500/40',
      dragAura: 'shadow-[0_0_35px_rgba(167,139,250,0.6)]',
      hasBlush: false,
    },
    devil: {
      antennaGlow: 'bg-red-500 shadow-[0_0_12px_#ef4444]',
      antennaPole: 'from-red-500 to-orange-500',
      headBg: 'from-stone-950 via-neutral-900 to-red-950',
      headBorder: 'border-red-600/50',
      headShadow: 'shadow-[0_0_20px_rgba(239,68,68,0.35)]',
      visorBorder: 'border-red-500/35',
      eyesBg: 'bg-red-500 shadow-[0_0_10px_#ef4444]',
      scanline: 'via-red-500/20',
      ears: 'bg-red-900/80 border-red-500/50',
      torsoBg: 'from-black to-red-950 border-red-700/50',
      core: 'from-red-600 to-orange-500 shadow-[0_0_10px_#f97316]',
      thrusterPrimary: 'bg-red-500/90',
      thrusterGlow: 'bg-orange-600/50',
      dragAura: 'shadow-[0_0_35px_rgba(239,68,68,0.65)]',
      hasBlush: false,
    },
    sakura: {
      antennaGlow: 'bg-rose-400 shadow-[0_0_12px_#fb7185]',
      antennaPole: 'from-pink-300 to-rose-400',
      headBg: 'from-rose-950/90 via-pink-950 to-slate-900',
      headBorder: 'border-pink-300/50',
      headShadow: 'shadow-[0_0_20px_rgba(251,113,133,0.35)]',
      visorBorder: 'border-pink-400/40',
      eyesBg: 'bg-pink-300 shadow-[0_0_8px_#f472b6]',
      scanline: 'via-pink-300/20',
      ears: 'bg-rose-500/80 border-pink-200/50',
      torsoBg: 'from-pink-950 to-rose-950 border-pink-400/40',
      core: 'from-pink-300 to-rose-400 shadow-[0_0_10px_#fda4af]',
      thrusterPrimary: 'bg-pink-400/80',
      thrusterGlow: 'bg-rose-500/40',
      dragAura: 'shadow-[0_0_35px_rgba(251,113,133,0.6)]',
      hasBlush: true,
    },
    candy: {
      antennaGlow: 'bg-sky-400 shadow-[0_0_12px_#38bdf8]',
      antennaPole: 'from-cyan-300 via-pink-300 to-purple-400',
      headBg: 'from-sky-950 via-purple-950 to-slate-900',
      headBorder: 'border-cyan-300/50',
      headShadow: 'shadow-[0_0_20px_rgba(56,189,248,0.35)]',
      visorBorder: 'border-cyan-400/40',
      eyesBg: 'bg-cyan-300 shadow-[0_0_8px_#38bdf8]',
      scanline: 'via-cyan-300/20',
      ears: 'bg-purple-500/80 border-cyan-200/50',
      torsoBg: 'from-purple-950 to-sky-950 border-cyan-400/40',
      core: 'from-sky-400 to-purple-400 shadow-[0_0_10px_#c084fc]',
      thrusterPrimary: 'bg-sky-400/80',
      thrusterGlow: 'bg-pink-500/40',
      dragAura: 'shadow-[0_0_35px_rgba(56,189,248,0.6)]',
      hasBlush: true,
    },
  };

  const mascotTheme = mascotThemeConfig[theme] || mascotThemeConfig.original;

  // Active scale calculation based on drag and hover states
  const mascotScale = isChatOpen
    ? 0.85
    : isDragging
    ? 1.05
    : isPressed
    ? 1.08
    : isHovered
    ? 1.03
    : 1;

  return (
    <>
      {/* Draggable & Floating Robot Mascot Container */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Open Abhay's AI Assistant (Drag to move)"
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={
          isChatOpen
            ? {
                left: typeof window !== 'undefined' ? `${window.innerWidth - 65}px` : 'calc(100vw - 65px)',
                top: typeof window !== 'undefined' ? `${window.innerHeight - 75}px` : 'calc(100vh - 75px)',
                scale: 0.85,
              }
            : {
                left: `${position.x}px`,
                top: `${position.y}px`,
                scale: mascotScale,
              }
        }
        transition={{
          // Immediate tracking when dragging/pressed; smooth organic transition during roaming & docking
          left: isDragging || isPressed ? { duration: 0 } : isChatOpen ? { duration: 0.5, ease: 'easeOut' } : { duration: 6.5, ease: [0.25, 0.1, 0.25, 1] },
          top: isDragging || isPressed ? { duration: 0 } : isChatOpen ? { duration: 0.5, ease: 'easeOut' } : { duration: 6.5, ease: [0.25, 0.1, 0.25, 1] },
          scale: { type: 'spring', stiffness: 350, damping: 22 },
        }}
        className={`fixed z-[9998] select-none touch-none transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto ${
          isChatOpen ? 'cursor-pointer' : isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 rounded-3xl`}
        style={{
          touchAction: 'none',
        }}
      >
        {/* Speech Bubble (moves with robot) */}
        <AnimatePresence>
          {speechMessage && !isChatOpen && !isDragging && (
            <SpeechBubble message={speechMessage} onClick={handleOpenChat} />
          )}
        </AnimatePresence>

        {/* Robot Body & Animated Hover Floating */}
        <motion.div
          animate={
            isClicking
              ? { scale: [1, 1.25, 0.95, 1], y: [0, -14, 2, 0], rotate: [0, -8, 8, 0] }
              : reactionType === 'shake'
              ? { scale: [1, 1.15, 0.95, 1], rotate: [0, -14, 14, -10, 10, 0] }
              : reactionType === 'bounce'
              ? { scale: [1, 1.2, 0.95, 1.1, 1], y: [0, -22, 0, -10, 0] }
              : reactionType === 'spin'
              ? { scale: [1, 1.3, 1], rotate: [0, 180, 360, 0] }
              : reactionType === 'heart'
              ? { scale: [1, 1.25, 0.95, 1.2, 1], y: [0, -8, 0] }
              : isDragging
              ? { y: 0, rotate: 0 }
              : { y: [0, -8, 0], rotate: [0, 1.2, -1.2, 0] }
          }
          transition={
            isClicking
              ? { duration: 0.35, ease: 'easeInOut' }
              : reactionType
              ? { duration: 0.8, ease: 'easeInOut' }
              : isDragging
              ? { duration: 0 }
              : { repeat: Infinity, duration: 3.2, ease: 'easeInOut' }
          }
          className={`relative group w-14 h-16 md:w-16 md:h-18 flex flex-col items-center justify-center transition-shadow duration-300 rounded-2xl ${
            isDragging || isPressed || reactionType ? mascotTheme.dragAura : ''
          }`}
        >
          {/* Reaction indicator badge if heart or alert */}
          <AnimatePresence>
            {reactionType === 'heart' && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1.2, y: -24 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -top-3 text-pink-400 text-lg pointer-events-none drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]"
              >
                ❤️
              </motion.div>
            )}
          </AnimatePresence>
          {/* Antenna with Blinking Light */}
          <div className="relative flex flex-col items-center">
            <span
              className={`w-2.5 h-2.5 rounded-full ${mascotTheme.antennaGlow} border border-white animate-pulse transition-all duration-500`}
            />
            <span
              className={`w-0.5 h-2.5 bg-gradient-to-b ${mascotTheme.antennaPole} transition-all duration-500`}
            />
          </div>

          {/* Robot Head / Visor */}
          <div
            className={`relative w-12 h-9 md:w-14 md:h-10 rounded-2xl bg-gradient-to-b ${mascotTheme.headBg} border ${mascotTheme.headBorder} ${mascotTheme.headShadow} flex items-center justify-center px-2 transition-all duration-500`}
          >
            {/* Glowing Visor Screen */}
            <div
              className={`w-full h-5 md:h-6 rounded-lg bg-black/80 border ${mascotTheme.visorBorder} flex items-center justify-center gap-2 overflow-hidden relative`}
            >
              {/* Cute Blush Cheeks for Themes */}
              {mascotTheme.hasBlush && (
                <>
                  <span className="absolute left-1 bottom-1 w-1.5 h-1 rounded-full bg-pink-400/60 blur-[0.5px]" />
                  <span className="absolute right-1 bottom-1 w-1.5 h-1 rounded-full bg-pink-400/60 blur-[0.5px]" />
                </>
              )}

              {/* Glowing Eyes */}
              <motion.span
                animate={{
                  scaleY: isDragging ? 1.15 : [1, 1, 0.1, 1, 1],
                  scaleX: isClicking ? [1, 1.3, 1] : [1, 1, 1],
                }}
                transition={{ repeat: Infinity, duration: 4, times: [0, 0.9, 0.93, 0.96, 1] }}
                className={`w-2.5 h-2.5 rounded-full ${mascotTheme.eyesBg} block transition-all duration-500`}
              />
              <motion.span
                animate={{
                  scaleY: isDragging ? 1.15 : [1, 1, 0.1, 1, 1],
                  scaleX: isClicking ? [1, 1.3, 1] : [1, 1, 1],
                }}
                transition={{ repeat: Infinity, duration: 4, times: [0, 0.9, 0.93, 0.96, 1] }}
                className={`w-2.5 h-2.5 rounded-full ${mascotTheme.eyesBg} block transition-all duration-500`}
              />
              {/* Visor Scanline */}
              <div
                className={`absolute inset-0 bg-gradient-to-b from-transparent ${mascotTheme.scanline} to-transparent pointer-events-none`}
              />
            </div>

            {/* Ear Sensors */}
            <div
              className={`absolute -left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-l-md ${mascotTheme.ears} transition-all duration-500`}
            />
            <div
              className={`absolute -right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-r-md ${mascotTheme.ears} transition-all duration-500`}
            />
          </div>

          {/* Torso & Core */}
          <div
            className={`relative -mt-0.5 w-9 h-5 md:w-10 md:h-6 rounded-xl bg-gradient-to-b ${mascotTheme.torsoBg} flex items-center justify-center shadow-md transition-all duration-500`}
          >
            {/* Core Reactor */}
            <span
              className={`w-2 h-2 rounded-full bg-gradient-to-r ${mascotTheme.core} ${
                isDragging ? 'animate-ping' : 'animate-pulse'
              } transition-all duration-500`}
            />
          </div>

          {/* Hover Thruster Glow */}
          <div className="mt-1 flex flex-col items-center">
            <span
              className={`w-5 h-1.5 rounded-full ${mascotTheme.thrusterPrimary} blur-[2px] ${
                isDragging ? 'scale-125' : 'animate-pulse'
              } transition-all duration-500`}
            />
            <span
              className={`w-8 h-2 rounded-full ${mascotTheme.thrusterGlow} blur-[4px] ${
                isDragging ? 'scale-125' : ''
              } transition-all duration-500`}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive AI Chatbot Window */}
      <RobotChat
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          scheduleRoamResume(5000);
        }}
        onMinimize={() => {
          setIsChatOpen(false);
          scheduleRoamResume(5000);
        }}
      />
    </>
  );
}
