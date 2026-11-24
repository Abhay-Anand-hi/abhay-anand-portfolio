import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../constants';
import { Mail, Github, MapPin, Send, MessageSquare, Phone, Linkedin, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
    }, 600);
  };
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-brand-purple mb-4">
              <MessageSquare size={20} />
              <span className="text-sm font-bold uppercase tracking-wider">Get in Touch</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8">
              Let's build <span className="text-gradient">something</span> amazing.
            </h2>
            <p className="text-lg text-slate-400 mb-12 max-w-md">
              I'm open to software engineering internships, technical collaborations, and full-time opportunities. 
              Let's connect and discuss how I can add value to your team.
            </p>

            <div className="space-y-4">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-5 p-5 glass-card hover:bg-white/5 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple group-hover:scale-110 transition-transform">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</p>
                  <p className="text-white font-bold">{PERSONAL_INFO.email}</p>
                </div>
              </a>

              {PERSONAL_INFO.phone && (
                <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-5 p-5 glass-card hover:bg-white/5 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-brand-emerald/10 flex items-center justify-center text-brand-emerald group-hover:scale-110 transition-transform">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Direct Phone</p>
                    <p className="text-white font-bold">{PERSONAL_INFO.phone}</p>
                  </div>
                </a>
              )}
              
              <div className="flex items-center gap-5 p-5 glass-card group">
                <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</p>
                  <p className="text-white font-bold">{PERSONAL_INFO.location}</p>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <a 
                  href={PERSONAL_INFO.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 p-4 rounded-xl glass-card flex items-center justify-center gap-3 text-slate-300 hover:text-white hover:border-brand-indigo/30 transition-all font-semibold text-sm"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
                <a 
                  href={PERSONAL_INFO.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 p-4 rounded-xl glass-card flex items-center justify-center gap-3 text-slate-300 hover:text-white hover:border-brand-purple/30 transition-all font-semibold text-sm"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out, <span className="text-white font-medium">{formData.name}</span>. Abhay will review your message and get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="btn-editorial-secondary text-xs uppercase tracking-wider font-bold"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form className="glass-card p-10 space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Subject</label>
                  <input
                    type="text"
                    placeholder="Project or Opportunity Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Message *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell me about your requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="btn-primary w-full flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
                >
                  {isSending ? 'Sending...' : 'Send Message'}
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 blur-[150px] rounded-full z-0" />
    </section>
  );
}

