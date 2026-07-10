"use client";
import React, { useEffect, useState } from 'react';
import { getAICoach } from '../services/apiService';
import {
  Bot, Send, Mic, Paperclip, TrendingUp, Briefcase, Globe,
  Terminal, Shield, Database, Wrench, ArrowUpRight
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ChatBubble from '../components/Chat/ChatBubble';
import Footer from '../components/Footer';
import { withAuth } from '../components/withAuth';
import logo from '../assets/images/CareerBridge-AI.png';

const AICareerCoach = () => {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getAICoach();
      setData(response);
    } catch (error) {
      console.error('Failed to fetch getAICoach data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isSending) return;
    const msg = inputValue;
    setInputValue('');
    setIsSending(true);

    // Optimistic update
    const newChat = [...data.chat, { sender: 'user', text: msg, time: 'Now' }];
    setData(prev => ({ ...prev, chat: newChat }));

    try {
      const { reply } = await import('../services/apiService').then(m => m.sendCoachMessage(msg));
      setData(prev => ({ ...prev, chat: [...prev.chat, reply] }));
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!data) return <div className="min-h-screen bg-[#0B0F17] flex"><Sidebar /></div>;

  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 flex flex-col min-h-screen lg:h-screen lg:overflow-hidden">
        {/* Top Navbar / Header area */}
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center px-4 sm:px-8 py-4 border-b border-white/5 bg-background shrink-0 gap-4">
          <div className="flex items-center space-x-2">
            <img src={logo.src} alt="CareerBridge AI Logo" className="h-8 w-auto object-contain" />
            <div className="text-xl font-bold font-serif tracking-wide text-primary">CareerBridge AI</div>
          </div>

          <div className="hidden lg:flex items-center space-x-6 text-sm font-semibold">
            <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Dashboard</span>
            <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Resume</span>
            <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Interviews</span>
            <span className="text-primary border-b-2 border-primary pb-4 -mb-4">AI Coach</span>
          </div>

          <div className="flex items-center space-x-4 ml-auto lg:ml-0">
            <button className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">Sign In</button>
            <button className="bg-primary text-[#0B0F17] px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col relative">
            <div className="px-8 py-6 border-b border-white/5 shrink-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">AI Career Coach</h1>
              <p className="text-gray-400">Your personal AI mentor for career guidance.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8 pb-32">
              {data.chat.map((msg, i) => (
                <ChatBubble 
                  key={i}
                  isUser={msg.sender === 'user'}
                  message={msg.text}
                  avatar={msg.sender === 'user' ? "https://i.pravatar.cc/150?u=alex" : <Bot className="w-5 h-5 text-primary" />}
                  options={msg.options}
                  actions={msg.actions?.map(action => ({ label: action, onClick: () => {} }))}
                />
              ))}
            </div>

            {/* Input Area */}
            <div className="sticky bottom-0 left-0 right-0 p-4 sm:p-8 bg-gradient-to-t from-background via-background to-transparent pt-8 sm:pt-12 z-20">
              <div className="bg-background border border-white/10 rounded-2xl p-2 flex items-center space-x-2 shadow-[0_-10px_40px_rgba(11,15,23,0.8)] focus-within:border-primary/50 transition-colors relative z-10">
                <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors shrink-0">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask your career coach anything..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none py-3"
                  disabled={isSending}
                />
                <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors shrink-0">
                  <Mic className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleSendMessage}
                  disabled={isSending}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-[#0B0F17] transition-colors shrink-0 ${isSending ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'}`}
                >
                  <Send className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Career Intelligence */}
          <div className="w-full lg:w-96 border-l border-white/5 bg-background/50 flex flex-col h-full shrink-0">
            <div className="p-6 border-b border-white/5 shrink-0">
              <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">CAREER INTELLIGENCE</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

              {/* Industry Insights */}
              <div className="bg-card border border-white/5 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-white">Industry Insights</h3>
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-3">
                  <div className="bg-[#111827] border border-white/5 rounded-xl p-4">
                    <div className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-1">{data.insights.techSector.title}</div>
                    <div className="text-xs text-gray-300 leading-relaxed">{data.insights.techSector.desc}</div>
                  </div>
                  <div className="bg-[#111827] border border-white/5 rounded-xl p-4">
                    <div className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">{data.insights.remoteWork.title}</div>
                    <div className="text-xs text-gray-300 leading-relaxed">{data.insights.remoteWork.desc}</div>
                  </div>
                </div>
              </div>

              {/* Trending Skills */}
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Trending Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.trendingSkills.map((skill, i) => (
                    <span key={i} className={`border rounded-lg px-3 py-1.5 text-xs font-medium ${i === 0 ? 'bg-[#11241C] border-primary/30 text-primary' :
                      i === 3 ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                        'bg-white/5 border-white/10 text-gray-300'
                      }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended for You */}
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Recommended for You</h3>
                <div className="bg-card border border-white/5 rounded-2xl overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors">
                  <div className="h-32 bg-[#152336] relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="w-16 h-16 rounded-full border-2 border-primary/30 bg-[#0B0F17]/80 backdrop-blur flex flex-col items-center justify-center text-primary shadow-[0_0_20px_rgba(95,227,160,0.2)]">
                      <span className="text-[8px] font-bold uppercase tracking-widest text-white">MACHINE</span>
                      <span className="text-[8px] font-bold uppercase tracking-widest">LEARNING</span>
                      <span className="text-[6px] text-gray-400 mt-1">CERTIFIED</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-bold text-white mb-1 group-hover:text-primary transition-colors">{data.recommended.title}</div>
                    <div className="text-[10px] text-gray-400">{data.recommended.desc}</div>
                  </div>
                </div>
              </div>

              {/* Market Readiness */}
              <div className="bg-card border border-white/5 rounded-2xl p-5">
                <div className="text-xs font-bold text-gray-300 mb-2">Market Readiness</div>
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-2xl sm:text-3xl font-bold text-primary leading-none">{data.marketReadiness.score}%</span>
                  <span className="text-[10px] text-gray-500">{data.marketReadiness.trend}</span>
                </div>
                <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${data.marketReadiness.score}%` }}></div>
                </div>
              </div>
              
              <div className="mt-8 -mx-6 -mb-6">
                <Footer />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default withAuth(AICareerCoach);
