import React, { useState } from 'react'
import { AlertTriangle, Zap, Share2, Youtube, BookOpen } from 'lucide-react'
import AppShell from '../components/AppShell'
import { skillGapData } from '../data/mockData'

const careerPaths = ['Senior AI Engineer', 'Full Stack Developer', 'DevOps Engineer', 'Data Scientist']

export default function SkillGap() {
  const [selected, setSelected] = useState(careerPaths[0])
  const [analyzed, setAnalyzed] = useState(true)

  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Skill Gap Analysis</h1>
          <p className="text-on-surface-muted text-sm">Bridge the distance between your current profile and industry demands.</p>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <label className="text-xs text-on-surface-muted block mb-1">Target Career Path</label>
            <select value={selected} onChange={e => setSelected(e.target.value)}
              className="w-48 bg-surface-high text-sm">
              {careerPaths.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <button onClick={() => setAnalyzed(true)} className="btn-primary text-sm mt-5 gap-1.5">
            <Zap size={14} /> Run Analysis
          </button>
        </div>
      </div>

      {analyzed && (
        <>
          {/* Skill match + Distribution */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Match ring */}
            <div className="card flex flex-col items-center py-8">
              <h3 className="font-semibold mb-4 self-start">Skill Match</h3>
              <div className="relative w-36 h-36 mb-4">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#3c4a42" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#76daa0" strokeWidth="3"
                    strokeDasharray="70.65 29.35" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-primary">75%</span>
                  <span className="text-xs text-on-surface-muted">READINESS</span>
                </div>
              </div>
              <p className="text-sm text-on-surface-muted text-center max-w-xs">
                You are highly competitive for{' '}
                <span className="text-primary font-semibold">{selected}</span> roles.
                3 key gaps identified.
              </p>
            </div>

            {/* Skill distribution */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Skill Distribution</h3>
                <div className="flex gap-3 text-xs">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Mastered</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber" /> In Progress</span>
                </div>
              </div>
              <div className="space-y-4">
                {skillGapData.map(s => (
                  <div key={s.skill}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-on-surface-muted">{s.skill}</span>
                      <span className={`font-semibold ${s.mastered ? 'text-primary' : 'text-amber'}`}>{s.level}%</span>
                    </div>
                    <div className="progress-bar-track">
                      <div className={`h-full rounded-full transition-all`}
                        style={{ width: `${s.level}%`, background: s.mastered ? '#76daa0' : '#f59e0b' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Critical gaps + Industry benchmarks */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="card border-amber/40">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={16} className="text-amber" />
                <h3 className="font-semibold">Critical Gaps</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">High Impact</span>
                  <p className="font-semibold text-sm mt-1">Distributed Systems Training</p>
                  <p className="text-xs text-on-surface-muted">Required for scaling LLM workloads in enterprise environments.</p>
                </div>
                <div className="bg-amber/10 border border-amber/20 rounded-lg p-3">
                  <span className="text-xs font-semibold text-amber uppercase tracking-wider">Medium Impact</span>
                  <p className="font-semibold text-sm mt-1">Prompt Engineering (Advanced)</p>
                  <p className="text-xs text-on-surface-muted">Chain-of-thought and few-shot optimization techniques.</p>
                </div>
              </div>
            </div>

            <div className="card border-tertiary/40">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={16} className="text-tertiary" />
                <h3 className="font-semibold">Industry Benchmarks</h3>
              </div>
              <p className="text-xs text-on-surface-muted mb-4">How you compare to the top 10% of applicants for this role in the Bay Area.</p>
              <div className="space-y-3">
                {[
                  { label: 'Publication Count', you: 2, avg: 5 },
                  { label: 'Years of Experience', you: 4.6, avg: 5.2 },
                  { label: 'Open Source Contrib.', you: 'Expert', avg: 'Mid' },
                ].map(b => (
                  <div key={b.label} className="flex items-center justify-between">
                    <span className="text-sm text-on-surface-muted">{b.label}</span>
                    <div className="flex gap-2">
                      <span className="badge-green">You: {b.you}</span>
                      <span className="badge-blue">Avg: {b.avg}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI-Curated Learning Path */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">AI-Curated Learning Path</h3>
                <p className="text-xs text-on-surface-muted">Tailored resources to close identified gaps in 4–8 weeks.</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost text-xs">⚙ Filter</button>
                <button className="btn-ghost text-xs"><Share2 size={12} /></button>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { platform: 'YouTube', icon: Youtube, title: 'Deep Learning...', desc: 'Master the architecture that changed NLP and Computer...', meta: '12 Hours', cta: 'Start Now →', color: 'bg-red-500' },
                { platform: 'Coursera', icon: BookOpen, title: 'Kubernetes for AI Engineers', desc: 'Learn to deploy and scale machine learning models on K8s...', meta: 'Level: Intermediate', cta: 'Enroll Free →', color: 'bg-blue-600' },
                { platform: 'AI Lab', icon: Zap, title: 'Interactive Fine-Tuning...', desc: 'Practice LoRA and QLoRA fine-tuning on real datasets with our...', meta: 'Hands-on Practice', cta: 'Launch Lab', color: 'bg-primary/20' },
              ].map(r => (
                <div key={r.title} className="card bg-surface-high p-0 overflow-hidden">
                  <div className={`h-28 ${r.color} flex items-center justify-center`}>
                    <r.icon size={36} className="text-white/80" />
                  </div>
                  <div className="p-3">
                    <span className="badge-green text-xs">{r.platform}</span>
                    <p className="font-semibold text-sm mt-1.5">{r.title}</p>
                    <p className="text-xs text-on-surface-muted mt-1 mb-2">{r.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-on-surface-muted">{r.meta}</span>
                      <button className="text-primary text-xs hover:underline font-medium">{r.cta}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </AppShell>
  )
}
