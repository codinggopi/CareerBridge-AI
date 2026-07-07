"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { User, Mail, GraduationCap, Calendar, Lock } from 'lucide-react';

const Register = () => {
  return (
    <div className="min-h-screen bg-[#0B0F17] flex flex-col relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Simplified Topbar for Register */}
      <header className="flex items-center justify-between px-12 py-6 relative z-10">
        <Link href="/" className="text-xl font-bold font-serif tracking-wide text-primary">
          CareerBridgeAI
        </Link>
        <div className="text-sm text-gray-400">
          Already have an account? <Link href="/sign-in" className="text-primary font-semibold hover:text-primary/80 transition-colors ml-1">Sign In</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-2xl bg-[#111827] border border-white/5 rounded-2xl p-10 md:p-14 shadow-2xl">
          <h1 className="text-3xl font-serif font-bold text-white mb-3">Create Account</h1>
          <p className="text-sm text-gray-400 mb-10">Unlock personalized career intelligence and AI-driven growth.</p>
          
          <form className="space-y-6">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Alex Rivera"
                  className="w-full bg-[#0B0F17] border border-transparent rounded-lg py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-300 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">University Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="alex.rivera@university.edu"
                  className="w-full bg-[#0B0F17] border border-transparent rounded-lg py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-300 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Academic Branch</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <select className="w-full bg-[#0B0F17] border border-transparent rounded-lg py-3.5 pl-12 pr-4 text-sm text-gray-300 appearance-none focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all cursor-pointer">
                    <option>Select Branch</option>
                    <option>Computer Science</option>
                    <option>Information Technology</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Current Year</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <select className="w-full bg-[#0B0F17] border border-transparent rounded-lg py-3.5 pl-12 pr-4 text-sm text-gray-300 appearance-none focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all cursor-pointer">
                    <option>Select Year</option>
                    <option>First Year</option>
                    <option>Second Year</option>
                    <option>Third Year</option>
                    <option>Final Year</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-[#0B0F17] border border-transparent rounded-lg py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-300 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-[#0B0F17] border border-transparent rounded-lg py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-300 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start pt-2 mb-8">
              <div className="flex items-center h-5 mt-0.5">
                <input type="checkbox" className="w-4 h-4 bg-[#0B0F17] border-white/20 rounded text-primary focus:ring-0 cursor-pointer" />
              </div>
              <div className="ml-3 text-xs text-gray-400 leading-relaxed">
                I agree to the <Link href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link> and <Link href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>, including AI processing of my professional data.
              </div>
            </div>

            <Link href="/dashboard" className="block w-full">
              <button 
                type="button"
                className="w-full bg-primary text-[#0B0F17] font-bold text-[15px] rounded-lg py-4 hover:bg-primary/90 transition-all shadow-[0_4px_20px_-5px_rgba(95,227,160,0.4)] hover:shadow-[0_4px_25px_-5px_rgba(95,227,160,0.5)] flex items-center justify-center space-x-2"
              >
                <span>Register Account</span>
                <span className="text-xl leading-none">→</span>
              </button>
            </Link>
            
            <div className="flex items-center mt-10 mb-6">
              <div className="flex-1 border-t border-white/5"></div>
              <span className="px-4 text-[10px] text-gray-600 font-semibold tracking-widest uppercase">OR JOIN WITH</span>
              <div className="flex-1 border-t border-white/5"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 bg-[#1A2234] hover:bg-[#20293D] border border-transparent rounded-lg py-3 transition-colors">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
                <span className="text-xs font-semibold text-gray-300">Google</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-[#1A2234] hover:bg-[#20293D] border border-transparent rounded-lg py-3 transition-colors">
                <svg className="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span className="text-xs font-semibold text-gray-300">LinkedIn</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="py-6 relative z-10 flex items-center justify-center space-x-8 text-[11px] font-semibold text-gray-600">
        <Link href="#" className="hover:text-gray-400 transition-colors">AI Ethics</Link>
        <Link href="#" className="hover:text-gray-400 transition-colors">Support</Link>
        <Link href="#" className="hover:text-gray-400 transition-colors">Platform Status</Link>
      </footer>
    </div>
  );
};

export default Register;
