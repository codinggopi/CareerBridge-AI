"use client";
import React, { useEffect, useState } from 'react';
import {
  Search, Bell, Activity, Bookmark, Box, PenTool, Cpu, Play, CheckCircle, Plus, Bot, Code
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const Icons = {
  'box': Box,
  'pen-tool': PenTool,
  'cpu': Cpu,
  'bot': Bot,
  'code': Code
};

const LearningResources = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    import('../data/mockResources.json').then(module => setData(module.default));
  }, []);

  if (!data) return <div className="min-h-screen bg-[#0B0F17] flex"><Sidebar /></div>;

  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 flex flex-col min-h-screen lg:h-screen lg:overflow-hidden overflow-x-hidden w-full max-w-[100vw]">

        {/* Top Search Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-8 py-4 border-b border-white/5 bg-background shrink-0 gap-4">
          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search for courses, certifications, or technologies..."
              className="w-full bg-card border border-white/5 rounded-full py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border border-background"></span>
            </button>
            <div className="flex items-center space-x-3 bg-card border border-white/5 rounded-full py-1.5 px-1.5 pr-4">
              <img src="https://i.pravatar.cc/150?u=alex" alt="Profile" className="w-6 h-6 rounded-full" />
              <span className="text-xs font-bold text-white">Alex Rivera</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">

          {/* Main Title Area */}
          <div className="mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-3">Learning Resources</h1>
            <p className="text-sm text-gray-300 max-w-2xl leading-relaxed mb-6">
              AI-curated resources personalized for your career goals. We've matched your Skill Gap Analysis with top industry materials.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2 bg-card border border-white/10 rounded-full px-4 py-2">
                <Activity className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">TARGET: {data.targetRole}</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#11241C] border border-primary/20 rounded-full px-4 py-2">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">SKILL READINESS: {data.skillReadiness}%</span>
              </div>
            </div>
          </div>

          {/* Top Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {/* Learning Momentum */}
            <div className="lg:col-span-2 bg-card border border-white/5 rounded-2xl p-6 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold text-white">Learning Momentum</h2>
                </div>
                <button className="text-xs text-gray-400 bg-background border border-white/5 px-3 py-1.5 rounded-lg flex items-center space-x-2">
                  <span>Last 30 Days</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>

              <div className="flex-1 flex items-end justify-between px-2 pt-10 relative overflow-x-auto min-h-[150px] gap-2 custom-scrollbar">
                {/* Simplified bar chart representation */}
                {data.momentum.map((m, i) => (
                  <div key={i} className="flex flex-col items-center space-y-3 w-full">
                    <div className="w-8 sm:w-12 bg-white/5 rounded-t-md hover:bg-white/10 transition-colors cursor-pointer relative group shrink-0" style={{ height: `${m.value}%` }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {m.value}m
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase">{m.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved for Later */}
            <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center space-x-2 mb-6">
                <Bookmark className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-bold text-white">Saved for Later</h2>
              </div>

              <div className="flex-1 space-y-4">
                {data.saved.map((item, i) => {
                  const Icon = Icons[item.icon];
                  return (
                    <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-background border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary/5 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5 group-hover:text-primary transition-colors cursor-pointer">{item.title}</div>
                          <div className="text-[10px] text-gray-500">{item.meta}</div>
                        </div>
                      </div>
                      <button className="text-gray-600 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  );
                })}
              </div>

              <button className="text-xs font-bold text-primary mt-6 text-left flex items-center space-x-1 hover:text-primary/80 transition-colors">
                <span>View All Bookmarks</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">AI Recommendations</h2>
                <p className="text-[11px] text-gray-400">Based on your Skill Gap Analysis for 'Senior Engineer' roles</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative">
              {data.recommendations.map((rec, i) => (
                <div key={i} className="bg-background border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-widest border ${rec.badgeColor}`}>
                      {rec.badge}
                    </span>
                    <button className="text-gray-500 hover:text-white transition-colors"><Bookmark className="w-4 h-4" /></button>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-tight">{rec.title}</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-6 flex-1">{rec.desc}</p>

                  <div className="flex items-center space-x-2 text-[10px] text-gray-500 mb-4">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{rec.time}</span>
                  </div>
                  <button className="w-full bg-card border border-white/10 text-gray-300 py-2.5 rounded-lg text-xs font-bold hover:bg-white/5 transition-colors">
                    Start Learning
                  </button>
                </div>
              ))}

              {/* Floating Plus button on the right */}
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10 hidden xl:flex">
                <button className="w-12 h-12 rounded-full bg-primary text-[#0B0F17] flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters & Grid */}
          <div>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                <button className="bg-primary text-[#0B0F17] px-4 py-1.5 rounded-full text-xs font-bold">All Topics</button>
                <button className="bg-card border border-white/5 text-gray-300 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-white/5 transition-colors">Frontend</button>
                <button className="bg-card border border-white/5 text-gray-300 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-white/5 transition-colors">Backend</button>
                <button className="bg-card border border-white/5 text-gray-300 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-white/5 transition-colors">AI/ML</button>
                <button className="bg-card border border-white/5 text-gray-300 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-white/5 transition-colors">System Design</button>
              </div>
              <div className="flex space-x-3">
                <div className="bg-card border border-white/5 rounded-lg px-3 py-1.5 flex items-center space-x-2 text-xs text-gray-400 cursor-pointer">
                  <span>Difficulty: All</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
                <div className="bg-card border border-white/5 rounded-lg px-3 py-1.5 flex items-center space-x-2 text-xs text-gray-400 cursor-pointer">
                  <span>Platform: All</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
              {data.courses.map((course, i) => (
                <div key={i} className="bg-card border border-white/5 rounded-2xl overflow-hidden group">
                  <div className="h-32 bg-[#1A2234] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute top-3 left-3 bg-[#0B0F17]/80 backdrop-blur text-[9px] font-bold uppercase tracking-widest text-white px-2 py-1 rounded border border-white/10 z-10">
                      {course.platform}
                    </div>
                    {/* Placeholder for course image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-purple-900/40 opacity-50 group-hover:opacity-80 transition-opacity"></div>
                    <div className="text-white/20">
                      <Code className="w-12 h-12" />
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-sm font-bold text-white mb-1 line-clamp-2 min-h-[40px] leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                    <p className="text-[10px] text-gray-400 mb-4">{course.author}</p>

                    <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">
                      <span>{course.progress > 0 ? 'Progress' : 'Not Started'}</span>
                      <span className="text-white">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-background h-1 rounded-full mb-4 overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: `${course.progress}%` }}></div>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 flex items-center space-x-1.5">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{course.timeLeft}</span>
                      </span>
                      <button className="font-bold text-primary hover:text-primary/80 transition-colors">
                        {course.status}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mb-8">
              <button className="bg-card border border-white/10 text-gray-300 px-6 py-2.5 rounded-full text-xs font-bold hover:bg-white/5 transition-colors flex items-center space-x-2">
                <span>Load More Resources</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 mt-8 pb-4 flex justify-between items-center text-xs text-gray-500">
            <div>
              <span className="font-bold text-gray-300">CareerBridge AI</span>
              <br />
              © 2026 CareerBridge AI. Empowering the next generation of talent.
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-300 transition-colors">AI Ethics</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Contact Support</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningResources;
