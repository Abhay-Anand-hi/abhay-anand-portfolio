import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Mail, Linkedin, Terminal as TerminalIcon, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isGlowActive, setIsGlowActive] = useState(false);
  const { cycleTheme, clickBurst } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleGlow = () => {
      setIsGlowActive(true);
      setTimeout(() => {
        setIsGlowActive(false);
      }, 3000);
    };

    window.addEventListener('glow-abhay', handleGlow);
    return () => window.removeEventListener('glow-abhay', handleGlow);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.button 
          type="button"
          onClick={cycleTheme}
          className={`relative text-2xl font-bold font-display cursor-pointer select-none group flex items-center focus:outline-none p-1 rounded-xl transition-all duration-500 ${
            isGlowActive ? 'ring-2 ring-brand-purple shadow-[0_0_25px_var(--brand-purple)] scale-110' : ''
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          title="Click to switch theme ✨"
          aria-label="Switch portfolio theme"
        >
          {/* Subtle click ripple animation */}
          <AnimatePresence>
            {clickBurst > 0 && (
              <motion.span
                key={clickBurst}
                initial={{ scale: 0.7, opacity: 0.8 }}
                animate={{ scale: 2.4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="absolute inset-0 -m-2 rounded-full border border-brand-purple pointer-events-none"
              />
            )}
          </AnimatePresence>

          <span className="text-brand-purple transition-colors duration-500">A</span>
          <span className="text-white group-hover:text-brand-cyan transition-colors duration-500">BHAY</span>

          {/* Tiny subtle indicator hint on hover */}
          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple to-brand-cyan group-hover:w-full transition-all duration-300 rounded-full opacity-75" />
        </motion.button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.div 
            className="flex items-center gap-2.5 ml-2 pl-4 border-l border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-resume'))}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-all cursor-pointer"
              title="Open Abhay's Resume PDF"
            >
              <FileText size={14} />
              <span>Resume</span>
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-terminal'))}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono transition-all cursor-pointer"
              title="Open Terminal (Press ` or Ctrl+K)"
            >
              <TerminalIcon size={14} />
              <span>CLI</span>
            </button>
            <a 
              href={PERSONAL_INFO.github} 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a 
              href={PERSONAL_INFO.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href={`mailto:${PERSONAL_INFO.email}`} 
              className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
              title="Email"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav overflow-hidden border-b border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-slate-300 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      window.dispatchEvent(new CustomEvent('open-resume'));
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-semibold"
                  >
                    <FileText size={14} />
                    <span>Resume</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      window.dispatchEvent(new CustomEvent('open-terminal'));
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono"
                  >
                    <TerminalIcon size={14} />
                    <span>Terminal</span>
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                    <Github size={20} />
                  </a>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                    <Linkedin size={20} />
                  </a>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-400 hover:text-white">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

