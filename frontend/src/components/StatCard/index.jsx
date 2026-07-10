import React, { memo } from 'react';

const StatCard = memo(({ title, value, icon: Icon, trend, trendValue, iconColor = 'text-primary', className = '' }) => {
  return (
    <div className={`bg-card border border-white/5 rounded-2xl p-6 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl bg-background border border-white/5 flex items-center justify-center ${iconColor}`}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        {trend && (
          <div className={`text-xs font-bold px-2 py-1 rounded-full ${
            trend === 'up' ? 'text-primary bg-primary/10' : 
            trend === 'down' ? 'text-red-400 bg-red-400/10' : 
            'text-gray-400 bg-gray-400/10'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '-'} {trendValue}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
        <div className="text-3xl font-bold text-white">{value}</div>
      </div>
    </div>
  );
});

export default StatCard;