import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-outline/20 mt-auto py-6 px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        <div>
          <p className="text-sm font-semibold text-primary">CareerForge AI</p>
          <p className="text-xs text-on-surface-muted">
            © 2024 CareerForge AI. Empowering the next generation of talent.
          </p>
        </div>
        <div className="flex gap-4 text-xs text-on-surface-muted">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">AI Ethics</a>
          <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}
