"use client";
import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
  Users, Activity, FileText, Sparkles, Search, Bell,
  MoreVertical, Filter, Download
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const Icons = {
  'users': Users,
  'activity': Activity,
  'file-text': FileText,
  'sparkles': Sparkles
};

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    import('../data/mockAdminDashboard.json').then(module => {
      setData(module.default);
    }).catch(err => console.error(err));
  }, []);

  if (!data) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar role="Premium Tier Admin" />

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Intelligence Overview</h1>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search talent, skills, or departments"
                className="bg-[#111827] border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 w-72 transition-colors"
              />
            </div>
            <button className="text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border border-background"></span>
            </button>
            <img src="https://i.pravatar.cc/150?u=admin" alt="Admin Profile" className="w-8 h-8 rounded-full bg-gray-600 border border-white/10" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {data.stats.map((stat, i) => {
            const Icon = Icons[stat.icon];
            return (
              <div key={i} className={`bg-card border border-white/5 rounded-2xl p-5 ${stat.isHighlighted ? 'bg-gradient-to-br from-[#111827] to-[#142A38] border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {stat.change && (
                    <div className={`text-xs font-bold px-2 py-1 rounded bg-white/5 ${stat.change.includes('+') ? 'text-primary' : 'text-blue-400'}`}>
                      {stat.change}
                    </div>
                  )}
                  {stat.hasToggle && (
                    <div className="w-8 h-4 bg-white/10 rounded-full relative">
                      <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-gray-400 rounded-full"></div>
                    </div>
                  )}
                  {stat.label && (
                    <div className="text-xs text-blue-400 font-mono tracking-widest">{stat.label}</div>
                  )}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">{stat.title}</div>
                <div className="text-3xl font-bold text-white flex items-end">
                  {stat.value}
                  {stat.suffix && <span className="text-sm text-gray-500 font-normal ml-1 mb-1">{stat.suffix}</span>}
                </div>
                {stat.hasProgress && (
                  <div className="w-full bg-background h-1 rounded-full mt-3 overflow-hidden">
                    <div className="bg-blue-400 h-full w-[40%]"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Skill Trends Analysis */}
          <div className="lg:col-span-2 bg-card border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Skill Trends Analysis</h2>
                <p className="text-xs text-gray-400">Evolution of student competencies across departments</p>
              </div>
              <button className="text-xs bg-white/5 text-gray-300 px-4 py-2 rounded-full border border-white/5 hover:bg-white/10 transition-colors">
                Last 6 Months
              </button>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.skillTrends} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 'bold' }} dy={10} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={24}>
                    {data.skillTrends.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value > 60 ? '#3B82F6' : '#2A3441'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Live Activities */}
          <div className="bg-card border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-6">Live Activities</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/5 before:to-transparent">
              {data.liveActivities.map((activity, i) => (
                <div key={i} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-3 h-3 rounded-full border border-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${activity.dot}`}></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 md:group-odd:pr-8 md:group-even:pl-8 pb-2">
                    <div className="text-sm font-bold text-white leading-tight mb-1">{activity.title}</div>
                    <div className="text-xs text-gray-400 mb-1">{activity.desc}</div>
                    <div className="text-[10px] font-mono text-gray-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 border border-white/10 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors">
              View All Activities
            </button>
          </div>
        </div>

        {/* Talent Pipeline Table */}
        <div className="bg-card border border-white/5 rounded-2xl p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Talent Pipeline</h2>
              <p className="text-xs text-gray-400">Review student profiles and readiness scores</p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 border border-white/10 rounded-lg px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 border border-white/10 rounded-lg px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors">
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-4 px-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Student Name</th>
                  <th className="py-4 px-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Department</th>
                  <th className="py-4 px-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Resume Score</th>
                  <th className="py-4 px-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Interview Avg</th>
                  <th className="py-4 px-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Readiness</th>
                  <th className="py-4 px-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.talentPipeline.map((student, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded bg-[#1A2234] flex items-center justify-center text-xs font-bold text-gray-300">
                          {student.initials}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{student.name}</div>
                          <div className="text-[10px] text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-300">{student.department}</td>
                    <td className="py-4 px-4">
                      <div className="inline-flex bg-[#11241C] text-primary border border-primary/20 text-[10px] font-bold px-2 py-1 rounded">
                        {student.resumeScore}/100
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-gray-300">{student.interviewAvg}/10.0</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${student.readinessDot}`}></div>
                        <span className="text-xs text-gray-300">{student.readiness}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-gray-500 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4 inline-block" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6 text-xs text-gray-500">
            <div>Showing 3 of {data.stats[0].value} students</div>
            <div className="flex space-x-2">
              <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/5 transition-colors">&lt;</button>
              <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/5 transition-colors">&gt;</button>
            </div>
          </div>
        </div>

        {/* Simple Footer */}
        <div className="border-t border-white/5 pt-8 mt-12 pb-4 flex justify-between items-center text-xs text-gray-500">
          <div>
            <span className="font-bold text-gray-300">CareerForge AI</span>
            <br />
            © 2024 CareerForge AI. Empowering the next generation of talent.
          </div>
          <div className="flex space-x-6">
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

export default AdminDashboard;
