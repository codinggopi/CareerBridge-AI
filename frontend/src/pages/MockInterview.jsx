import React, { useState, useRef, useEffect } from 'react'
import { Send, Mic, Paperclip, Code, Users, Target, Brain } from 'lucide-react'
import AppShell from '../components/AppShell'
import { interviewMessages } from '../data/mockData'

const sessionTypes = [
  { id: 'technical', icon: Code, label: 'Technical' },
  { id: 'hr', icon: Users, label: 'HR / Culture' },
  { id: 'behavioral', icon: Target, label: 'Behavioral' },
  { id: 'aptitude', icon: Brain, label: 'Aptitude' },
]

export default function MockInterview() {
  const [selected, setSelected] = useState('technical')
  const [messages, setMessages] = useState(interviewMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [sessionActive, setSessionActive] = useState(true)
  const bottomRef = useRef()

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), from: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: input }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, {
        id: Date.now() + 1, from: 'ai', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Excellent response! Your structured approach to problem-solving is commendable. Let\'s move to the next question: Can you explain the difference between REST and GraphQL APIs?',
      }])
    }, 2000)
  }

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mock Interview</h1>
          <p className="text-on-surface-muted text-sm">Master your next career milestone with AI</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-high rounded-xl px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary">IN-SESSION READY</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xs font-bold">AR</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-3">Select Session</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {sessionTypes.map(s => (
                <button key={s.id} onClick={() => setSelected(s.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${selected === s.id ? 'border-primary bg-primary/10' : 'border-outline/30 hover:border-primary/30 bg-surface-high'}`}>
                  <s.icon size={18} className={`mb-1 ${selected === s.id ? 'text-primary' : 'text-on-surface-muted'}`} />
                  <p className="text-xs font-medium">{s.label}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setSessionActive(true)}
              className="btn-primary w-full justify-center gap-2">
              ▶ Start Interview Session
            </button>
          </div>

          {/* Metrics */}
          <div className="card space-y-4">
            {[
              { label: 'COMMUNICATION', value: 84, icon: Users },
              { label: 'CONFIDENCE', value: 92, icon: Target },
              { label: 'ACCURACY', value: 76, icon: Brain },
            ].map(m => (
              <div key={m.label}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-on-surface-muted font-semibold">
                    <m.icon size={13} /> {m.label}
                  </span>
                  <span className="font-bold text-primary">{m.value}%</span>
                </div>
                <div className="progress-bar-track" style={{ height: 6 }}>
                  <div className="progress-bar-fill" style={{ width: `${m.value}%`, height: '100%' }} />
                </div>
              </div>
            ))}
          </div>

          {/* AI Insights */}
          <div className="card border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-primary text-sm">✨</span>
              <h3 className="font-semibold">AI Insights</h3>
            </div>
            <div className="border-l-2 border-primary pl-3 mb-3">
              <p className="text-xs text-primary font-semibold mb-0.5">Strength Detected</p>
              <p className="text-xs text-on-surface-muted">Your articulation of technical debt management was exceptionally clear and structured.</p>
            </div>
            <div className="border-l-2 border-amber pl-3">
              <p className="text-xs text-amber font-semibold mb-0.5">Improvement Area</p>
              <p className="text-xs text-on-surface-muted">Try to use fewer filler words like "um" and "actually" during complex explanations.</p>
            </div>
          </div>
        </div>

        {/* Chat panel */}
        <div className="lg:col-span-3 card flex flex-col" style={{ minHeight: '580px' }}>
          {/* Session bar */}
          <div className="flex items-center justify-between border-b border-outline/20 pb-3 mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase">Session Active</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-on-surface-muted">
              <span>⏱ 12:45 / 30:00</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map(n => (
                  <span key={n} className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                    ${n <= 2 ? 'bg-primary text-surface' : 'bg-surface-high text-on-surface-muted border border-outline/40'}`}>{n}</span>
                ))}
              </div>
              <span className="font-medium">Question 2 of 10</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'items-start gap-3'}`}>
                {msg.from === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Brain size={14} className="text-primary" />
                  </div>
                )}
                <div className={msg.from === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'} style={{ maxWidth: '75%' }}>
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-on-surface-muted/60 mt-1 text-right">
                    {msg.from === 'ai' ? 'CAREERFORGE AI' : 'YOU'} • {msg.time}
                  </p>
                </div>
                {msg.from === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">AR</div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Brain size={14} className="text-primary" />
                </div>
                <div className="chat-bubble-ai">
                  <span className="text-lg tracking-widest text-on-surface-muted">•••</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-3 bg-surface rounded-xl border border-outline/30 px-4 py-2 focus-within:border-primary/40">
            <button className="text-on-surface-muted hover:text-on-surface"><Paperclip size={16} /></button>
            <input
              className="flex-1 bg-transparent border-none text-sm outline-none"
              placeholder="Type your answer here..."
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
        </div>
      </div>
    </AppShell>
  )
}
