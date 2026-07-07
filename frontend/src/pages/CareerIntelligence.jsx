import React from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { CheckCircle, TrendingUp, MessageCircle, Zap } from 'lucide-react'
import AppShell from '../components/AppShell'
import { careerMatches, capabilityMatrixData } from '../data/mockData'

const demandColor = d => d === 'Critical' ? 'text-red-400' : d === 'High' ? 'text-amber' : 'text-tertiary'

export default function CareerIntelligence() {
  return (
    <AppShell>
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Intelligence Engine Active</span>
          </div>
          <h1 className="text-3xl font-bold">Career Intelligence</h1>
          <p className="text-on-surface-muted text-sm mt-1">AI-powered career matching based on resume analysis, skills, projects, certifications and real-time market demand.</p>
        </div>
      </div>

      {/* Top row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Profile Summary */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Profile Summary</h3>
            <span className="badge-green flex items-center gap-1"><CheckCircle size={10} /> VERIFIED</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">AR</div>
            <div>
              <p className="font-semibold">Alex Rivera</p>
              <p className="text-xs text-on-surface-muted">Mid-Level Software Engineer</p>
            </div>
          </div>
          <p className="text-xs text-on-surface-muted uppercase tracking-wider mb-2">Extracted Skills</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {['React.js', 'Node.js', 'AWS Lambda', 'TypeScript'].map(s => (
              <span key={s} className="badge-green text-xs">{s}</span>
            ))}
            <span className="badge-green text-xs">+12 more</span>
          </div>
          <p className="text-xs text-on-surface-muted uppercase tracking-wider mb-2">Key Projects</p>
          <div className="space-y-1.5 mb-4">
            {['Distributed Inventory Management System', 'Real-time Chat Engine with WebSockets'].map(p => (
              <div key={p} className="flex items-start gap-2 text-xs">
                <CheckCircle size={12} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-on-surface-muted">{p}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-outline/20">
            <div>
              <p className="text-xs text-on-surface-muted">Resume Score</p>
              <p className="text-xl font-bold">92<span className="text-sm font-normal text-on-surface-muted">/100</span></p>
            </div>
            <span className="badge-green">TOP 3% in your region</span>
          </div>
        </div>

        {/* Capability Matrix */}
        <div className="card">
          <h3 className="font-semibold mb-4">Capability Matrix</h3>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={capabilityMatrixData}>
              <PolarGrid stroke="#3c4a42" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#bbcabf' }} />
              <Radar name="Skills" dataKey="A" stroke="#76daa0" fill="#76daa0" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="bg-surface-high rounded-lg p-2 text-center">
              <p className="text-xs text-on-surface-muted">Primary Archetype</p>
              <p className="font-semibold text-sm mt-0.5">Architectural Generalist</p>
            </div>
            <div className="bg-surface-high rounded-lg p-2 text-center">
              <p className="text-xs text-on-surface-muted">Growth Potential</p>
              <p className="font-semibold text-sm mt-0.5 text-primary">Exponential (+24%)</p>
            </div>
          </div>
        </div>

        {/* AI Career Insights */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={16} className="text-primary" />
            <h3 className="font-semibold">AI Career Insights</h3>
          </div>
          <div className="space-y-3 mb-4">
            {[
              '"Your React and Node.js expertise strongly align with Full Stack Developer roles at Series B+ startups."',
              '"We noticed a gap in Cloud Native Security. Closing this could increase your salary range by 15%."',
              '"Current market trend shows high demand for Next.js 14. You\'re 80% ready for these positions."',
            ].map((insight, i) => (
              <div key={i} className="bg-surface-high rounded-lg p-3 border-l-2 border-primary">
                <p className="text-xs text-on-surface-muted italic">{insight}</p>
              </div>
            ))}
          </div>
          <button className="btn-ghost w-full justify-center text-sm">Request Full Analysis</button>
        </div>
      </div>

      {/* Career Match Analysis */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Career Match Analysis</h3>
          <div className="flex items-center gap-2 text-sm text-on-surface-muted">
            Sort by:
            <select className="bg-surface-high text-sm w-auto px-3 py-1.5 rounded-lg">
              <option>Match Percentage</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {careerMatches.map(m => (
            <div key={m.role} className="card hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-lg font-bold">{m.role}</p>
                  <p className="text-xs text-on-surface-muted">{m.context}</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-extrabold ${m.match >= 90 ? 'text-primary' : m.match >= 85 ? 'text-tertiary' : 'text-amber'}`}>{m.match}%</p>
                  <p className="text-xs text-on-surface-muted">Match Score</p>
                </div>
              </div>
              <div className="space-y-2 mt-3 pt-3 border-t border-outline/20">
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-muted">Market Demand</span>
                  <span className={`font-semibold flex items-center gap-1 ${demandColor(m.demand)}`}>
                    <TrendingUp size={11} /> {m.demand}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-muted">Est. Salary</span>
                  <span className="font-semibold text-primary">${m.salaryMin}k - ${m.salaryMax}k</span>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-muted uppercase tracking-wider">Confidence</span>
                    <span className="font-semibold">{m.confidence} / 10</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${m.confidence * 10}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Acceleration Roadmap */}
      <div className="card border-primary/20">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Skill Acceleration Roadmap</h3>
            <p className="text-sm text-on-surface-muted mb-3">We've identified a pathway to reach a 99% match for "Senior Staff Engineer" roles. Our AI can generate a week-by-week learning journey tailored to your schedule.</p>
            <div className="flex flex-wrap gap-2">
              {['Recommended: Kubernetes Advanced', 'Certification: AWS Solutions Architect'].map(c => (
                <span key={c} className="badge-green flex items-center gap-1.5"><CheckCircle size={11} /> {c}</span>
              ))}
            </div>
          </div>
          <button className="btn-primary text-sm px-6 py-3 flex-shrink-0 gap-1.5">
            <Zap size={14} /> Generate Personalized Roadmap
          </button>
        </div>
      </div>

      {/* Floating chat */}
      <button className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary-dim transition-colors z-50">
        <MessageCircle size={20} className="text-surface" />
      </button>
    </AppShell>
  )
}
