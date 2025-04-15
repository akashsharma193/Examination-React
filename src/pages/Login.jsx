import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios'; // adjust path as needed
import {useAuth} from "../context/AuthContext"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/admin-open/login', {
        email,
        password,
      });
  
      const token = response.data?.data;
      if (token) {
        alert("Login Successfully")
        login(token); // context se token set
        navigate('/home'); // auto rerender hoga
      } else {
        alert('Login failed: Token not received');
      }
    } catch (error) {
      alert('Login failed: ' + (error?.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">← Compliances</Link>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password: </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" style={{ marginTop: '15px' }}>Login</button>
      </form>
    </div>
  );
}
