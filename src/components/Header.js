import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">SkillCoders</Link>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/courses">COURSES</Link></li>
            <li><Link to="/gadgets">GADGETS</Link></li>
            <li><Link to="/websites">WEBSITES</Link></li>
            <li><Link to="/career">CAREER</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;