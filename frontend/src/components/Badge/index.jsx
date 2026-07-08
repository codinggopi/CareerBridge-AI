import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const baseStyles = "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border";
  
  const variants = {
    default: "bg-background border-white/10 text-gray-400",
    primary: "bg-primary/10 border-primary/30 text-primary",
    success: "bg-[#11241C] border-primary/30 text-primary",
    warning: "bg-orange-400/10 border-orange-400/30 text-orange-400",
    danger: "bg-red-400/10 border-red-400/30 text-red-400",
    info: "bg-blue-400/10 border-blue-400/30 text-blue-400"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;