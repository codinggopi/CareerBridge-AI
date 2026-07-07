import React from 'react'

export default function StatCard({ label, value, unit, change, changeDir, highlight, icon: Icon }) {
  return (
    <div className={`card relative overflow-hidden ${highlight ? 'border-primary/40 glow-green' : ''}`}>
      {highlight && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
      )}
      <div className="relative">
        {Icon && (
          <div className="mb-2">
            <Icon size={18} className={highlight ? 'text-primary' : 'text-on-surface-muted'} />
          </div>
        )}
        {change && (
          <span className={`text-xs font-medium ${changeDir === 'up' ? 'text-primary' : 'text-red-400'}`}>
            {changeDir === 'up' ? '▲' : '▼'} {change}
          </span>
        )}
        <p className="text-xs text-on-surface-muted uppercase tracking-widest mt-1">{label}</p>
        <p className={`text-3xl font-bold mt-1 ${highlight ? 'text-primary' : 'text-on-surface'}`}>
          {value}
          {unit && <span className="text-base font-normal text-on-surface-muted ml-1">{unit}</span>}
        </p>
      </div>
    </div>
  )
}
