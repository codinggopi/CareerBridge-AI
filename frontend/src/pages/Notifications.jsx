import React, { useState } from 'react'
import { FileText, MessageSquare, Zap, Award, Settings, CheckCheck } from 'lucide-react'
import AppShell from '../components/AppShell'
import { notificationsData } from '../data/mockData'

const iconMap = {
  'file-text': FileText,
  'message-square': MessageSquare,
  zap: Zap,
  award: Award,
  settings: Settings,
}

const filters = ['All', 'Resume', 'Learning', 'Interviews', 'Achievements']

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [notifs, setNotifs] = useState(notificationsData)

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, unread: false })))

  const filtered = activeFilter === 'All' ? notifs : notifs.filter(n => n.category === activeFilter)
  const groups = ['TODAY', 'THIS WEEK', 'EARLIER']

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-on-surface-muted text-sm mt-1">Stay updated with your AI-powered career journey.</p>
          </div>
          <button onClick={markAllRead} className="flex items-center gap-1.5 text-sm text-primary hover:underline">
            <CheckCheck size={15} /> Mark all as read
          </button>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border
                ${activeFilter === f
                  ? 'bg-primary text-surface border-primary'
                  : 'border-outline/40 text-on-surface-muted hover:border-primary/40'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Grouped notifications */}
        {groups.map(group => {
          const items = filtered.filter(n => n.group === group)
          if (!items.length) return null
          return (
            <div key={group} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <p className="text-xs font-semibold text-on-surface-muted uppercase tracking-widest">{group}</p>
              </div>
              <div className="space-y-3">
                {items.map(n => {
                  const Icon = iconMap[n.icon] || FileText
                  return (
                    <div key={n.id}
                      className={`card flex items-start gap-4 relative transition-all ${n.unread ? 'border-primary/20' : ''}`}>
                      {n.unread && (
                        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
                      )}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                        ${n.unread ? 'bg-primary/15' : 'bg-surface-high'}`}>
                        <Icon size={18} className={n.unread ? 'text-primary' : 'text-on-surface-muted'} />
                      </div>
                      <div className="flex-1 pr-4">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`font-semibold text-sm ${n.unread ? 'text-on-surface' : 'text-on-surface-muted'}`}>
                            {n.title}
                          </p>
                          <span className="text-xs text-on-surface-muted flex-shrink-0">{n.time}</span>
                        </div>
                        <p className="text-xs text-on-surface-muted mt-0.5 mb-2">{n.desc}</p>
                        {n.actions?.length > 0 && (
                          <div className="flex gap-3">
                            {n.actions.map(a => (
                              <button key={a} className="text-xs text-primary hover:underline font-medium">{a}</button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </AppShell>
  )
}
