import React from 'react';
import '../styles/3.css'; // Make sure this includes footer styles or add them below

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} | NIC Blog. All rights reserved.</p>
        <p>Made with ❤️ by NIC Web Team</p>
      </div>
    </footer>
  );
}

export default Footer;
