import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../constants';
import { User, Code2, Cpu, Globe } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-brand-purple mb-4">
              <User size={20} />
              <span className="text-sm font-bold uppercase tracking-wider">About Me</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
              Turning concepts into <span className="text-brand-blue">digital reality</span>.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              {PERSONAL_INFO.summary}
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 glass-card">
                <Code2 className="text-brand-purple mb-2" size={24} />
                <h4 className="text-white font-bold">Development</h4>
                <p className="text-sm text-slate-500">Modern & Clean Code</p>
              </div>
              <div className="p-4 glass-card">
                <Cpu className="text-brand-blue mb-2" size={24} />
                <h4 className="text-white font-bold">AI & Hardware</h4>
                <p className="text-sm text-slate-500">Autonomous Systems</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative z-10 p-2 glass-card overflow-hidden">
              <div className="bg-bg-deep/70 rounded-xl overflow-hidden aspect-square flex items-center justify-center relative group transition-colors duration-500">
                <Globe size={160} className="text-brand-purple/20 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-center">
                  <p className="text-2xl font-black text-white">{PERSONAL_INFO.location}</p>
                  <p className="text-brand-cyan font-medium">Remote Available</p>
                </div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-brand-purple/20 rounded-full blur-2xl" />
            <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-brand-blue/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
