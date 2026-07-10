"use client";
import React, { useEffect, useState } from 'react';
import { getProfile, resolveAvatarUrl } from '../services/apiService';
import {
  CheckCircle, FileText, Zap, ShieldCheck, TrendingUp, Globe, Edit3, Download, Award, Code, Briefcase
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';

import SkeletonDashboard from '../components/SkeletonDashboard';
import { withAuth } from '../components/withAuth';

const MyProfile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfile();
        if (!response || !response.profile) throw new Error("Invalid API Data");
        setData(response);
      } catch (error) {
        console.error('Failed to fetch getProfile data:', error);
        // Fallback mock data
        setData({
          profile: {
            avatar: "https://i.pravatar.cc/150",
            name: "Alex Forge",
            role: "Senior Frontend Engineer",
            email: "alex.forge@example.com",
            phone: "+1 (555) 123-4567",
            location: "San Francisco, CA",
            portfolio: "alexforge.dev",
            linkedin: "linkedin.com/in/alexforge",
            github: "github.com/alexforge"
          },
          readiness: 85,
          resumeScore: 92,
          interviewsTaken: 4,
          applications: 12,
          skills: [
            { name: "React", level: 95 },
            { name: "Node.js", level: 85 },
            { name: "TypeScript", level: 90 },
            { name: "AWS", level: 60 }
          ],
          activity: [
            { title: "Completed Mock Interview", time: "2 days ago", icon: "message-square" },
            { title: "Updated Resume", time: "4 days ago", icon: "file-text" }
          ]
        });
      }
    };
    fetchData();
  }, []);

  if (!data) return <SkeletonDashboard />;

  // Calculate Profile Completion
  const getProfileCompletion = (profileData) => {
    if (!profileData) return { score: 0, missing: [] };
    const fields = [
      { key: 'avatar', obj: profileData.profile, weight: 5, label: 'Profile Photo' },
      { key: 'name', obj: profileData, weight: 5, label: 'Full Name' },
      { key: 'email', obj: profileData, weight: 5, label: 'Email Address' },
      { key: 'phone', obj: profileData, weight: 5, label: 'Phone Number' },
      { key: 'branch', obj: profileData, weight: 5, label: 'Department / Major' },
      { key: 'graduation_year', obj: profileData, weight: 5, label: 'Graduation Year' },
      { key: 'college', obj: profileData, weight: 5, label: 'College / University' },
      { key: 'address', obj: profileData, weight: 5, label: 'Address' },
      { key: 'bio', obj: profileData, weight: 5, label: 'Bio / Professional Summary' },
      { key: 'linkedin_link', obj: profileData, weight: 5, label: 'LinkedIn Profile' },
      { key: 'github_link', obj: profileData, weight: 5, label: 'GitHub Profile' },
      { key: 'portfolio_link', obj: profileData, weight: 5, label: 'Portfolio Website' },
      { key: 'professional_title', obj: profileData, weight: 5, label: 'Career Target' }
    ];
    let score = 0;
    let missing = [];
    
    // Base registration score
    score += 20;

    fields.forEach(f => {
      const val = f.obj && f.obj[f.key];
      if (val && val.toString().trim() !== '' && val !== "https://i.pravatar.cc/150") {
        score += f.weight;
      } else {
        missing.push(f.label);
      }
    });

    if (profileData.coreSkills && profileData.coreSkills.length > 0) score += 5;
    else missing.push('Add Skills via Resume');

    if (profileData.projects && profileData.projects.length > 0) score += 5;
    else missing.push('Add Projects via Resume');

    if (profileData.achievements && profileData.achievements.length > 0) score += 5;
    else missing.push('Add Achievements via Resume');

    if (score > 100) score = 100;
    return { score, missing };
  };

  const { score: completionScore, missing: missingSections } = getProfileCompletion(data);

  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto custom-scrollbar h-screen">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">My Profile</h1>
          <div className="flex space-x-4">
            <Link href="/edit-profile" className="bg-card border border-white/10 text-gray-300 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/5 transition-colors flex items-center space-x-2">
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>
            <button className="bg-primary text-[#0B0F17] px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Left Column: Identity & Scores */}
          <div className="space-y-6">

            <div className="bg-card border border-white/5 rounded-3xl p-8 flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-blue-900/20 to-transparent"></div>

              <div className="relative mb-6 z-10">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-primary to-blue-500">
                  <img src={resolveAvatarUrl(data.profile.avatar)} alt="Profile" className="w-full h-full rounded-full border-4 border-card object-cover" />
                </div>
                <div className="absolute bottom-0 right-2 w-8 h-8 bg-card rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2 relative z-10">{data.profile.name}</h2>
              <p className="text-sm text-gray-400 text-center mb-6 relative z-10">{data.profile.title || data.profile.role}</p>

              {/* Profile Completion Indicator */}
              <div className="w-full bg-background rounded-xl p-4 mb-6 relative z-10 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Profile Strength</span>
                  <span className="text-sm font-bold text-primary">{completionScore}%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-primary" style={{ width: `${completionScore}%` }}></div>
                </div>
                {missingSections.length > 0 && (
                  <div className="text-xs">
                    <span className="text-gray-500 mb-2 block">To reach 100%:</span>
                    <ul className="space-y-1">
                      {missingSections.slice(0, 3).map((item, i) => (
                        <li key={i} className="text-yellow-400/80 flex items-center space-x-2">
                          <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                          <span>Add {item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/edit-profile" className="text-primary hover:underline mt-3 block">Complete Profile &rarr;</Link>
                  </div>
                )}
              </div>

              <div className="flex space-x-4 mb-8 relative z-10">
                {data.github_link && (
                  <a href={data.github_link.startsWith('http') ? data.github_link : `https://${data.github_link}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <Code className="w-5 h-5" />
                  </a>
                )}
                {data.linkedin_link && (
                  <a href={data.linkedin_link.startsWith('http') ? data.linkedin_link : `https://${data.linkedin_link}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <Briefcase className="w-5 h-5" />
                  </a>
                )}
                {data.portfolio_link && (
                  <a href={data.portfolio_link.startsWith('http') ? data.portfolio_link : `https://${data.portfolio_link}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>

              <div className="w-full border-t border-white/5 pt-6 relative z-10">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">PLACEMENT SCORE</span>
                  <span className="text-sm font-bold text-primary">{data.profile.placementRank}</span>
                </div>
                <div className="w-full bg-background h-2 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-primary h-full" style={{ width: `${data.profile.placementScore}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-white/5 rounded-2xl p-6 flex items-center justify-between hover:border-white/10 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-background border border-white/5 flex items-center justify-center text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Resume Score</div>
                  <div className="text-xl font-bold text-white leading-none">{data.metrics.resumeScore}<span className="text-sm font-normal text-gray-500">/100</span></div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-white/5 rounded-2xl p-6 flex items-center justify-between hover:border-white/10 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-background border border-white/5 flex items-center justify-center text-blue-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Skill Score</div>
                  <div className="text-xl font-bold text-white leading-none">{data.metrics.skillScore}<span className="text-sm font-normal text-gray-500">/100</span></div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-white/5 rounded-2xl p-6 flex items-center justify-between hover:border-white/10 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-background border border-white/5 flex items-center justify-center text-orange-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Readiness</div>
                  <div className="text-xl font-bold text-white leading-none">{data.metrics.readiness}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Skills, Projects, Achievements, Journey */}
          <div className="xl:col-span-2 space-y-6">

            {/* Core Skills & Technologies */}
            <div className="bg-card border border-white/5 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold text-white">Core Skills</h2>
                </div>
                <span className="text-[10px] font-bold text-gray-400 border border-white/10 bg-white/5 px-3 py-1.5 rounded-full uppercase tracking-widest">AI Verified</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  {data.coreSkills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-white">{skill.name}</span>
                        <span className="text-[10px] font-bold text-primary">{skill.score}%</span>
                      </div>
                      <div className="w-full bg-background h-2 rounded-full overflow-hidden shadow-inner">
                        <div className="bg-primary h-full" style={{ width: `${skill.score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex flex-wrap gap-2">
                    {data.technologies.map((tech, i) => (
                      <span key={i} className="bg-background border border-white/5 rounded-lg px-3 py-1.5 text-xs text-gray-300 hover:border-white/20 transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Projects */}
              <div className="bg-card border border-white/5 rounded-3xl p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <Zap className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold text-white">Top Projects</h2>
                </div>

                <div className="space-y-6">
                  {data.projects.map((proj, i) => (
                    <div key={i} className="pb-6 border-b border-white/5 last:border-0 last:pb-0">
                      <h3 className="text-base font-bold text-white mb-2">{proj.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4">{proj.desc}</p>
                      <div className="flex gap-2">
                        {proj.tags.map((tag, j) => (
                          <span key={j} className="text-[10px] font-bold text-gray-500 bg-background border border-white/5 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-card border border-white/5 rounded-3xl p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <Award className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold text-white">Achievements</h2>
                </div>

                <div className="space-y-6">
                  {data.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0 mt-2"></div>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-1 leading-snug">{ach.title}</h3>
                        <p className="text-[10px] text-gray-500">{ach.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Journey */}
            <div className="bg-card border border-white/5 rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-8">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-white">Progress Journey</h2>
              </div>

              <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[19px] before:-translate-x-px before:h-full before:w-px before:bg-white/10">
                {data.journey.map((step, i) => (
                  <div key={i} className="relative flex items-start group pb-8 last:pb-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 z-10 ${step.color}`}>
                      {step.icon === 'file-text' && <FileText className="w-4 h-4" />}
                      {step.icon === 'git-merge' && <Zap className="w-4 h-4" />}
                      {step.icon === 'message-square' && <Award className="w-4 h-4" />}
                    </div>

                    <div className="ml-6 w-full pt-1">
                      <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">{step.date}</div>
                      <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed max-w-xl">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default withAuth(MyProfile);
