"use client";
import React, { useEffect, useState } from 'react';
import { getNotifications } from '../services/apiService';
import { 
  Bell, Search, Settings, FileText, MessageSquare, TrendingUp, Award
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Icons = {
  'file-text': FileText,
  'message-square': MessageSquare,
  'trending-up': TrendingUp,
  'award': Award,
  'settings': Settings
};

const Notifications = () => {
  const [data, setData] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotifications();
        setData(response);
      } catch (error) {
        console.error('Failed to fetch getNotifications data:', error);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div className="min-h-screen bg-[#0B0F17] flex"><Sidebar /></div>;

  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 flex flex-col min-h-screen lg:h-screen lg:overflow-hidden overflow-x-hidden w-full max-w-[100vw]">
        
        {/* Header */}
        <div className="px-4 sm:px-8 py-6 border-b border-white/5 bg-background shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Notifications</h1>
            <p className="text-sm text-gray-400">Stay updated with your AI-powered career journey.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors border border-white/5 bg-card px-4 py-2 rounded-lg">
              <CheckCircleIcon className="w-4 h-4" />
              <span>Mark all as read</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 sm:px-8 py-4 border-b border-white/5 bg-background shrink-0 flex flex-wrap gap-2">
          {data.filters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-colors ${
                activeFilter === filter 
                  ? 'bg-primary text-[#0B0F17]' 
                  : 'bg-card border border-white/5 text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar max-w-4xl space-y-10 pb-20">
          
          {/* Today */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <h2 className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">TODAY</h2>
            </div>
            
            <div className="space-y-4">
              {data.today.map((notif, i) => {
                const Icon = Icons[notif.icon];
                return (
                  <div key={i} className="bg-card border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 hover:border-white/10 transition-colors relative">
                    {notif.unread && <div className="absolute right-6 top-6 w-2 h-2 rounded-full bg-primary"></div>}
                    
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${notif.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 pt-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-bold text-white pr-8">{notif.title}</h3>
                        <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap">{notif.time}</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4 max-w-2xl">{notif.desc}</p>
                      
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        {notif.action && (
                          <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
                            {notif.action}
                          </button>
                        )}
                        {notif.dismissable && (
                          <button className="text-xs font-bold text-gray-500 hover:text-gray-300 transition-colors">
                            Dismiss
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* This Week */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">THIS WEEK</h2>
            </div>
            
            <div className="space-y-4">
              {data.thisWeek.map((notif, i) => {
                const Icon = Icons[notif.icon];
                return (
                  <div key={i} className="bg-card border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 hover:border-white/10 transition-colors">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${notif.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 pt-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-bold text-white">{notif.title}</h3>
                        <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap">{notif.time}</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">{notif.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Earlier */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">EARLIER</h2>
            </div>
            
            <div className="space-y-4">
              {data.earlier.map((notif, i) => {
                const Icon = Icons[notif.icon];
                return (
                  <div key={i} className="bg-card border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 hover:border-white/10 transition-colors">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${notif.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 pt-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-bold text-white">{notif.title}</h3>
                        <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap">{notif.time}</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">{notif.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

const CheckCircleIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

export default Notifications;
