"use client";
import React, { useState } from 'react';
import { ArrowLeft, Save, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { getProfile, updateProfile } from '../services/apiService';

const EditProfile = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    graduation_year: "",
    branch: "",
    bio: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          graduation_year: data.graduation_year || "",
          branch: data.branch || "",
          bio: data.bio || "Update your bio."
        });
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(formData);
      alert("Profile saved successfully!");
      router.push('/profile');
    } catch (err) {
      console.error("Failed to save profile", err);
      alert("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
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
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-background/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-gray-400 cursor-not-allowed"
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
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Graduation Year</label>
                <input 
                  type="text" 
                  name="graduation_year"
                  value={formData.graduation_year}
                  onChange={handleChange}
                  className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Major / Department</label>
                <input 
                  type="text" 
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
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

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={isLoading || isSaving}
              className="bg-primary hover:bg-primary/90 text-background font-bold px-8 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-[0_0_15px_rgba(95,227,160,0.3)]"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>

      </main>
    </div>
  );
};

export default EditProfile;
