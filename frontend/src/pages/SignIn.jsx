import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Zap } from 'lucide-react'
import Footer from '../components/Footer'

export default function SignIn() {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', remember: false })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="flex-1 flex">
        {/* Left decorative panel */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-surface-container to-surface items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(118,218,160,0.07)_0%,transparent_70%)]" />
          <div className="relative text-center max-w-sm">
            {/* AI visual placeholder */}
            <div className="w-64 h-64 mx-auto mb-6 relative">
              <div className="w-full h-full rounded-2xl bg-surface-high border border-primary/20 flex items-center justify-center overflow-hidden">
                <div className="text-center space-y-3 p-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                    <Zap size={30} className="text-primary" />
                  </div>
                  <div className="space-y-1">
                    {['CAREER OPTIMIZATION', 'SKILL MATCHING', 'RESUME ANALYSIS', 'INTERVIEW PREP'].map(t => (
                      <div key={t} className="text-xs text-primary/60 font-mono">{t}</div>
                    ))}
                  </div>
                  <div className="badge-green">AI ENGINE ACTIVE</div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary animate-pulse" />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-tertiary animate-pulse delay-300" />
            </div>
            <h2 className="text-2xl font-bold text-on-surface mb-2">CareerForge AI</h2>
            <p className="text-on-surface-muted text-sm">Precision engineering for your professional journey. Elevate your potential with data-driven career intelligence.</p>
          </div>
        </div>

        {/* Right auth card */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="card w-full max-w-md">
            <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
            <p className="text-on-surface-muted text-sm mb-6">Access your AI-powered career dashboard.</p>

            {/* Google */}
            <button className="btn-ghost w-full justify-center mb-4 gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Sign In with Google
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-outline/40" />
              <span className="text-xs text-on-surface-muted uppercase tracking-widest">Or Email</span>
              <div className="flex-1 h-px bg-outline/40" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted" />
                  <input type="email" placeholder="name@example.com" className="pl-9"
                    value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="text-xs text-on-surface-muted uppercase tracking-wider mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted" />
                  <input type={showPw ? 'text' : 'password'} placeholder="••••••••" className="pl-9 pr-10"
                    value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-muted hover:text-on-surface">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-on-surface-muted cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-primary"
                    checked={form.remember} onChange={e => setForm(p => ({ ...p, remember: e.target.checked }))} />
                  Remember Me
                </label>
                <button type="button" className="text-sm text-primary hover:underline">Forgot Password?</button>
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-3 text-base font-semibold">
                Sign In
              </button>
            </form>

            <p className="text-center text-sm text-on-surface-muted mt-4">
              Don't have an account?{' '}
              <button onClick={() => navigate('/register')} className="text-primary hover:underline font-medium">Get Started</button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
