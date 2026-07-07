import React, { useState, useRef } from 'react'
import { Upload, Link, Download, CheckCircle, AlertCircle, Star } from 'lucide-react'
import AppShell from '../components/AppShell'

export default function ResumeAnalyzer() {
  const [status, setStatus] = useState('idle') // idle | uploading | done
  const [fileName, setFileName] = useState('')
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef()

  const handleFile = file => {
    if (!file) return
    setFileName(file.name)
    setStatus('uploading')
    setTimeout(() => setStatus('done'), 2000)
  }

  const onDrop = e => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Resume AI Analyzer</h1>
        <div className="flex items-center gap-3">
          <button className="btn-ghost text-sm gap-1.5"><Download size={15} /> Download Report</button>
          <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xs font-bold">GK</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload zone */}
        <div
          className={`card min-h-[320px] flex flex-col items-center justify-center border-2 border-dashed transition-all cursor-pointer
            ${dragging ? 'border-primary bg-primary/5' : 'border-outline/40 hover:border-primary/40'}`}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
        >
          <input ref={fileRef} type="file" accept=".pdf,.docx" className="hidden"
            onChange={e => handleFile(e.target.files[0])} />
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
            <Upload size={28} className="text-primary" />
          </div>
          {status === 'idle' && (
            <>
              <p className="text-lg font-semibold mb-2">Drop your resume here</p>
              <p className="text-sm text-on-surface-muted text-center mb-6">Support for PDF, DOCX formats. AI will automatically scan and provide insights in seconds.</p>
              <div className="flex gap-3" onClick={e => e.stopPropagation()}>
                <button className="btn-primary text-sm" onClick={() => fileRef.current?.click()}>Select File</button>
                <button className="btn-ghost text-sm gap-1.5"><Link size={14} /> Scan URL</button>
              </div>
            </>
          )}
          {status === 'uploading' && (
            <>
              <p className="text-lg font-semibold mb-2">Analyzing {fileName}...</p>
              <div className="w-48 h-1.5 bg-outline/30 rounded-full overflow-hidden mt-3">
                <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
              <p className="text-sm text-on-surface-muted mt-2">AI processing your resume...</p>
            </>
          )}
          {status === 'done' && (
            <>
              <CheckCircle size={36} className="text-primary mb-3" />
              <p className="text-lg font-semibold mb-1">Analysis Complete!</p>
              <p className="text-sm text-on-surface-muted">{fileName}</p>
            </>
          )}
        </div>

        {/* Results panel */}
        <div className="card min-h-[320px]">
          {status === 'idle' && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full border-4 border-outline/30 border-t-primary animate-spin mb-4" style={{ animationDuration: '3s' }} />
              <p className="text-on-surface-muted text-sm">Upload a resume to see AI analysis</p>
            </div>
          )}
          {status === 'uploading' && (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full border-4 border-outline/30 border-t-primary animate-spin mb-4" />
              <p className="text-sm text-on-surface-muted">Scanning for ATS keywords...</p>
            </div>
          )}
          {status === 'done' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Analysis Results</h3>
                <span className="badge-green">Score: 85/100</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'ATS Compatibility', val: 88 },
                  { label: 'Technical Skills', val: 90 },
                  { label: 'Soft Skills', val: 72 },
                  { label: 'Grammar & Format', val: 95 },
                ].map(m => (
                  <div key={m.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-on-surface-muted">{m.label}</span>
                      <span className="font-medium text-primary">{m.val}%</span>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: `${m.val}%` }} />
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <CheckCircle size={14} className="text-primary" />
                      <span className="text-xs font-semibold text-primary">Strengths</span>
                    </div>
                    <ul className="text-xs text-on-surface-muted space-y-1">
                      <li>• Strong technical skills</li>
                      <li>• Good project experience</li>
                    </ul>
                  </div>
                  <div className="bg-red-400/10 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <AlertCircle size={14} className="text-red-400" />
                      <span className="text-xs font-semibold text-red-400">Weaknesses</span>
                    </div>
                    <ul className="text-xs text-on-surface-muted space-y-1">
                      <li>• Missing quantified achievements</li>
                      <li>• Insufficient internship details</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-amber/10 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Star size={14} className="text-amber" />
                    <span className="text-xs font-semibold text-amber">Suggestions</span>
                  </div>
                  <ul className="text-xs text-on-surface-muted space-y-1">
                    <li>• Add measurable outcomes to experience bullets</li>
                    <li>• Include GitHub portfolio links</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
