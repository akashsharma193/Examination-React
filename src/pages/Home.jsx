import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { logout } = useAuth(); // 👈 context se logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // token remove
    navigate('/login'); // login page pe bhej do
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>This is secured Home Page</h1>
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
}
