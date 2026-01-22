import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-kanji">鬼滅</span>
          <span className="logo-text">Demon Slayer Wiki</span>
        </Link>

        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
          >
            <span className="link-icon">🏠</span>
            <span className="link-text">Accueil</span>
          </Link>

          <Link 
            to="/personnages" 
            className={`navbar-link ${isActive('/personnages') ? 'active' : ''}`}
          >
            <span className="link-icon">👥</span>
            <span className="link-text">Personnages</span>
          </Link>

          <Link 
            to="/breathing-styles" 
            className={`navbar-link ${isActive('/breathing-styles') ? 'active' : ''}`}
          >
            <span className="link-icon">🌊</span>
            <span className="link-text">Souffles</span>
          </Link>

          <Link 
            to="/blood-demon-arts" 
            className={`navbar-link ${isActive('/blood-demon-arts') ? 'active' : ''}`}
          >
            <span className="link-icon">🩸</span>
            <span className="link-text">Arts Démoniaques</span>
          </Link>

          <Link 
            to="/affiliations" 
            className={`navbar-link ${isActive('/affiliations') ? 'active' : ''}`}
          >
            <span className="link-icon">🏛️</span>
            <span className="link-text">Affiliations</span>
          </Link>

          <Link 
            to="/items" 
            className={`navbar-link ${isActive('/items') ? 'active' : ''}`}
          >
            <span className="link-icon">🗡️</span>
            <span className="link-text">Objets</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
