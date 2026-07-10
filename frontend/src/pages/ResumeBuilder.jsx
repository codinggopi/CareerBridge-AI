"use client";
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Download, Share2, CheckCircle2, RotateCw, Plus, 
  Search, ZoomIn, ZoomOut, Maximize, X, GraduationCap, Briefcase, Award, Trash2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { getResume, saveResume } from '../services/apiService';
import { useUnsavedChanges } from '../hooks/useUnsavedChanges';
import { withAuth } from '../components/withAuth';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    fullName: '',
    targetRole: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    portfolio: '',
    website: '',
    objective: '',
    summary: '',
    experience: [{ id: 1, company: '', duration: '', accomplishment1: '', accomplishment2: '' }],
    skills: ['UI/UX Design', 'Figma', 'Design Systems', 'React', 'Agile'],
    education: [{ id: 1, institution: '', degree: '', year: '' }],
    projects: [],
    certifications: []
  });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTemplate, setActiveTemplate] = useState('Modern');
  const [readinessScore, setReadinessScore] = useState(85);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('Saved');

  // Load existing resume from database
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await getResume();
        if (response && response.content && Object.keys(response.content).length > 0) {
          setResumeData(response.content);
        }
      } catch (error) {
        console.error("Failed to load resume:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  // Auto-save debounce effect
  useEffect(() => {
    if (loading) return;
    
    setSaveStatus('Saving...');
    const timeoutId = setTimeout(async () => {
      try {
        await saveResume({ content: resumeData });
        setSaveStatus('Saved');
      } catch (error) {
        setSaveStatus('Failed to Save');
      }
    }, 2000); // Save 2 seconds after user stops typing
    
    return () => clearTimeout(timeoutId);
  }, [resumeData, loading]);

  useUnsavedChanges(saveStatus === 'Saving...' || saveStatus === 'Failed to Save');

  const handleChange = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field, defaultObj) => {
    setResumeData(prev => ({
      ...prev,
      [field]: [...prev[field], { id: Date.now(), ...defaultObj }]
    }));
  };

  const removeArrayItem = (field, id) => {
    setResumeData(prev => ({
      ...prev,
      [field]: prev[field].filter(item => item.id !== id)
    }));
  };

  const handleArrayChange = (field, id, key, value) => {
    setResumeData(prev => ({
      ...prev,
      [field]: prev[field].map(item => item.id === id ? { ...item, [key]: value } : item)
    }));
  };

  const addSkill = () => {
    const skill = prompt("Enter a skill:");
    if (skill) {
      setResumeData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const validateForm = () => {
    let score = 0;
    if (resumeData.fullName) score += 10;
    if (resumeData.targetRole) score += 10;
    if (resumeData.email) score += 5;
    if (resumeData.phone) score += 5;
    if (resumeData.summary) score += 10;
    if (resumeData.experience.length > 0 && resumeData.experience[0].company) score += 25;
    if (resumeData.skills.length > 0) score += 15;
    if (resumeData.education.length > 0 && resumeData.education[0].institution) score += 20;
    setReadinessScore(score);
    alert(`Current ATS Readiness Score: ${score}%`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resumeData.fullName || 'User'} Resume`,
          text: 'Check out my resume!',
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading Resume...</div>;

  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 flex flex-col h-auto lg:h-screen lg:overflow-hidden min-h-screen pt-16 md:pt-0">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 lg:p-6 gap-4 border-b border-white/5 shrink-0 bg-background z-10">
          <div>
            <h1 className="text-xl font-bold text-white mb-1">AI Resume Builder</h1>
            <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest">
              <span className="text-gray-400">FAANG Modern Template</span>
              <span>•</span>
              <span className={`${saveStatus === 'Saving...' ? 'text-yellow-400' : saveStatus === 'Failed to Save' ? 'text-red-400' : 'text-primary'}`}>
                {saveStatus}
              </span>
            </div>
          </div>
          
          <div className="hidden lg:flex flex-wrap items-center gap-3 lg:gap-6 w-full lg:w-auto">
            <div className="flex items-center space-x-3 bg-card border border-white/10 rounded-full py-1.5 px-4">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-700" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-primary" strokeDasharray={`${readinessScore}, 100`} strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-[9px] font-bold text-white">{readinessScore}%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">Readiness</span>
                <span className="text-[10px] text-white">ATS Compatible</span>
              </div>
            </div>
            
            <button className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>AI Optimizer</span>
            </button>
            
            <div className="flex flex-wrap gap-3">
              <button onClick={validateForm} className="w-9 h-9 rounded-lg bg-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <CheckCircle2 className="w-4 h-4" />
              </button>
              <button onClick={handleShare} className="w-9 h-9 rounded-lg bg-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button onClick={handleDownloadPDF} className="flex items-center space-x-2 bg-primary text-[#0B0F17] rounded-lg px-4 py-2 text-xs font-bold hover:bg-primary/90 transition-colors">
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-y-visible lg:overflow-hidden">
          {/* Left Panel: Form */}
          <div className="w-full lg:w-[60%] overflow-y-visible lg:overflow-y-auto p-4 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/5 custom-scrollbar order-1 lg:order-none">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">Craft your future</h2>
            <p className="text-sm text-gray-400 mb-8">Craft a FAANG-ready resume with real-time AI intelligence.</p>
            
            {/* Personal Information Section */}
            <div className="bg-card border border-white/5 rounded-2xl p-6 mb-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-primary">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h3 className="text-sm font-bold text-white">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" value={resumeData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} placeholder="Alex Rivera" className="w-full bg-background border border-white/5 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Target Role</label>
                  <input type="text" value={resumeData.targetRole} onChange={(e) => handleChange('targetRole', e.target.value)} placeholder="Senior Product Designer" className="w-full bg-background border border-white/5 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                  <input type="email" value={resumeData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="alex.rivera@example.com" className="w-full bg-background border border-white/5 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Phone</label>
                  <input type="text" value={resumeData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+1 (555) 012-3456" className="w-full bg-background border border-white/5 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">LinkedIn</label>
                  <input type="text" value={resumeData.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} placeholder="linkedin.com/in/alexrivera" className="w-full bg-background border border-white/5 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">GitHub / Portfolio</label>
                  <input type="text" value={resumeData.github} onChange={(e) => handleChange('github', e.target.value)} placeholder="github.com/alexrivera" className="w-full bg-background border border-white/5 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-primary/30 transition-colors" />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Professional Summary</label>
                <textarea 
                  rows="4" 
                  value={resumeData.summary}
                  onChange={(e) => handleChange('summary', e.target.value)}
                  placeholder="Data-driven Product Designer with 6+ years of experience..."
                  className="w-full bg-background border border-white/5 rounded-lg py-3 px-4 text-sm text-gray-300 focus:outline-none focus:border-primary/30 transition-colors resize-none"
                ></textarea>
                <button className="absolute bottom-3 right-3 flex items-center space-x-1 bg-[#1A2E20] text-primary border border-primary/20 px-3 py-1.5 rounded-md text-[10px] font-bold hover:bg-[#1A2E20]/80 transition-colors">
                  <Sparkles className="w-3 h-3" />
                  <span>AI ENHANCE</span>
                </button>
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-card border border-white/5 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-blue-400">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <h3 className="text-sm font-bold text-white">Experience</h3>
                </div>
                <button onClick={() => addArrayItem('experience', { company: '', duration: '', accomplishment1: '', accomplishment2: '' })} className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">Add Experience</button>
              </div>

              {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="border border-white/5 rounded-xl p-4 bg-background mb-4 relative">
                {resumeData.experience.length > 1 && (
                  <button onClick={() => removeArrayItem('experience', exp.id)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pr-8">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Company</label>
                    <input type="text" value={exp.company} onChange={(e) => handleArrayChange('experience', exp.id, 'company', e.target.value)} placeholder="InnovateTech Solutions" className="w-full bg-[#111827] border border-white/5 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-white/10" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Duration</label>
                    <input type="text" value={exp.duration} onChange={(e) => handleArrayChange('experience', exp.id, 'duration', e.target.value)} placeholder="Jan 2021 - Present" className="w-full bg-[#111827] border border-white/5 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-white/10" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Key Accomplishments</label>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <input type="text" value={exp.accomplishment1} onChange={(e) => handleArrayChange('experience', exp.id, 'accomplishment1', e.target.value)} placeholder="Led the redesign of the flagship mobile app..." className="flex-1 bg-[#111827] border border-white/5 rounded-lg py-2 px-3 text-xs text-gray-300 focus:outline-none focus:border-white/10" />
                      <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="text" value={exp.accomplishment2} onChange={(e) => handleArrayChange('experience', exp.id, 'accomplishment2', e.target.value)} placeholder="Optimized design-to-development handoff..." className="flex-1 bg-[#111827] border border-white/5 rounded-lg py-2 px-3 text-xs text-gray-300 focus:outline-none focus:border-white/10" />
                      <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center space-x-2 text-[11px] text-gray-400 hover:text-white transition-colors border border-dashed border-white/10 rounded-lg py-2 bg-white/[0.02]">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>Auto-generate Bullet Points</span>
                  </button>
                </div>
              </div>
              ))}
            </div>

            {/* Skills & Expertise */}
            <div className="bg-card border border-white/5 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-green-400">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
                  </div>
                  <h3 className="text-sm font-bold text-white">Skills & Expertise</h3>
                </div>
                <button className="text-[10px] text-primary border border-primary/20 px-2 py-1 rounded bg-primary/5 hover:bg-primary/10 transition-colors">
                  AI Scan Job Desc
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, idx) => (
                <span key={idx} className="flex items-center space-x-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300">
                  <span>{skill}</span>
                  <button onClick={() => removeSkill(skill)} className="text-gray-500 hover:text-white"><X className="w-3 h-3" /></button>
                </span>
                ))}
                <button onClick={addSkill} className="flex items-center space-x-1 border border-dashed border-white/20 rounded-lg px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                  <Plus className="w-3 h-3" />
                  <span>Add Skill</span>
                </button>
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-card border border-white/5 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-purple-400">
                    <GraduationCap className="w-3 h-3" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Education</h3>
                </div>
                <button onClick={() => addArrayItem('education', { institution: '', degree: '', year: '' })} className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">Add Education</button>
              </div>
              {resumeData.education.map(edu => (
              <div key={edu.id} className="border border-white/5 rounded-xl p-4 bg-background mb-4 relative">
                {resumeData.education.length > 1 && (
                  <button onClick={() => removeArrayItem('education', edu.id)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pr-8">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Institution</label>
                    <input type="text" value={edu.institution} onChange={(e) => handleArrayChange('education', edu.id, 'institution', e.target.value)} placeholder="Stanford University" className="w-full bg-[#111827] border border-white/5 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-white/10" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Degree</label>
                    <input type="text" value={edu.degree} onChange={(e) => handleArrayChange('education', edu.id, 'degree', e.target.value)} placeholder="B.S. in Computer Science" className="w-full bg-[#111827] border border-white/5 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-white/10" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Year</label>
                    <input type="text" value={edu.year} onChange={(e) => handleArrayChange('education', edu.id, 'year', e.target.value)} placeholder="2020 - 2024" className="w-full bg-[#111827] border border-white/5 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-white/10" />
                  </div>
                </div>
              </div>
              ))}
            </div>

            {/* Projects Section */}
            <div className="bg-card border border-white/5 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-orange-400">
                    <Briefcase className="w-3 h-3" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Projects</h3>
                </div>
                <button onClick={() => addArrayItem('projects', { title: '', description: '', link: '' })} className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">Add Project</button>
              </div>
              {resumeData.projects.map(proj => (
              <div key={proj.id} className="border border-white/5 rounded-xl p-4 bg-background mb-4 relative">
                <button onClick={() => removeArrayItem('projects', proj.id)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pr-8">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Title</label>
                    <input type="text" value={proj.title} onChange={(e) => handleArrayChange('projects', proj.id, 'title', e.target.value)} placeholder="E-commerce App" className="w-full bg-[#111827] border border-white/5 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-white/10" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Link</label>
                    <input type="text" value={proj.link} onChange={(e) => handleArrayChange('projects', proj.id, 'link', e.target.value)} placeholder="github.com/project" className="w-full bg-[#111827] border border-white/5 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-white/10" />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                    <input type="text" value={proj.description} onChange={(e) => handleArrayChange('projects', proj.id, 'description', e.target.value)} placeholder="Built a fullstack ecommerce platform..." className="w-full bg-[#111827] border border-white/5 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-white/10" />
                  </div>
                </div>
              </div>
              ))}
            </div>

            {/* Certifications Section */}
            <div className="bg-card border border-white/5 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-yellow-400">
                    <Award className="w-3 h-3" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Certifications</h3>
                </div>
                <button onClick={() => addArrayItem('certifications', { name: '', issuer: '', year: '' })} className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">Add Certification</button>
              </div>
              {resumeData.certifications.map(cert => (
              <div key={cert.id} className="border border-white/5 rounded-xl p-4 bg-background mb-4 relative">
                <button onClick={() => removeArrayItem('certifications', cert.id)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-8">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Name</label>
                    <input type="text" value={cert.name} onChange={(e) => handleArrayChange('certifications', cert.id, 'name', e.target.value)} placeholder="AWS Certified Solutions Architect" className="w-full bg-[#111827] border border-white/5 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-white/10" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Issuer & Year</label>
                    <input type="text" value={cert.year} onChange={(e) => handleArrayChange('certifications', cert.id, 'year', e.target.value)} placeholder="Amazon Web Services - 2023" className="w-full bg-[#111827] border border-white/5 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-white/10" />
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>


          {/* Mobile Status Bar (Rendered between Form and Preview) */}
          <div className="flex lg:hidden flex-wrap items-center justify-center gap-3 w-full p-4 border-b border-white/5 order-2 bg-background z-10 shrink-0">
            <div className="flex items-center space-x-3 bg-card border border-white/10 rounded-full py-1.5 px-4">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-700" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-primary" strokeDasharray="85, 100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-[9px] font-bold text-white">85%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">Readiness</span>
                <span className="text-[10px] text-white">ATS Compatible</span>
              </div>
            </div>
            
            <button className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>AI Optimizer</span>
            </button>
            
            <div className="flex flex-wrap gap-3">
              <button className="w-9 h-9 rounded-lg bg-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <CheckCircle2 className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-lg bg-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="flex items-center space-x-2 bg-primary text-[#0B0F17] rounded-lg px-4 py-2 text-xs font-bold hover:bg-primary/90 transition-colors">
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
            </div>
          </div>

          {/* Right Panel: Live Preview */}
          <div className="w-full lg:w-[40%] bg-[#1A1F2B] relative flex flex-col p-4 sm:p-6 order-3 lg:order-none">
            
            {/* Top controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex overflow-x-auto bg-card rounded-lg p-1 border border-white/5 custom-scrollbar w-full sm:w-auto">
                <button onClick={() => setActiveTemplate('Modern')} className={`px-4 py-1.5 text-xs font-bold ${activeTemplate === 'Modern' ? 'text-background bg-primary' : 'text-gray-400 hover:text-white'} rounded-md whitespace-nowrap transition-colors`}>Modern</button>
                <button onClick={() => setActiveTemplate('Academic')} className={`px-4 py-1.5 text-xs font-bold ${activeTemplate === 'Academic' ? 'text-background bg-primary' : 'text-gray-400 hover:text-white'} rounded-md whitespace-nowrap transition-colors`}>Academic</button>
                <button onClick={() => setActiveTemplate('Creative')} className={`px-4 py-1.5 text-xs font-bold ${activeTemplate === 'Creative' ? 'text-background bg-primary' : 'text-gray-400 hover:text-white'} rounded-md whitespace-nowrap transition-colors`}>Creative</button>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-400">
                <button onClick={() => setZoomLevel(z => Math.min(z + 0.1, 2))} className="p-1.5 hover:bg-white/5 rounded transition-colors"><ZoomIn className="w-4 h-4" /></button>
                <button onClick={() => setZoomLevel(z => Math.max(z - 0.1, 0.5))} className="p-1.5 hover:bg-white/5 rounded transition-colors"><ZoomOut className="w-4 h-4" /></button>
                <button onClick={() => setZoomLevel(1)} className="p-1.5 hover:bg-white/5 rounded transition-colors"><Maximize className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Resume Document Wrapper */}
            <div className="flex-1 overflow-y-auto flex justify-center custom-scrollbar pb-8 lg:pb-24">
              <div style={{ transform: `scale(${zoomLevel})` }} className="bg-white text-gray-900 w-full sm:w-[95%] lg:w-[85%] max-w-[800px] shadow-2xl rounded-sm p-4 sm:p-6 lg:p-10 transform origin-top shrink-0">
                {/* Real Resume Preview Content */}
                <header className="mb-4 lg:mb-6 border-b border-gray-200 pb-4 lg:pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight mb-1">{resumeData.fullName || "YOUR NAME"}</h1>
                    <div className="text-sm font-bold text-primary tracking-widest uppercase">{resumeData.targetRole || "TARGET ROLE"}</div>
                  </div>
                  <div className="text-left sm:text-right text-[10px] text-gray-500 leading-relaxed w-full sm:w-auto">
                    alex.rivera@example.com<br/>
                    +1 (555) 0123 4567<br/>
                    San Francisco, CA<br/>
                    <span className="text-primary">linkedin.com/in/arivera</span>
                  </div>
                </header>

                <section className="mb-6">
                  <h2 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">PROFESSIONAL SUMMARY</h2>
                  <p className="text-[11px] leading-relaxed text-gray-700 whitespace-pre-wrap">
                    {resumeData.summary || "Your professional summary will appear here."}
                  </p>
                </section>

                {resumeData.experience.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">WORK EXPERIENCE</h2>
                  
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="mb-4">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="text-[13px] font-bold text-gray-900">{exp.company || "Company Name"}</h3>
                        <span className="text-[10px] text-gray-500 italic">{exp.duration || "Duration"}</span>
                      </div>
                      <div className="text-[11px] font-bold text-gray-800 italic mb-2">{resumeData.targetRole || "Role"}</div>
                      <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700 space-y-1">
                        {exp.accomplishment1 && <li>{exp.accomplishment1}</li>}
                        {exp.accomplishment2 && <li>{exp.accomplishment2}</li>}
                      </ul>
                    </div>
                  ))}
                </section>
                )}

                {resumeData.skills.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">CORE COMPETENCIES</h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold text-gray-700">
                    {resumeData.skills.map((skill, idx) => (
                      <span key={idx}>{skill}</span>
                    ))}
                  </div>
                </section>
                )}

                {resumeData.education.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">EDUCATION</h2>
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="mb-3">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-[12px] font-bold text-gray-900">{edu.institution || "Institution Name"}</h3>
                        <span className="text-[10px] text-gray-500 italic">{edu.year}</span>
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5">{edu.degree || "Degree"}</div>
                    </div>
                  ))}
                </section>
                )}

                {resumeData.projects.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">PROJECTS</h2>
                  {resumeData.projects.map((proj) => (
                    <div key={proj.id} className="mb-3">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-[12px] font-bold text-gray-900">{proj.title || "Project Name"}</h3>
                        <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="text-[10px] text-primary hover:underline italic">{proj.link}</a>
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">{proj.description}</div>
                    </div>
                  ))}
                </section>
                )}

                {resumeData.certifications.length > 0 && (
                <section>
                  <h2 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">CERTIFICATIONS</h2>
                  {resumeData.certifications.map((cert) => (
                    <div key={cert.id} className="mb-2">
                      <h3 className="text-[12px] font-bold text-gray-900">{cert.name || "Certification Name"}</h3>
                      <div className="text-[11px] text-gray-600 mt-0.5">{cert.year}</div>
                    </div>
                  ))}
                </section>
                )}
              </div>
            </div>

            {/* Floating AI Recommendation tooltip */}
            <div className="relative lg:absolute mt-4 lg:mt-0 lg:bottom-8 lg:right-8 bg-card border border-primary/30 rounded-xl p-4 shadow-2xl w-full lg:w-auto lg:max-w-[280px] animate-pulse-slow">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white mb-1">AI Recommendation</div>
                  <div className="text-[10px] text-gray-400 leading-relaxed">
                    "Try adding more quantifiable metrics in your CloudStream role to improve your impact score by ~12%."
                  </div>
                </div>
              </div>
              <button className="w-full bg-[#1A2E20] hover:bg-[#213b28] border border-primary/20 text-primary rounded-lg py-1.5 text-[11px] font-bold transition-colors">
                Apply Fixes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withAuth(ResumeBuilder);
