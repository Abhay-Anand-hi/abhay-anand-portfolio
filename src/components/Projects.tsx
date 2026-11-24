import { motion } from 'motion/react';
import { PROJECTS } from '../constants';
import { Github, ArrowUpRight, Calendar, Sparkles } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass p-10 md:p-14 overflow-hidden relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 relative z-10">
            <div className="flex items-center gap-3 text-slate-500 text-[11px] font-black uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
              04 / Portfolio Showcase
            </div>
            <div className="text-[11px] font-mono text-brand-indigo font-bold">0{PROJECTS.length} Systems Deployed</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-10 flex flex-col justify-between group hover:border-brand-indigo/40 hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <ArrowUpRight size={100} className="text-brand-indigo" />
                </div>

                <div>
                  <div className="w-full h-44 bg-gradient-to-br from-brand-indigo/10 via-brand-purple/5 to-transparent border border-white/5 rounded-xl mb-8 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <span className="text-5xl filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out">
                      {idx === 0 ? '📊' : '🤖'}
                    </span>
                    {project.period && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                        <Calendar size={12} className="text-brand-indigo" />
                        {project.period}
                      </div>
                    )}
                  </div>
                  
                  <h4 className="text-2xl font-black text-white mb-4 flex items-center justify-between group-hover:text-brand-indigo transition-colors">
                    {project.title}
                    <a 
                      href={project.liveUrl || project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-brand-indigo hover:text-white transition-all text-slate-400"
                      title="View Project"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </h4>
                  
                  <p className="text-sm text-slate-400 font-light mb-8 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-400 group-hover:text-slate-200 group-hover:border-brand-indigo/20 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                      >
                        <Github size={16} />
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

