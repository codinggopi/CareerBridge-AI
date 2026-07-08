"use client";
import React, { useEffect, useState } from 'react';
import { getCareerIntelligence } from '../services/apiService';
import {
  Sparkles, CheckCircle2, Bot, TrendingUp, BarChart2, MessageSquare, BookOpen, Award
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import Footer from '../components/Footer';

const Icons = {
  'book': BookOpen,
  'award': Award
};

// Fake data for radar chart since it's hard to mock generic capabilities perfectly
const radarData = [
  { subject: 'FRONTEND', A: 100, fullMark: 100 },
  { subject: 'BACKEND', A: 70, fullMark: 100 },
  { subject: 'DEVOPS', A: 40, fullMark: 100 },
  { subject: 'SYSTEMS', A: 60, fullMark: 100 }
];

const CareerIntelligence = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCareerIntelligence();
        setData(response);
      } catch (error) {
        console.error('Failed to fetch getCareerIntelligence data:', error);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div className="min-h-screen bg-[#0B0F17] flex"><Sidebar /></div>;

  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center space-x-2 text-[10px] font-mono text-primary mb-3 font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intelligence Engine Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Career Intelligence</h1>
          <p className="text-gray-400">AI-powered career matching based on resume analysis, skills, projects, certifications and real-time market demand.</p>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Profile Summary */}
          <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Profile Summary</h2>
              <span className="bg-[#11241C] text-primary border border-primary/20 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">VERIFIED</span>
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <img src={data.profile.avatar} alt="Profile" className="w-14 h-14 rounded-full border border-white/10" />
              <div>
                <div className="text-lg font-bold text-white leading-tight mb-1">{data.profile.name}</div>
                <div className="text-xs text-gray-400">{data.profile.role}</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">EXTRACTED SKILLS</div>
              <div className="flex flex-wrap gap-2">
                {data.profile.skills.map((skill, i) => (
                  <span key={i} className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8 flex-1">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">KEY PROJECTS</div>
              <div className="space-y-3">
                {data.profile.projects.map((proj, i) => (
                  <div key={i} className="flex items-start space-x-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="leading-tight">{proj}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-end pt-4 border-t border-white/5">
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">RESUME SCORE</div>
                <div className="text-2xl sm:text-3xl font-bold text-primary leading-none">
                  {data.profile.score}<span className="text-sm text-gray-500 font-normal">/100</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white mb-0.5">TOP {data.profile.topRegion}</div>
                <div className="text-[10px] text-gray-500">In your region</div>
              </div>
            </div>
          </div>

          {/* Capability Matrix */}
          <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col">
            <h2 className="text-lg font-bold text-white mb-6">Capability Matrix</h2>
            <div className="h-64 w-full mb-6 relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 'bold' }} />
                  <Radar name="Alex" dataKey="A" stroke="#5FE3A0" strokeWidth={2} fill="#5FE3A0" fillOpacity={0.1} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="bg-background border border-white/5 rounded-xl p-4">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">PRIMARY ARCHETYPE</div>
                <div className="text-sm font-bold text-white leading-tight">Architectural Generalist</div>
              </div>
              <div className="bg-background border border-white/5 rounded-xl p-4">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">GROWTH POTENTIAL</div>
                <div className="text-sm font-bold text-primary leading-tight">Exponential (+24%)</div>
              </div>
            </div>
          </div>

          {/* AI Career Insights */}
          <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center space-x-2 mb-6">
              <Bot className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-white">AI Career Insights</h2>
            </div>

            <div className="space-y-4 flex-1">
              {data.insights.map((insight, i) => {
                // simple hack to colorize certain words like React and Node.js
                const highlighted = insight
                  .replace('React', '<span class="text-primary">React</span>')
                  .replace('Node.js', '<span class="text-primary">Node.js</span>')
                  .replace('Cloud Native Security', '<span class="text-blue-400">Cloud Native Security</span>');

                return (
                  <div key={i} className="bg-background border border-white/5 rounded-xl p-4 text-sm text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlighted }} />
                );
              })}
            </div>

            <button className="w-full mt-6 py-3 border border-white/10 rounded-xl text-xs font-semibold text-primary hover:bg-white/5 transition-colors">
              Request Full Analysis
            </button>
          </div>

        </div>

        {/* Middle Section: Match Analysis */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-white">Career Match Analysis</h2>
            <div className="flex items-center space-x-3 text-xs">
              <span className="text-gray-500">Sort by:</span>
              <div className="bg-card border border-white/10 rounded-lg px-3 py-1.5 flex items-center space-x-2 text-gray-300 cursor-pointer">
                <span>Match Percentage</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.matches.map((match, i) => (
              <div key={i} className="bg-card border border-white/5 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{match.title}</h3>
                    <div className="text-xs text-gray-400">{match.subtitle}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold leading-none mb-1 ${match.demandColor}`}>{match.score}%</div>
                    <div className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">MATCH SCORE</div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Market Demand</span>
                    <span className={`font-bold flex items-center space-x-1 ${match.demandColor}`}>
                      {match.demand === 'Critical' ? <TrendingUp className="w-3.5 h-3.5" /> : <BarChart2 className="w-3.5 h-3.5" />}
                      <span>{match.demand}</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Est. Salary</span>
                    <span className="font-bold text-white">{match.salary}</span>
                  </div>
                </div>

                <div className="w-full bg-background h-1.5 rounded-full mb-6 overflow-hidden">
                  <div className={`h-full ${match.barColor}`} style={{ width: match.barWidth }}></div>
                </div>

                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <span>CONFIDENCE</span>
                  <span className="text-white">{match.confidence} / 10</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-card border border-white/5 rounded-2xl p-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>

          <div className="relative z-10 md:w-full lg:w-2/3">
            <h2 className="text-2xl font-bold text-white mb-3">Skill Acceleration Roadmap</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xl">
              We've identified a pathway to reach a {data.roadmap.match} match for "{data.roadmap.target}" roles. Our AI can generate a week-by-week learning journey tailored to your schedule.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              {data.roadmap.items.map((item, i) => {
                const Icon = Icons[item.icon];
                return (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white mb-1"><span className="text-gray-500 mr-1">{item.type}:</span>{item.title}</div>
                      <div className="text-[10px] text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10">
            <button className="flex items-center space-x-2 bg-primary text-[#0B0F17] px-6 py-4 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-xl shadow-primary/10">
              <Sparkles className="w-4 h-4" />
              <span>Generate Personalized Roadmap</span>
            </button>
          </div>
        </div>

        <Footer />
      </main>

      {/* Floating chatbot bubble for Career Intelligence */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center text-[#0B0F17] shadow-2xl hover:scale-105 transition-transform z-50">
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CareerIntelligence;
