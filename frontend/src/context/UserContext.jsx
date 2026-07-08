"use client";
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Mock fetch user profile
    setUser({
      name: "Alex Rivera",
      role: "Software Engineering Student",
      avatar: "https://i.pravatar.cc/150?u=alex"
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};