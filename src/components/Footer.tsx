import { Github, Mail, Linkedin, Twitter, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="text-xl font-bold font-display mb-2">
            <span className="text-brand-purple">A</span>
            <span className="text-white">BHAY</span>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            Building the future, one line of code at a time.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-400 hover:text-white transition-colors">
            <Mail size={20} />
          </a>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500 flex items-center justify-end gap-1 font-medium">
            Designed & Built with <Heart size={12} className="text-red-500 fill-current" /> by {PERSONAL_INFO.name}
          </p>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-1">© 2026 PRE-EMPTIVE PORTFOLIO SYSTEM</p>
        </div>
      </div>
    </footer>
  );
}
