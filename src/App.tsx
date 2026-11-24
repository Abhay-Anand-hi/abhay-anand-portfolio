/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import CustomCursor from './components/CustomCursor';
import RobotMascot from './components/robot/RobotMascot';
import ThemeToast from './components/ThemeToast';
import TerminalModal from './components/TerminalModal';
import ResumeModal from './components/ResumeModal';
import SecretCelebrationModal from './components/SecretCelebrationModal';
import MultiCursorBuilder from './components/cursor-builder/MultiCursorBuilder';
import { ThemeProvider } from './context/ThemeContext';
import { recordEasterEggDiscovery } from './utils/easterEggs';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const ABHAY_CODE = ['a', 'b', 'h', 'a', 'y'];

function PortfolioApp() {
  const [loading, setLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCursorBuilderActive, setIsCursorBuilderActive] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Global event listener, keyboard shortcuts, Konami Code & ABHAY easter eggs
  useEffect(() => {
    let konamiIndex = 0;
    let abhayIndex = 0;
    let abhayTimer: NodeJS.Timeout | null = null;

    const handleOpenTerminal = () => {
      setIsTerminalOpen(true);
    };

    const handleOpenResume = () => {
      setIsResumeOpen(true);
    };

    const handleStartCursorBuilder = () => {
      setIsCursorBuilderActive(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable;

      // Toggle terminal on ` (backtick) or Ctrl+K / Cmd+K when not typing in an input
      if (
        (e.key === '`' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) &&
        !isInput
      ) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
        return;
      }

      // If user is typing in an input/textarea/terminal, ignore global secret keystrokes
      if (isInput) {
        konamiIndex = 0;
        abhayIndex = 0;
        return;
      }

      const key = e.key.toLowerCase();

      // 1. Konami code detection
      const expectedKonamiKey = KONAMI_CODE[konamiIndex].toLowerCase();
      if (key === expectedKonamiKey || e.key === KONAMI_CODE[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI_CODE.length) {
          konamiIndex = 0;
          recordEasterEggDiscovery('konami');
          window.dispatchEvent(new CustomEvent('secret-konami'));
        }
      } else {
        konamiIndex = 0;
      }

      // 2. ABHAY sequence detection
      if (key === ABHAY_CODE[abhayIndex]) {
        abhayIndex++;
        if (abhayTimer) clearTimeout(abhayTimer);
        abhayTimer = setTimeout(() => {
          abhayIndex = 0;
        }, 3000);

        if (abhayIndex === ABHAY_CODE.length) {
          abhayIndex = 0;
          if (abhayTimer) clearTimeout(abhayTimer);
          recordEasterEggDiscovery('abhay_typed');
          window.dispatchEvent(new CustomEvent('secret-abhay-code'));
        }
      } else {
        abhayIndex = 0;
      }
    };

    window.addEventListener('open-terminal', handleOpenTerminal);
    window.addEventListener('open-resume', handleOpenResume);
    window.addEventListener('start-cursor-builder', handleStartCursorBuilder);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-terminal', handleOpenTerminal);
      window.removeEventListener('open-resume', handleOpenResume);
      window.removeEventListener('start-cursor-builder', handleStartCursorBuilder);
      window.removeEventListener('keydown', handleKeyDown);
      if (abhayTimer) clearTimeout(abhayTimer);
    };
  }, []);

  return (
    <div className="relative selection:bg-brand-indigo/30 selection:text-white min-h-screen">
      <CustomCursor />
      <ParticlesBackground />
      <ThemeToast />
      <SecretCelebrationModal />
      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Multi-Cursor Website Builder Overlay */}
      <AnimatePresence>
        {isCursorBuilderActive && (
          <MultiCursorBuilder onComplete={() => setIsCursorBuilderActive(false)} />
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-cyan z-[100] origin-left transition-colors duration-500"
        style={{ scaleX }}
      />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-deep"
            exit={{
              y: '-100%',
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            <motion.div className="w-24 h-24 relative flex items-center justify-center">
              <motion.div
                className="absolute inset-0 border-t-2 border-brand-purple rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <span className="text-2xl font-black text-white">A</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-2xl font-black tracking-[0.4em] text-white"
            >
              ABHAY<span className="text-brand-purple">ANAND</span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar />
            <Hero />
            <div className="relative z-10">
              <About />
              <Skills />
              <Projects />
              <Achievements />
              <Certifications />
              <Education />
              <Contact />
              <Footer />
            </div>
            <RobotMascot />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
