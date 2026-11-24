import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Square, CornerDownLeft, Sparkles, HelpCircle } from 'lucide-react';
import { PERSONAL_INFO, SKILLS, PROJECTS, ACHIEVEMENTS, CERTIFICATIONS, EDUCATION } from '../constants';
import { useTheme } from '../context/ThemeContext';
import MatrixRain from './terminal/MatrixRain';
import HackSequence from './terminal/HackSequence';
import { 
  recordEasterEggDiscovery, 
  triggerRobotReaction, 
  triggerAbhayLogoGlow 
} from '../utils/easterEggs';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

const FORTUNES = [
  "Good code starts with a good idea. ✨",
  "Your next project is probably better than your last one.",
  "Keep building. Consistency beats talent every single day.",
  "404: Motivation not found. Just kidding. 😭",
  "One more feature won't hurt... right? 👀",
  "Sometimes the bug is the feature.",
  "Simplicity is prerequisite for reliability.",
  "There are 10 types of people: those who understand binary, and those who don't.",
  "A semicolon can make or break your day."
];

// Legitimate portfolio commands shown in 'help'
const STANDARD_COMMANDS = [
  'help',
  'about',
  'skills',
  'projects',
  'experience',
  'achievements',
  'certifications',
  'education',
  'contact',
  'github',
  'resume',
  'theme',
  'robot',
  'clear',
  'exit'
];

// All valid commands including hidden easter eggs (for Tab autocomplete matching)
const ALL_DISCOVERABLE_COMMANDS = [
  ...STANDARD_COMMANDS,
  'whoami',
  'neofetch',
  'sudo',
  'coffee',
  'secret',
  'fortune',
  'love',
  '42',
  'hack',
  'matrix',
  'abhay.exe',
  'cursor'
];

