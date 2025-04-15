import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Compliances from './pages/compliances';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { token } = useAuth();

  return (
    <Routes>
      {!token && (
        <>
          <Route path="/" element={<Compliances />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Navigate to="/login" replace />} />
        </>
      )}

      {token && (
        <>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </>
      )}
    </Routes>
  );
}
