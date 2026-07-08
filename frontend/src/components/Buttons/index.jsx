import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all rounded-xl";
  
  const variants = {
    primary: "bg-primary text-[#0B0F17] hover:bg-primary/90 shadow-[0_4px_14px_0_rgba(95,227,160,0.39)]",
    secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
    outline: "bg-transparent border border-primary/30 text-primary hover:bg-primary/10",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;