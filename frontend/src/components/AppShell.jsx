import React from 'react'
import Sidebar from './Sidebar'
import Footer from './Footer'

export default function AppShell({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
