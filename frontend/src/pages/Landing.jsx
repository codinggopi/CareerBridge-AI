"use client";
import React from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { 
  Zap, Play, FileText, CheckCircle, Map, 
  MessageSquare, User, TrendingUp, Compass, Target, BadgeCheck
} from 'lucide-react';
import Link from 'next/link';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Topbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mt-12 mb-32 gap-12">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">AI-Powered Career Intelligence</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="text-white">Forge Your<br/>Future </span>
              <span className="italic text-primary">with AI</span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
              AI-powered placement preparation, resume intelligence, career guidance, mock interviews, and personalized learning paths.
            </p>
            
            <div className="flex items-center space-x-4 pt-4">
              <Link href="/register" className="bg-primary text-background px-8 py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                Get Started
              </Link>
              <button className="bg-card border border-white/10 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/5 transition-colors">
                Upload Resume
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors">
                <Play className="w-5 h-5 fill-current" />
              </button>
              <span className="text-sm text-gray-400 font-medium">Watch Demo</span>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-card">
              <div className="h-[400px] bg-gradient-to-br from-card to-background p-6">
                {/* Simplified mockup representation */}
                <div className="w-full h-full border border-white/5 rounded-xl flex items-center justify-center text-gray-500">
                  Dashboard Interface Mockup
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 bg-card border border-white/10 rounded-xl p-4 shadow-xl max-w-[250px]">
              <div className="text-sm font-semibold text-white mb-1">AI Suggestion</div>
              <div className="text-xs text-gray-400">Update Python skills to improve match rate by 24%</div>
            </div>
          </div>
        </div>

        {/* Trusted By */}
        <div className="text-center mb-32">
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-500 mb-8">Trusted by leading institutions</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            <span className="text-xl font-bold font-sans text-gray-400">UNIVERSITY_ALPHA</span>
            <span className="text-xl font-bold font-sans text-gray-400">TECH_INSTITUTE</span>
            <span className="text-xl font-bold font-sans text-gray-400">GLOBAL_ACADEMY</span>
            <span className="text-xl font-bold font-sans text-gray-400">NEXUS_LEARNING</span>
            <span className="text-xl font-bold font-sans text-gray-400">CORE_VARSITY</span>
          </div>
        </div>

        {/* Intelligent Toolkit */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Intelligent Toolkit</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Propel your career with enterprise-grade AI tools designed to analyze, prepare, and place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {/* Card 1 */}
          <div className="bg-card border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-primary">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Resume Analyzer</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Deep-scan your resume against top industry benchmarks and ATS algorithms to optimize every word.
            </p>
            <div className="h-24 bg-background rounded-lg border border-white/5 flex items-center justify-center text-xs text-gray-600">UI Preview</div>
          </div>

          {/* Card 2 */}
          <div className="bg-card border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-blue-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Skill Gap Analysis</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Instantly identify what skills are missing for your dream job and get a curated plan to bridge that gap.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-card border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-orange-400">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Learning Roadmap</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Personalized learning paths tailored to your pace and goals, integrating the best courses and projects.
            </p>
            <div className="w-full bg-background h-2 rounded-full mt-4">
              <div className="bg-orange-400 h-2 rounded-full w-[66%]"></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Python Masterclass</span>
              <span>66%</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-card border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-green-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Career Recommendations</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Jobs matching your profile
            </p>
          </div>

          {/* Card 5 (Featured) */}
          <div className="bg-card border-2 border-blue-500/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:border-blue-500/60 transition-colors cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Placement Readiness</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Certification of interview mastery
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-card border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-purple-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Mock Interview</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Simulate real-world interviews with an AI that provides real-time feedback on tone, clarity, and content.
            </p>
            <div className="bg-background rounded-lg border border-white/5 p-4">
              <div className="text-xs text-primary italic mb-2">"How would you handle a conflict in a remote team?"</div>
              <div className="text-xs text-gray-500">Wait... analyzing response...</div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-white/5 py-12">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50k+</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">Students Helped</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">1.2M</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">Resumes Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">200k+</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">Mock Interviews</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">94%</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">Success Rate</div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Success Stories</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {/* Testimonial 1 */}
          <div className="bg-card border border-white/10 rounded-2xl p-8 relative">
            <div className="absolute top-6 right-8 text-6xl text-white/5 font-serif">"</div>
            <p className="text-gray-300 italic mb-8 relative z-10 text-sm leading-relaxed">
              "The AI Mock Interview tool was a game-changer. It spotted filler words I didn't even know I was using. Landed my role at a Fortune 500 company within 2 weeks!"
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0"></div>
              <div>
                <div className="text-sm font-bold text-white">Sarah Jenkins</div>
                <div className="text-xs text-gray-500">Software Engineer @ CloudScale</div>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-card border border-white/10 rounded-2xl p-8 relative">
            <div className="absolute top-6 right-8 text-6xl text-white/5 font-serif">"</div>
            <p className="text-gray-300 italic mb-8 relative z-10 text-sm leading-relaxed">
              "I was struggling to switch careers into Data Science. The Skill Gap Analysis showed exactly what I needed to learn. The roadmap made it manageable."
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0"></div>
              <div>
                <div className="text-sm font-bold text-white">Michael Chen</div>
                <div className="text-xs text-gray-500">Data Analyst @ InnovateX</div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-card border border-white/10 rounded-2xl p-8 relative">
            <div className="absolute top-6 right-8 text-6xl text-white/5 font-serif">"</div>
            <p className="text-gray-300 italic mb-8 relative z-10 text-sm leading-relaxed">
              "The resume analyzer helped me rewrite my experience in a way that actually caught the attention of recruiters. Highly recommend for any student."
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0"></div>
              <div>
                <div className="text-sm font-bold text-white">Priya Sharma</div>
                <div className="text-xs text-gray-500">Product Manager @ FinTechHub</div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-card border border-white/10 rounded-3xl p-16 text-center max-w-4xl mx-auto mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <h2 className="text-4xl font-bold text-white mb-4 relative z-10">Ready to Forge Your Career?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto relative z-10">
            Join thousands of students and professionals who are using CareerForge AI to gain a competitive edge.
          </p>
          <button className="bg-primary text-background px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors relative z-10">
            Get Started Now
          </button>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Landing;
