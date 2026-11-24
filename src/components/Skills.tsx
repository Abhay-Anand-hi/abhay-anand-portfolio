import { motion } from 'motion/react';
import { SKILLS } from '../constants';
import { Layers } from 'lucide-react';

export default function Skills() {
  return (
    <section id="skills" className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass p-10 md:p-14 accent-glow overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <Layers size={180} className="text-brand-indigo" />
          </div>
          
          <div className="flex items-center gap-3 text-slate-500 mb-14 text-[11px] font-black uppercase tracking-[0.2em] relative z-10">
            <Layers size={16} className="text-brand-indigo" />
            03 / Technological Arsenal
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {SKILLS.map((skillGroup, idx) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-5 bg-brand-indigo rounded-full" />
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">
                    {skillGroup.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {skillGroup.items.map((skill) => (
                    <span 
                      key={skill.name}
                      className="skill-tag"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
