import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/team">Our Team</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><Link to="/web-dev">Web Development</Link></li>
            <li><Link to="/frontend">Frontend Training</Link></li>
            <li><Link to="/backend">Backend Training</Link></li>
            <li><Link to="/cybersecurity">Cybersecurity</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/docs">Documentation</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Contact</h4>
          <p>info@skillcoders.com</p>
          <p>+91 9177331409</p>
          <p>Vizag</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 SkillCoders. All rights reserved. Designed by Buildurite.ai</p>
      </div>
    </footer>
  );
};

export default Footer;