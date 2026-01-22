import { Link } from 'react-router-dom';
import './AffiliationCard.css';

function AffiliationCard({ affiliation }) {
  // Fonction pour obtenir la couleur selon le type
  const getTypeColor = (type) => {
    switch(type?.toLowerCase()) {
      case 'demon slayer':
        return '#4a9eff';
      case 'demon':
        return '#ff4444';
      case 'neutral':
        return '#ffd700';
      default:
        return '#888';
    }
  };

  // Fonction pour obtenir l'emoji selon le type
  const getTypeEmoji = (type) => {
    switch(type?.toLowerCase()) {
      case 'demon slayer':
        return '⚔️';
      case 'demon':
        return '👹';
      case 'neutral':
        return '⚖️';
      default:
        return '🏛️';
    }
  };

  return (
    <div className="affiliation-card">
      <div 
        className="affiliation-card-header"
        style={{ 
          background: `linear-gradient(135deg, ${getTypeColor(affiliation.type)}22 0%, transparent 100%)`
        }}
      >
        <div 
          className="affiliation-icon"
          style={{ color: getTypeColor(affiliation.type) }}
        >
          {getTypeEmoji(affiliation.type)}
        </div>
        <div 
          className="affiliation-type-badge"
          style={{ backgroundColor: getTypeColor(affiliation.type) }}
        >
          {affiliation.type}
        </div>
      </div>

      <div className="affiliation-card-content">
        <h3 className="affiliation-card-name">{affiliation.name}</h3>
        
        {affiliation.description && (
          <p className="affiliation-card-description">
            {affiliation.description.length > 120 
              ? affiliation.description.substring(0, 120) + '...' 
              : affiliation.description}
          </p>
        )}

        {!affiliation.description && (
          <p className="affiliation-card-no-desc">
            Aucune description disponible
          </p>
        )}

        <Link 
          to={`/affiliations/${affiliation.id}`} 
          className="affiliation-card-button"
          style={{ 
            background: `linear-gradient(135deg, ${getTypeColor(affiliation.type)} 0%, ${getTypeColor(affiliation.type)}cc 100%)`
          }}
        >
          Voir les détails
          <span className="button-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

export default AffiliationCard;
