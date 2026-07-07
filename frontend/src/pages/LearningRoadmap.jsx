import React from 'react'
import { Check, Lock, Play, ChevronRight, MessageCircle } from 'lucide-react'
import AppShell from '../components/AppShell'
import { roadmapWeeks, selectedResources } from '../data/mockData'

const statusIcon = status => {
  if (status === 'completed') return <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"><Check size={18} className="text-surface" /></div>
  if (status === 'in-progress') return <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center"><Play size={16} className="text-primary" /></div>
  return <div className="w-10 h-10 rounded-full bg-surface-high border-2 border-outline/40 flex items-center justify-center"><Lock size={16} className="text-on-surface-muted/40" /></div>
}

const resourceIcons = { red: '🎥', blue: '📘', orange: '🟠', green: '✅' }

export default function LearningRoadmap() {
  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Full Stack AI Engineer</h1>
          <p className="text-on-surface-muted text-sm">Your personalized 6-week technical mastery plan. We've identified 4 critical skill gaps based on your target role at OpenAI.</p>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs text-on-surface-muted uppercase tracking-wider text-right mb-1">Overall Progress</p>
            <div className="flex items-center gap-2">
              <div className="relative w-12 h-12">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#3c4a42" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#76daa0" strokeWidth="3"
                    strokeDasharray="32.06 67.94" strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">34%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-4">
          {roadmapWeeks.map((week, idx) => (
            <div key={week.week} className={`card relative ${week.status === 'in-progress' ? 'border-primary/40 glow-green' : week.status === 'locked' ? 'opacity-60' : ''}`}>
              <div className="flex items-start gap-4">
                {statusIcon(week.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                    <div>
                      <p className="text-xs text-on-surface-muted uppercase tracking-wider font-mono">Week {week.week}</p>
                      {week.status === 'in-progress' && <span className="text-xs text-primary font-semibold">— IN PROGRESS</span>}
                    </div>
                    {week.status === 'completed' && <span className="badge-green">100% Done</span>}
                    {week.status === 'in-progress' && <span className="text-xs font-semibold text-primary">{week.completion}% Completion</span>}
                    {week.status === 'locked' && <span className="text-xs text-on-surface-muted">Locked</span>}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{week.title}</h3>
                  <p className="text-sm text-on-surface-muted mb-3">{week.desc}</p>

                  {week.status === 'in-progress' && (
                    <div className="progress-bar-track mb-3" style={{ height: 6 }}>
                      <div className="progress-bar-fill" style={{ width: `${week.completion}%`, height: '100%' }} />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 text-xs text-on-surface-muted">
                    {week.hours && <span>⏱ {week.hours} Hours</span>}
                    {week.lessons && <span>📖 {week.lessons} Lessons</span>}
                    {week.cert && <span>🏅 {week.cert}</span>}
                  </div>

                  {week.resources && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {week.resources.map(r => (
                        <span key={r} className="flex items-center gap-1 bg-surface border border-outline/40 rounded-lg px-2 py-1 text-xs text-on-surface-muted hover:border-primary/40 cursor-pointer">
                          {r === 'RAG Architecture 101' ? '📺' : '<>'} {r}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* AI Career Insights */}
          <div className="card border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-primary text-sm">✨</span>
              <h3 className="font-semibold">AI Career Insights</h3>
            </div>
            <p className="text-sm text-on-surface-muted mb-4">
              Based on your progress in <span className="text-primary font-semibold">Week 1</span>, we've updated your path.
              You skipped the "Basic JS" module — AI suggests adding a "TypeScript Design Patterns" deep-dive in Week 5 to compensate.
            </p>
            <button className="btn-ghost w-full justify-center text-sm">Adjust My Roadmap</button>
          </div>

          {/* Selected Resources */}
          <div className="card">
            <h3 className="font-semibold mb-3">Selected Resources</h3>
            <div className="space-y-2">
              {selectedResources.map(r => (
                <div key={r.id} className="flex items-center gap-3 hover:bg-surface-high rounded-lg p-2 -mx-2 cursor-pointer group">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center text-sm flex-shrink-0
                    ${r.color === 'red' ? 'bg-red-500/20' : r.color === 'blue' ? 'bg-tertiary/20' : r.color === 'orange' ? 'bg-amber/20' : 'bg-primary/20'}`}>
                    {resourceIcons[r.color]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">{r.title}</p>
                    <p className="text-xs text-on-surface-muted font-mono">{r.meta}</p>
                  </div>
                  <ChevronRight size={14} className="text-on-surface-muted group-hover:text-primary" />
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="card">
            <h3 className="font-semibold mb-3">Milestones</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-primary/10 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">🎓</div>
                <div>
                  <p className="text-xs font-semibold">React Architecture Certificate</p>
                  <p className="text-xs text-primary">CLAIMED - JUN 12</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 opacity-50">
                <div className="w-8 h-8 rounded-full bg-surface-high border border-outline/30 flex items-center justify-center">🔒</div>
                <div>
                  <p className="text-xs font-semibold">AI Engineering Professional</p>
                  <p className="text-xs text-on-surface-muted">UNLOCKED IN WEEK 3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chat */}
      <button className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary-dim transition-colors z-50">
        <MessageCircle size={20} className="text-surface" />
      </button>
    </AppShell>
  )
}
