"use client";
import React from 'react';
import Link from 'next/link';
import logo from '../../assets/images/CareerBridge-AI.png';

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-white/5 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row flex-wrap items-center md:items-start lg:items-center justify-between gap-y-10 md:gap-y-6">
          
          <div className="w-full md:w-1/2 lg:w-auto flex flex-col items-center md:items-start text-center md:text-left order-1">
            <div className="mb-2 lg:mb-1 flex items-center space-x-2">
              <img src={logo.src} alt="CareerBridge AI" className="h-8 w-auto object-contain" />
              <div className="text-xl md:text-base font-bold text-white">CareerBridge AI</div>
            </div>
            
            {/* Mobile-only Description */}
            <div className="text-sm text-gray-500 leading-relaxed md:hidden max-w-[260px]">
              <span className="block mb-1">© 2026 CareerBridge AI</span>
              <span className="block">Empowering the next generation of talent.</span>
            </div>
            
            {/* Desktop-only Description */}
            <div className="text-sm text-gray-500 hidden lg:block mt-1">
              © 2026 CareerBridge AI. Empowering the next generation of talent.
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-auto flex flex-col md:flex-row items-center md:justify-end space-y-3 md:space-y-0 md:space-x-8 order-2">
            <Link href="#" className="w-full md:w-auto text-center text-sm font-medium md:font-normal text-gray-400 hover:text-white transition-colors min-h-[44px] md:min-h-0 flex items-center justify-center">Privacy Policy</Link>
            <Link href="#" className="w-full md:w-auto text-center text-sm font-medium md:font-normal text-gray-400 hover:text-white transition-colors min-h-[44px] md:min-h-0 flex items-center justify-center">Terms of Service</Link>
            <Link href="#" className="w-full md:w-auto text-center text-sm font-medium md:font-normal text-gray-400 hover:text-white transition-colors min-h-[44px] md:min-h-0 flex items-center justify-center">AI Ethics</Link>
            <Link href="#" className="w-full md:w-auto text-center text-sm font-medium md:font-normal text-gray-400 hover:text-white transition-colors min-h-[44px] md:min-h-0 flex items-center justify-center">Contact Support</Link>
          </div>

          {/* Tablet-only Description */}
          <div className="hidden md:block lg:hidden w-full text-sm text-gray-500 order-3 pt-6 mt-2 border-t border-white/5">
            © 2026 CareerBridge AI. Empowering the next generation of talent.
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
