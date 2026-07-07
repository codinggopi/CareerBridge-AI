import React from 'react'
import { Github, Linkedin, Globe, CheckCircle, MessageCircle, Edit, Download } from 'lucide-react'
import AppShell from '../components/AppShell'
import { profileData } from '../data/mockData'

export default function MyProfile() {
  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <div className="flex gap-3">
          <button className="btn-ghost text-sm gap-1.5"><Edit size={14} /> Edit Profile</button>
          <button className="btn-primary text-sm gap-1.5"><Download size={14} /> Download Resume</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left card */}
        <div className="space-y-4">
          <div className="card text-center">
            <div className="relative w-20 h-20 mx-auto mb-3">
              <div className="w-full h-full rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-2xl font-bold text-primary">AP</div>
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <CheckCircle size={12} className="text-surface" />
              </div>
            </div>
            <h2 className="text-lg font-bold">{profileData.name}</h2>
            <p className="text-on-surface-muted text-sm mb-3">{profileData.degree}</p>
            <div className="flex justify-center gap-3 mb-4">
              <button className="p-2 rounded-lg bg-surface-high hover:bg-surface-highest transition-colors"><Github size={16} /></button>
              <button className="p-2 rounded-lg bg-surface-high hover:bg-surface-highest transition-colors"><Linkedin size={16} /></button>
              <button className="p-2 rounded-lg bg-surface-high hover:bg-surface-highest transition-colors"><Globe size={16} /></button>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-on-surface-muted uppercase tracking-wider">Placement Score</span>
                <span className="badge-green">Top {profileData.topPercent}</span>
              </div>
              <div className="progress-bar-track" style={{ height: 6 }}>
                <div className="progress-bar-fill" style={{ width: `${profileData.placementScore}%`, height: '100%' }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><span>📄</span></div>
              <div>
                <p className="text-xs text-on-surface-muted">Resume Score</p>
                <p className="font-bold">{profileData.resumeScore}<span className="text-on-surface-muted font-normal text-xs">/100</span></p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><span>⚡</span></div>
              <div>
                <p className="text-xs text-on-surface-muted">Skill Score</p>
                <p className="font-bold">{profileData.skillScore}<span className="text-on-surface-muted font-normal text-xs">/100</span></p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><span>✅</span></div>
              <div>
                <p className="text-xs text-on-surface-muted">Readiness</p>
                <p className="font-bold text-primary">{profileData.readiness}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-4">
          {/* Core Skills */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-primary">🎯</span>
                <h3 className="font-semibold">Core Skills</h3>
              </div>
              <span className="badge-green flex items-center gap-1"><CheckCircle size={11} /> AI Verified</span>
            </div>
            <div className="space-y-3 mb-4">
              {profileData.skills.map(s => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-on-surface-muted">{s.name}</span>
                    <span className="font-semibold text-primary">{s.level}%</span>
                  </div>
                  <div className="progress-bar-track" style={{ height: 6 }}>
                    <div className="progress-bar-fill" style={{ width: `${s.level}%`, height: '100%' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profileData.skillChips.map(s => (
                <span key={s} className="badge-green text-xs">{s}</span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Top Projects */}
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <span>🚀</span>
                <h3 className="font-semibold">Top Projects</h3>
              </div>
              <div className="space-y-4">
                {profileData.projects.map(p => (
                  <div key={p.name}>
                    <p className="font-semibold text-sm">{p.name}</p>
                    <p className="text-xs text-on-surface-muted mb-1.5">{p.desc}</p>
                    <div className="flex gap-1.5">
                      {p.tags.map(t => <span key={t} className="badge-blue text-xs">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <span>🏆</span>
                <h3 className="font-semibold">Achievements</h3>
              </div>
              <div className="space-y-3">
                {profileData.achievements.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">{a.title}</p>
                      <p className="text-xs text-on-surface-muted">{a.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Journey */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <span>📈</span>
              <h3 className="font-semibold">Progress Journey</h3>
            </div>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-outline/30" />
              <div className="space-y-5">
                {profileData.journey.map((j, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className="w-10 h-10 rounded-xl bg-surface-high border border-outline/30 flex items-center justify-center flex-shrink-0 z-10">
                      <span className="text-sm">📋</span>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-muted font-mono">{j.date}</p>
                      <p className="font-semibold text-sm">{j.title}</p>
                      <p className="text-xs text-on-surface-muted">{j.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary-dim transition-colors z-50">
        <MessageCircle size={20} className="text-surface" />
      </button>
    </AppShell>
  )
}
