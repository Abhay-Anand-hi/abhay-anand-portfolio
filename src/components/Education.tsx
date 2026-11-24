import { motion } from 'motion/react';
import { EDUCATION } from '../constants';
import { GraduationCap, Calendar, MapPin, Sparkles } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass p-10 md:p-14 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 relative z-10">
            <div>
              <div className="flex items-center gap-3 text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] mb-2">
                <GraduationCap size={16} className="text-brand-purple" />
                07 / Academic Background
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Education & <span className="text-gradient">Qualifications</span>
              </h2>
            </div>
            <div className="text-[11px] font-mono text-brand-purple font-bold">
              Formal Education History
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            {EDUCATION.map((edu, idx) => (
              <motion.div
                key={edu.degree + idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 group hover:border-brand-purple/30 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
                      <h3 className="text-xl font-bold text-white group-hover:text-brand-purple transition-colors">
                        {edu.school}
                      </h3>
                    </div>
                    <p className="text-base text-brand-cyan font-semibold">{edu.degree}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/5">
                      <Calendar size={12} className="text-brand-indigo" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/5">
                      <MapPin size={12} className="text-brand-purple" />
                      {edu.location}
                    </span>
                  </div>
                </div>

                {edu.details && (
                  <p className="text-sm text-slate-400 font-light leading-relaxed pt-3 border-t border-white/5">
                    {edu.details}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

