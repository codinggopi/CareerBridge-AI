"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '../../assets/images/CareerBridge-AI.png';

const useLocation = () => ({ pathname: usePathname() });

const Topbar = () => {
  const location = useLocation();
  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Resume', path: '/resume/analyze' },
    { name: 'Interviews', path: '/interview' },
    { name: 'Resources', path: '/learning/resources' }
  ];

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-5 border-b border-white/5">
      <div className="flex items-center space-x-12">
        <Link href="/" className="flex items-center space-x-2">
          <img src={logo.src} alt="CareerBridge AI" className="h-8 w-auto object-contain" />
          <div className="text-xl font-bold"><span className="text-white">CareerBridge </span><span className="text-primary">AI</span></div>
        </Link>
        <nav className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-sm transition-colors ${link.name === 'Dashboard' && location.pathname === '/'
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-gray-400 hover:text-white pb-1'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4 md:space-x-6">
        <Link href="/sign-in" className="text-sm text-gray-300 hover:text-white transition-colors">
          Sign In
        </Link>
        <Link
          href="/register"
          className="hidden sm:inline-block bg-primary text-background px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