export default function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const { theme, cycleTheme, setTheme } = useTheme();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [suggestion, setSuggestion] = useState<string>('');
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (isOpen) {
      if (history.length === 0) {
        setHistory([
          {
            id: 'init-1',
            command: 'system --init',
            timestamp: new Date().toLocaleTimeString(),
            output: (
              <div className="space-y-2 text-slate-300">
                <p className="text-brand-cyan font-bold">
                  🚀 Abhay Anand Developer Terminal [Version 2.6.0]
                </p>
                <p className="text-xs text-slate-400">
                  Type <span className="text-amber-400 font-bold">'help'</span> to explore Abhay's engineering portfolio or test commands.
                </p>
              </div>
            ),
          },
        ]);
      }
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Compute inline autocomplete suggestion
  useEffect(() => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed || trimmed.includes(' ')) {
      setSuggestion('');
      return;
    }

    const match = ALL_DISCOVERABLE_COMMANDS.find(
      (cmd) => cmd.startsWith(trimmed) && cmd !== trimmed
    );

    if (match) {
      // Suggest the remaining suffix
      setSuggestion(match);
    } else {
      setSuggestion('');
    }
  }, [input]);

  // Auto-scroll to bottom on output change
  useEffect(() => {
    if (isOpen && terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Track for up/down history navigation
    setCommandList((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.toLowerCase().split(' ');
    const cmd = parts[0];
    const arg = parts[1];

    let output: React.ReactNode = null;

    switch (cmd) {
      // 1. HELP (Only shows normal portfolio commands)
      case 'help':
        output = (
          <div className="space-y-2 py-1 text-xs sm:text-sm">
            <p className="text-brand-purple font-bold">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 font-mono text-xs">
              <div><span className="text-brand-cyan font-bold">about</span> - Background & engineering summary</div>
              <div><span className="text-brand-cyan font-bold">skills</span> - Full technical skill arsenal</div>
              <div><span className="text-brand-cyan font-bold">projects</span> - Showcase of featured projects</div>
              <div><span className="text-brand-cyan font-bold">experience</span> - Project & practical experience</div>
              <div><span className="text-brand-cyan font-bold">achievements</span> - Honors and milestones</div>
              <div><span className="text-brand-cyan font-bold">certifications</span> - Verified credentials</div>
              <div><span className="text-brand-cyan font-bold">education</span> - Academic history (LPU)</div>
              <div><span className="text-brand-cyan font-bold">contact</span> - Email, phone, GitHub, LinkedIn</div>
              <div><span className="text-brand-cyan font-bold">resume</span> - View Abhay's verified Resume PDF</div>
              <div><span className="text-brand-cyan font-bold">github</span> - Direct link to GitHub profile</div>
              <div><span className="text-brand-cyan font-bold">theme [name]</span> - Change active theme</div>
              <div><span className="text-brand-cyan font-bold">robot</span> - Locate and interact with Mascot</div>
              <div><span className="text-brand-cyan font-bold">clear</span> - Clear terminal window</div>
              <div><span className="text-brand-cyan font-bold">exit</span> - Close terminal</div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Tip: Press <kbd className="px-1 py-0.5 rounded bg-white/10 text-slate-300">Tab</kbd> to autocomplete commands.
            </p>
          </div>
        );
        break;

      // 2. ABOUT
      case 'about':
        output = (
          <div className="space-y-1.5 text-xs sm:text-sm text-slate-300">
            <p className="text-brand-cyan font-bold">{PERSONAL_INFO.name}</p>
            <p className="text-slate-400">{PERSONAL_INFO.title}</p>
            <p className="text-slate-400">📍 {PERSONAL_INFO.location}</p>
            <p className="pt-2 text-slate-300 leading-relaxed">{PERSONAL_INFO.summary}</p>
          </div>
        );
        break;

      // 3. SKILLS
      case 'skills':
        output = (
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="text-brand-purple font-bold">TECHNICAL SKILLS:</p>
            <div className="space-y-1.5">
              {SKILLS.map((group) => (
                <div key={group.category} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="text-brand-cyan font-bold w-36 shrink-0">{group.category}:</span>
                  <span className="text-slate-300">{group.items.map((i) => i.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      // 4. PROJECTS
      case 'projects':
        output = (
          <div className="space-y-3 text-xs sm:text-sm">
            <p className="text-brand-purple font-bold">FEATURED PROJECTS:</p>
            {PROJECTS.map((proj, idx) => (
              <div key={proj.title} className="p-2.5 rounded-lg bg-white/5 border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-brand-cyan font-bold">{idx + 1}. {proj.title}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{proj.period}</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">{proj.description}</p>
                <p className="text-[11px] text-brand-indigo font-mono">Stack: {proj.techStack.join(' • ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      // 5. EXPERIENCE
      case 'experience':
        output = (
          <div className="space-y-2.5 text-xs sm:text-sm">
            <p className="text-brand-purple font-bold">PRACTICAL EXPERIENCE & PROJECTS:</p>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 space-y-1">
              <p className="text-cyan-400 font-bold">Full Stack & Embedded Developer</p>
              <p className="text-slate-400 text-xs">Self-Driven & Collaborative Projects (2025 - Present)</p>
              <p className="text-slate-300 text-xs pt-1 leading-relaxed">
                Engineered automated fire detection hardware systems and responsive habit tracking web applications. 
                Active open-source contributor and competitive problem solver with 250+ algorithmic solutions.
              </p>
            </div>
          </div>
        );
        break;

      // 6. ACHIEVEMENTS
      case 'achievements':
        output = (
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="text-brand-purple font-bold">HONORS & ACHIEVEMENTS:</p>
            {ACHIEVEMENTS.map((ach) => (
              <div key={ach.title} className="space-y-0.5">
                <p className="text-amber-400 font-bold">🏆 {ach.title} {ach.metric && `(${ach.metric})`}</p>
                <p className="text-xs text-slate-400">{ach.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      // 7. CERTIFICATIONS
      case 'certifications':
        output = (
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="text-brand-purple font-bold">CERTIFICATIONS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.name} className="p-2 rounded bg-white/5 border border-white/5">
                  <p className="text-white font-medium">{cert.name}</p>
                  <p className="text-[11px] text-slate-400">{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      // 8. EDUCATION
      case 'education':
        output = (
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="text-brand-purple font-bold">ACADEMIC BACKGROUND:</p>
            {EDUCATION.map((edu) => (
              <div key={edu.school + edu.degree} className="space-y-0.5">
                <p className="text-brand-cyan font-bold">🎓 {edu.degree}</p>
                <p className="text-xs text-white">{edu.school} ({edu.location})</p>
                <p className="text-[11px] text-slate-400">{edu.period}</p>
              </div>
            ))}
          </div>
        );
        break;

      // 9. CONTACT
      case 'contact':
        output = (
          <div className="space-y-1.5 text-xs sm:text-sm">
            <p className="text-brand-purple font-bold">CONTACT INFORMATION:</p>
            <p>📧 Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-brand-cyan hover:underline">{PERSONAL_INFO.email}</a></p>
            <p>📱 Phone: <span className="text-slate-300">{PERSONAL_INFO.phone}</span></p>
            <p>🐙 GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-brand-cyan hover:underline">{PERSONAL_INFO.github}</a></p>
            <p>💼 LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-brand-cyan hover:underline">{PERSONAL_INFO.linkedin}</a></p>
          </div>
        );
        break;

      // 10. GITHUB
      case 'github':
        output = (
          <div className="space-y-1 text-xs sm:text-sm text-slate-300">
            <p className="text-brand-cyan font-bold">🐙 GitHub Profile:</p>
            <p>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                {PERSONAL_INFO.github}
              </a>
            </p>
            <p className="text-slate-400 text-xs">Explore public repositories, algorithmic solutions, and project source code.</p>
          </div>
        );
        break;

      // 11. RESUME / CV
      case 'resume':
      case 'cv':
      case 'pdf':
        window.dispatchEvent(new CustomEvent('open-resume'));
        output = (
          <div className="space-y-1.5 text-xs sm:text-sm text-emerald-400">
            <p className="font-bold">📄 Opening Abhay Anand's Resume PDF Viewer...</p>
            <p className="text-slate-300 text-xs">
              Launched full-fidelity A4 document viewer with zoom & print support.
            </p>
          </div>
        );
        break;

      // 12. THEME EASTER EGG & NORMAL
      case 'theme':
        if (arg && ['original', 'cute', 'dreamy', 'devil', 'sakura', 'candy'].includes(arg)) {
          setTheme(arg as any);
          output = <p className="text-emerald-400">Theme switched to <span className="font-bold">{arg}</span>! ✨</p>;
        } else {
          recordEasterEggDiscovery('theme');
          triggerAbhayLogoGlow();
          triggerRobotReaction('theme', 'Click ABHAY to switch between six worlds! 🎨✨', '✨');
          output = (
            <div className="space-y-1 text-xs sm:text-sm font-mono text-cyan-300">
              <p className="font-bold">Six worlds detected.</p>
              <p className="text-purple-300">Click ABHAY in the top navigation to switch between them. ✨</p>
              <p className="text-[11px] text-slate-400 italic pt-1">
                (Or type <span className="text-emerald-400">theme original</span>, <span className="text-pink-400">theme cute</span>, <span className="text-red-400">theme devil</span>, <span className="text-violet-400">theme dreamy</span>, <span className="text-rose-400">theme sakura</span>, <span className="text-amber-400">theme candy</span>)
              </p>
            </div>
          );
        }
        break;

      // 13. ROBOT COMMAND & EASTER EGG
      case 'robot':
        recordEasterEggDiscovery('robot');
        triggerRobotReaction('robot', "I'm right here! 🤖 Try dragging me around! 🚀", '🤖');
        output = (
          <div className="space-y-1 text-xs sm:text-sm font-mono text-cyan-300">
            <p className="text-slate-400">Searching for robot...</p>
            <p className="text-emerald-400 font-bold">🤖 ROBOT FOUND</p>
            <p className="text-slate-300">Status: <span className="text-cyan-400 font-bold">ROAMING</span></p>
            <p className="text-slate-300">Mood: <span className="text-pink-400 font-bold">CURIOUS</span></p>
            <p className="text-slate-300">Location: <span className="text-amber-400 font-bold">LIVE ON SCREEN</span></p>
            <p className="text-purple-300 font-bold pt-1">Try dragging me around 👀</p>
          </div>
        );
        break;

      // ==========================================
      // HIDDEN EASTER EGGS
      // ==========================================

      // 14. WHOAMI
      case 'whoami':
        recordEasterEggDiscovery('whoami');
        output = (
          <div className="space-y-1.5 text-xs sm:text-sm font-mono">
            <p className="text-emerald-400 font-bold">abhay@portfolio</p>
            <div className="text-slate-300 space-y-1 pl-2 border-l border-emerald-500/30">
              <p>"Computer Science Engineering student."</p>
              <p>"Developer."</p>
              <p>"Builder."</p>
              <p>"Problem solver."</p>
              <p className="text-cyan-300 font-semibold pt-1">
                "Currently creating things that shouldn't be this interactive. 👀"
              </p>
            </div>
          </div>
        );
        break;

      // 15. NEOFETCH
      case 'neofetch':
        recordEasterEggDiscovery('neofetch');
        output = (
          <div className="p-3 rounded-xl bg-white/5 border border-cyan-500/20 font-mono text-xs sm:text-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="text-cyan-400 font-bold select-none text-center sm:text-left leading-tight hidden sm:block">
              <pre className="font-mono text-[11px] text-cyan-400">
{`    ▄▄▄       
   █████   
  ███ █ ███  
 ███████████ 
 ███     ███ 
   ABHAY`}
              </pre>
            </div>
            <div className="space-y-1 text-slate-300 flex-1">
              <div className="text-brand-purple font-bold text-sm tracking-wider pb-1 border-b border-white/10">
                ABHAY
              </div>
              <p><span className="text-cyan-400 font-semibold">OS:</span> AbhayOS v2.6.0</p>
              <p><span className="text-cyan-400 font-semibold">Role:</span> Developer & Engineering Student</p>
              <p><span className="text-cyan-400 font-semibold">Stack:</span> Python / C++ / JavaScript / React / Node.js</p>
              <p><span className="text-cyan-400 font-semibold">Projects:</span> 02 Featured</p>
              <p><span className="text-cyan-400 font-semibold">AI Assistant:</span> <span className="text-emerald-400 font-bold">ONLINE</span> (Gemini 2.5 Flash)</p>
              <p><span className="text-cyan-400 font-semibold">Robot:</span> <span className="text-amber-400 font-bold">ROAMING 🤖</span></p>
              <p><span className="text-cyan-400 font-semibold">Themes:</span> 06 (Original, Cute, Dreamy, Devil, Sakura, Candy)</p>
              <p><span className="text-cyan-400 font-semibold">Terminal:</span> <span className="text-emerald-400 font-bold">ONLINE</span></p>
              <p><span className="text-cyan-400 font-semibold">Status:</span> <span className="text-cyan-300 font-bold">BUILDING...</span></p>
            </div>
          </div>
        );
        break;

      // 16. SUDO
      case 'sudo':
        recordEasterEggDiscovery('sudo');
        triggerRobotReaction('sudo', 'HEY! What are you trying to do?! 🤨', '🤨');
        output = (
          <div className="space-y-1 font-mono text-xs sm:text-sm">
            <p className="text-red-400 font-bold">Permission denied 😭</p>
            <p className="text-slate-400 italic">Nice try though 👀</p>
            <div className="mt-2 p-2 rounded bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
              <span>🤖 Robot:</span>
              <span className="font-semibold italic">"HEY! What are you trying to do?!"</span>
            </div>
          </div>
        );
        break;

      // 17. COFFEE
      case 'coffee':
        recordEasterEggDiscovery('coffee');
        triggerRobotReaction('coffee', 'Mmm... fresh coffee! ☕⚡ Developer energy restored!', '☕');
        output = (
          <div className="space-y-1 font-mono text-xs sm:text-sm text-amber-300">
            <p>☕ Brewing...</p>
            <p>☕ Brewing...</p>
            <p>☕ Brewing...</p>
            <p className="text-emerald-400 font-bold pt-1">Coffee.exe successfully started.</p>
            <p className="text-cyan-300 font-bold">Developer energy restored +100 ⚡</p>
          </div>
        );
        break;

      // 18. SECRET
      case 'secret':
        recordEasterEggDiscovery('secret');
        triggerRobotReaction('secret', "Shh... you found a secret! There's more hidden! 🤫👀", '🤫');
        output = (
          <div className="space-y-1 font-mono text-xs sm:text-sm text-purple-300 p-2 rounded bg-purple-500/10 border border-purple-500/20">
            <p className="font-bold flex items-center gap-1.5 text-purple-300">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              🤫 You found something...
            </p>
            <p className="text-slate-300">There's more hidden around here.</p>
            <p className="text-cyan-300 font-semibold">Try being curious. 👀</p>
          </div>
        );
        break;

      // 19. FORTUNE
      case 'fortune':
        recordEasterEggDiscovery('fortune');
        const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
        output = (
          <div className="p-3 rounded-lg bg-white/5 border border-amber-400/30 text-xs sm:text-sm font-mono text-amber-200 space-y-1">
            <p className="text-[10px] text-amber-400/70 uppercase font-bold tracking-wider">🥠 Fortune Cookie:</p>
            <p className="font-medium italic">"{randomFortune}"</p>
          </div>
        );
        break;

      // 20. LOVE
      case 'love':
        recordEasterEggDiscovery('love');
        triggerRobotReaction('love', 'okuii!! ❤️', '❤️');
        output = (
          <div className="space-y-1 font-mono text-xs sm:text-sm text-pink-400">
            <p className="font-bold">❤️ Sending developer love...</p>
            <p className="text-emerald-400">Connection established.</p>
            <div className="mt-2 p-2 rounded bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs flex items-center gap-2">
              <span>🤖 Robot:</span>
              <span className="font-semibold italic">"okuii!! ❤️"</span>
            </div>
          </div>
        );
        break;

      // 21. 42
      case '42':
        recordEasterEggDiscovery('42');
        output = (
          <div className="space-y-1 font-mono text-xs sm:text-sm text-cyan-300">
            <p className="font-bold text-amber-400">🌌 The answer to everything.</p>
            <p className="text-slate-400">...probably.</p>
          </div>
        );
        break;

      // 22. HACK
      case 'hack':
        recordEasterEggDiscovery('hack');
        output = <HackSequence />;
        break;

      // 23. MATRIX
      case 'matrix':
        recordEasterEggDiscovery('matrix');
        triggerRobotReaction('matrix', 'Entering the Matrix! 🕶️🟩', '🟩');
        output = (
          <div className="space-y-2">
            <MatrixRain />
            <p className="text-emerald-400 font-mono text-xs sm:text-sm">
              Okay... that's enough hacking for today. 👀
            </p>
          </div>
        );
        break;

      // 24. ABHAY.EXE
      case 'abhay.exe':
        recordEasterEggDiscovery('abhay.exe');
        triggerRobotReaction('abhay.exe', 'Abhay.exe initialized! Creativity: ONLINE! 🚀', '🚀');
        output = (
          <div className="space-y-1 font-mono text-xs sm:text-sm text-slate-300">
            <p className="text-cyan-400 font-bold">Initializing Abhay.exe...</p>
            <p className="text-cyan-500 font-bold tracking-widest">████████████████ 100%</p>
            <div className="space-y-0.5 pt-1 text-slate-300">
              <p>Developer detected.</p>
              <p>Portfolio loaded.</p>
              <p className="text-emerald-400 font-bold">Creativity: ONLINE.</p>
              <p className="text-amber-400 font-bold">Sleep: NOT FOUND. 😭</p>
              <p className="text-cyan-300 font-bold pt-1">Welcome.</p>
            </div>
          </div>
        );
        break;

      // 25. CURSOR (MULTI-CURSOR WEBSITE BUILDER)
      case 'cursor':
      case 'builder':
      case 'multicursor':
        recordEasterEggDiscovery('cursor');
        triggerRobotReaction('cursor', 'Multi-cursor engine activated! ⚡', '⚡');
        output = (
          <div className="space-y-1 font-mono text-xs sm:text-sm text-slate-200 py-1">
            <p className="text-brand-purple font-bold">INITIALIZING MULTI-CURSOR ENGINE...</p>
            <p className="text-cyan-400">CONNECTING VIRTUAL DEVELOPERS...</p>
            <p className="text-amber-400">ALLOCATING BUILD TASKS...</p>
            <p className="text-emerald-400">COMPONENT GENERATION STARTED...</p>
            <p className="text-brand-cyan font-bold pt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              MULTI-CURSOR ENGINE: ONLINE
            </p>
          </div>
        );
        // Delay slightly so the user sees the terminal output, then activate the builder and close terminal
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('start-cursor-builder'));
          onClose();
        }, 1200);
        break;

      // 26. EXIT
      case 'exit':
      case 'quit':
      case 'close':
        recordEasterEggDiscovery('exit');
        triggerRobotReaction('exit', 'Where are you going? 🤖', '🤖');
        output = (
          <div className="space-y-1 font-mono text-xs sm:text-sm text-slate-300">
            <p className="text-amber-400 font-bold">Nice try 😂</p>
            <p className="text-slate-400">You're already inside.</p>
            <div className="mt-1.5 p-2 rounded bg-white/5 border border-white/10 text-xs flex items-center gap-2">
              <span>🤖 Robot:</span>
              <span className="italic text-slate-300">"Where are you going? 🤖"</span>
            </div>
          </div>
        );
        break;

      // 26. CLEAR
      case 'clear':
      case 'cls':
        setHistory([]);
        setInput('');
        return;

      // DEFAULT (Unknown Command)
      default:
        const isPlayful = Math.random() > 0.6;
        output = (
          <div className="text-xs font-mono text-red-400 space-y-0.5">
            <p>Command not found: <span className="text-white font-bold">{trimmed}</span></p>
            <p className="text-slate-400">
              {isPlayful ? "Hmm... I don't know that command 👀" : "Type 'help' for available commands."}
            </p>
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}-${Math.random()}`,
        command: trimmed,
        output,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    setInput('');
    setSuggestion('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
    } else if (e.key === 'Tab') {
      // Tab to autocomplete
      if (suggestion) {
        e.preventDefault();
        setInput(suggestion);
        setSuggestion('');
      }
    } else if (e.key === 'ArrowRight' && inputRef.current?.selectionStart === input.length) {
      // Right arrow at the end of input also completes suggestion
      if (suggestion) {
        setInput(suggestion);
        setSuggestion('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length > 0) {
        const nextIndex = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(commandList[nextIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandList.length > 0 && historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandList.length) {
          setHistoryIndex(nextIndex);
          setInput(commandList[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="terminal-modal-backdrop" 
        className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className={`w-full ${
            isMaximized ? 'h-full max-w-full' : 'max-w-3xl h-[580px] max-h-[90vh]'
          } rounded-2xl bg-[#090b16]/95 border border-cyan-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(34,211,238,0.25)] flex flex-col overflow-hidden text-slate-200 font-mono`}
        >
          {/* Terminal Window Header Bar */}
          <div className="px-4 py-3 bg-[#0d1222] border-b border-cyan-500/20 flex items-center justify-between select-none">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
                  title="Close terminal"
                />
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors cursor-pointer"
                  title="Toggle maximize"
                />
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer"
                  title="Minimize"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 ml-2">
                <TerminalIcon size={14} className="text-cyan-400" />
                <span>abhay@portfolio:~</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px]">
                bash · interactive
              </span>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={isMaximized ? "Restore size" : "Maximize"}
              >
                <Square size={13} />
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors cursor-pointer"
                title="Close"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Terminal Content Stream */}
          <div
            ref={terminalBodyRef}
            onClick={() => inputRef.current?.focus()}
            className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 font-mono text-xs sm:text-sm cursor-text leading-relaxed selection:bg-cyan-500/30 selection:text-white"
          >
            {history.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">guest@abhay-mac:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
                <div className="pl-4 border-l-2 border-cyan-500/20 py-0.5">{item.output}</div>
              </div>
            ))}

            {/* Active Input Line */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-emerald-400 font-bold shrink-0">guest@abhay-mac:~$</span>
              <div className="relative flex-1 flex items-center">
                {/* Ghost text for autocomplete suggestion */}
                {suggestion && suggestion.startsWith(input.toLowerCase()) && (
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-slate-600 font-mono text-xs sm:text-sm">
                    <span className="invisible">{input}</span>
                    <span>{suggestion.slice(input.length)}</span>
                  </div>
                )}

                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  className="w-full bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none caret-cyan-400 relative z-10"
                  placeholder="type 'help' or command..."
                />
              </div>
            </div>
          </div>

          {/* Quick Helper Action Bar */}
          <div className="px-4 py-2 bg-[#0d1222]/80 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-2">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Quick:</span>
              {['help', 'about', 'skills', 'projects', 'resume', 'contact', 'clear'].map((btnCmd) => (
                <button
                  key={btnCmd}
                  onClick={() => handleCommand(btnCmd)}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 transition-all font-mono text-[11px] cursor-pointer"
                >
                  {btnCmd}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono">
              <span className="hidden sm:inline">Press <kbd className="px-1 py-0.2 rounded bg-white/5 text-slate-400">Tab</kbd> to complete</span>
              <div className="flex items-center gap-1">
                <CornerDownLeft size={11} />
                <span>ENTER to execute</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
