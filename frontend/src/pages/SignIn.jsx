"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Footer from '../components/Footer';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex w-full">
        {/* Left Side - Visual */}
        <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden">
          {/* Mock Graphic Container */}
          <div className="w-[120%] h-auto aspect-video max-w-3xl rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 relative flex items-center justify-center mb-12 shadow-[0_0_100px_rgba(95,227,160,0.1)]">
            {/* Inner placeholder for the robot/dashboard graphic */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-primary/50 text-xl font-bold font-sans tracking-[0.2em] uppercase">Visual Graphic Placeholder</div>
            </div>
          </div>

          <div className="text-center z-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">CareerBridge AI</h1>
            <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
              Precision engineering for your professional journey. Elevate your potential with data-driven career intelligence.
            </p>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/90 z-0"></div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 relative">
          <div className="absolute inset-0 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>

          <div className="bg-card border border-white/5 rounded-[20px] p-8 md:p-12 w-full max-w-md relative z-10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400 text-sm mb-8">Access your AI-powered career dashboard.</p>

            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3.5 flex items-center justify-center space-x-3 transition-colors mb-6">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              <span className="text-gray-200 font-medium text-sm">Sign In with Google</span>
            </button>

            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-white/10"></div>
              <span className="px-4 text-xs text-gray-500 font-semibold tracking-wider uppercase">OR EMAIL</span>
              <div className="flex-1 border-t border-white/10"></div>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-background border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-background border border-white/10 rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-white/20 bg-background group-hover:border-primary/50 flex items-center justify-center transition-colors">
                    {/* Checked state can be handled with state */}
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember Me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">Forgot Password?</Link>
              </div>

              <Link href="/dashboard" className="block w-full">
                <button
                  type="button"
                  className="w-full bg-primary text-background font-bold rounded-xl py-4 hover:bg-primary/90 transition-colors mt-6 shadow-[0_4px_14px_0_rgba(95,227,160,0.39)]"
                >
                  Sign In
                </button>
              </Link>
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
              Don't have an account? <Link href="/register" className="text-white font-semibold hover:text-primary transition-colors">Get Started</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignIn;
