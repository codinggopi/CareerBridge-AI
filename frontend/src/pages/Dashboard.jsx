import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { FileText, Zap, Rocket, MessageSquare, TrendingUp, Bell } from 'lucide-react'
import AppShell from '../components/AppShell'
import { student, skillDistributionData, recentActivities, upcomingInterviews, recommendedRoles } from '../data/mockData'

const statCards = [
  { label: 'Resume Score', value: student.resumeScore, unit: '/100', change: '+5%', changeDir: 'up', icon: FileText },
  { label: 'Skill Score', value: student.skillScore, unit: '/100', change: '+2%', changeDir: 'up', icon: Zap },
  { label: 'Placement Readiness', value: `${student.placementReadiness}%`, highlight: true, badge: 'High', icon: Rocket },
  { label: 'Interview Score', value: student.interviewScore, unit: '/100', change: '-1%', changeDir: 'down', icon: MessageSquare },
  { label: 'Learning Progress', value: student.learningProgress, unit: 'hrs/day', badge: 'Fast', icon: TrendingUp },
]

const customTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-surface-high border border-outline/40 rounded-lg p-2 text-xs">
        <p className="text-on-surface-muted">{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} style={{ color: p.color }}>{p.dataKey}: {p.value}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Good Morning, {student.name.split(' ')[0]} 👋</h1>
          <p className="text-on-surface-muted text-sm mt-1">Your career readiness has increased by 12% this week.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-surface-high">
            <Bell size={18} className="text-on-surface-muted" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-semibold">{student.name}</p>
              <p className="text-xs text-on-surface-muted">Senior Student</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xs font-bold">GK</div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {statCards.map(c => (
          <div key={c.label} className={`card relative overflow-hidden ${c.highlight ? 'border-primary/40 glow-green' : ''}`}>
            {c.highlight && <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />}
            <div className="relative">
              {c.icon && <c.icon size={16} className={`mb-1.5 ${c.highlight ? 'text-primary' : 'text-on-surface-muted'}`} />}
              {c.change && (
                <span className={`text-xs ${c.changeDir === 'up' ? 'text-primary' : 'text-red-400'}`}>{c.changeDir === 'up' ? '▲' : '▼'} {c.change}</span>
              )}
              {c.badge && <span className="badge-green text-xs">{c.badge}</span>}
              <p className="text-xs text-on-surface-muted uppercase tracking-wider mt-1">{c.label}</p>
              <p className={`text-2xl font-bold mt-0.5 ${c.highlight ? 'text-primary' : ''}`}>
                {c.value}{c.unit && <span className="text-sm font-normal text-on-surface-muted">{c.unit}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Skill Distribution Chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Skill Distribution</h3>
            <span className="text-xs text-on-surface-muted">Last 30 Days</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={skillDistributionData} barGap={4}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#bbcabf' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#bbcabf' }} axisLine={false} tickLine={false} />
              <Tooltip content={customTooltip} />
              <Bar dataKey="coreTech" fill="#76daa0" radius={[4, 4, 0, 0]} />
              <Bar dataKey="softSkills" fill="#7ed0fd" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-on-surface-muted"><span className="w-3 h-3 rounded-sm bg-primary inline-block" /> Core Tech</span>
            <span className="flex items-center gap-1.5 text-xs text-on-surface-muted"><span className="w-3 h-3 rounded-sm bg-tertiary inline-block" /> Soft Skills</span>
          </div>
        </div>

        {/* Career Match */}
        <div className="card">
          <h3 className="font-semibold mb-1">Career Match</h3>
          <p className="text-xs text-on-surface-muted mb-4">AI-Optimized roles for you</p>
          <div className="flex flex-col items-center gap-3 mb-4">
            <span className="badge-green text-sm px-3 py-1">98% Full Stack</span>
            <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
              <Rocket size={22} className="text-primary" />
            </div>
            <span className="badge-blue text-sm px-3 py-1">74% DevOps</span>
          </div>
          <button onClick={() => navigate('/career-intelligence')} className="btn-primary w-full justify-center text-sm">View Full Report</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Activities */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activities</h3>
            <button className="text-xs text-primary hover:underline">See All</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map(a => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-high flex items-center justify-center flex-shrink-0">
                  <FileText size={14} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-on-surface-muted">{a.sub}</p>
                </div>
                <span className="text-xs text-on-surface-muted flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>

          {/* Upcoming interviews */}
          <div className="mt-5 pt-4 border-t border-outline/20">
            <h3 className="font-semibold mb-3">Upcoming Interviews</h3>
            {upcomingInterviews.map(iv => (
              <div key={iv.id} className="flex items-center gap-4 bg-surface-high rounded-xl p-4">
                <div className="text-center flex-shrink-0">
                  <p className="text-2xl font-bold text-primary">{iv.day}</p>
                  <p className="text-xs text-on-surface-muted uppercase">{iv.month}</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{iv.title}</p>
                  <p className="text-xs text-on-surface-muted">{iv.sub}</p>
                </div>
                <button onClick={() => navigate('/interview')} className="btn-primary text-sm">Join</button>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Recommended roles */}
          <div className="card">
            <h3 className="font-semibold mb-3">Recommended Roles</h3>
            <div className="space-y-3">
              {recommendedRoles.map(r => (
                <div key={r.role}>
                  <div className="flex justify-between text-xs mb-1">
                    <div>
                      <span className="font-medium text-on-surface">{r.role}</span>
                      <span className="text-on-surface-muted ml-1 text-xs">{r.company}</span>
                    </div>
                    <span className="badge-green">{r.match}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${r.match}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/career-intelligence')} className="text-xs text-primary hover:underline mt-3 block">See Detailed Match Analysis</button>
          </div>

          {/* AI Smart Pick */}
          <div className="card border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={15} className="text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI Smart Pick</span>
            </div>
            <p className="font-semibold text-sm mb-1">Master Docker in 48h</p>
            <p className="text-xs text-on-surface-muted mb-3">Your match with 'CloudCore' will jump to 84% by completing this module.</p>
            <button onClick={() => navigate('/learning/resources')} className="text-primary text-sm font-semibold hover:underline">Start →</button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
