import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, GraduationCap, Calendar, Lock, Shield, Zap } from 'lucide-react'
import Footer from '../components/Footer'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', branch: '', year: '', password: '', confirm: '', agree: false
  })

  const set = key => e => setForm(p => ({ ...p, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Mini top bar */}
      <header className="px-8 py-4 flex justify-between items-center border-b border-outline/20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Zap size={18} className="text-primary" />
          <span className="font-bold text-primary">CareerForge AI</span>
        </div>
        <div className="text-sm text-on-surface-muted">
          Already have an account?{' '}
          <button onClick={() => navigate('/sign-in')} className="text-primary hover:underline">Sign In</button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="card w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-1">Create Account</h2>
          <p className="text-on-surface-muted text-sm mb-6">Unlock personalized career intelligence and AI-driven growth.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1.5 block">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted" />
                <input className="pl-9" placeholder="Alex Rivera" value={form.name} onChange={set('name')} />
              </div>
            </div>

            <div>
              <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1.5 block">University Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted" />
                <input type="email" className="pl-9" placeholder="alex.rivera@university.edu" value={form.email} onChange={set('email')} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1.5 block">Academic Branch</label>
                <div className="relative">
                  <GraduationCap size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted" />
                  <select className="pl-9 appearance-none" value={form.branch} onChange={set('branch')}>
                    <option value="">Select Branch</option>
                    <option>Computer Science</option>
                    <option>Information Technology</option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                    <option>Civil</option>
                    <option>Data Science</option>
                    <option>AI & ML</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1.5 block">Current Year</label>
                <div className="relative">
                  <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted" />
                  <select className="pl-9 appearance-none" value={form.year} onChange={set('year')}>
                    <option value="">Select Year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted" />
                  <input type="password" className="pl-9" placeholder="••••••••" value={form.password} onChange={set('password')} />
                </div>
              </div>
              <div>
                <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <Shield size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted" />
                  <input type="password" className="pl-9" placeholder="••••••••" value={form.confirm} onChange={set('confirm')} />
                </div>
              </div>
            </div>

            <label className="flex items-start gap-2.5 text-sm text-on-surface-muted cursor-pointer">
              <input type="checkbox" className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0"
                checked={form.agree} onChange={set('agree')} />
              <span>
                I agree to the{' '}
                <span className="text-primary cursor-pointer hover:underline">Terms of Service</span> and{' '}
                <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>,
                including AI processing of my professional data.
              </span>
            </label>

            <button type="submit" className="btn-primary w-full justify-center py-3 text-base font-semibold">
              Register Account →
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-outline/40" />
              <span className="text-xs text-on-surface-muted uppercase tracking-widest">Or Join With</span>
              <div className="flex-1 h-px bg-outline/40" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="btn-ghost justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button type="button" className="btn-ghost justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </button>
            </div>
          </form>

          <p className="text-center text-xs text-on-surface-muted mt-5">
            🔒 Protected by CareerForge Enterprise Security. All data is encrypted at rest and in transit.
          </p>
        </div>
      </div>

      <div className="py-4 text-center text-xs text-on-surface-muted space-x-4 border-t border-outline/20">
        <a href="#" className="hover:text-primary">AI Ethics</a>
        <a href="#" className="hover:text-primary">Support</a>
        <a href="#" className="hover:text-primary">Platform Status</a>
      </div>
    </div>
  )
}
