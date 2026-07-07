import React, { useState, useRef, useEffect } from 'react'
import { Send, Mic, Paperclip, TrendingUp, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'
import { coachMessages } from '../data/mockData'

export default function AICoach() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState(coachMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef()

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = () => {
    if (!input.trim()) return
    const userMsg = { id: Date.now(), from: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, {
        id: Date.now() + 1, from: 'ai',
        text: "Great question! Based on your profile, I recommend focusing on building practical projects that demonstrate your skills. Start with a small end-to-end project that showcases your current expertise, then gradually incorporate the new skills you're learning.",
      }])
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        {/* Left sidebar */}
        <aside className="w-[220px] border-r border-outline/20 flex flex-col p-4 hidden md:flex">
          <div className="flex items-center gap-3 mb-6 p-3 bg-surface-high rounded-xl">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xs font-bold">AR</div>
            <div>
              <p className="font-semibold text-sm">Alex Rivera</p>
              <p className="text-xs text-primary">Premium Tier</p>
            </div>
          </div>
          <nav className="space-y-1 flex-1">
            {[
              { label: 'Dashboard', path: '/dashboard' },
              { label: 'AI Coach', path: '/coach', active: true },
              { label: 'Resume AI', path: '/resume/analyze' },
              { label: 'Skill Gap', path: '/skill-gap' },
              { label: 'Readiness', path: '/readiness' },
            ].map(item => (
              <button key={item.label} onClick={() => navigate(item.path)}
                className={`sidebar-link w-full text-left ${item.active ? 'active' : ''}`}>
                {item.label}
              </button>
            ))}
          </nav>
          <button onClick={() => navigate('/resume/analyze')} className="btn-primary w-full justify-center text-xs mt-4">
            ✨ Analyze Resume
          </button>
        </aside>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="border-b border-outline/20 px-6 py-4">
            <h1 className="text-xl font-bold">AI Career Coach</h1>
            <p className="text-on-surface-muted text-sm">Your personal AI mentor for career guidance.</p>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.map(msg => (
              <div key={msg.id}>
                {msg.from === 'ai' ? (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={14} className="text-primary" />
                    </div>
                    <div className="max-w-2xl">
                      <div className="chat-bubble-ai">
                        {msg.text && <p className="text-sm">{msg.text}</p>}
                        {msg.list && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-on-surface mb-2">Excellent choice. Transitioning from Frontend to ML is a high-growth path. Based on your JavaScript mastery, here are your priority pivots:</p>
                            {msg.list.map((item, i) => (
                              <div key={i} className="text-sm">
                                <span className="font-semibold text-primary">{i + 1}. {item.label}:</span>
                                <span className="text-on-surface-muted"> {item.desc}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {msg.suggestions && (
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            {msg.suggestions.map(s => (
                              <button key={s} onClick={() => setInput(s.split('"')[1] || s)}
                                className="bg-surface border border-outline/40 rounded-xl p-3 text-left hover:border-primary/40 transition-colors">
                                <p className="text-xs font-semibold text-primary">{s.split(':')[0]}</p>
                                <p className="text-xs text-on-surface-muted">{s.split(':')[1]}</p>
                              </button>
                            ))}
                          </div>
                        )}
                        {msg.actions && (
                          <div className="flex gap-2 mt-3">
                            {msg.actions.map(a => (
                              <button key={a} className="badge-green text-xs px-2 py-1 cursor-pointer hover:bg-primary/30">{a}</button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="chat-bubble-user max-w-xl">
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={14} className="text-primary" />
                </div>
                <div className="chat-bubble-ai">
                  <span className="text-lg tracking-widest text-on-surface-muted">•••</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-outline/20 p-4">
            <div className="flex items-center gap-3 bg-surface-high rounded-xl border border-outline/30 px-4 py-2 focus-within:border-primary/40">
              <button className="text-on-surface-muted hover:text-on-surface"><Paperclip size={16} /></button>
              <input
                className="flex-1 bg-transparent border-none text-sm outline-none"
                placeholder="Ask your career coach anything..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
              />
              <button className="text-on-surface-muted hover:text-on-surface"><Mic size={16} /></button>
              <button onClick={send} disabled={!input.trim()}
                className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center hover:bg-primary-dim transition-colors disabled:opacity-40">
                <Send size={14} className="text-surface" />
              </button>
            </div>
            <p className="text-center text-xs text-on-surface-muted/40 mt-2">© 2024 CAREERFORGE AI. SYSTEM STATUS: OPERATIONAL</p>
          </div>
        </div>

        {/* Right panel */}
        <aside className="w-[260px] border-l border-outline/20 p-4 hidden lg:block overflow-y-auto">
          <p className="text-xs font-semibold text-on-surface-muted uppercase tracking-widest mb-4">Career Intelligence</p>

          <div className="card mb-4 p-3">
            <p className="text-xs font-semibold mb-2">Industry Insights</p>
            <div className="space-y-2">
              <div className="bg-surface rounded-lg p-2">
                <p className="text-xs text-on-surface-muted uppercase tracking-wider font-medium">TECH SECTOR</p>
                <p className="text-xs text-on-surface mt-0.5">Cloud Architect roles increased 24% this quarter.</p>
              </div>
              <div className="bg-surface rounded-lg p-2">
                <p className="text-xs text-on-surface-muted uppercase tracking-wider font-medium">REMOTE WORK</p>
                <p className="text-xs text-on-surface mt-0.5">Hybrid flexibility remains the #1 requested benefit.</p>
              </div>
            </div>
          </div>

          <div className="card mb-4 p-3">
            <p className="text-xs font-semibold mb-2">Trending Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {['Generative AI', 'Kubernetes', 'TypeScript', 'Data Ops', 'Rust'].map(s => (
                <span key={s} className="text-xs px-2 py-0.5 bg-surface border border-outline/40 rounded-full text-on-surface-muted">{s}</span>
              ))}
            </div>
          </div>

          <div className="card mb-4 p-3">
            <p className="text-xs font-semibold mb-2">Recommended for You</p>
            <div className="h-20 bg-surface rounded-lg mb-2 flex items-center justify-center">
              <TrendingUp size={24} className="text-primary/40" />
            </div>
            <p className="text-xs font-semibold">AWS Certified Machine Learning</p>
            <p className="text-xs text-on-surface-muted">Top choice for cloud pivot.</p>
          </div>

          <div className="card p-3">
            <p className="text-xs font-semibold mb-2">Market Readiness</p>
            <p className="text-2xl font-bold text-primary">82% <span className="text-xs font-normal text-primary">+5% from last month</span></p>
            <div className="progress-bar-track mt-2">
              <div className="progress-bar-fill" style={{ width: '82%' }} />
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  )
}
