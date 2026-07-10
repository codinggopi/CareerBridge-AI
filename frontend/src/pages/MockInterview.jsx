"use client";
import React, { useEffect, useState } from 'react';
import { getMockInterview } from '../services/apiService';
import { 
  Code, Users, Target, PenTool, Play, Mic, Send, Paperclip, 
  User, Bot, Sparkles, Shield, CheckCircle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import SkeletonDashboard from '../components/SkeletonDashboard';
import { withAuth } from '../components/withAuth';

const MockInterview = () => {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getMockInterview();
      if (!response || !response.chat) throw new Error("Invalid API Data");
      setData(response);
    } catch (error) {
      console.error('Failed to fetch getMockInterview data:', error);
      // Fallback data
      setData({
        metrics: {
          communication: 85,
          confidence: 78,
          accuracy: 92
        },
        insights: {
          strength: { title: "Strengths", desc: "Good technical accuracy." },
          improvement: { title: "Improvements", desc: "Can improve communication clarity." }
        },
        chat: [
          { sender: "ai", text: "Welcome to your Mock Interview for the Full Stack Developer role. Let's start with a basic question: Can you explain the difference between client-side and server-side rendering in Next.js?", time: "10:00 AM" },
          { sender: "user", text: "Sure. Client-side rendering happens in the browser, while server-side rendering means the HTML is generated on the server before being sent to the client.", time: "10:01 AM" }
        ]
      });
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
      const { reply } = await import('../services/apiService').then(m => m.sendInterviewMessage(msg));
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

  if (!data) return <SkeletonDashboard />;

  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 flex flex-col min-h-screen lg:h-screen lg:overflow-hidden custom-scrollbar">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 shrink-0 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Mock Interview</h1>
            <p className="text-sm text-gray-400">Master your next career milestone with AI</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-bold text-white">Alex Rivera</div>
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">IN-SESSION READY</div>
            </div>
            <img src="https://i.pravatar.cc/150?u=alex" alt="Profile" className="w-10 h-10 rounded-full border-2 border-primary" />
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
          {/* Left Panel: Controls & Insights */}
          <div className="w-full lg:w-[320px] flex flex-col space-y-6 overflow-y-auto custom-scrollbar lg:pr-2 pb-8 shrink-0">
            
            {/* Select Session */}
            <div className="bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="text-sm font-bold text-white mb-4">Select Session</h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="bg-[#111827] border border-primary/30 rounded-xl p-4 flex flex-col items-center justify-center text-primary hover:bg-[#152336] transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5"></div>
                  <Code className="w-5 h-5 mb-2" />
                  <span className="text-xs font-bold">Technical</span>
                </button>
                <button className="bg-background border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-colors">
                  <Users className="w-5 h-5 mb-2" />
                  <span className="text-xs font-bold">HR / Culture</span>
                </button>
                <button className="bg-background border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-colors">
                  <Target className="w-5 h-5 mb-2" />
                  <span className="text-xs font-bold">Behavioral</span>
                </button>
                <button className="bg-background border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-colors">
                  <PenTool className="w-5 h-5 mb-2" />
                  <span className="text-xs font-bold">Aptitude</span>
                </button>
              </div>
              <button className="w-full flex items-center justify-center space-x-2 bg-primary text-[#0B0F17] px-4 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors">
                <Play className="w-4 h-4 fill-current" />
                <span>Start Interview Session</span>
              </button>
            </div>

            {/* Metrics */}
            <div className="bg-card border border-white/5 rounded-2xl p-6 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2 text-blue-400">
                    <User className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">COMMUNICATION</span>
                  </div>
                  <span className="text-xs font-bold text-blue-400">{data.metrics.communication}%</span>
                </div>
                <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full" style={{ width: `${data.metrics.communication}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2 text-primary">
                    <Shield className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">CONFIDENCE</span>
                  </div>
                  <span className="text-xs font-bold text-primary">{data.metrics.confidence}%</span>
                </div>
                <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${data.metrics.confidence}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2 text-orange-300">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">ACCURACY</span>
                  </div>
                  <span className="text-xs font-bold text-white">{data.metrics.accuracy}%</span>
                </div>
                <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                  <div className="bg-orange-300 h-full" style={{ width: `${data.metrics.accuracy}%` }}></div>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-card border border-white/5 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-bold text-white">AI Insights</h2>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4 py-1">
                  <div className="text-[11px] font-bold text-primary mb-1">{data.insights.strength.title}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{data.insights.strength.desc}</div>
                </div>
                <div className="border-l-2 border-orange-300 pl-4 py-1">
                  <div className="text-[11px] font-bold text-orange-300 mb-1">{data.insights.improvement.title}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{data.insights.improvement.desc}</div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Panel: Chat Interface */}
          <div className="flex-1 bg-card border border-white/5 rounded-2xl flex flex-col overflow-hidden relative">
            
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-background/50 backdrop-blur shrink-0">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-primary border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                  <span>SESSION ACTIVE</span>
                </div>
                <div className="text-xs font-mono text-gray-400 flex items-center space-x-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>12:45 / 30:00</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  <div className="w-5 h-5 rounded-full bg-primary text-[#0B0F17] flex items-center justify-center text-[9px] font-bold">1</div>
                  <div className="w-5 h-5 rounded-full bg-primary text-[#0B0F17] flex items-center justify-center text-[9px] font-bold">2</div>
                  <div className="w-5 h-5 rounded-full bg-white/10 text-gray-500 flex items-center justify-center text-[9px] font-bold">3</div>
                  <div className="w-5 h-5 rounded-full bg-white/10 text-gray-500 flex items-center justify-center text-[9px] font-bold">4</div>
                </div>
                <div className="text-xs font-bold text-gray-400">Question 2 of 10</div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar flex flex-col">
              {data.chat.map((msg, i) => (
                <div key={i} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-lg bg-[#152336] border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mr-4 mt-2">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  
                  <div className={`max-w-[75%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    {msg.time === 'typing' ? (
                      <div className="bg-[#111827] border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    ) : (
                      <div className={`px-6 py-4 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-primary text-[#0B0F17] rounded-tr-sm font-medium' 
                          : 'bg-[#111827] border border-white/5 text-gray-300 rounded-tl-sm'
                      }`}>
                        {msg.text}
                      </div>
                    )}
                    
                    {msg.time !== 'typing' && (
                      <div className="text-[9px] font-mono text-gray-600 mt-2 font-bold uppercase tracking-widest">
                        {msg.sender === 'user' ? `YOU • ${msg.time}` : `CAREERFORGE AI • ${msg.time}`}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <img src="https://i.pravatar.cc/150?u=alex" alt="User" className="w-8 h-8 rounded-full border border-white/10 shrink-0 ml-4 mt-2" />
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="sticky bottom-0 left-0 right-0 p-4 bg-background border-t border-white/5 shrink-0 flex items-center space-x-3 z-20">
              <button className="w-12 h-12 rounded-xl bg-card border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors shrink-0">
                <Paperclip className="w-5 h-5" />
              </button>
              
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your answer here..."
                  className="w-full bg-card border border-white/5 rounded-xl py-3.5 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                  disabled={isSending}
                />
              </div>
              
              <button className="w-12 h-12 rounded-xl bg-card border border-white/5 flex items-center justify-center text-primary hover:bg-white/5 transition-colors shrink-0">
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
      </main>
    </div>
  );
};

export default withAuth(MockInterview);
