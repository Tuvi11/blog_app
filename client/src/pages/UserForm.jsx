import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import bgVideo from '../assets/ties.mp4';
import introVideo from '../assets/cross.mp4';
import axios from '../axiosInstance';
import '../styles/1.css';

function UserForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [slideUp, setSlideUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideUp(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', formData);
      navigate('/blogs');
    } catch (err) {
      alert('Failed to register user.');
      console.error(err);
    }
  };

  return (
    <>
      {/* Intro with cross.mp4 */}
      <div className={`intro-screen ${slideUp ? 'slide-up' : ''}`}>
        <video src={introVideo} autoPlay muted loop className="intro-video" />
        <div className="rotating-text">
          <span>WELCOME TO SOUJANYA'S BLOG • WELCOME TO SOUJANYA'S BLOG •</span>
        </div>
      </div>

      {/* Main form with ties.mp4 */}
      <div className="main-content">
        <video autoPlay muted loop playsInline className="bg-video">
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="form-container">
          <form className="glass-form" onSubmit={handleSubmit}>
            <h2>Enter to View Blog</h2>
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <button type="submit">Continue</button>
          </form>
          <div className="admin-link">
            <a href="/admin-login">Soujanya</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserForm;
