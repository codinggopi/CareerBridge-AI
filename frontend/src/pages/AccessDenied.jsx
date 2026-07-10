import React from 'react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-card border border-white/5 rounded-2xl p-12 max-w-lg w-full shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <ShieldAlert className="w-10 h-10 text-red-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-gray-400 mb-8 leading-relaxed">
              You do not have the required permissions to view this page. If you believe this is an error, please contact support.
            </p>
            
            <Link 
              href="/dashboard"
              className="bg-primary text-background px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
