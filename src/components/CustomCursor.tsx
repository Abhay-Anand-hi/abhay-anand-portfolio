import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const { theme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isHoveringRef = useRef(false);

  // Motion values to avoid triggering React component re-renders on every mouse pixel move
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on devices that have a fine mouse pointer
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const shouldHover = !!(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('cursor-grab') ||
        target.classList.contains('cursor-grabbing')
      );

      if (shouldHover !== isHoveringRef.current) {
        isHoveringRef.current = shouldHover;
        setIsHovering(shouldHover);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  const ringBorderColor =
    theme === 'cute'
      ? 'border-pink-400/70'
      : theme === 'dreamy'
      ? 'border-violet-400/70'
      : theme === 'devil'
      ? 'border-red-500/70'
      : theme === 'sakura'
      ? 'border-rose-400/70'
      : theme === 'candy'
      ? 'border-sky-400/70'
      : 'border-brand-purple/70';

  const hoverBg =
    theme === 'cute'
      ? 'rgba(244, 114, 182, 0.15)'
      : theme === 'dreamy'
      ? 'rgba(167, 139, 250, 0.15)'
      : theme === 'devil'
      ? 'rgba(239, 68, 68, 0.2)'
      : theme === 'sakura'
      ? 'rgba(251, 113, 133, 0.18)'
      : theme === 'candy'
      ? 'rgba(56, 189, 248, 0.18)'
      : 'rgba(139, 92, 246, 0.12)';

  if (!isVisible) return null;

  return (
    <>
      {/* Smooth trailing outer ring */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border ${ringBorderColor} pointer-events-none z-[9999] hidden md:block transition-colors duration-300`}
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? hoverBg : 'rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.18 }}
      />
      {/* Precision inner center dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] hidden md:block shadow-[0_0_6px_rgba(255,255,255,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}

