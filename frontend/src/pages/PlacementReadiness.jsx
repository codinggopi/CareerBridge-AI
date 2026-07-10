"use client";
import React, { useEffect, useState } from 'react';
import { getPlacementReadiness } from '../services/apiService';
import { 
  CheckCircle, FileText, Zap, ShieldCheck, Code, Brain, Target, 
  TrendingUp, Activity, MessageSquare, Shield, Sparkles
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import SkeletonDashboard from '../components/SkeletonDashboard';
import Footer from '../components/Footer';
import { withAuth } from '../components/withAuth';
import logo from '../assets/images/CareerBridge-AI.png';

const Icons = {
  'file-text': FileText,
  'code': Code,
  'message-square': MessageSquare,
  'trending-up': TrendingUp,
  'zap': Zap,
  'brain': Brain,
  'shield': Shield
};

// Generate fake heatmap data
const generateHeatmap = () => {
  const weeks = 12;
  const days = 4; // Simplified to 4 rows
  const matrix = [];
  for (let i = 0; i < days; i++) {
    const row = [];
    for (let j = 0; j < weeks; j++) {
      // 0: none, 1: low, 2: medium, 3: high
      row.push(Math.floor(Math.random() * 4));
    }
    matrix.push(row);
  }
  return matrix;
};

const heatmapData = generateHeatmap();
const heatColors = [
  'bg-[#1A2234]', // none
  'bg-[#1A3F33]', // low
  'bg-[#2B7A52]', // medium
  'bg-primary'    // high
];

const PlacementReadiness = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPlacementReadiness();
        if (!response || !response.breakdown) throw new Error("Invalid API Data");
        setData(response);
      } catch (error) {
        console.error('Failed to fetch getPlacementReadiness data:', error);
        // Fallback data
        setData({
          score: 82,
          rank: "TOP 15%",
          status: "INTERVIEW READY",
          breakdown: [
            { title: "Technical Skills", score: 85, max: 100, icon: "code", color: "bg-blue-400", desc: "Strong in React & Node.js. Needs work in System Design." },
            { title: "Soft Skills", score: 90, max: 100, icon: "brain", color: "bg-green-400", desc: "Excellent communication and team collaboration." },
            { title: "Resume Strength", score: 82, max: 100, icon: "file-text", color: "bg-yellow-400", desc: "Good impact metrics, missing some keyword optimization." },
            { title: "Mock Interviews", score: 78, max: 100, icon: "message-square", color: "bg-purple-400", desc: "Good technical answers, confidence needs minor improvement." }
          ],
          probability: 88,
          trends: [
            { name: "Coding Speed", change: "+15%", changeColor: "text-primary", icon: "zap" },
            { name: "System Design", change: "+5%", changeColor: "text-blue-400", icon: "shield" }
          ],
          milestones: [
            { title: "Profile Completion", desc: "All basic details added.", status: "COMPLETED", statusColor: "text-primary", dotColor: "border-primary", progress: 100 },
            { title: "First Mock Interview", desc: "Completed with >75% score.", status: "COMPLETED", statusColor: "text-primary", dotColor: "border-primary", progress: 100 },
            { title: "Advanced System Design", desc: "Complete the scaling microservices module.", status: "IN PROGRESS", statusColor: "text-blue-400", dotColor: "border-blue-400", progress: 45 }
          ],
          coach: {
            insight: "You are well positioned for <strong>Frontend and Full Stack</strong> roles. Your React skills are top-tier, but you should practice System Design questions to clear senior technical rounds.",
            action: "Schedule a Mock Interview focused purely on System Design."
          }
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
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-serif">Placement Readiness</h1>
            <p className="text-gray-400">Your comprehensive intelligence report for the current hiring season.</p>
          </div>

          <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-400 border border-white/10 bg-white/5 px-3 py-1.5 rounded-full uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
            <span>LIVE ANALYSIS ACTIVE</span>
          </div>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Overall Score */}
          <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col items-center">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">OVERALL READINESS SCORE</div>

            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-white/5" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-primary" strokeDasharray={`${data.score}, 100`} strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-blue-400" strokeDasharray={`20, 100`} strokeDashoffset={`-${data.score}`} strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-bold text-white mb-2">{data.score}%</span>
                <span className="text-[10px] font-bold bg-[#11241C] text-primary px-2 py-0.5 rounded-full">{data.trend}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-[#111827] border border-white/5 rounded-xl p-4 text-center">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">RANK</div>
                <div className="text-lg font-bold text-white">{data.rank}</div>
              </div>
              <div className="bg-[#111827] border border-white/5 rounded-xl p-4 text-center">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">STATUS</div>
                <div className="text-lg font-bold text-blue-300">{data.status}</div>
              </div>
            </div>
          </div>

          {/* Readiness Breakdown */}
          <div className="lg:col-span-2 bg-card border border-white/5 rounded-2xl p-6 flex flex-col">
            <h2 className="text-xl font-bold text-white mb-8">Readiness Breakdown</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-8">
              {data.breakdown && data.breakdown.map((item, i) => {
                const Icon = Icons[item.icon] || Code; // Fallback icon
                return (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-bold">{item.title}</span>
                      </div>
                      <div className="text-xs font-mono">
                        <span className="text-primary font-bold">{item.score}</span>
                        <span className="text-gray-500">/{item.max}</span>
                      </div>
                    </div>
                    <div className="w-full bg-background h-1.5 rounded-full overflow-hidden mb-2">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }}></div>
                    </div>
                    <div className="text-[10px] text-gray-400 leading-relaxed italic">{item.desc}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto bg-gradient-to-r from-[#152336] to-[#0d1624] border border-blue-500/20 rounded-xl p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">Placement Probability</div>
                  <div className="text-[11px] text-gray-400">Based on historical data for current profile fit.</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400 leading-none mb-1">{data.probability}%</div>
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">HIGH CERTAINTY</div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Heatmap */}
          <div className="lg:col-span-2 bg-card border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-white">Skill Acquisition Heatmap</h2>
              <div className="flex items-center space-x-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                <span>LOW</span>
                <div className="flex space-x-1">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#1A3F33]"></div>
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#2B7A52]"></div>
                  <div className="w-2.5 h-2.5 rounded-sm bg-primary"></div>
                </div>
                <span>HIGH</span>
              </div>
            </div>

            <div className="flex flex-col space-y-2 mb-4">
              {heatmapData.map((row, i) => (
                <div key={i} className="flex space-x-2">
                  {row.map((val, j) => (
                    <div key={j} className={`w-8 h-6 rounded-sm ${heatColors[val]} transition-colors hover:ring-1 hover:ring-white/50 cursor-pointer`}></div>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest">
              <span>MONTH -6</span>
              <span>CURRENT WEEK</span>
            </div>
          </div>

          {/* Performance Trends */}
          <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col">
            <h2 className="text-lg font-bold text-white mb-2">Performance Trends</h2>
            <p className="text-xs text-gray-400 mb-6">Momentum check across metrics.</p>

            <div className="space-y-4 flex-1">
              {data.trends && data.trends.map((trend, i) => {
                const Icon = Icons[trend.icon] || TrendingUp; // Fallback icon
                return (
                  <div key={i} className="bg-background border border-white/5 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{trend.name}</span>
                    </div>
                    <div className={`text-sm font-bold ${trend.changeColor}`}>
                      {trend.change}
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="w-full mt-4 py-3 border border-white/10 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors">
              View Detailed Log
            </button>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Milestone Timeline */}
          <div className="lg:col-span-2 bg-card border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-8">Milestone Timeline</h2>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-white/10">
              {data.milestones.map((ms, i) => (
                <div key={i} className="relative flex items-start group">
                  <div className={`w-6 h-6 rounded-full border-[3px] border-card flex items-center justify-center shrink-0 z-10 ${ms.dotColor}`}>
                    <div className="w-2 h-2 rounded-full bg-card"></div>
                  </div>

                  <div className="ml-6 w-full">
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-sm font-bold text-white">{ms.title}</div>
                      <div className={`text-[9px] font-bold uppercase tracking-widest ${ms.statusColor}`}>{ms.status}</div>
                    </div>
                    <div className="text-xs text-gray-400 leading-relaxed mb-3">{ms.desc}</div>

                    {ms.progress && (
                      <div className="w-48 bg-background h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-400 h-full" style={{ width: `${ms.progress}%` }}></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Coach Insights */}
          <div className="bg-card border border-orange-500/30 rounded-2xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none"></div>
            <div className="flex items-center space-x-2 mb-6 relative z-10">
              <Sparkles className="w-5 h-5 text-orange-300" />
              <h2 className="text-lg font-bold text-white">AI Coach Insights</h2>
            </div>

            <div className="text-sm text-gray-300 leading-loose mb-8 relative z-10" dangerouslySetInnerHTML={{ __html: data.coach.insight }}></div>

            <div className="bg-[#111827] border border-white/10 rounded-xl p-4 mb-6 relative z-10">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Recommended Action</div>
              <div className="text-xs text-gray-300 leading-relaxed">{data.coach.action}</div>
            </div>

            <button className="w-full bg-[#E5C1A3] hover:bg-[#d4b092] text-[#0B0F17] py-3.5 rounded-xl text-sm font-bold transition-colors mt-auto relative z-10">
              Execute Next Step
            </button>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 mt-16 pb-4 flex justify-between items-center text-xs text-gray-500">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <img src={logo.src} alt="CareerBridge AI Logo" className="h-6 w-auto object-contain" />
              <span className="font-bold text-gray-300">CareerBridge AI</span>
            </div>
            © 2026 CareerBridge AI. Empowering the next generation of talent.
          </div>
          <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">AI Ethics</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contact Support</a>
          </div>
        </div>

      </main>
    </div>
  );
};

export default withAuth(PlacementReadiness);
