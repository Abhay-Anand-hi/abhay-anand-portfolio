import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, Send, Github, Linkedin, ExternalLink, Code2, Bot, Cpu } from 'lucide-react';
import { PERSONAL_INFO, SKILLS, PROJECTS } from '../../constants';

interface ConstructionCanvasProps {
  progress: number;
}

export const ConstructionCanvas: React.FC<ConstructionCanvasProps> = ({ progress }) => {
  // Dynamic typed text for headline based on progress (28% to 42%)
  const name1 = "ABHAY";
  const name2 = "ANAND";
  
  const pName1 = Math.max(0, Math.min(1, (progress - 30) / 6));
  const charsName1 = Math.floor(pName1 * name1.length);
  const typedName1 = name1.slice(0, charsName1);

  const pName2 = Math.max(0, Math.min(1, (progress - 36) / 6));
  const charsName2 = Math.floor(pName2 * name2.length);
  const typedName2 = name2.slice(0, charsName2);

  // Subtitle typing (40% to 48%)
  const fullSub = PERSONAL_INFO.title;
  const pSub = Math.max(0, Math.min(1, (progress - 40) / 8));
  const typedSub = fullSub.slice(0, Math.floor(pSub * fullSub.length));

  return (
    <div className="relative min-h-screen w-full bg-bg-deep text-slate-100 overflow-x-hidden pb-32">
      {/* Blueprint Grid Overlay (fades out as progress reaches 95%) */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-700 z-0"
        style={{
          opacity: progress >= 95 ? 0.05 : 0.35,
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Laser Scanning Line during build */}
      {progress < 95 && (
        <motion.div
          className="fixed left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent z-10 pointer-events-none shadow-[0_0_12px_#22d3ee]"
          animate={{
            top: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Coordinate & Canvas HUD Markers */}
      <div className="fixed top-2 left-4 text-[9px] font-mono text-cyan-400/60 z-20 pointer-events-none select-none flex items-center gap-3">
        <span>CANVAS: 1440 × AUTO</span>
        <span>ENGINE: VIRTUAL_DOM</span>
        <span>GRID: ACTIVE</span>
      </div>

      {/* 1. TOP NAVIGATION BAR (Starts at 8%) */}
      {progress >= 8 && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`sticky top-0 left-0 right-0 z-40 transition-all duration-500 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto ${
            progress >= 16 ? 'bg-bg-deep/80 backdrop-blur-md border-b border-white/10' : 'border-b border-dashed border-cyan-400/40'
          }`}
        >
          {/* Brand Logo / Wordmark */}
          <div className="flex items-center gap-2">
            {progress >= 12 && (
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1 font-display">
                <span className="text-brand-purple">ABHAY</span>
                <span>ANAND</span>
                {progress < 30 && <span className="w-1.5 h-4 bg-brand-cyan animate-pulse inline-block" />}
              </span>
            )}
            {progress < 16 && (
              <span className="text-[10px] font-mono text-cyan-400 border border-cyan-400/40 px-1 rounded">
                [NAV_LOCK]
              </span>
            )}
          </div>

          {/* Navigation Links */}
          {progress >= 20 ? (
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
              <span className="hover:text-white transition-colors cursor-pointer">About</span>
              <span className="hover:text-white transition-colors cursor-pointer">Skills</span>
              <span className="hover:text-white transition-colors cursor-pointer">Projects</span>
              <span className="hover:text-white transition-colors cursor-pointer">Education</span>
              <span className="hover:text-white transition-colors cursor-pointer">Contact</span>
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-600">
              <span>-- -- --</span>
            </div>
          )}

          {/* Right Action: Theme button and Resume */}
          <div className="flex items-center gap-3">
            {progress >= 22 && (
              <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5">
                <span>✨</span>
                <span className="hidden sm:inline text-[11px] font-mono">Original</span>
              </div>
            )}
            {progress >= 24 && (
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-brand-indigo/20 border border-brand-indigo/50 text-brand-indigo text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
              >
                <Download size={14} />
                <span>Resume</span>
              </button>
            )}
          </div>
        </motion.header>
      )}

      {/* 2. HERO SECTION (Starts at 24%) */}
      {progress >= 24 && (
        <section className="relative max-w-7xl mx-auto px-6 pt-12 pb-16 flex flex-col lg:flex-row items-center gap-10 z-10">
          {/* Main Hero Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`flex-1 p-8 md:p-12 rounded-3xl transition-all duration-500 relative overflow-hidden ${
              progress >= 38
                ? 'bg-white/[0.03] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl'
                : 'border border-dashed border-cyan-400/50 bg-cyan-950/10'
            }`}
          >
            {/* Status Kicker */}
            {progress >= 28 && (
              <div className="mb-6 flex items-center text-[11px] font-mono text-brand-indigo tracking-[0.2em] uppercase font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2.5 animate-ping" />
                ACTUALIZING DIGITAL POTENTIAL
              </div>
            )}

            {/* Giant Name Headline with Live Typing */}
            <div className="min-h-[110px] md:min-h-[140px]">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] text-white font-display mb-4">
                <span>{typedName1 || (progress < 30 ? '...' : '')}</span>
                {progress < 36 && <span className="inline-block w-2 h-10 bg-amber-400 ml-1 animate-pulse" />}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-cyan">
                  {typedName2}
                </span>
                {progress >= 36 && progress < 42 && (
                  <span className="inline-block w-2 h-10 bg-brand-cyan ml-1 animate-pulse" />
                )}
              </h1>
            </div>

            {/* Subtitle */}
            <div className="min-h-[48px] text-lg text-slate-300 font-light mb-8 max-w-xl">
              {typedSub}
              {progress < 48 && progress >= 40 && (
                <span className="inline-block w-1.5 h-4 bg-white/60 ml-1 animate-pulse" />
              )}
            </div>

            {/* CTA Buttons */}
            {progress >= 44 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center gap-4 mb-8"
              >
                <div className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer">
                  <span>Explore Projects</span>
                  <ArrowRight size={16} />
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer">
                  <Download size={14} className="text-cyan-400" />
                  <span>Resume</span>
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer">
                  <Send size={14} className="text-purple-400" />
                  <span>Talk</span>
                </div>
              </motion.div>
            )}

            {/* Bottom Meta & Icons */}
            {progress >= 48 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                    <Github size={16} />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                    <Linkedin size={16} />
                  </div>
                </div>
                <div className="font-mono text-[11px] text-slate-400">
                  <span className="text-brand-purple font-bold">Tech:</span> React · Node · C++ · Python · MySQL
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Bento Highlights */}
          {progress >= 46 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-80 flex flex-col gap-4"
            >
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-brand-cyan text-xs font-bold font-mono mb-1">
                  <Code2 size={16} />
                  <span>ENGINEERING MINDSET</span>
                </div>
                <p className="text-xs text-slate-400">
                  Computer Science undergraduate at Lovely Professional University.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-brand-purple text-xs font-bold font-mono mb-1">
                  <Bot size={16} />
                  <span>AUTONOMOUS ROBOTICS</span>
                </div>
                <p className="text-xs text-slate-400">
                  Experience in embedded controllers, sensor integrations & hardware.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-brand-emerald text-xs font-bold font-mono mb-1">
                  <Cpu size={16} />
                  <span>CLEAN ARCHITECTURE</span>
                </div>
                <p className="text-xs text-slate-400">
                  Scalable full-stack systems with real-time reactive interfaces.
                </p>
              </div>
            </motion.div>
          )}
        </section>
      )}

      {/* 3. ABOUT & SKILLS SECTIONS (Starts at 52%) */}
      {progress >= 52 && (
        <section className="max-w-7xl mx-auto px-6 py-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* About Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-purple mb-2 block">
                01. About Me
              </span>
              <h2 className="text-2xl font-bold font-display text-white mb-4">
                Building Tomorrow's Interactive Systems
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {PERSONAL_INFO.summary}
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-400 pt-2 border-t border-white/10">
                <div>📍 {PERSONAL_INFO.location}</div>
                <div>🎓 Lovely Professional Univ.</div>
              </div>
            </motion.div>

            {/* Skills Matrix */}
            {progress >= 62 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-cyan mb-2 block">
                  02. Technical Skills
                </span>
                <h2 className="text-2xl font-bold font-display text-white mb-4">
                  Core Technologies & Tools
                </h2>

                <div className="space-y-3">
                  {SKILLS.slice(0, 3).map((group) => (
                    <div key={group.category} className="space-y-1.5">
                      <span className="text-[11px] font-mono text-slate-400 font-semibold">
                        {group.category}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((skill) => (
                          <span
                            key={skill.name}
                            className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-slate-200"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* 4. PROJECTS SECTION (Starts at 70%) */}
      {progress >= 70 && (
        <section className="max-w-7xl mx-auto px-6 py-12 z-10">
          <div className="mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-emerald block">
              03. Featured Work
            </span>
            <h2 className="text-3xl font-bold font-display text-white">
              Selected Projects & Systems
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.slice(0, 3).map((proj, idx) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-purple/40 transition-all backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="h-28 rounded-xl bg-gradient-to-br from-brand-indigo/20 via-brand-purple/10 to-transparent border border-white/5 mb-4 flex items-center justify-center text-xs font-mono text-slate-400">
                    <span>[PROJECT_PREVIEW_{idx + 1}]</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{proj.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-3 mb-4">{proj.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-brand-cyan">
                  <span className="font-mono text-[10px]">PRODUCTION READY</span>
                  <ExternalLink size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 5. CONTACT & FOOTER (Starts at 86%) */}
      {progress >= 86 && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto px-6 pt-12 pb-8 border-t border-white/10 text-center z-10 flex flex-col items-center gap-4"
        >
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 max-w-xl w-full">
            <h3 className="text-xl font-bold text-white mb-2">Let's Build Something Extraordinary</h3>
            <p className="text-xs text-slate-400 mb-4">{PERSONAL_INFO.email}</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-purple text-white text-xs font-bold">
              <Send size={14} />
              <span>Get In Touch</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 font-mono">
            Designed & Engineered by <span className="text-white font-bold">{PERSONAL_INFO.name}</span>
          </p>
        </motion.footer>
      )}
    </div>
  );
};
