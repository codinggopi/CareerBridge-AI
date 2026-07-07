import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Bookmark, Trash2, ChevronRight, BookOpen } from 'lucide-react'
import AppShell from '../components/AppShell'
import Topbar from '../components/Topbar'
import { learningMomentumData, savedResources, aiRecommendations, courseGrid } from '../data/mockData'

const tagColors = {
  'High Priority': 'bg-red-400/15 text-red-400 border border-red-400/20',
  'Missing Skill': 'bg-amber/15 text-amber border border-amber/20',
  'Career Booster': 'bg-tertiary/15 text-tertiary border border-tertiary/20',
  'Personalized': 'bg-primary/15 text-primary border border-primary/20',
}

const actionColors = { Continue: 'text-primary', 'Start Course': 'text-tertiary', 'Finish Now': 'text-amber' }

const filters = ['All Topics', 'Frontend', 'Backend', 'AI/ML', 'System Design']

export default function LearningResources() {
  const [activeFilter, setActiveFilter] = useState('All Topics')

  return (
    <AppShell>
      {/* Inline topbar search variant */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">Learning Resources</h1>
          <p className="text-on-surface-muted text-sm mt-1">
            AI-curated resources personalized for your career goals.
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="badge-green text-xs px-3 py-1">TARGET: SENIOR FRONTEND ENGINEER</span>
            <span className="badge-blue text-xs px-3 py-1">SKILL READINESS: 74%</span>
          </div>
        </div>
      </div>

      {/* Momentum + Saved */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-primary">⚡</span>
              <h3 className="font-semibold">Learning Momentum</h3>
            </div>
            <span className="text-xs text-on-surface-muted">Last 30 Days</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={learningMomentumData}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#bbcabf' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#bbcabf' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#212a3b', border: '1px solid #3c4a42', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="hours" fill="#172030" stroke="#76daa0" strokeWidth={1} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <Bookmark size={15} className="text-on-surface-muted" />
            <h3 className="font-semibold">Saved for Later</h3>
          </div>
          <div className="space-y-3">
            {savedResources.map(r => (
              <div key={r.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-surface-high flex items-center justify-center flex-shrink-0">
                  <BookOpen size={14} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{r.title}</p>
                  <p className="text-xs text-on-surface-muted">{r.meta}</p>
                </div>
                <button className="text-on-surface-muted hover:text-red-400 flex-shrink-0">
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
          <button className="text-primary text-xs hover:underline mt-3 flex items-center gap-1">
            View All Bookmarks <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-primary">✨</span>
          <h3 className="text-lg font-semibold">AI Recommendations</h3>
        </div>
        <p className="text-xs text-on-surface-muted mb-4">Based on your Skill Gap Analysis for 'Senior Engineer' roles</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiRecommendations.map(r => (
            <div key={r.id} className="card hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagColors[r.tag] || 'badge-green'}`}>
                  {r.tag}
                </span>
                <button className="text-on-surface-muted hover:text-primary">
                  <Bookmark size={14} />
                </button>
              </div>
              <p className="font-semibold text-sm mb-1">{r.title}</p>
              <p className="text-xs text-on-surface-muted mb-3">{r.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface-muted">⏱ {r.duration}</span>
                <button className="btn-primary text-xs py-1 px-2">Start Learning</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter row + course grid */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border
                ${activeFilter === f
                  ? 'bg-primary text-surface border-primary'
                  : 'border-outline/40 text-on-surface-muted hover:border-primary/40'}`}>
              {f}
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            <select className="text-xs bg-surface-high w-auto px-2 py-1.5 rounded-lg border border-outline/30">
              <option>Difficulty: All</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <select className="text-xs bg-surface-high w-auto px-2 py-1.5 rounded-lg border border-outline/30">
              <option>Platform: All</option>
              <option>Coursera</option>
              <option>Udemy</option>
              <option>Plural Sight</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courseGrid.map(c => (
            <div key={c.id} className="card p-0 overflow-hidden hover:border-primary/30 transition-all">
              <div className="h-32 bg-surface-high flex items-center justify-center">
                <BookOpen size={32} className="text-primary/30" />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-on-surface-muted uppercase tracking-wider">{c.platform}</span>
                <p className="font-semibold text-sm mt-1 mb-0.5">{c.title}</p>
                <p className="text-xs text-on-surface-muted mb-3">{c.instructor}</p>
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-muted">Progress</span>
                    <span className="text-primary font-medium">{c.progress}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-muted">⏱ {c.timeLeft}</span>
                  <button className={`text-xs font-semibold hover:underline ${actionColors[c.action] || 'text-primary'}`}>
                    {c.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button className="btn-ghost text-sm px-8 gap-2">Load More Resources ↓</button>
        </div>
      </div>
    </AppShell>
  )
}
