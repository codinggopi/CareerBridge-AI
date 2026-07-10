import React, { useState } from 'react';
import { Eye, EyeOff, Lock, KeyRound, Check, X } from 'lucide-react';
import { validatePassword } from '../../utils/passwordValidation';

const PasswordSecurity = ({ 
  password, 
  setPassword, 
  confirmPassword = null, 
  setConfirmPassword = null, 
  name = '', 
  email = '',
  label = "Password",
  confirmLabel = "Confirm Password",
  showConfirm = true
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const validation = validatePassword(password, name, email);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const requirements = [
    { key: 'length', text: 'At least 8 characters' },
    { key: 'uppercase', text: 'Uppercase letter (A-Z)' },
    { key: 'lowercase', text: 'Lowercase letter (a-z)' },
    { key: 'number', text: 'Number (0-9)' },
    { key: 'specialChar', text: 'Special character (!@#...)' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{label}</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-background border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
            tabIndex="-1"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {(isFocused || password.length > 0) && (
        <div className="bg-background/50 border border-white/5 rounded-xl p-4 animate-in fade-in duration-300">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-400">Password Strength:</span>
            <span className={`text-xs font-bold ${validation.strengthTextClass}`}>{validation.strengthLabel}</span>
          </div>
          
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((level) => (
              <div 
                key={level} 
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  level <= validation.score ? validation.strengthColor : 'bg-gray-800'
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {requirements.map((req) => {
              const isMet = validation[req.key];
              return (
                <div key={req.key} className="flex items-center space-x-2 text-xs">
                  {isMet ? (
                    <Check className="w-3.5 h-3.5 text-primary" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-gray-600" />
                  )}
                  <span className={isMet ? "text-gray-300" : "text-gray-500"}>{req.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showConfirm && (
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{confirmLabel}</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <KeyRound className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full bg-background border rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all ${
                confirmPassword 
                  ? (passwordsMatch ? 'border-primary/50 focus:ring-primary/50' : 'border-red-500/50 focus:ring-red-500/50')
                  : 'border-white/10 focus:border-primary/50 focus:ring-primary/50'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
              tabIndex="-1"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {confirmPassword && (
            <p className={`text-xs mt-2 ${passwordsMatch ? 'text-primary' : 'text-red-400'}`}>
              {passwordsMatch ? 'Passwords match.' : 'Passwords do not match.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordSecurity;
