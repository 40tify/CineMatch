import React, { createContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth';

// Create AuthContext
export const AuthContext = createContext();

// AuthContextProvider component
export function AuthContextProvider({ children }) {
  // User state (null if not logged in)
  const [user, setUser] = useState(() => {
    // Try to load user from localStorage
    const stored = localStorage.getItem('cinematch_user');
    return stored ? JSON.parse(stored) : null;
  });

  // Save user to localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem('cinematch_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cinematch_user');
    }
  }, [user]);

  // Login function
  const login = async (email, password) => {
    const res = await authApi.login(email, password);
    if (res.success) setUser(res.user);
    return res;
  };

  // Register function
  const register = async (username, email, password) => {
    return await authApi.register(username, email, password);
  };

  // Logout function
  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
} 