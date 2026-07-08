"use client";
import React, { useState } from 'react';
import { 
  User, Shield, Bell, Lock, Cpu, Globe, Moon, Eye, Info, X, Plus
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Account');

  const tabs = [
    { id: 'Account', icon: User },
    { id: 'Security', icon: Shield },
    { id: 'Notifications', icon: Bell },
    { id: 'Privacy', icon: Lock },
    { id: 'AI Preferences', icon: Cpu }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 flex flex-col min-h-screen lg:h-screen lg:overflow-hidden overflow-x-hidden w-full max-w-[100vw]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 shrink-0 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
            <p className="text-sm text-gray-400">Manage your account preferences and AI career engine.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-card border border-white/5 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-300 hover:bg-white/5 cursor-pointer transition-colors">
              <Globe className="w-4 h-4" />
              <span>English (US)</span>
              <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
            <button className="w-9 h-9 rounded-full bg-card border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Moon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row gap-8 min-h-0">
          {/* Left Menu */}
          <div className="w-full md:w-56 shrink-0 flex flex-row md:flex-col space-x-2 md:space-x-0 space-y-0 md:space-y-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 custom-scrollbar">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[#152336] border border-white/5 text-primary' 
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.id}</span>
                </button>
              );
            })}
          </div>

          {/* Right Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 pb-8 space-y-6">
            
            {/* Removed Personal Information per user request */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security */}
              <div className="bg-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Lock className="w-4 h-4 text-blue-400" />
                  <h2 className="text-lg font-bold text-white">Security</h2>
                </div>
                
                <div className="flex justify-between items-center py-4 border-b border-white/5 cursor-pointer group">
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">Change Password</div>
                    <div className="text-[10px] text-gray-500">Last updated 3 months ago</div>
                  </div>
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </div>
                
                <div className="flex justify-between items-center py-4 cursor-pointer">
                  <div>
                    <div className="text-sm font-medium text-white">Two-Factor Authentication</div>
                    <div className="text-[10px] text-gray-500">Enhanced account security</div>
                  </div>
                  <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(95,227,160,0.3)]">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Resume Visibility */}
              <div className="bg-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <h2 className="text-lg font-bold text-white">Resume Visibility</h2>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-4 p-4 rounded-xl border border-primary/30 bg-[#152336] cursor-pointer">
                    <div className="mt-1 w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white mb-0.5">Public</div>
                      <div className="text-xs text-gray-400 leading-relaxed">Open to all network employers</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 rounded-xl border border-white/5 hover:border-white/10 bg-background cursor-pointer transition-colors opacity-50">
                    <div className="mt-1 w-4 h-4 rounded-full border-2 border-gray-600 shrink-0"></div>
                    <div>
                      <div className="text-sm font-medium text-white mb-0.5">Private</div>
                      <div className="text-xs text-gray-400 leading-relaxed">Only visible to applied jobs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Intelligence Preferences */}
            <div className="bg-gradient-to-br from-[#15202B] to-card border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center space-x-2 mb-2 relative z-10">
                <Cpu className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-white">AI Intelligence Preferences</h2>
              </div>
              <p className="text-[11px] text-gray-400 mb-6 relative z-10">Customize how CareerBridgeAI identifies opportunities for you.</p>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Preferred Career Domain</label>
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center space-x-1 border border-primary/30 bg-[#11241C] text-primary px-3 py-1.5 rounded-lg text-[11px] font-bold">
                      <span>Software Engineering</span>
                      <X className="w-3 h-3 ml-1 cursor-pointer" />
                    </span>
                    <span className="flex items-center space-x-1 border border-primary/30 bg-[#11241C] text-primary px-3 py-1.5 rounded-lg text-[11px] font-bold">
                      <span>Data Science</span>
                      <X className="w-3 h-3 ml-1 cursor-pointer" />
                    </span>
                    <span className="flex items-center space-x-1 border border-primary/30 bg-[#11241C] text-primary px-3 py-1.5 rounded-lg text-[11px] font-bold">
                      <span>AI/ML Research</span>
                      <X className="w-3 h-3 ml-1 cursor-pointer" />
                    </span>
                    <button className="flex items-center space-x-1 border border-white/10 bg-white/5 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors">
                      <Plus className="w-3 h-3" />
                      <span>Add Domain</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Target Companies (Priority for Matching)</label>
                  <input type="text" placeholder="e.g. NVIDIA, OpenAI, Stripe, Tesla..." className="w-full bg-white text-gray-800 rounded-lg py-2.5 px-4 text-sm focus:outline-none" />
                  <p className="text-[10px] text-gray-500 italic mt-2">The AI will prioritize scanning vacancies and networking opportunities at these specific firms.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-white/5 gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-primary mb-1">Adaptive Skill Analysis</div>
                    <div className="text-[10px] text-gray-400 break-words">Allow CareerBridgeAI to suggest new certifications based on trending target company requirements.</div>
                  </div>
                  <div className="w-10 h-5 bg-white rounded-full relative cursor-pointer shrink-0">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Companies Input */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <input type="text" placeholder="Add specific companies..." className="flex-1 bg-background border border-white/5 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors w-full" />
              <button className="bg-white/5 border border-white/10 text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors shrink-0">
                Add Target
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 shrink-0 mt-8">
              <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-colors">
                Discard Changes
              </button>
              <button className="w-full sm:w-auto bg-primary text-[#0B0F17] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-[0_4px_14px_0_rgba(95,227,160,0.39)]">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
