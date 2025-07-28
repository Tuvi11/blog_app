import React from 'react';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="blog-footer">
      <div className="footer-container">
        <p>&copy;  | My Blog App</p>
        <p>Crafted by Soujanya Maharudra</p>
         <a href="mailto:soujanyabailawad@gmail.com" style={{ color: '#DAC1B1', textDecoration: 'none' }}>
         mail
  </a>
      </div>
    </footer>
  );
}

export default Footer;
