"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { User, Mail, GraduationCap, Calendar, Lock, Eye, EyeOff } from 'lucide-react';
import PasswordSecurity from '../components/PasswordSecurity';
import { validatePassword } from '../utils/passwordValidation';
import Footer from '../components/Footer';
import { registerStudent } from '../services/apiService';
import logo from '../assets/images/CareerBridge-AI.png';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState('What was your first school name?');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Try to use Next.js router, but fallback gracefully if not in Next environment
  let router;
  try {
    router = useRouter();
  } catch (e) {
    router = null;
  }
  return (
    <div className="min-h-screen bg-[#0B0F17] flex flex-col relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Simplified Topbar for Register */}
      <header className="flex items-center justify-between px-12 py-6 relative z-10">
        <Link href="/" className="flex items-center space-x-2">
          <img src={logo.src} alt="CareerBridge AI Logo" className="h-8 w-auto object-contain" />
          <div className="text-xl font-bold font-serif tracking-wide text-primary">CareerBridge AI</div>
        </Link>
        <div className="text-sm text-gray-400">
          Already have an account? <Link href="/sign-in" className="text-primary font-semibold hover:text-primary/80 transition-colors ml-1">Sign In</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-2xl bg-[#111827] border border-white/5 rounded-2xl p-10 md:p-14 shadow-2xl">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">Create an Account</h1>
          <p className="text-sm text-gray-400 mb-10">Unlock personalized career intelligence and AI-driven growth.</p>

          <form className="space-y-6" onSubmit={async (e) => {
            e.preventDefault();
            setError('');
            if (password !== confirmPassword) {
              return setError("Passwords do not match");
            }
            setIsLoading(true);
            try {
              const finalQuestion = securityQuestion === 'custom' ? customQuestion : securityQuestion;
              const response = await registerStudent({ name, email, password, branch, year, security_question: finalQuestion, security_answer: securityAnswer });
              if (response.access_token) {
                localStorage.setItem('careerbridge_token', response.access_token);
                if (response.user) localStorage.setItem('careerbridge_user', JSON.stringify(response.user));
                window.location.href = "/dashboard";
              } else {
                setError('Registration failed, no token received.');
              }
            } catch (err) {
              setError(err.message || 'Error creating account');
            } finally {
              setIsLoading(false);
            }
          }}>
            {error && <div className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg">{error}</div>}
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                  className="w-full bg-[#0B0F17] border border-transparent rounded-lg py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-300 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">College Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your university email"
                  className="w-full bg-[#0B0F17] border border-transparent rounded-lg py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-300 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Academic Branch</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-transparent rounded-lg py-3.5 pl-12 pr-4 text-sm text-gray-300 appearance-none focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all cursor-pointer"
                  >
                    <option value="">Select Branch</option>
                    <option value="Computer Science Engineering">Computer Science Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                    <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Electronics & Communication">Electronics & Communication</option>
                    <option value="Electrical & Electronics">Electrical & Electronics</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Biomedical Engineering">Biomedical Engineering</option>
                    <option value="Chemical Engineering">Chemical Engineering</option>
                    <option value="Agricultural Engineering">Agricultural Engineering</option>
                    <option value="Mechatronics">Mechatronics</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Aeronautical">Aeronautical</option>
                    <option value="Automobile">Automobile</option>
                    <option value="Marine">Marine</option>
                    <option value="Textile">Textile</option>
                    <option value="Food Technology">Food Technology</option>
                    <option value="MBA">MBA</option>
                    <option value="MCA">MCA</option>
                    <option value="BCA">BCA</option>
                    <option value="BSc Computer Science">BSc Computer Science</option>
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
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-transparent rounded-lg py-3.5 pl-12 pr-4 text-sm text-gray-300 appearance-none focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all cursor-pointer"
                  >
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

            <div className="col-span-1 md:col-span-2">
              <PasswordSecurity
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                name={name}
                email={email}
                label="Password"
                confirmLabel="Confirm Password"
                showConfirm={true}
              />
            </div>

            {/* Security Verification */}
            <div className="col-span-1 md:col-span-2 space-y-6 pt-4 border-t border-white/5">
              <h2 className="text-[13px] font-bold text-white uppercase tracking-wider">Security Verification</h2>
              
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Security Question</label>
                <div className="relative">
                  <select
                    value={securityQuestion}
                    onChange={(e) => setSecurityQuestion(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-transparent rounded-lg py-3.5 px-4 text-sm text-gray-300 appearance-none focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all cursor-pointer"
                  >
                    <option value="What was your first school name?">What was your first school name?</option>
                    <option value="What was your childhood nickname?">What was your childhood nickname?</option>
                    <option value="What city were you born in?">What city were you born in?</option>
                    <option value="What was your first pet's name?">What was your first pet's name?</option>
                    <option value="What was the name of your first best friend?">What was the name of your first best friend?</option>
                    <option value="custom">Create your own custom question</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>

              {securityQuestion === 'custom' && (
                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Custom Question</label>
                  <input
                    type="text"
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    required
                    placeholder="Enter your custom question"
                    className="w-full bg-[#0B0F17] border border-transparent rounded-lg py-3.5 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Security Answer</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    required
                    placeholder="Enter your security answer"
                    className="w-full bg-[#0B0F17] border border-transparent rounded-lg py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start pt-2 mb-8">
              <div className="flex items-center h-5 mt-0.5">
                <input type="checkbox" required className="w-4 h-4 bg-[#0B0F17] border-white/20 rounded text-primary focus:ring-0 cursor-pointer" />
              </div>
              <div className="ml-3 text-xs text-gray-400 leading-relaxed">
                I agree to the <Link href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link> and <Link href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>, including AI processing of my professional data.
              </div>
            </div>

            <div className="block w-full mt-8">
              <button
                type="submit"
                disabled={isLoading || !password || !validatePassword(password, name, email).isValid || password !== confirmPassword || !securityAnswer || (securityQuestion === 'custom' && !customQuestion)}
                className={`w-full ${isLoading || !password || !validatePassword(password, name, email).isValid || password !== confirmPassword || !securityAnswer || (securityQuestion === 'custom' && !customQuestion) ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'} text-[#0B0F17] font-bold text-[15px] rounded-lg py-4 transition-all shadow-[0_4px_20px_-5px_rgba(95,227,160,0.4)] flex items-center justify-center space-x-2`}
              >
                <span>{isLoading ? 'Registering...' : 'Register Account'}</span>
                {!isLoading && <span className="text-xl leading-none">→</span>}
              </button>
            </div>

            <div className="flex items-center mt-10 mb-6">
              <div className="flex-1 border-t border-white/5"></div>
              <span className="px-4 text-[10px] text-gray-600 font-semibold tracking-widest uppercase">OR JOIN WITH</span>
              <div className="flex-1 border-t border-white/5"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 bg-[#1A2234] hover:bg-[#20293D] border border-transparent rounded-lg py-3 transition-colors">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
                <span className="text-xs font-semibold text-gray-300">Google</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-[#1A2234] hover:bg-[#20293D] border border-transparent rounded-lg py-3 transition-colors">
                <svg className="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                <span className="text-xs font-semibold text-gray-300">LinkedIn</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      <div className="relative z-10"><Footer /></div>
    </div>
  );
};

export default Register;
