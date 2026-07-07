import React from 'react'
import { TrendingUp, ArrowUp, Lock } from 'lucide-react'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'
import AppShell from '../components/AppShell'
import { heatmapData } from '../data/mockData'

const heatColor = v => {
  if (v < 0.2) return 'bg-surface-high'
  if (v < 0.4) return 'bg-primary/20'
  if (v < 0.6) return 'bg-primary/40'
  if (v < 0.8) return 'bg-primary/70'
  return 'bg-primary'
}

export default function PlacementReadiness() {
  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Placement Readiness</h1>
          <p className="text-on-surface-muted text-sm">Your comprehensive intelligence report for the current hiring season.</p>
        </div>
        <div className="flex items-center gap-2 bg-surface-high rounded-xl px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary">LIVE ANALYSIS ACTIVE</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Overall score ring */}
        <div className="card flex items-center gap-8 flex-wrap">
          <div>
            <p className="text-xs text-on-surface-muted uppercase tracking-widest mb-3">Overall Readiness Score</p>
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#3c4a42" strokeWidth="3" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="#76daa0" strokeWidth="3"
                  strokeDasharray="77.28 22.72" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-primary">82%</span>
                <span className="text-xs text-primary font-semibold">+4% THIS WEEK</span>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="bg-surface-high rounded-xl px-4 py-2 text-center">
                <p className="text-xs text-on-surface-muted">RANK</p>
                <p className="font-bold text-sm">Top 12%</p>
              </div>
              <div className="bg-surface-high rounded-xl px-4 py-2 text-center">
                <p className="text-xs text-on-surface-muted">STATUS</p>
                <p className="font-bold text-sm text-primary">High Fit</p>
              </div>
            </div>
          </div>

          {/* Readiness breakdown */}
          <div className="flex-1 min-w-48">
            <h3 className="font-semibold mb-3">Readiness Breakdown</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Resume Power', val: 92, note: 'Top-tier clarity and ATS optimization detected.' },
                { label: 'Technical Proficiency', val: 78, note: 'Strong in React/Node, room for Cloud growth.' },
                { label: 'Mock Performance', val: 85, note: 'Behavioral scores excellent; technical communication high.' },
                { label: 'Learning Velocity', val: 84, note: 'Active consistency in course completion.' },
              ].map(m => (
                <div key={m.label} className="bg-surface-high rounded-xl p-3">
                  <p className="text-xs text-on-surface-muted">{m.label}</p>
                  <p className="text-lg font-bold text-primary">{m.val}<span className="text-xs text-on-surface-muted">/100</span></p>
                  <div className="progress-bar-track my-1.5">
                    <div className="progress-bar-fill" style={{ width: `${m.val}%` }} />
                  </div>
                  <p className="text-xs text-on-surface-muted italic">{m.note}</p>
                </div>
              ))}
            </div>

            {/* Placement probability */}
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" />
                <div>
                  <p className="text-xs font-semibold">Placement Probability</p>
                  <p className="text-xs text-on-surface-muted">Based on historical data for current profile fit.</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-primary">89.4%</p>
                <p className="text-xs text-primary font-semibold">HIGH CERTAINTY</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Trends */}
        <div className="card">
          <h3 className="font-semibold mb-1">Performance Trends</h3>
          <p className="text-xs text-on-surface-muted mb-4">Momentum check across metrics.</p>
          <div className="space-y-4">
            {[
              { label: 'Agility', change: '+14%' },
              { label: 'Cognitive', change: '+8%' },
              { label: 'Behavioral', change: 'Stable' },
            ].map(t => (
              <div key={t.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-high flex items-center justify-center">
                    <TrendingUp size={14} className="text-primary" />
                  </div>
                  <span className="font-medium text-sm">{t.label}</span>
                </div>
                <div className="flex-1 mx-4 progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: t.label === 'Agility' ? '70%' : t.label === 'Cognitive' ? '55%' : '60%' }} />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-1 ${t.change.startsWith('+') ? 'text-primary' : 'text-on-surface-muted'}`}>
                  {t.change.startsWith('+') && <ArrowUp size={11} />}{t.change}
                </span>
              </div>
            ))}
          </div>
          <button className="btn-ghost w-full justify-center text-xs mt-4">View Detailed Log</button>
        </div>
      </div>

      {/* Heatmap */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Skill Acquisition Heatmap</h3>
          <div className="flex items-center gap-2 text-xs text-on-surface-muted">
            <span className="w-3 h-3 rounded-sm bg-surface-high inline-block" /> LOW
            <span className="w-3 h-3 rounded-sm bg-primary inline-block ml-2" /> HIGH
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="flex flex-col gap-1 min-w-max">
            {Array.from({ length: 5 }, (_, row) => (
              <div key={row} className="flex gap-1">
                {Array.from({ length: 14 }, (_, col) => {
                  const cell = heatmapData.find(d => d.row === row && d.col === col)
                  return (
                    <div key={col} title={`${Math.round((cell?.value || 0) * 100)}%`}
                      className={`w-6 h-6 rounded-sm ${heatColor(cell?.value || 0)} transition-all hover:opacity-80 cursor-pointer`} />
                  )
                })}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-on-surface-muted">
            <span>MONTH: -8</span>
            <span>CURRENT WEEK</span>
          </div>
        </div>
      </div>

      {/* Milestone Timeline + AI Coach */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-4">Milestone Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-semibold">Resume AI Optimization</p>
                  <span className="text-xs text-primary font-semibold">COMPLETED</span>
                </div>
                <p className="text-xs text-on-surface-muted">Completed with 92% match score for FAANG roles.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-amber mt-1.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-semibold">Mock Interview Sprint</p>
                  <span className="text-xs text-amber font-semibold">IN PROGRESS</span>
                </div>
                <p className="text-xs text-on-surface-muted">Focusing on system design and algorithmic complexity.</p>
                <div className="progress-bar-track mt-1.5">
                  <div className="h-full rounded-full bg-amber" style={{ width: '60%', height: '100%' }} />
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 opacity-50">
              <Lock size={14} className="mt-0.5 flex-shrink-0 text-on-surface-muted" />
              <div>
                <p className="text-sm font-semibold">Industry Referral Program</p>
                <p className="text-xs text-on-surface-muted">Unlock after maintaining 65%+ readiness for 14 days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Coach Insights */}
        <div className="card border-amber/40">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-primary text-sm">✨</span>
            <h3 className="font-semibold">AI Coach Insights</h3>
          </div>
          <p className="text-sm text-on-surface-muted italic mb-4">
            "Alex, your recent performance in System Design mocks has placed you in the{' '}
            <span className="text-primary font-semibold">top 5% of all candidates</span> this month. Your consistency in
            learning new cloud paradigms is exactly what Tier-1 tech firms are looking for right now."
          </p>
          <div className="bg-surface-high rounded-xl p-3 mb-4">
            <p className="text-xs text-on-surface-muted uppercase tracking-wider mb-1">Recommended Action</p>
            <p className="text-sm">Take the 'Advanced Kubernetes' assessment to boost Skill Gap score by +12 pts.</p>
          </div>
          <button className="w-full py-2.5 bg-amber/20 border border-amber/40 rounded-xl text-amber font-semibold text-sm hover:bg-amber/30 transition-colors">
            Execute Next Step
          </button>
        </div>
      </div>
    </AppShell>
  )
}
