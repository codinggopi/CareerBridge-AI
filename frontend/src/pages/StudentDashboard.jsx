"use client";
import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
  FileText, Code, Rocket, MessageSquare, TrendingUp,
  CheckSquare, Edit3, Sparkles
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import Footer from '../components/Footer';

// Icons mapping for dynamic rendering
const Icons = {
  'file-text': FileText,
  'code': Code,
  'rocket': Rocket,
  'message-square': MessageSquare,
  'trending-up': TrendingUp,
  'check-square': CheckSquare,
  'edit-3': Edit3,
  'sparkles': Sparkles
};

import { getStudentDashboard } from '../services/apiService';

const StudentDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStudentDashboard();
        setData(response);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col-reverse md:flex-row justify-between md:items-start gap-6 md:gap-0 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Good Morning, {data.user.name}</h1>
            <p className="text-gray-400">
              Your career readiness has increased by <span className="text-primary font-bold">12%</span> this week.
            </p>
          </div>
          <div className="flex items-center space-x-3 bg-card border border-white/5 rounded-full py-1.5 px-3">
            <img src={data.user.avatar} alt="Profile" className="w-12 h-12 md:w-8 md:h-8 rounded-xl md:rounded-full bg-gray-600" />
            <div className="pr-2">
              <div className="text-sm font-bold text-white leading-tight">{data.user.fullName}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">{data.user.role}</div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {data.stats.map((stat, i) => (
            <StatCard 
              key={i}
              title={stat.title}
              value={stat.value + (stat.suffix || '')}
              icon={Icons[stat.icon]}
              trend={stat.change.startsWith('+') || stat.change === 'High' || stat.change === 'Fast' ? 'up' : 'down'}
              trendValue={stat.change}
              className={stat.isHighlighted ? 'bg-gradient-to-br from-[#111827] to-[#1A2E20] border-primary/30' : ''}
              iconColor={stat.color}
            />
          ))}
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Skill Distribution */}
          <div className="lg:col-span-2 bg-card border border-white/5 rounded-2xl p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Skill Distribution</h2>
              <span className="text-xs bg-white/5 text-gray-400 px-3 py-1 rounded-full border border-white/5">Last 30 Days</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.skillDistribution} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barGap={0}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'transparent' }} height={10} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="core" radius={[4, 4, 0, 0]}>
                    {data.skillDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.core > 0 && entry.core < 60 ? '#2A3441' : '#5FE3A0'} />
                    ))}
                  </Bar>
                  <Bar dataKey="soft" radius={[4, 4, 0, 0]}>
                    {data.skillDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.soft > 0 && entry.soft < 50 ? '#2A3441' : '#60A5FA'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                <span className="text-xs text-gray-400">Core Tech</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                <span className="text-xs text-gray-400">Soft Skills</span>
              </div>
            </div>
          </div>

          {/* Career Match */}
          <div className="bg-gradient-to-b from-[#1A2421] to-card border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Career Match</h2>
              <p className="text-xs text-gray-400">AI-Optimized roles for you</p>
            </div>

            <div className="relative h-48 flex items-center justify-center">
              {/* Fake Radar/Concentric circles for match visualization */}
              <div className="w-32 h-32 rounded-full border border-primary/20 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-primary/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                    <Icons.rocket className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="absolute top-2 bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded border border-primary/30">
                98% FULL STACK
              </div>
              <div className="absolute bottom-4 right-4 bg-gray-800 text-gray-300 text-[10px] font-bold px-2 py-1 rounded border border-gray-700">
                74% DEVOPS
              </div>
            </div>

            <button className="w-full py-3 bg-transparent border border-white/10 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/5 transition-colors">
              View Full Report
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col space-y-6">
            {/* Recent Activities */}
            <div className="bg-card border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">Recent Activities</h2>
                <button className="text-xs text-gray-400 hover:text-white transition-colors">See All</button>
              </div>
              <div className="space-y-4">
                {data.recentActivities.map((activity, i) => {
                  const Icon = Icons[activity.icon];
                  return (
                    <div key={i} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.iconBg}`}>
                          <Icon className={`w-5 h-5 ${activity.iconColor}`} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{activity.title}</div>
                          <div className="text-xs text-gray-400">{activity.description}</div>
                        </div>
                      </div>
                      <div className="text-[10px] font-mono text-gray-500">{activity.time}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-6">Upcoming Interviews</h2>
              <div className="bg-background border border-white/5 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#1A2E20] border border-primary/20 rounded-xl w-12 h-12 flex flex-col items-center justify-center text-primary">
                    <span className="text-lg font-bold leading-none">{data.upcomingInterviews.date}</span>
                    <span className="text-[9px] uppercase font-bold">{data.upcomingInterviews.month}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{data.upcomingInterviews.title}</div>
                    <div className="text-xs text-gray-400">{data.upcomingInterviews.interviewer}</div>
                  </div>
                </div>
                <button className="bg-primary text-[#0B0F17] px-5 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            {/* Recommended Roles */}
            <div className="bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-6">Recommended Roles</h2>
              <div className="space-y-5">
                {data.recommendedRoles.map((role, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="text-sm font-bold text-white leading-tight">{role.title}</div>
                        <div className="text-[10px] text-gray-400">{role.company}</div>
                      </div>
                      <div className="text-[9px] font-bold bg-white/5 px-2 py-0.5 rounded text-gray-300 border border-white/10">
                        {role.match}% MATCH
                      </div>
                    </div>
                    <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                      <div className={`${role.color} h-full`} style={{ width: `${role.match}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 text-xs text-gray-400 hover:text-white transition-colors text-center">
                See Detailed Match Analysis
              </button>
            </div>

            {/* AI Smart Pick */}
            <div className="bg-gradient-to-br from-card to-[#111A29] border border-blue-500/20 rounded-2xl p-6">
              <div className="flex items-center space-x-2 text-blue-400 mb-4">
                <Icons.sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">AI SMART PICK</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{data.aiSmartPick.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                {data.aiSmartPick.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {data.aiSmartPick.tags.map((tag, i) => (
                    <span key={i} className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[8px] text-gray-300 font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="flex items-center space-x-1 text-sm text-blue-400 hover:text-blue-300 font-bold transition-colors">
                  <span>Start</span>
                  <span className="text-lg leading-none">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default StudentDashboard;
