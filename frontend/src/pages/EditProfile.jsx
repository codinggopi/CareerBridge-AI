"use client";
import React, { useState } from 'react';
import { ArrowLeft, Save, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EditProfile = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "Alexander Forge",
    email: "alexander.f@university.edu",
    phone: "+1 (555) 0123-4567",
    graduationYear: "2025",
    major: "Computer Science",
    bio: "Passionate about building scalable web applications and learning new technologies."
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here we would call an API to save the profile
    alert("Profile saved successfully!");
    router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/profile" className="p-2 rounded-full bg-card border border-white/10 hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Edit Profile</h1>
            <p className="text-sm text-gray-400">Update your personal information and career details.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="max-w-3xl bg-card border border-white/5 rounded-2xl p-8 space-y-8">
          
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div>
              <button type="button" className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors mb-2">
                Change Avatar
              </button>
              <p className="text-xs text-gray-500">Recommended: Square JPG, PNG. Max 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Full Name</label>
              <input 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                className="w-full bg-background border border-white/5 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Email Address</label>
              <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full bg-background border border-white/5 rounded-lg py-3 px-4 text-sm text-gray-300 focus:outline-none focus:border-white/20 transition-colors" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Phone Number</label>
              <input 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className="w-full bg-background border border-white/5 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Graduation Year</label>
              <input 
                name="graduationYear" 
                value={formData.graduationYear} 
                onChange={handleChange} 
                className="w-full bg-background border border-white/5 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors" 
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-400 mb-2">Major / Field of Study</label>
              <input 
                name="major" 
                value={formData.major} 
                onChange={handleChange} 
                className="w-full bg-background border border-white/5 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors" 
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-400 mb-2">Bio / Summary</label>
              <textarea 
                name="bio" 
                value={formData.bio} 
                onChange={handleChange} 
                rows="4"
                className="w-full bg-background border border-white/5 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors custom-scrollbar" 
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/5">
            <button type="submit" className="bg-primary text-[#0B0F17] px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>

      </main>
    </div>
  );
};

export default EditProfile;
