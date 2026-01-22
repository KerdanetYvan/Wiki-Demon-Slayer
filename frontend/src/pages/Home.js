import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">
            <span className="kanji">鬼滅の刃</span>
            <span className="title-main">DEMON SLAYER</span>
            <span className="title-sub">Kimetsu no Yaiba Wiki</span>
          </h1>
          
          <p className="hero-description">
            Plongez dans l'univers de Demon Slayer et découvrez tous les personnages, 
            techniques de respiration, arts démoniaques et bien plus encore.
          </p>

          <div className="cta-buttons">
            <Link to="/personnages" className="cta-button primary">
              <span className="button-icon">⚔️</span>
              Découvrir les Personnages
            </Link>
            <Link to="/breathing-styles" className="cta-button secondary">
              <span className="button-icon">🌊</span>
              Techniques de Respiration
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Personnages</h3>
          <p>Explorez les profils détaillés des pourfendeurs de démons et des démons</p>
          <Link to="/personnages" className="feature-link">Explorer →</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Techniques</h3>
          <p>Découvrez les souffles et les arts du sang démoniaques</p>
          <Link to="/techniques" className="feature-link">Explorer →</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🏛️</div>
          <h3>Affiliations</h3>
          <p>Les différentes organisations du monde de Demon Slayer</p>
          <Link to="/affiliations" className="feature-link">Explorer →</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🗡️</div>
          <h3>Objets</h3>
          <p>Armes, équipements et objets légendaires</p>
          <Link to="/items" className="feature-link">Explorer →</Link>
        </div>
      </div>

      <footer className="home-footer">
        <p>© 2026 Demon Slayer Wiki - Fan made project</p>
      </footer>
    </div>
  );
}

export default Home;