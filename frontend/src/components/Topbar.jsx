import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Search, Bell, Zap } from 'lucide-react'

const publicLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/resume/analyze', label: 'Resume' },
  { to: '/interview', label: 'Interviews' },
  { to: '/learning/resources', label: 'Resources' },
]

export default function Topbar({ showSearch = false }) {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-30 bg-surface border-b border-outline/20 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Zap size={18} className="text-primary" />
          <span className="font-bold text-primary text-sm">CareerForge AI</span>
        </div>
        <nav className="hidden md:flex gap-1">
          {publicLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-primary border-b-2 border-primary' : 'text-on-surface-muted hover:text-on-surface'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        {showSearch && (
          <div className="relative hidden md:block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted" />
            <input className="pl-9 pr-4 py-1.5 text-sm w-64 bg-surface-high" placeholder="Search courses, certifications..." />
          </div>
        )}
        <button className="relative p-2 rounded-lg hover:bg-surface-high transition-colors">
          <Bell size={18} className="text-on-surface-muted" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>
        <div
          className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xs font-bold cursor-pointer"
          onClick={() => navigate('/profile')}
        >
          GK
        </div>
      </div>
    </header>
  )
}
