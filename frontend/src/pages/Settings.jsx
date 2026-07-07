import React, { useState } from 'react'
import { User, Shield, Bell, Lock, Brain, ChevronRight, Moon } from 'lucide-react'
import AppShell from '../components/AppShell'

const subNav = [
  { id: 'account', icon: User, label: 'Account' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'privacy', icon: Lock, label: 'Privacy' },
  { id: 'ai', icon: Brain, label: 'AI Preferences' },
]

export default function Settings() {
  const [activeSection, setActiveSection] = useState('account')
  const [form, setForm] = useState({
    name: 'Alexander Forge', email: 'alexander.f@university.edu',
    phone: '+1 (555) 012-3456', gradYear: '2025',
    twoFactor: true, visibility: 'public',
    adaptiveSkill: true, domains: ['Software Engineering', 'Data Science', 'AI/ML Research'],
    targetCompanies: '',
  })

  const set = key => e => setForm(p => ({ ...p, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const removeDomain = d => setForm(p => ({ ...p, domains: p.domains.filter(x => x !== d) }))
  const addDomain = () => {
    const name = prompt('Enter domain name')
    if (name?.trim()) setForm(p => ({ ...p, domains: [...p.domains, name.trim()] }))
  }

  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-on-surface-muted text-sm mt-1">Manage your account preferences and AI career engine.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="text-sm bg-surface-high w-auto px-3 py-2 rounded-lg text-on-surface-muted">
            <option>🌐 English (US)</option>
            <option>🇮🇳 Hindi</option>
            <option>🇪🇸 Spanish</option>
          </select>
          <button className="p-2 rounded-lg bg-surface-high hover:bg-surface-highest transition-colors">
            <Moon size={16} className="text-on-surface-muted" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sub-nav */}
        <div className="card p-2 h-fit">
          {subNav.map(item => (
            <button key={item.id} onClick={() => setActiveSection(item.id)}
              className={`sidebar-link w-full text-left ${activeSection === item.id ? 'active' : ''}`}>
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Personal Info */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Personal Information</h3>
              <button className="text-on-surface-muted hover:text-on-surface text-xs">ⓘ</button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1.5 block">Full Name</label>
                <input placeholder="Alexander Forge" value={form.name} onChange={set('name')} />
              </div>
              <div>
                <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1.5 block">Email Address</label>
                <input type="email" placeholder="alexander.f@university.edu" value={form.email} onChange={set('email')} />
              </div>
              <div>
                <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1.5 block">Phone Number</label>
                <input placeholder="+1 (555) 012-3456" value={form.phone} onChange={set('phone')} />
              </div>
              <div>
                <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1.5 block">Graduation Year</label>
                <input value={form.gradYear} onChange={set('gradYear')} />
              </div>
            </div>
          </div>

          {/* Security + Visibility */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Lock size={16} className="text-on-surface-muted" />
                <h3 className="font-semibold">Security</h3>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-outline/20 cursor-pointer hover:bg-surface-high rounded-lg px-2 -mx-2 transition-colors">
                <div>
                  <p className="text-sm font-medium">Change Password</p>
                  <p className="text-xs text-on-surface-muted">Last updated 3 months ago</p>
                </div>
                <ChevronRight size={16} className="text-on-surface-muted" />
              </div>
              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="text-sm font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary" /> Two-Factor Auth
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer">
                  <input type="checkbox" className="sr-only" checked={form.twoFactor} onChange={set('twoFactor')} />
                  <div className={`w-11 h-6 rounded-full transition-colors ${form.twoFactor ? 'bg-primary' : 'bg-surface-highest'}`}>
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${form.twoFactor ? 'translate-x-5' : ''}`} />
                  </div>
                </label>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Lock size={16} className="text-on-surface-muted" />
                <h3 className="font-semibold">Resume Visibility</h3>
              </div>
              <div className="space-y-2">
                {[
                  { val: 'public', label: 'Public', desc: 'Open to all network employers' },
                  { val: 'recruiters', label: 'Recruiters Only', desc: 'Only verified hiring managers' },
                  { val: 'private', label: 'Private', desc: 'Hidden from search results' },
                ].map(opt => (
                  <label key={opt.val} className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border transition-all
                    ${form.visibility === opt.val ? 'border-primary bg-primary/5' : 'border-outline/20 hover:border-primary/30'}`}>
                    <input type="radio" name="visibility" value={opt.val}
                      checked={form.visibility === opt.val} onChange={set('visibility')}
                      className="mt-1 accent-primary" />
                    <div>
                      <p className="text-sm font-medium">{opt.label}</p>
                      <p className="text-xs text-on-surface-muted">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* AI Preferences */}
          <div className="card">
            <div className="flex items-center gap-2 mb-1">
              <Brain size={16} className="text-primary" />
              <h3 className="font-semibold">AI Intelligence Preferences</h3>
            </div>
            <p className="text-xs text-on-surface-muted mb-4">Customize how CareerForge AI identifies opportunities for you.</p>

            <div className="mb-4">
              <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-2 block">Preferred Career Domain</label>
              <div className="flex flex-wrap gap-2">
                {form.domains.map(d => (
                  <span key={d} className="badge-green flex items-center gap-1 cursor-pointer hover:bg-red-400/20 transition-colors">
                    {d}
                    <button onClick={() => removeDomain(d)} className="ml-0.5 hover:text-red-400">×</button>
                  </span>
                ))}
                <button onClick={addDomain} className="badge-green opacity-60 hover:opacity-100 cursor-pointer">+ Add Domain</button>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1.5 block">Target Companies (Priority for Matching)</label>
              <input placeholder="e.g. NVIDIA, OpenAI, Stripe, Tesla..." value={form.targetCompanies} onChange={set('targetCompanies')} />
              <p className="text-xs text-on-surface-muted mt-1 italic">The AI will prioritize scanning vacancies and networking opportunities at these specific firms.</p>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-sm text-primary">Adaptive Skill Analysis</p>
                <p className="text-xs text-on-surface-muted mt-0.5">Allow CareerForge to suggest new certifications based on trending target company requirements.</p>
              </div>
              <label className="relative inline-flex cursor-pointer flex-shrink-0 mt-1">
                <input type="checkbox" className="sr-only" checked={form.adaptiveSkill} onChange={set('adaptiveSkill')} />
                <div className={`w-11 h-6 rounded-full transition-colors ${form.adaptiveSkill ? 'bg-primary' : 'bg-surface-highest'}`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${form.adaptiveSkill ? 'translate-x-5' : ''}`} />
                </div>
              </label>
            </div>
          </div>

          {/* Action bar */}
          <div className="flex items-center justify-between pt-2">
            <button className="text-on-surface-muted text-sm hover:text-red-400 transition-colors">Discard Changes</button>
            <button className="btn-primary px-8 py-2.5">Save Changes</button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
