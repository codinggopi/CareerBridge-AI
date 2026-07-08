"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ShieldCheck, CheckCircle, ArrowRight, RefreshCw, KeyRound } from 'lucide-react';
import Footer from '../components/Footer';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const handleCaptcha = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setCaptchaVerified(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex w-full">
        {/* Left Side - Visual */}
        <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden">
          <div className="w-[120%] h-auto aspect-video max-w-3xl rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 relative flex items-center justify-center mb-12 shadow-[0_0_100px_rgba(95,227,160,0.1)]">
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck className="w-32 h-32 text-primary/30" />
            </div>
          </div>
          
          <div className="text-center z-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Secure Account Recovery</h1>
            <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
              We employ multi-layer security protocols to ensure your CareerBridge AI account remains safe during the recovery process.
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/90 z-0"></div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 relative">
          <div className="absolute inset-0 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          
          <div className="bg-card border border-white/5 rounded-[20px] p-8 md:p-12 w-full max-w-md relative z-10 shadow-2xl">
            
            {/* Step Indicators */}
            <div className="flex justify-between items-center mb-10 relative">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-[2px] bg-white/5 z-0"></div>
              <div 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[2px] bg-primary z-0 transition-all duration-500"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
              
              {[1, 2, 3, 4].map((s) => (
                <div 
                  key={s} 
                  className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold transition-colors ${
                    step >= s ? 'bg-primary border-primary text-background' : 'bg-card border-white/10 text-gray-500'
                  }`}
                >
                  {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                </div>
              ))}
            </div>

            {/* Step 1: Email Identification */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl font-bold text-white mb-2">Identify Account</h2>
                <p className="text-gray-400 text-sm mb-8">Enter the email associated with your account.</p>
                
                <form onSubmit={handleNextStep}>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="w-5 h-5 text-gray-500" />
                        </div>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-background border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={!email}
                    className="w-full bg-primary text-background font-bold rounded-xl py-4 hover:bg-primary/90 transition-colors mt-8 shadow-[0_4px_14px_0_rgba(95,227,160,0.39)] disabled:opacity-50 disabled:shadow-none flex items-center justify-center space-x-2"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Captcha Verification */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl font-bold text-white mb-2">Security Check</h2>
                <p className="text-gray-400 text-sm mb-8">Please verify that you are human.</p>
                
                <div className="bg-background border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center space-y-6 mb-8">
                  <div className="w-full flex items-center justify-between bg-card border border-white/5 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <button 
                        type="button"
                        onClick={handleCaptcha}
                        disabled={captchaVerified || isVerifying}
                        className={`w-8 h-8 rounded border-2 flex items-center justify-center transition-all ${
                          captchaVerified ? 'bg-primary border-primary text-background' : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        {isVerifying ? <RefreshCw className="w-4 h-4 animate-spin text-gray-400" /> : captchaVerified && <CheckCircle className="w-5 h-5" />}
                      </button>
                      <span className="text-sm font-medium text-gray-300">I am not a robot</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <ShieldCheck className="w-8 h-8 text-primary/80 mb-1" />
                      <span className="text-[10px] text-gray-500">SecureCAPTCHA</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleNextStep}
                  disabled={!captchaVerified}
                  className="w-full bg-primary text-background font-bold rounded-xl py-4 hover:bg-primary/90 transition-colors shadow-[0_4px_14px_0_rgba(95,227,160,0.39)] disabled:opacity-50 disabled:shadow-none flex items-center justify-center space-x-2"
                >
                  <span>Verify & Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Step 3: Security Question */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl font-bold text-white mb-2">Security Question</h2>
                <p className="text-gray-400 text-sm mb-8">Answer the security question you set during registration.</p>
                
                <form onSubmit={handleNextStep}>
                  <div className="space-y-6">
                    <div className="bg-background/50 border border-white/5 rounded-xl p-4">
                      <p className="text-sm font-medium text-primary">What was the name of your first pet?</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your Answer</label>
                      <input 
                        type="text" 
                        required
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                        className="w-full bg-background border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                        placeholder="Enter your answer"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={securityAnswer.length < 2}
                    className="w-full bg-primary text-background font-bold rounded-xl py-4 hover:bg-primary/90 transition-colors mt-8 shadow-[0_4px_14px_0_rgba(95,227,160,0.39)] disabled:opacity-50 disabled:shadow-none flex items-center justify-center space-x-2"
                  >
                    <span>Submit Answer</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            )}

            {/* Step 4: Reset Password */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl font-bold text-white mb-2">Create New Password</h2>
                <p className="text-gray-400 text-sm mb-8">Your new password must be different from previous passwords.</p>
                
                <form onSubmit={(e) => { e.preventDefault(); alert("Password reset successful!"); window.location.href="/sign-in"; }}>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">New Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="w-5 h-5 text-gray-500" />
                        </div>
                        <input 
                          type="password" 
                          required
                          value={passwords.new}
                          onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                          className="w-full bg-background border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Confirm New Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <KeyRound className="w-5 h-5 text-gray-500" />
                        </div>
                        <input 
                          type="password" 
                          required
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                          className="w-full bg-background border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                      {passwords.confirm && passwords.new !== passwords.confirm && (
                        <p className="text-xs text-red-400 mt-2">Passwords do not match.</p>
                      )}
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={!passwords.new || passwords.new !== passwords.confirm}
                    className="w-full bg-primary text-background font-bold rounded-xl py-4 hover:bg-primary/90 transition-colors mt-8 shadow-[0_4px_14px_0_rgba(95,227,160,0.39)] disabled:opacity-50 disabled:shadow-none flex items-center justify-center space-x-2"
                  >
                    <span>Reset Password</span>
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </form>
              </div>
            )}

            <div className="mt-8 text-center text-sm text-gray-400">
              <Link href="/sign-in" className="text-white font-semibold hover:text-primary transition-colors">Return to Sign In</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
