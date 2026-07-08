import React from 'react';

const ProgressBar = ({ label, progress, color = 'bg-primary', showPercentage = true, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          {showPercentage && <span className="text-xs font-bold text-gray-400">{progress}%</span>}
        </div>
      )}
      <div className="w-full bg-background h-2 rounded-full overflow-hidden border border-white/5">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out`} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;