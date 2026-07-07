"use client";
import React from 'react';
import { 
  Sparkles, Download, Share2, CheckCircle2, RotateCw, Plus, 
  Search, ZoomIn, ZoomOut, Maximize, X 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const ResumeBuilder = () => {
  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />

      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/5 shrink-0 bg-background z-10">
          <div>
            <h1 className="text-xl font-bold text-white mb-1">AI Resume Builder</h1>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              <span className="text-gray-400">Drafting</span>
              <span>•</span>
              <span>FAANG Modern Template</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 bg-card border border-white/10 rounded-full py-1.5 px-4">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-700" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-primary" strokeDasharray="85, 100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-[9px] font-bold text-white">85%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">Readiness</span>
                <span className="text-[10px] text-white">ATS Compatible</span>
              </div>
            </div>
            
            <button className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>AI Optimizer</span>
            </button>
            
            <div className="flex space-x-3">
              <button className="w-9 h-9 rounded-lg bg-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <CheckCircle2 className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-lg bg-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="flex items-center space-x-2 bg-primary text-[#0B0F17] rounded-lg px-4 py-2 text-xs font-bold hover:bg-primary/90 transition-colors">
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Form */}
          <div className="w-1/2 overflow-y-auto p-8 border-r border-white/5 custom-scrollbar">
            <h2 className="text-xl font-bold text-primary mb-2">Craft your future</h2>
            <p className="text-sm text-gray-400 mb-8">Craft a FAANG-ready resume with real-time AI intelligence.</p>
            
            {/* Personal Information Section */}
            <div className="bg-card border border-white/5 rounded-2xl p-6 mb-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-primary">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h3 className="text-sm font-bold text-white">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" defaultValue="Alex Rivera" className="w-full bg-background border border-white/5 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Target Role</label>
                  <input type="text" defaultValue="Senior Product Designer" className="w-full bg-background border border-white/5 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary/30 transition-colors" />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Professional Summary</label>
                <textarea 
                  rows="4" 
                  defaultValue="Data-driven Product Designer with 6+ years of experience building scalable design systems and AI-integrated workflows. Passionate about human-centric interfaces..."
                  className="w-full bg-background border border-white/5 rounded-lg py-3 px-4 text-sm text-gray-300 focus:outline-none focus:border-primary/30 transition-colors resize-none"
                ></textarea>
                <button className="absolute bottom-3 right-3 flex items-center space-x-1 bg-[#1A2E20] text-primary border border-primary/20 px-3 py-1.5 rounded-md text-[10px] font-bold hover:bg-[#1A2E20]/80 transition-colors">
                  <Sparkles className="w-3 h-3" />
                  <span>AI ENHANCE</span>
                </button>
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-card border border-white/5 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-blue-400">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <h3 className="text-sm font-bold text-white">Experience</h3>
                </div>
                <button className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">Add Experience</button>
              </div>

              <div className="border border-white/5 rounded-xl p-4 bg-background mb-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Company</label>
                    <input type="text" defaultValue="InnovateTech Solutions" className="w-full bg-[#111827] border border-white/5 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-white/10" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Duration</label>
                    <input type="text" defaultValue="Jan 2021 - Present" className="w-full bg-[#111827] border border-white/5 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-white/10" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Key Accomplishments</label>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <input type="text" defaultValue="Led the redesign of the flagship mobile app, increasing user retention by 25%." className="flex-1 bg-[#111827] border border-white/5 rounded-lg py-2 px-3 text-xs text-gray-300 focus:outline-none focus:border-white/10" />
                      <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="text" defaultValue="Optimized design-to-development handoff by implementing a new design system." className="flex-1 bg-[#111827] border border-white/5 rounded-lg py-2 px-3 text-xs text-gray-300 focus:outline-none focus:border-white/10" />
                      <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center space-x-2 text-[11px] text-gray-400 hover:text-white transition-colors border border-dashed border-white/10 rounded-lg py-2 bg-white/[0.02]">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>Auto-generate Bullet Points</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-card border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-green-400">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
                  </div>
                  <h3 className="text-sm font-bold text-white">Skills & Expertise</h3>
                </div>
                <button className="text-[10px] text-primary border border-primary/20 px-2 py-1 rounded bg-primary/5 hover:bg-primary/10 transition-colors">
                  AI Scan Job Desc
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center space-x-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300">
                  <span>UI/UX Design</span>
                  <button className="text-gray-500 hover:text-white"><X className="w-3 h-3" /></button>
                </span>
                <span className="flex items-center space-x-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300">
                  <span>Figma</span>
                  <button className="text-gray-500 hover:text-white"><X className="w-3 h-3" /></button>
                </span>
                <span className="flex items-center space-x-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300">
                  <span>Design Systems</span>
                  <button className="text-gray-500 hover:text-white"><X className="w-3 h-3" /></button>
                </span>
                <span className="flex items-center space-x-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300">
                  <span>React</span>
                  <button className="text-gray-500 hover:text-white"><X className="w-3 h-3" /></button>
                </span>
                <span className="flex items-center space-x-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300">
                  <span>Agile</span>
                  <button className="text-gray-500 hover:text-white"><X className="w-3 h-3" /></button>
                </span>
                <button className="flex items-center space-x-1 border border-dashed border-white/20 rounded-lg px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                  <Plus className="w-3 h-3" />
                  <span>Add Skill</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Live Preview */}
          <div className="w-1/2 bg-[#1A1F2B] relative flex flex-col p-6">
            
            {/* Top controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex bg-card rounded-lg p-1 border border-white/5">
                <button className="px-4 py-1.5 text-xs font-bold text-background bg-primary rounded-md">Modern</button>
                <button className="px-4 py-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors">Academic</button>
                <button className="px-4 py-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors">Creative</button>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-400">
                <button className="p-1.5 hover:bg-white/5 rounded transition-colors"><ZoomIn className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-white/5 rounded transition-colors"><ZoomOut className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-white/5 rounded transition-colors"><Maximize className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Resume Document Wrapper */}
            <div className="flex-1 overflow-y-auto flex justify-center custom-scrollbar pb-24">
              <div className="bg-white text-gray-900 w-[85%] max-w-[800px] shadow-2xl rounded-sm p-10 transform origin-top shrink-0">
                {/* Real Resume Preview Content */}
                <header className="mb-6 border-b border-gray-200 pb-6 flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-serif font-bold text-gray-900 tracking-tight mb-1">ALEX RIVERA</h1>
                    <div className="text-sm font-bold text-primary tracking-widest uppercase">SENIOR PRODUCT DESIGNER</div>
                  </div>
                  <div className="text-right text-[10px] text-gray-500 leading-relaxed">
                    alex.rivera@example.com<br/>
                    +1 (555) 0123 4567<br/>
                    San Francisco, CA<br/>
                    <span className="text-primary">linkedin.com/in/arivera</span>
                  </div>
                </header>

                <section className="mb-6">
                  <h2 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">PROFESSIONAL SUMMARY</h2>
                  <p className="text-[11px] leading-relaxed text-gray-700">
                    Data-driven Product Designer with 6+ years of experience building scalable design systems and AI-integrated workflows. Passionate about human-centric interfaces that bridge the gap between complex data and intuitive user experiences. Proven track record of increasing user engagement by 25% through iterative design methodologies.
                  </p>
                </section>

                <section className="mb-6">
                  <h2 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">WORK EXPERIENCE</h2>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-[13px] font-bold text-gray-900">InnovateTech Solutions</h3>
                      <span className="text-[10px] text-gray-500 italic">Jan 2021 - Present</span>
                    </div>
                    <div className="text-[11px] font-bold text-gray-800 italic mb-2">Senior Product Designer</div>
                    <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700 space-y-1">
                      <li>Led the redesign of the flagship mobile app, increasing user retention by 25% across a user base of 1M+.</li>
                      <li>Optimized design-to-development handoff by implementing a new design system, reducing dev tickets by 15%.</li>
                      <li>Mentored a team of 4 junior designers, establishing a culture of design excellence and high-fidelity prototyping.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-[13px] font-bold text-gray-900">CloudStream Platforms</h3>
                      <span className="text-[10px] text-gray-500 italic">Jun 2018 - Dec 2020</span>
                    </div>
                    <div className="text-[11px] font-bold text-gray-800 italic mb-2">Product Designer</div>
                    <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700 space-y-1">
                      <li>Designed complex dashboard analytics used by Fortune 500 companies to monitor real-time supply chain data.</li>
                      <li>Collaborated with engineering to build an open-source UI component library, now utilized by 200+ developers.</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-6">
                  <h2 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">CORE COMPETENCIES</h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold text-gray-700">
                    <span>UI/UX Design</span>
                    <span>Figma</span>
                    <span>Design Systems</span>
                    <span>React</span>
                    <span>Prototyping</span>
                  </div>
                </section>

                <section>
                  <h2 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">EDUCATION</h2>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[12px] font-bold text-gray-900">Stanford University</h3>
                  </div>
                  <div className="text-[11px] text-gray-600 mt-0.5">B.S. in Interaction Design • Summa Cum Laude</div>
                </section>
              </div>
            </div>

            {/* Floating AI Recommendation tooltip */}
            <div className="absolute bottom-8 right-8 bg-card border border-primary/30 rounded-xl p-4 shadow-2xl max-w-[280px] animate-pulse-slow">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white mb-1">AI Recommendation</div>
                  <div className="text-[10px] text-gray-400 leading-relaxed">
                    "Try adding more quantifiable metrics in your CloudStream role to improve your impact score by ~12%."
                  </div>
                </div>
              </div>
              <button className="w-full bg-[#1A2E20] hover:bg-[#213b28] border border-primary/20 text-primary rounded-lg py-1.5 text-[11px] font-bold transition-colors">
                Apply Fixes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;
