"use client";
import React, { useState } from 'react';
import { ArrowLeft, Save, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProfile, updateProfile, uploadAvatar, resolveAvatarUrl } from '../services/apiService';
import { useUnsavedChanges } from '../hooks/useUnsavedChanges';
import { toast } from 'react-hot-toast';
import { withAuth } from '../components/withAuth';

import { AuthContext } from '../context/AuthContext';

const EditProfile = () => {
  const router = useRouter();
  const { updateUser } = React.useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    graduation_year: "",
    branch: "",
    bio: "",
    professional_title: "",
    college: "",
    address: "",
    linkedin_link: "",
    github_link: "",
    portfolio_link: "",
    avatar: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useUnsavedChanges(isDirty);

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
          bio: data.bio || "",
          professional_title: data.professional_title || "",
          college: data.college || "",
          address: data.address || "",
          linkedin_link: data.linkedin_link || "",
          github_link: data.github_link || "",
          portfolio_link: data.portfolio_link || "",
          avatar: data.profile?.avatar || ""
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
    setIsDirty(true);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be under 2MB.");
      return;
    }
    try {
      toast.loading('Uploading avatar...', { id: 'avatar-upload' });
      const result = await uploadAvatar(file);
      const avatarUrl = result.avatar_url;
      setFormData(prev => ({ ...prev, avatar: avatarUrl }));
      updateUser({ avatar: avatarUrl });
      toast.success('Avatar uploaded!', { id: 'avatar-upload' });
    } catch (err) {
      toast.error(err.message || 'Avatar upload failed.', { id: 'avatar-upload' });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Send profile data (avatar is excluded from allowed_fields on backend, handled separately)
      const { avatar, ...profilePayload } = formData;
      await updateProfile(profilePayload);
      setIsDirty(false);
      updateUser({ name: formData.name, avatar: formData.avatar });
      toast.success('Profile updated successfully!');
      router.push('/profile');
    } catch (err) {
      toast.error('Failed to update profile.');
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

          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-28 h-28 md:w-24 md:h-24 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0 overflow-hidden">
              {formData.avatar ? (
                <img src={resolveAvatarUrl(formData.avatar)} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 md:w-10 md:h-10 text-primary" />
              )}
            </div>
            <div className="flex flex-col items-center md:items-start justify-center pt-2">
              <label className="cursor-pointer bg-white/5 border border-white/10 text-white px-5 py-2.5 md:px-4 md:py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors mb-2 w-full md:w-auto text-center">
                Change Avatar
                <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleAvatarChange} />
              </label>
              <p className="text-xs text-gray-500">Recommended: Square JPG, PNG. Max 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full bg-background/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-gray-400 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Graduation Year</label>
              <input
                type="text"
                name="graduation_year"
                value={formData.graduation_year}
                onChange={handleChange}
                className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Major / Department</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Professional Title</label>
              <input
                type="text"
                name="professional_title"
                value={formData.professional_title}
                onChange={handleChange}
                placeholder="e.g. Full Stack Developer"
                className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">College / University</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">LinkedIn URL</label>
              <input
                type="text"
                name="linkedin_link"
                value={formData.linkedin_link}
                onChange={handleChange}
                className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">GitHub URL</label>
              <input
                type="text"
                name="github_link"
                value={formData.github_link}
                onChange={handleChange}
                className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Portfolio Website</label>
              <input
                type="text"
                name="portfolio_link"
                value={formData.portfolio_link}
                onChange={handleChange}
                className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Bio / Summary</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors custom-scrollbar"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading || isSaving}
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-background font-bold px-8 py-3.5 md:py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-[0_0_15px_rgba(95,227,160,0.3)]"
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

export default withAuth(EditProfile);
