import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, FileText, BarChart2, MessageSquare,
  CheckSquare, Settings, HelpCircle, LogOut, Zap
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/resume/analyze', icon: FileText, label: 'Resume AI' },
  { to: '/skill-gap', icon: BarChart2, label: 'Skill Gap' },
  { to: '/interview', icon: MessageSquare, label: 'Mock Interview' },
  { to: '/readiness', icon: CheckSquare, label: 'Readiness' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-surface border-r border-outline/30 flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-outline/20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-7 h-7 rounded-md bg-primary/20 flex items-center justify-center">
            <Zap size={15} className="text-primary" />
          </div>
          <span className="font-bold text-primary text-base leading-tight">CareerForge AI</span>
        </div>
        <p className="text-on-surface-muted text-xs mt-1 pl-9">Premium Tier</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-1">
        <button
          onClick={() => navigate('/resume/analyze')}
          className="btn-primary w-full justify-center text-sm mb-3"
        >
          <Zap size={15} />
          Analyze Resume
        </button>
        <button className="sidebar-link w-full text-left">
          <HelpCircle size={17} />
          <span>Help Center</span>
        </button>
        <button
          onClick={() => navigate('/sign-in')}
          className="sidebar-link w-full text-left text-red-400"
        >
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
