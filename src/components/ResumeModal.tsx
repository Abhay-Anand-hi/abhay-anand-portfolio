import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  X, 
  Printer, 
  Download, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [zoom, setZoom] = useState<number>(100);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 15, 160));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 15, 70));
  const handleZoomReset = () => setZoom(100);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="resume-modal-backdrop" 
        className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className={`w-full ${
            isMaximized ? 'h-full max-w-full' : 'max-w-4xl h-[92vh]'
          } rounded-2xl bg-[#0f172a] border border-cyan-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(34,211,238,0.25)] flex flex-col overflow-hidden text-slate-200`}
        >
          {/* PDF Viewer Top Navigation Bar */}
          <div className="px-4 py-3 bg-[#090d16] border-b border-white/10 flex items-center justify-between flex-wrap gap-2 select-none">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
                <FileText size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Abhay_Anand_Resume.pdf
                  <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    Verified
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                  PDF 1.7 · 1 Page · Standard A4
                </p>
              </div>
            </div>

            {/* Toolbar controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Zoom controls */}
              <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-0.5 text-xs text-slate-300">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 hover:bg-white/10 hover:text-white rounded transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <button
                  onClick={handleZoomReset}
                  className="px-2 font-mono text-[11px] hover:text-cyan-400 transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  {zoom}%
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 hover:bg-white/10 hover:text-white rounded transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
              </div>

              {/* Print / Save as PDF */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all cursor-pointer"
                title="Print or Save as PDF (Ctrl+P)"
              >
                <Printer size={14} />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>

              {/* Toggle Maximize */}
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title={isMaximized ? "Restore size" : "Maximize view"}
              >
                {isMaximized ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-200 transition-colors cursor-pointer ml-1"
                title="Close Resume"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* PDF Canvas Viewport Container */}
          <div 
            ref={modalContainerRef}
            className="flex-1 bg-[#1e293b]/70 overflow-auto p-4 sm:p-8 flex justify-center items-start selection:bg-blue-100 selection:text-black"
          >
            {/* The A4 Resume Document Page */}
            <div 
              id="resume-document"
              style={{ 
                transform: `scale(${zoom / 100})`, 
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease-out'
              }}
              className="bg-white text-black w-full max-w-[800px] min-h-[1080px] p-8 sm:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.6)] font-sans leading-snug rounded-sm"
            >
              {/* Header */}
              <div className="border-b border-black/10 pb-4 mb-5">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#000000] tracking-tight mb-2 font-serif">
                  Abhay Anand
                </h1>
                
                <div className="flex flex-wrap items-center justify-between text-[11px] sm:text-[12px] text-slate-800 gap-y-1">
                  <div className="space-y-0.5">
                    <p>
                      <span className="font-semibold text-slate-900">Linkedin : </span>
                      <a 
                        href="https://www.linkedin.com/in/abhay-anand-25436b37a" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        www.linkedin.com/in/abhay-anand-25436b37a
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Github : </span>
                      <a 
                        href="https://github.com/Abhay-Anand-hi" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        https://github.com/Abhay-Anand-hi
                      </a>
                    </p>
                  </div>

                  <div className="space-y-0.5 text-left sm:text-right">
                    <p>
                      <span className="font-semibold text-slate-900">Email: </span>
                      <a 
                        href="mailto:abhayanandsayhi@gmail.com" 
                        className="text-blue-700 hover:underline"
                      >
                        abhayanandsayhi@gmail.com
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Mobile: </span>
                      <span className="text-slate-900">+91-9748756135</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Section: SKILLS */}
              <div className="mb-5">
                <h2 className="text-xs sm:text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-400 pb-1 mb-2">
                  SKILLS
                </h2>
                <ul className="text-xs space-y-1 text-slate-800">
                  <li className="flex gap-2">
                    <span className="font-semibold text-slate-900 min-w-[120px]">• Languages:</span>
                    <span>C++, JavaScript, C, PHP, Python</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-slate-900 min-w-[120px]">• Frameworks:</span>
                    <span>HTML, CSS, NodeJS, React</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-slate-900 min-w-[120px]">• Tools/Platforms:</span>
                    <span>MySQL, MongoDB, Git, GitHub, Replit</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-slate-900 min-w-[120px]">• Soft Skills:</span>
                    <span>Adaptability, Teamwork, Communication, Problem Solving</span>
                  </li>
                </ul>
              </div>

              {/* Section: PROJECTS */}
              <div className="mb-5">
                <h2 className="text-xs sm:text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-400 pb-1 mb-2.5">
                  PROJECTS
                </h2>

                {/* Project 1 */}
                <div className="mb-3.5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      • Habit-Flow Dashboard
                    </h3>
                    <span className="text-[11px] font-medium text-slate-700">April 2026</span>
                  </div>
                  <p className="text-xs text-slate-800 mb-1.5 italic">
                    Responsive habit-tracking web application designed to help users build and maintain daily habits through an interactive dashboard.
                  </p>
                  <ul className="text-[11.5px] list-disc list-inside space-y-0.5 text-slate-700 pl-2">
                    <li>Developed a responsive and user-friendly interface for tracking daily habits.</li>
                    <li>Focused on improving usability, performance, and overall user experience.</li>
                    <li>Implemented the project using modern web development technologies.</li>
                    <li>Deployed the application using Replit.</li>
                    <li className="font-medium text-slate-900">
                      Tech: HTML, CSS, JavaScript, React, Node.js, Replit
                    </li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      • Automated Fire Detecting Robot
                    </h3>
                    <span className="text-[11px] font-medium text-slate-700">November 2025</span>
                  </div>
                  <p className="text-xs text-slate-800 mb-1.5 italic">
                    Hardware and software-based robotic system designed to detect and respond to fire using sensors.
                  </p>
                  <ul className="text-[11.5px] list-disc list-inside space-y-0.5 text-slate-700 pl-2">
                    <li>Developed a system capable of detecting fire through sensors.</li>
                    <li>Integrated hardware components with software logic for automated response.</li>
                    <li>Designed the system with the objective of improving fire detection and suppression.</li>
                    <li>Combined programming and electronics to create an automated safety solution.</li>
                    <li className="font-medium text-slate-900">
                      Tech: Sensors, Embedded Systems, Programming, Robotics
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section: CERTIFICATES */}
              <div className="mb-5">
                <h2 className="text-xs sm:text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-400 pb-1 mb-2">
                  CERTIFICATES
                </h2>
                <div className="text-xs space-y-1 text-slate-800">
                  <div className="flex justify-between">
                    <span>Introduction to Artificial Intelligence - <span className="text-blue-700 underline">Infosys</span></span>
                    <span className="font-medium text-slate-700">March 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Introduction to Cyber Security - <span className="text-blue-700 underline">Infosys</span></span>
                    <span className="font-medium text-slate-700">March 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Times Of India - CDP</span>
                    <span className="font-medium text-slate-700">July 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Computer Programming : C</span>
                    <span className="font-medium text-slate-700">May 2026</span>
                  </div>
                </div>
              </div>

              {/* Section: ACHIEVEMENTS */}
              <div className="mb-5">
                <h2 className="text-xs sm:text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-400 pb-1 mb-2">
                  ACHIEVEMENTS
                </h2>
                <div className="text-xs space-y-2 text-slate-800">
                  <div>
                    <p className="font-bold text-slate-900">• Secured a Top 10 Position in Hackathon:</p>
                    <p className="text-[11.5px] text-slate-700 pl-3">
                      Participated in a competitive hackathon and ranked among the Top 10 teams, collaborating to develop and present an innovative technology-based solution.
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">• 250+ problems solved:</p>
                    <p className="text-[11.5px] text-slate-700 pl-3">
                      Solved more than 250 programming problems on online coding platforms during regular practices and learning.
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">• Completed a 150-Hour Computer Programming Course:</p>
                    <p className="text-[11.5px] text-slate-700 pl-3">
                      Successfully completed 150 hours of coursework in Computer Programming, demonstrating consistency, dedication, and commitment to continuous skill development.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section: EDUCATION */}
              <div>
                <h2 className="text-xs sm:text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-400 pb-1 mb-2">
                  EDUCATION
                </h2>
                <div className="text-xs space-y-2.5 text-slate-800">
                  <div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>• Lovely Professional University</span>
                      <span className="font-normal text-slate-700">Punjab, India</span>
                    </div>
                    <div className="flex justify-between text-[11.5px] text-slate-700 pl-3">
                      <span className="italic">Bachelor of Technology - Computer Science and Engineering</span>
                      <span>August 2025</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>• Litera Valley School</span>
                      <span className="font-normal text-slate-700">Patna, Bihar</span>
                    </div>
                    <div className="flex justify-between text-[11.5px] text-slate-700 pl-3">
                      <span className="italic">Intermediate (Senior Secondary)</span>
                      <span>April 2023 - March 2025</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>• Litera Valley School</span>
                      <span className="font-normal text-slate-700">Patna, Bihar</span>
                    </div>
                    <div className="flex justify-between text-[11.5px] text-slate-700 pl-3">
                      <span className="italic">Matriculation (Secondary Education)</span>
                      <span>April 2022 - March 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
