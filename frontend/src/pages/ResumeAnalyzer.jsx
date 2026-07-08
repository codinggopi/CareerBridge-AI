"use client";
import React from 'react';
import { Upload, Download, Loader2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const ResumeAnalyzer = () => {
  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 flex flex-col min-h-screen lg:h-screen lg:overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 shrink-0">
          <h1 className="text-2xl font-bold text-primary">Resume AI Analyzer</h1>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 border border-white/10 rounded-full px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors">
              <Download className="w-3.5 h-3.5" />
              <span>Download Report</span>
            </button>
            <img src="https://i.pravatar.cc/150?u=gopinath" alt="Profile" className="w-8 h-8 rounded-full bg-gray-600 border border-white/10" />
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0 overflow-y-auto lg:overflow-visible pb-16 lg:pb-0">
          {/* Dropzone Area */}
          <div className="flex-1 border-2 border-dashed border-white/10 rounded-2xl bg-card flex flex-col items-center justify-center relative hover:border-primary/30 transition-colors">

            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary shadow-[0_0_30px_rgba(95,227,160,0.15)]">
              <Upload className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Drop your resume here</h2>

            <p className="text-sm text-gray-400 text-center max-w-sm mb-10 leading-relaxed">
              Support for PDF, DOCX formats. AI will automatically scan and provide insights in seconds.
            </p>

            <div className="flex items-center space-x-4">
              <button className="bg-primary text-[#0B0F17] px-8 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(95,227,160,0.2)]">
                Select File
              </button>
            </div>

          </div>

          {/* Loading / Empty State Panel */}
          <div className="w-full lg:w-96 min-h-[300px] lg:min-h-0 bg-card border border-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50"></div>
            <div className="relative flex flex-col items-center justify-center text-gray-600">
              <Loader2 className="w-16 h-16 animate-spin mb-4 opacity-20" />
              <div className="text-sm font-semibold opacity-30">Awaiting Upload...</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeAnalyzer;
