import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Search, Bell, MoreVertical, Users, Zap, FileText, Rocket } from 'lucide-react'
import AppShell from '../components/AppShell'
import { adminStudents, liveActivities, skillTrendsData } from '../data/mockData'

const readinessColor = r => r === 'Highly Ready' ? 'text-primary' : 'text-amber'

export default function AdminDashboard() {
  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Intelligence Overview</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted" />
            <input className="pl-9 pr-4 py-2 text-sm w-64 bg-surface-high" placeholder="Search talent, skills, or departments..." />
          </div>
          <button className="relative p-2 rounded-lg hover:bg-surface-high">
            <Bell size={18} className="text-on-surface-muted" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>
          <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xs font-bold">AD</div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <div className="flex items-center gap-2 mb-1">
            <Users size={16} className="text-on-surface-muted" />
            <span className="text-xs text-primary font-semibold">+12%</span>
          </div>
          <p className="text-xs text-on-surface-muted uppercase tracking-wider">Total Students</p>
          <p className="text-3xl font-bold mt-1">12,842</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={16} className="text-on-surface-muted" />
            <span className="badge-green">Live</span>
          </div>
          <p className="text-xs text-on-surface-muted uppercase tracking-wider">Active Today</p>
          <p className="text-3xl font-bold mt-1">2,410</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-1">
            <FileText size={16} className="text-on-surface-muted" />
          </div>
          <p className="text-xs text-on-surface-muted uppercase tracking-wider">Avg Resume Score</p>
          <p className="text-3xl font-bold mt-1">78.4 <span className="text-base font-normal text-on-surface-muted">/100</span></p>
        </div>
        <div className="card border-primary/40 glow-green relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          <div className="relative">
            <span className="badge-green mb-1 inline-block">AI Insights</span>
            <p className="text-xs text-on-surface-muted uppercase tracking-wider">Placement Readiness</p>
            <p className="text-3xl font-bold text-primary mt-1">92.1%</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Skill Trends */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Skill Trends Analysis</h3>
              <p className="text-xs text-on-surface-muted">Evolution of student competencies across departments</p>
            </div>
            <select className="text-xs bg-surface-high border border-outline/40 rounded-md px-2 py-1 w-auto">
              <option>Last 6 Months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={skillTrendsData}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#bbcabf' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#bbcabf' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#212a3b', border: '1px solid #3c4a42', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="value" fill="#172030" radius={[4, 4, 0, 0]}>
                {skillTrendsData.map((_, i) => (
                  <rect key={i} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Live Activities */}
        <div className="card">
          <h3 className="font-semibold mb-4">Live Activities</h3>
          <div className="space-y-4">
            {liveActivities.map(a => (
              <div key={a.id} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-on-surface-muted">{a.sub}</p>
                  <p className="text-xs text-on-surface-muted/60 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-ghost w-full justify-center text-xs mt-4">View All Activities</button>
        </div>
      </div>

      {/* Talent Pipeline Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">Talent Pipeline</h3>
            <p className="text-xs text-on-surface-muted">Review student profiles and readiness scores</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-ghost text-xs gap-1.5"><span>⚙</span> Filter</button>
            <button className="btn-ghost text-xs gap-1.5"><span>↓</span> Export</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline/20">
                {['Student Name', 'Department', 'Resume Score', 'Interview Avg', 'Readiness', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs text-on-surface-muted uppercase tracking-wider pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminStudents.map(s => (
                <tr key={s.id} className="border-b border-outline/10 hover:bg-surface-high/50 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">{s.initials}</div>
                      <div>
                        <p className="font-medium text-sm">{s.name}</p>
                        <p className="text-xs text-on-surface-muted">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-sm text-on-surface-muted">{s.dept}</td>
                  <td className="py-3 pr-4">
                    <span className="badge-green">{s.resumeScore}/100</span>
                  </td>
                  <td className="py-3 pr-4 text-sm">{s.interviewAvg}/10</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${s.readiness === 'Highly Ready' ? 'bg-primary' : 'bg-amber'}`} />
                      <span className={`text-xs font-medium ${readinessColor(s.readiness)}`}>{s.readiness}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <button className="p-1.5 hover:bg-surface-high rounded-md text-on-surface-muted">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-outline/20">
          <p className="text-xs text-on-surface-muted">Showing 3 of 12,842 students</p>
          <div className="flex gap-1">
            <button className="p-1.5 hover:bg-surface-high rounded text-on-surface-muted text-xs">‹</button>
            <button className="p-1.5 hover:bg-surface-high rounded text-on-surface-muted text-xs">›</button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
