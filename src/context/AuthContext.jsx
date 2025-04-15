// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = async () => {
    try {
      await API.post("/admin-secured/logOut"); // ✅ Wait for the request to complete
    } catch (error) {
      console.error('Logout failed:', error);
    }
  
    setToken(null);
    localStorage.clear();
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy usage
export const useAuth = () => useContext(AuthContext);
