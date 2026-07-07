import React, { useState } from 'react'
import { Zap, Download, Share2, RefreshCw, Plus, FileText } from 'lucide-react'
import AppShell from '../components/AppShell'

const initialForm = {
  name: 'Alex Rivera', targetRole: 'Senior Product Designer',
  summary: 'Data-driven Product Designer with 6+ years of experience building scalable design systems and AI-integrated workflows. Passionate about human-centric interfaces that bridge the gap between complex data and intuitive user experiences.',
  company: 'InnovateTech Solutions', duration: 'Jan 2021 - Present',
  bullets: [
    'Led the redesign of the flagship mobile app, increasing user retention by 25% across a user base of 1M+.',
    'Optimized design-to-development handoff by implementing a new design system, reducing dev tickets by 15%.',
  ],
  skills: ['UI/UX Design', 'Figma', 'Design Systems'],
}

export default function ResumeBuilder() {
  const [form, setForm] = useState(initialForm)
  const [activeTab, setActiveTab] = useState('Modern')
  const [showTooltip, setShowTooltip] = useState(true)

  const set = key => e => setForm(p => ({ ...p, [key]: e.target.value }))

  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold">AI Resume Builder</h1>
            <span className="text-xs text-on-surface-muted">DRAFTING • FAANG MODERN TEMPLATE</span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-surface-high rounded-xl px-3 py-2">
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#3c4a42" strokeWidth="3" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="#76daa0" strokeWidth="3"
                  strokeDasharray={`${85 * 0.942} 100`} strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">85%</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-primary">READINESS</p>
              <p className="text-xs text-on-surface-muted">ATS Compatible</p>
            </div>
          </div>
          <button className="btn-ghost text-sm gap-1.5"><Zap size={14} className="text-primary" /> AI Optimizer</button>
          <button className="btn-ghost text-sm"><FileText size={14} /></button>
          <button className="btn-ghost text-sm"><Share2 size={14} /></button>
          <button className="btn-primary text-sm gap-1.5"><Download size={14} /> PDF</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="space-y-4">
          <p className="text-xl font-semibold text-primary">Craft your future</p>
          <p className="text-sm text-on-surface-muted -mt-2">Craft a FAANG-ready resume with real-time AI intelligence.</p>

          {/* Personal Info */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={16} className="text-primary" />
              <h3 className="font-semibold">Personal Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1 block">Full Name</label>
                <input value={form.name} onChange={set('name')} />
              </div>
              <div>
                <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1 block">Target Role</label>
                <input value={form.targetRole} onChange={set('targetRole')} />
              </div>
            </div>
            <div>
              <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1 block">Professional Summary</label>
              <textarea rows={4} value={form.summary} onChange={set('summary')} className="resize-none" />
              <button className="btn-ghost text-xs mt-2 gap-1.5"><Zap size={12} className="text-primary" /> AI Enhance</button>
            </div>
          </div>

          {/* Experience */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-primary" />
                <h3 className="font-semibold">Experience</h3>
              </div>
              <button className="text-primary text-xs hover:underline flex items-center gap-1"><Plus size={12} /> Add Experience</button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1 block">Company</label>
                <input value={form.company} onChange={set('company')} />
              </div>
              <div>
                <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1 block">Duration</label>
                <input value={form.duration} onChange={set('duration')} />
              </div>
            </div>
            <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-2 block">Key Accomplishments</label>
            <div className="space-y-2">
              {form.bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input value={b} onChange={e => {
                    const bullets = [...form.bullets]
                    bullets[i] = e.target.value
                    setForm(p => ({ ...p, bullets }))
                  }} className="flex-1 text-sm" />
                  <button className="text-on-surface-muted hover:text-primary"><RefreshCw size={14} /></button>
                </div>
              ))}
            </div>
            <button className="btn-ghost w-full justify-center text-xs mt-3 gap-1.5">
              <Zap size={12} className="text-primary" /> Auto-generate Bullet Points
            </button>
          </div>

          {/* Skills */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Skills & Expertise</h3>
              <button className="text-primary text-xs hover:underline flex items-center gap-1"><Zap size={12} /> AI Scan Job Desc</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.skills.map(s => (
                <span key={s} className="badge-green cursor-pointer hover:bg-primary/30 transition-colors">
                  {s} ×
                </span>
              ))}
              <button className="badge-green opacity-60 hover:opacity-100">+ Add Skill</button>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="card relative">
          {/* Template tabs */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1 bg-surface rounded-lg p-1">
              {['Modern', 'Academic', 'Creative'].map(t => (
                <button key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-1.5 text-xs rounded-md font-medium transition-all ${activeTab === t ? 'bg-primary text-surface' : 'text-on-surface-muted hover:text-on-surface'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Resume preview */}
          <div className="bg-white text-gray-900 rounded-lg p-6 text-xs leading-relaxed min-h-[500px]">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-widest">{form.name}</h2>
            <p className="text-green-600 font-semibold text-xs uppercase tracking-widest mb-1">{form.targetRole}</p>
            <p className="text-gray-400 text-xs mb-3">alex.rivera@example.com | +1 (555) 0123 4567 | San Francisco, CA</p>
            <hr className="border-green-500 mb-3" />
            <p className="text-xs font-bold uppercase text-green-600 mb-1">Professional Summary</p>
            <p className="text-xs text-gray-600 mb-3">{form.summary}</p>
            <p className="text-xs font-bold uppercase text-green-600 mb-2">Work Experience</p>
            <div className="mb-3">
              <div className="flex justify-between">
                <p className="font-bold text-gray-800">{form.company}</p>
                <p className="text-gray-400">{form.duration}</p>
              </div>
              <p className="italic text-gray-600 mb-1">{form.targetRole}</p>
              <ul className="list-disc list-inside space-y-0.5">
                {form.bullets.map((b, i) => <li key={i} className="text-gray-600">{b}</li>)}
              </ul>
            </div>
            <p className="text-xs font-bold uppercase text-green-600 mb-1">Core Competencies</p>
            <p className="text-gray-600">{form.skills.join(' · ')}</p>
          </div>

          {/* Floating AI tooltip */}
          {showTooltip && (
            <div className="absolute bottom-8 right-4 bg-surface-high border border-primary/30 rounded-xl p-3 w-56 shadow-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-primary flex items-center gap-1"><Zap size={11} /> AI Recommendation</span>
                <button onClick={() => setShowTooltip(false)} className="text-on-surface-muted text-xs hover:text-on-surface">×</button>
              </div>
              <p className="text-xs text-on-surface-muted mb-2">"Try adding more quantifiable metrics in your CloudStream role to improve your impact score by ~12%."</p>
              <button className="btn-primary text-xs py-1 px-3">Apply Fixes</button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
