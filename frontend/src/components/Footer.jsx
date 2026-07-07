"use client";
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-white/5 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <div className="text-base font-bold text-white mb-2">CareerBridge AI</div>
          <div className="text-sm text-gray-500">
            © 2026 CareerBridge AI. Empowering the next generation of talent.
          </div>
        </div>

        <div className="flex space-x-8">
          <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">AI Ethics</Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Support</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
