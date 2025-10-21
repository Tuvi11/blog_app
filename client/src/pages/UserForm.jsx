import React, { useState, useEffect } from 'react';
import bgVideo from '../assets/ties.mp4';
import introVideo from '../assets/cross.mp4';
import '../styles/1.css';
import BlogList from './BlogList';
import Footer from '../components/Footer';

function UserForm() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideUp(true);           // Start slide-up animation
      setTimeout(() => setShowMainContent(true), 1000); // Show main content after slide-up
    }, 3000); // Intro duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="user-form-wrapper">
      {/* INTRO SECTION */}
      {!showMainContent && (
        <div className={`intro-screen ${slideUp ? 'slide-up' : ''}`}>
          <video src={introVideo} autoPlay muted loop className="intro-video" />
          <div className="rotating-text">
            <span>WELCOME TO SOUJANYA'S BLOG • WELCOME TO SOUJANYA'S BLOG •</span>
          </div>
        </div>
      )}

      {/* BLOG SECTION */}
      {showMainContent && (
        <div className="main-content fade-in">
          <video autoPlay muted loop playsInline className="bg-video">
            <source src={bgVideo} type="video/mp4" />
          </video>
          <BlogList />
          
        </div>
      )}
    </div>
  );
}

export default UserForm;
