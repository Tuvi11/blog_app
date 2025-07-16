import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/4.css';
import axios from '../axiosInstance';// Make sure this path is correct

function AdminLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     await axios.post('/api/admin/login', formData);
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } catch (err) {
      alert('Invalid admin credentials');
      console.error(err);
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
