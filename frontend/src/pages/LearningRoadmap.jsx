"use client";
import React, { useEffect, useState } from 'react';
import {
  Check, Lock, Play, Layout, Code, Award, Briefcase,
  CheckCircle, Star, Settings, ChevronRight, Sparkles, Video
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Icons = {
  'layout': Layout,
  'code': Code,
  'youtube': Video,
  'award': Award,
  'briefcase': Briefcase,
  'check-circle': CheckCircle,
  'star': Star
};

const LearningRoadmap = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    import('../data/mockRoadmap.json').then(module => setData(module.default));
  }, []);

  if (!data) return <div className="min-h-screen bg-[#0B0F17] flex"><Sidebar /></div>;

  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 flex flex-col overflow-y-auto custom-scrollbar h-screen">

        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3 font-serif tracking-tight">{data.title}</h1>
            <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">{data.desc}</p>
          </div>

          <div className="flex items-center space-x-4 bg-card border border-white/5 rounded-2xl p-4 pr-6">
            <div className="text-right">
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">OVERALL PROGRESS</div>
              <div className="text-2xl font-bold text-white leading-none">{data.progress}%</div>
            </div>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center relative">
              <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 36 36">
                <path className="text-white/5" strokeWidth="2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-primary" strokeDasharray={`${data.progress}, 100`} strokeWidth="2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Main Timeline Column */}
          <div className="xl:col-span-2 space-y-6 relative before:absolute before:inset-0 before:ml-[19px] before:-translate-x-px before:h-full before:w-0.5 before:bg-white/10">
            {data.weeks.map((week, i) => (
              <div key={i} className="relative flex items-start group">

                {/* Timeline Node */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-[#0B0F17]
                  ${week.state === 'completed' ? 'bg-primary text-[#0B0F17]' :
                    week.state === 'current' ? 'bg-background border border-blue-400 text-blue-400' :
                      'bg-background border border-white/10 text-gray-500'}`}
                >
                  {week.state === 'completed' ? <Check className="w-5 h-5" /> :
                    week.state === 'current' ? <Play className="w-4 h-4 ml-0.5" /> :
                      <Lock className="w-4 h-4" />}
                </div>

                {/* Content Card */}
                <div className={`ml-6 w-full bg-card rounded-2xl border transition-colors
                  ${week.state === 'current' ? 'border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.05)]' :
                    'border-white/5 hover:border-white/10'}`}
                >
                  <div className="p-6 pb-5 border-b border-white/5 flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{week.week}</span>
                        {week.state === 'current' && <span className="text-[9px] font-bold text-blue-400 border border-blue-400/30 bg-blue-400/10 px-2 py-0.5 rounded uppercase tracking-widest">IN PROGRESS</span>}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{week.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed max-w-lg">{week.desc}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-blue-400 mb-1">{week.progress}%</div>
                      {week.state === 'current' ? (
                        <div className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Completion</div>
                      ) : week.state === 'completed' ? (
                        <div className="text-[9px] text-primary uppercase font-bold tracking-widest">Done</div>
                      ) : (
                        <div className="bg-white/5 px-3 py-1 rounded text-[10px] font-bold text-gray-500 uppercase tracking-widest">Locked</div>
                      )}
                    </div>
                  </div>

                  {/* Meta / Modules area */}
                  <div className="px-6 py-4 bg-background/50 rounded-b-2xl min-h-[60px] flex items-center">
                    {week.meta && (
                      <div className="flex items-center space-x-4 text-xs font-medium text-gray-400">
                        <span>{week.meta}</span>
                      </div>
                    )}

                    {week.modules && (
                      <div className="flex space-x-4 w-full">
                        {week.modules.map((mod, j) => {
                          const Icon = Icons[mod.icon];
                          return (
                            <div key={j} className="flex-1 bg-card border border-white/5 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-white/20 transition-colors">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-bold text-white">{mod.name}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Panel Column */}
          <div className="space-y-6">

            {/* AI Career Insights */}
            <div className="bg-gradient-to-br from-[#15202B] to-[#0d1624] border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
              <Settings className="absolute -top-4 -right-4 w-32 h-32 text-blue-500/5 rotate-45 pointer-events-none" />
              <h3 className="text-lg font-bold text-white mb-4 relative z-10">AI Career Insights</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6 relative z-10" dangerouslySetInnerHTML={{ __html: data.insights.text }}></p>
              <button className="w-full bg-background border border-white/10 text-gray-300 py-3 rounded-xl text-xs font-bold hover:bg-white/5 transition-colors relative z-10">
                Adjust My Roadmap
              </button>
            </div>

            {/* Selected Resources */}
            <div className="bg-card border border-white/5 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Layout className="w-5 h-5 text-gray-400" />
                <h3 className="text-sm font-bold text-white">Selected Resources</h3>
              </div>
              <div className="space-y-3">
                {data.resources.map((res, i) => {
                  const Icon = Icons[res.icon];
                  return (
                    <div key={i} className="bg-background border border-white/5 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-white/20 transition-colors group">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${res.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5">{res.title}</div>
                          <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{res.meta}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-card border border-white/5 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-6">Milestones</h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[19px] before:-translate-x-px before:h-full before:w-px before:bg-white/10">
                {data.milestones.map((mile, i) => {
                  const Icon = Icons[mile.icon];
                  return (
                    <div key={i} className="relative flex items-start">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${mile.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="ml-4 pt-1">
                        <div className="text-sm font-bold text-white mb-1">{mile.title}</div>
                        <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{mile.status}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningRoadmap;
