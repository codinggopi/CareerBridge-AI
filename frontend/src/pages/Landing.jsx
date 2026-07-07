import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, ArrowRight, Upload, Play, Star, ChevronRight } from 'lucide-react'
import Footer from '../components/Footer'

const tools = [
  { icon: '📄', title: 'AI Resume Analyzer', desc: 'Deep-scan your resume against industry benchmarks and ATS algorithms to optimize every word.' },
  { icon: '📊', title: 'Skill Gap Analysis', desc: 'Instantly identify skills you\'re missing for your dream job and get a ranked plan to bridge the gap.' },
  { icon: '🗺️', title: 'Learning Roadmap', desc: 'Personalized learning paths tailored to your pace and goals, integrating the best courses and projects.' },
  { icon: '🎤', title: 'AI Mock Interview', desc: 'Simulate real-world interviews with an AI that provides real-time feedback on tone, clarity, and content.' },
  { icon: '💼', title: 'Career Recommendations', desc: 'AI-matched job roles that align with your skills, aspirations, and market demand.' },
  { icon: '🚀', title: 'Placement Readiness', desc: 'Certification of interview readiness.', featured: true },
]

const stats = [
  { value: '50k+', label: 'Students Helped' },
  { value: '1.2M', label: 'Resumes Analyzed' },
  { value: '200k+', label: 'Mock Interviews' },
  { value: '94%', label: 'Success Rate' },
]

const testimonials = [
  { quote: "The AI Mock Interview tool was a game-changer. It spotted filler words I didn't even know I was using, landed my role at a Fortune 500 company within 2 weeks!", name: 'Susan Jenkins', role: 'Software Engineer at Cloudbase' },
  { quote: "I was struggling to switch careers into Data Science. The Skill Gap Analysis showed me exactly what I needed to learn. The roadmap made it manageable.", name: 'Nicholas Chen', role: 'Data Analyst at Veritas' },
  { quote: 'The resume analyzer helped me identify my experience in a way that actively caught the attention of recruiters. Highly recommend for any student.', name: 'Priya Sharma', role: 'Product Manager at Milestone' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur border-b border-outline/20 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-primary" />
          <span className="font-bold text-primary text-lg">CareerForge AI</span>
        </div>
        <nav className="hidden md:flex gap-1">
          {['Dashboard', 'Resume', 'Interviews', 'Resources'].map(l => (
            <button key={l} onClick={() => navigate('/dashboard')} className="px-4 py-2 text-sm text-on-surface-muted hover:text-on-surface rounded-md transition-colors">{l}</button>
          ))}
        </nav>
        <div className="flex gap-3">
          <button onClick={() => navigate('/sign-in')} className="btn-ghost text-sm">Sign In</button>
          <button onClick={() => navigate('/register')} className="btn-primary text-sm">Get Started</button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 pt-20 pb-16 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <div className="badge-green mb-4 inline-block">AI-Powered Career Platform</div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Forge Your Future<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">with AI</span>
          </h1>
          <p className="text-on-surface-muted text-lg mb-8 max-w-lg">
            AI-powered placement preparation, resume intelligence, career guidance, mock interviews, and personalized learning paths.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate('/register')} className="btn-primary">Get Started <ArrowRight size={16} /></button>
            <button onClick={() => navigate('/resume/analyze')} className="btn-ghost"><Upload size={16} /> Upload Resume</button>
            <button className="btn-ghost"><Play size={14} /> Watch Demo</button>
          </div>
        </div>
        {/* Hero visual */}
        <div className="flex-1 relative">
          <div className="card border-primary/20 glow-green p-0 overflow-hidden">
            <div className="bg-surface-high px-5 py-3 border-b border-outline/20 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-amber/60" />
              <div className="w-3 h-3 rounded-full bg-primary/60" />
              <span className="text-xs text-on-surface-muted ml-2">Career Dashboard</span>
            </div>
            <div className="p-5 space-y-3">
              {[{ label: 'Resume Score', val: 84, color: 'primary' }, { label: 'Skill Match', val: 91, color: 'tertiary' }, { label: 'Readiness', val: 78, color: 'primary' }].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-muted">{item.label}</span>
                    <span className="text-primary font-semibold">{item.val}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${item.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
            {/* Floating tooltip */}
            <div className="absolute -bottom-3 -right-3 bg-surface-high border border-primary/30 rounded-xl px-4 py-2 text-xs shadow-lg">
              <span className="text-primary font-semibold">✨ AI Suggestion</span>
              <p className="text-on-surface-muted mt-0.5">Add quantified achievements to boost score by +12pts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-outline/20 py-6 px-8">
        <p className="text-center text-xs text-on-surface-muted uppercase tracking-widest mb-4">Trusted by leading institutions</p>
        <div className="flex justify-center gap-10 flex-wrap">
          {['UNIVERSITY_ALPHA', 'TECH_INSTITUTE', 'GLOBAL_ACADEMY', 'NEXUS_LEARNING', 'CORE_VARSITY'].map(name => (
            <span key={name} className="text-on-surface-muted/40 text-sm font-mono tracking-wider">{name}</span>
          ))}
        </div>
      </section>

      {/* Intelligent Toolkit */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Intelligent Toolkit</h2>
          <p className="text-on-surface-muted">Propel your career with enterprise-grade AI tools designed to analyze, prepare, and place.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(tool => (
            <div key={tool.title} className={`card hover:border-primary/30 transition-all cursor-pointer ${tool.featured ? 'border-primary/40 glow-green' : ''}`}>
              <span className="text-2xl mb-3 block">{tool.icon}</span>
              <h3 className="font-semibold mb-2">{tool.title}</h3>
              <p className="text-sm text-on-surface-muted">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface-container border-y border-outline/20 py-14 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-extrabold text-primary">{s.value}</p>
              <p className="text-sm text-on-surface-muted mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="card">
              <div className="flex gap-1 mb-3">{[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-primary text-primary" />)}</div>
              <p className="text-sm text-on-surface-muted italic mb-4">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-on-surface-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary/10 to-tertiary/10 border-y border-outline/20 py-16 text-center px-8">
        <h2 className="text-3xl font-bold mb-4">Ready to Forge Your Career?</h2>
        <p className="text-on-surface-muted mb-6">Join thousands of students and professionals who are using CareerForge AI to gain a competitive edge.</p>
        <button onClick={() => navigate('/register')} className="btn-primary text-base px-8 py-3">
          Get Started Now <ChevronRight size={16} />
        </button>
      </section>

      <Footer />
    </div>
  )
}
