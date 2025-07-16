import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/4.css';
import axios from '../axiosInstance';// Make sure this path is correct

function AdminLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/api/admin/login', formData);
    console.log('Login response:', res); // 🧪

    if (res.status === 200 && res.data.success) {
      localStorage.setItem('isAdmin', 'true');
      console.log('Admin logged in, navigating...');
      navigate('/admin');
    } else {
      alert('Invalid login (not 200 or success=false)');
    }
  } catch (err) {
    alert('Invalid admin credentials');
    console.error('Login error:', err.response?.data || err.message);
  }
};


  return (
    <div className="admin-login">
      <div className="background" />

      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
