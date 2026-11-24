import { motion } from 'motion/react';
import { CERTIFICATIONS } from '../constants';
import { Award, CheckCircle2, Calendar, Building2 } from 'lucide-react';

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass p-10 md:p-14 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 relative z-10">
            <div>
              <div className="flex items-center gap-3 text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] mb-2">
                <Award size={14} className="text-brand-cyan" />
                06 / Professional Credentials
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Certificates & <span className="text-gradient">Specializations</span>
              </h2>
            </div>
            <div className="text-[11px] font-mono text-brand-cyan font-bold">
              0{CERTIFICATIONS.length} Verified Accreditations
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-7 flex flex-col justify-between group hover:border-brand-cyan/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-6 group-hover:scale-110 group-hover:bg-brand-cyan group-hover:text-black transition-all">
                    <CheckCircle2 size={24} />
                  </div>

                  <h4 className="text-lg font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors leading-snug">
                    {cert.name}
                  </h4>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2 mt-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Building2 size={13} className="text-slate-500" />
                    <span className="font-medium text-slate-300">{cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                    <Calendar size={13} />
                    <span>{cert.date}</span>
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

