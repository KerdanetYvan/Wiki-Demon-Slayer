import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="error-code">
          <span className="four">4</span>
          <span className="zero">👹</span>
          <span className="four">4</span>
        </div>
        
        <h1 className="error-title">
          <span className="kanji-small">迷子</span>
          Page Introuvable
        </h1>
        
        <p className="error-message">
          Le démon que vous recherchez n'existe pas dans ce monde...
        </p>
        
        <div className="error-details">
          <p>Cette page a été dévorée par un démon ou n'a jamais existé.</p>
          <p>Retournez au quartier général avant qu'il ne soit trop tard !</p>
        </div>

        <div className="notfound-actions">
          <Link to="/" className="home-button">
            <span className="button-icon">🏠</span>
            Retour à l'accueil
          </Link>
          <Link to="/personnages" className="personnages-button">
            <span className="button-icon">⚔️</span>
            Voir les Personnages
          </Link>
        </div>

        <div className="demon-art">
          <div className="blood-splatter"></div>
          <div className="blood-splatter"></div>
          <div className="blood-splatter"></div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;