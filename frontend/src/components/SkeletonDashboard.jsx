import React from 'react';
import Sidebar from './Sidebar';

export default function SkeletonDashboard() {
  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 pt-20 md:pt-8 p-4 md:p-8 overflow-y-auto w-full">
        <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center mb-8">
            <div className="h-10 bg-white/5 rounded-xl w-1/3"></div>
            <div className="h-10 bg-white/5 rounded-xl w-24"></div>
          </div>

          {/* Top Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-white/5 rounded-3xl border border-white/5"></div>
            ))}
          </div>

          {/* Main Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-white/5 rounded-3xl border border-white/5"></div>
              <div className="h-48 bg-white/5 rounded-3xl border border-white/5"></div>
            </div>
            <div className="space-y-6">
              <div className="h-[28rem] bg-white/5 rounded-3xl border border-white/5"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
