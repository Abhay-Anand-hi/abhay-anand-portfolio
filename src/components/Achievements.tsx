import { motion } from 'motion/react';
import { ACHIEVEMENTS } from '../constants';
import { Trophy, Code, Award, CheckCircle } from 'lucide-react';

export default function Achievements() {
  const getIcon = (idx: number) => {
    if (idx === 0) return <Trophy className="text-amber-400" size={24} />;
    if (idx === 1) return <Code className="text-brand-cyan" size={24} />;
    return <Award className="text-brand-purple" size={24} />;
  };

  return (
    <section id="achievements" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass p-10 md:p-14 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 relative z-10">
            <div>
              <div className="flex items-center gap-3 text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                05 / Key Milestones & Recognition
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Honors & <span className="text-gradient">Achievements</span>
              </h2>
            </div>
            <div className="text-[11px] font-mono text-brand-indigo font-bold">
              0{ACHIEVEMENTS.length} Highlighted Distinctions
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {ACHIEVEMENTS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col justify-between group hover:border-brand-indigo/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getIcon(idx)}
                    </div>
                    {item.metric && (
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/20">
                        {item.metric}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase block mb-2">
                    {item.tag || 'Achievement'}
                  </span>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-indigo transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <CheckCircle size={14} className="text-brand-emerald" />
                  <span>Verified Accomplishment</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
