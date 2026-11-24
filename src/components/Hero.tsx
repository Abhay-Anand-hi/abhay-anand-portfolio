import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../constants';
import { ArrowRight, Download, Send, Github, Linkedin } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col items-center justify-center lg:flex-row gap-10 z-10">
        <motion.div 
          className="glass p-10 md:p-14 flex-1 accent-glow relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -5 }}
        >
          {/* Subtle noise pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="mb-8 flex items-center text-[11px] font-mono text-brand-indigo tracking-[0.2em] uppercase">
            <span className="status-dot"></span>
            ACTUALIZING DIGITAL POTENTIAL
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10 text-white">
            ABHAY<br/>
            <span className="text-gradient drop-shadow-[0_10px_20px_rgba(129,140,248,0.3)]">ANAND</span>
          </h1>
          
          <p className="text-xl text-slate-400 font-light mb-12 max-w-lg leading-relaxed">
            {PERSONAL_INFO.title} 
            <span className="block mt-3 text-sm text-slate-500 font-medium">Focused on Engineering Scalable Systems, Full-Stack Web Applications & Autonomous Robotics.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 mb-12">
            <a href="#projects" className="btn-editorial-primary flex items-center justify-center gap-3 group">
              Explore Projects
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex gap-4">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-resume'))} 
                className="btn-editorial-secondary flex-1 flex items-center justify-center gap-2 group cursor-pointer"
                title="View Abhay's Full Resume"
              >
                <Download size={18} className="group-hover:-translate-y-1 transition-transform text-cyan-400" />
                Resume
              </button>
              <a href="#contact" className="btn-editorial-secondary flex-1 flex items-center justify-center gap-2 group">
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Talk
              </a>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:border-brand-indigo/30 transition-all text-slate-400 hover:text-white"
                title="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:border-brand-indigo/30 transition-all text-slate-400 hover:text-white"
                title="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Tech Spectrum</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">React · Node · C++ · Python · MySQL</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="hidden lg:flex w-1/3 flex-col gap-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="glass p-10 h-full flex flex-col justify-center gap-6 glass-hover group">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Current Nexus</h3>
            <div className="text-3xl font-black text-white group-hover:text-brand-indigo transition-colors duration-500">
              Phagwara, IN<br/>
              <span className="text-lg font-medium text-slate-500 tracking-normal">Asia/Kolkata</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-[10px] font-bold uppercase tracking-wider">Remote & Relocation Ready</div>
            </div>
          </div>
          
          <div className="glass p-10 flex flex-col justify-center gap-6 glass-hover group">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Academic Roots</h3>
            <div>
              <div className="text-lg font-black text-white leading-tight mb-2 group-hover:text-brand-purple transition-colors duration-500">B.Tech · CS Engineering</div>
              <div className="text-xs text-slate-400 font-medium">Lovely Professional University</div>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-brand-indigo font-bold">CSE Specialization</span>
              <span className="text-slate-500 uppercase tracking-widest">Class of 2029</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-indigo/5 blur-[120px] rounded-full z-0" />
    </section>
  );
}

