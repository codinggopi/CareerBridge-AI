"use client";
import React, { useState, useRef } from 'react';
import { Upload, Download, Loader2, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { analyzeResume } from '../services/apiService';
import { withAuth } from '../components/withAuth';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null); // Reset previous analysis if any
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await analyzeResume(formData);
      setResult(response);
    } catch (error) {
      console.error("Failed to analyze resume", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

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
          <div className="flex-1 border-2 border-dashed border-white/10 rounded-2xl bg-card flex flex-col items-center justify-center relative hover:border-primary/30 transition-colors p-8">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />

            {!file ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary shadow-[0_0_30px_rgba(95,227,160,0.15)]">
                  <Upload className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Drop your resume here</h2>
                <p className="text-sm text-gray-400 text-center max-w-sm mb-10 leading-relaxed">
                  Support for PDF, DOCX formats. AI will automatically scan and provide insights in seconds.
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-primary text-[#0B0F17] px-8 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(95,227,160,0.2)]"
                >
                  Select File
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center w-full max-w-md">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400">
                  <FileText className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{file.name}</h2>
                <p className="text-sm text-gray-400 mb-8">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                <div className="grid grid-cols-2 gap-4 w-full mb-4">
                  <button 
                    onClick={() => window.open(URL.createObjectURL(file), "_blank")}
                    className="bg-card border border-white/10 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/5 transition-colors"
                  >
                    Preview
                  </button>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-card border border-white/10 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/5 transition-colors"
                  >
                    Change Resume
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <button 
                    onClick={() => { setFile(null); setResult(null); }}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-bold hover:bg-red-500/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleUpload}
                    disabled={isAnalyzing}
                    className="bg-primary text-[#0B0F17] px-4 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(95,227,160,0.2)]"
                  >
                    {isAnalyzing ? "Analyzing..." : "Upload Resume"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Loading / Empty State Panel */}
          <div className="w-full lg:w-96 min-h-[300px] lg:min-h-0 bg-card border border-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50"></div>
            {isAnalyzing ? (
              <div className="relative flex flex-col items-center justify-center text-primary">
                <Loader2 className="w-16 h-16 animate-spin mb-4" />
                <div className="text-sm font-semibold">Analyzing Resume...</div>
              </div>
            ) : result ? (
              <div className="relative flex flex-col items-start justify-start w-full h-full p-6 overflow-y-auto custom-scrollbar">
                <h3 className="text-xl font-bold text-white mb-2">Analysis Complete</h3>
                <div className="text-sm text-gray-400 mb-6">File: {result.filename}</div>

                <div className="w-full bg-[#111827] border border-white/5 rounded-xl p-4 mb-6 text-center">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Score</div>
                  <div className="text-3xl font-bold text-primary">{result.score}%</div>
                </div>

                <h4 className="text-sm font-bold text-white mb-3">Feedback</h4>
                <div className="space-y-3 w-full mb-6">
                  {result.feedback.map((item, i) => (
                    <div key={i} className="flex items-start space-x-2 bg-[#111827] p-3 rounded-xl border border-white/5">
                      {item.type === 'strength' ? (
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      )}
                      <span className="text-xs text-gray-300">{item.msg}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-sm font-bold text-white mb-3">Detected Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((kw, i) => (
                    <span key={i} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-gray-400">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative flex flex-col items-center justify-center text-gray-600">
                <Loader2 className="w-16 h-16 animate-spin mb-4 opacity-20" />
                <div className="text-sm font-semibold opacity-30">Awaiting Upload...</div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default withAuth(ResumeAnalyzer);
