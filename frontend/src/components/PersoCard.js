import { Link } from 'react-router-dom';
import './PersoCard.css';

function PersoCard({ personnage }) {
  // Fonction pour obtenir la couleur selon le type
  const getTypeColor = (type) => {
    switch(type.toLowerCase()) {
      case 'human':
        return '#4a9eff';
      case 'demon':
        return '#ff4444';
      default:
        return '#888';
    }
  };

  // Fonction pour obtenir l'emoji selon le type
  const getTypeEmoji = (type) => {
    switch(type.toLowerCase()) {
      case 'human':
        return '⚔️';
      case 'demon':
        return '👹';
      default:
        return '❓';
    }
  };

  // Tronquer la description
  const truncateDescription = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="perso-card">
      <div className="perso-card-image">
        <img 
          src={personnage.image || 'https://via.placeholder.com/300x400?text=No+Image'} 
          alt={personnage.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        <div 
          className="perso-card-type-badge" 
          style={{ backgroundColor: getTypeColor(personnage.character_type) }}
        >
          <span className="type-emoji">{getTypeEmoji(personnage.character_type)}</span>
          {personnage.character_type}
        </div>
      </div>

      <div className="perso-card-content">
        <h3 className="perso-card-name">{personnage.name}</h3>
        
        {personnage.rank && (
          <div className="perso-card-rank">
            <span className="rank-icon">🏅</span>
            <span>{personnage.rank}</span>
          </div>
        )}

        {personnage.status && (
          <div className={`perso-card-status status-${personnage.status.toLowerCase()}`}>
            <span className="status-dot"></span>
            {personnage.status}
          </div>
        )}

        <p className="perso-card-description">
          {truncateDescription(personnage.description)}
        </p>

        <Link 
          to={`/personnages/${personnage.id}`} 
          className="perso-card-button"
        >
          Voir le profil
          <span className="button-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

export default PersoCard;
