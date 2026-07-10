"use client";
import React, { useEffect, useState } from 'react';
import { getSkillGapAnalysis } from '../services/apiService';
import { Sparkles, ChevronDown, Filter, Share2, AlertTriangle, Activity } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

import SkeletonDashboard from '../components/SkeletonDashboard';
import { withAuth } from '../components/withAuth';

const SkillGapAnalysis = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSkillGapAnalysis();
        if (!response || !response.targetRole) throw new Error("Invalid API Data");
        setData(response);
      } catch (error) {
        console.error('Failed to fetch getSkillGapAnalysis data:', error);
        // Fallback data so the page doesn't go blank
        setData({
          targetRole: "Senior Product Designer",
          readiness: 85,
          skillDistribution: [
            { name: "Figma", value: 95, status: "Mastered" },
            { name: "UI/UX", value: 90, status: "Mastered" },
            { name: "Prototyping", value: 85, status: "Mastered" },
            { name: "User Research", value: 60, status: "In Progress" },
            { name: "Design Systems", value: 40, status: "In Progress" }
          ],
          criticalGaps: [
            { impact: "High Impact", title: "Design Systems", desc: "Essential for senior roles." },
            { impact: "Medium Impact", title: "User Research", desc: "Improves product decisions." }
          ],
          benchmarks: [
            { metric: "Visual Design", you: "95%", avg: "80%" },
            { metric: "Design Systems", you: "40%", avg: "75%" }
          ],
          learningPath: [
            { type: "Course", typeColor: "text-blue-400", title: "Design Systems Mastery", desc: "Build scalable design systems from scratch.", meta: "2 Weeks", action: "Start Course" }
          ]
        });
      }
    };
    fetchData();
  }, []);

  if (!data) return <SkeletonDashboard />;

  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-serif">Skill Gap Analysis</h1>
            <p className="text-gray-400">Bridge the distance between your current profile and industry demands.</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-[#0B0F17] px-1 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Target Career Path</label>
              <div className="flex items-center justify-between bg-card border border-white/10 rounded-lg px-4 py-2.5 w-full sm:w-64 cursor-pointer hover:border-white/20 transition-colors">
                <span className="text-sm text-gray-300">{data.targetRole}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            <button className="flex items-center space-x-2 bg-primary text-[#0B0F17] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
              <Sparkles className="w-4 h-4" />
              <span>Run Analysis</span>
            </button>
          </div>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Skill Match */}
          <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center relative">
            <h2 className="text-lg font-bold text-white mb-8">Skill Match</h2>

            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-white/5" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-primary" strokeDasharray={`${data.readiness}, 100`} strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-bold text-white">{data.readiness}%</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Readiness</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center max-w-[200px]">
              You are highly competitive for <span className="text-primary">{data.targetRole}</span> roles. 3 key gaps identified.
            </p>
          </div>

          {/* Skill Distribution */}
          <div className="lg:col-span-2 bg-card border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-white">Skill Distribution</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1.5 text-xs text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Mastered</span>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  <span>In Progress</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {data.skillDistribution.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-gray-400">{skill.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                    <div
                      className={`h-full ${skill.status === 'Mastered' ? 'bg-primary' : 'bg-orange-400'}`}
                      style={{ width: `${skill.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Critical Gaps */}
          <div className="bg-card border border-orange-500/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500/50"></div>
            <div className="flex items-center space-x-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <h2 className="text-lg font-bold text-white">Critical Gaps</h2>
            </div>

            <div className="space-y-4">
              {data.criticalGaps.map((gap, i) => (
                <div key={i} className="bg-background border border-white/5 rounded-xl p-4">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{gap.impact}</div>
                  <div className="text-sm font-bold text-white mb-2">{gap.title}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{gap.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Benchmarks */}
          <div className="bg-card border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full lg:w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="flex items-center space-x-2 mb-2 relative z-10">
              <Activity className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Industry Benchmarks</h2>
            </div>
            <p className="text-xs text-gray-400 mb-6 relative z-10">How you compare to the top 10% of applicants for this role in the Bay Area.</p>

            <div className="space-y-4 relative z-10">
              {data.benchmarks.map((bench, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 last:pb-0">
                  <span className="text-sm text-gray-300 font-medium">{bench.metric}</span>
                  <div className="flex items-center space-x-3">
                    <div className="text-xs font-mono px-2 py-1 rounded bg-[#11241C] text-primary border border-primary/20">
                      You: {bench.you}
                    </div>
                    <div className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10">
                      Avg: {bench.avg}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">AI-Curated Learning Path</h2>
              <p className="text-xs text-gray-400">Tailored resources to close identified gaps in 4-6 weeks.</p>
            </div>
            <div className="flex space-x-3">
              <button className="w-9 h-9 rounded-lg bg-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-lg bg-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.learningPath.map((item, i) => (
              <div key={i} className="bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col group hover:border-white/20 transition-colors">
                <div className="h-32 bg-[#1A2234] relative flex items-center justify-center overflow-hidden">
                  <div className="absolute top-3 left-3 bg-[#0B0F17]/80 backdrop-blur text-[10px] font-bold px-2 py-1 rounded border border-white/10 flex items-center space-x-1.5">
                    <span className={item.typeColor}>●</span>
                    <span className="text-gray-300">{item.type}</span>
                  </div>
                  {/* Fake thumbnail content */}
                  <div className="w-full h-full opacity-30 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-sm font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6 flex-1">{item.desc}</p>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">{item.meta}</span>
                    <button className="text-primary font-bold hover:text-primary/80 transition-colors">
                      {item.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default withAuth(SkillGapAnalysis);
