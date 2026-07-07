"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, FileText, Compass, MessageSquare,
  Target, Settings, HelpCircle, LogOut
} from 'lucide-react';
const useLocation = () => ({ pathname: usePathname() });

const Sidebar = ({ role = 'Premium Tier' }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: role.includes('Admin') ? '/admin' : '/dashboard', icon: LayoutDashboard },
    { name: 'AI Coach', path: '/coach', icon: MessageSquare },
    { name: 'Resume AI', path: '/resume/analyze', icon: FileText },
    { name: 'Skill Gap', path: '/skill-gap', icon: Compass },
    { name: 'Mock Interview', path: '/interview', icon: MessageSquare },
    { name: 'Roadmap', path: '/roadmap', icon: Compass },
    { name: 'Resources', path: '/resources', icon: Target },
    { name: 'Readiness', path: '/readiness', icon: Target },
    { name: 'My Profile', path: '/profile', icon: FileText },
    { name: 'Notifications', path: '/notifications', icon: Settings },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-background border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <Link href="/" className="text-xl font-bold font-serif tracking-wide text-primary block">
          CareerBridge AI
        </Link>
        <div className="text-xs text-gray-500 mt-1">{role}</div>
      </div>

      <nav className="flex-1 mt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center space-x-3 px-6 py-3.5 mb-1 transition-colors relative ${isActive
                ? 'text-primary bg-primary/5'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r"></div>
              )}
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 space-y-4">
        <button className="w-full bg-primary text-[#0B0F17] rounded-lg py-3 text-sm font-bold hover:bg-primary/90 transition-colors">
          Analyze Resume
        </button>
        <Link href="/help" className="flex items-center space-x-3 text-gray-400 hover:text-gray-200 transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Help Center</span>
        </Link>
        <Link href="/sign-in" className="flex items-center space-x-3 text-red-400 hover:text-red-300 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
