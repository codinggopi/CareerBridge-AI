"use client";
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Mock check for authentication token
    const token = typeof window !== 'undefined' ? (localStorage.getItem('careerbridge_token') || sessionStorage.getItem('careerbridge_token')) : null;
    const userStr = typeof window !== 'undefined' ? (localStorage.getItem('careerbridge_user') || sessionStorage.getItem('careerbridge_user')) : null;
    if (token && userStr) {
      setIsAuthenticated(true);
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (token, userObj = null, rememberMe = true) => {
    if (rememberMe) {
      localStorage.setItem('careerbridge_token', token);
      if (userObj) localStorage.setItem('careerbridge_user', JSON.stringify(userObj));
    } else {
      sessionStorage.setItem('careerbridge_token', token);
      if (userObj) sessionStorage.setItem('careerbridge_user', JSON.stringify(userObj));
    }
    setIsAuthenticated(true);
    if (userObj) setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem('careerbridge_token');
    localStorage.removeItem('careerbridge_user');
    sessionStorage.removeItem('careerbridge_token');
    sessionStorage.removeItem('careerbridge_user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = (updatedFields) => {
    const newUser = { ...user, ...updatedFields };
    setUser(newUser);
    if (localStorage.getItem('careerbridge_user')) {
      localStorage.setItem('careerbridge_user', JSON.stringify(newUser));
    } else if (sessionStorage.getItem('careerbridge_user')) {
      sessionStorage.setItem('careerbridge_user', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};