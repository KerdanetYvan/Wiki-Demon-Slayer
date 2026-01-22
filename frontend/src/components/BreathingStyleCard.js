import { Link } from 'react-router-dom';
import './BreathingStyleCard.css';

function BreathingStyleCard({ breathingStyle }) {
  // Fonction pour obtenir la couleur selon le nom
  const getStyleColor = (name) => {
    const nameLower = name?.toLowerCase() || '';
    if (nameLower.includes('eau') || nameLower.includes('water')) return '#4a9eff';
    if (nameLower.includes('feu') || nameLower.includes('flame') || nameLower.includes('flamme')) return '#ff6b35';
    if (nameLower.includes('tonnerre') || nameLower.includes('thunder')) return '#ffd700';
    if (nameLower.includes('pierre') || nameLower.includes('stone')) return '#8b7355';
    if (nameLower.includes('vent') || nameLower.includes('wind')) return '#7dd3c0';
    if (nameLower.includes('son') || nameLower.includes('sound')) return '#ff1493';
    if (nameLower.includes('brume') || nameLower.includes('mist')) return '#b0e0e6';
    if (nameLower.includes('serpent') || nameLower.includes('serpent')) return '#9370db';
    if (nameLower.includes('fleur') || nameLower.includes('flower')) return '#ffb6c1';
    if (nameLower.includes('insecte') || nameLower.includes('insect')) return '#da70d6';
    if (nameLower.includes('amour') || nameLower.includes('love')) return '#ff69b4';
    if (nameLower.includes('soleil') || nameLower.includes('sun')) return '#ff4444';
    if (nameLower.includes('lune') || nameLower.includes('moon')) return '#4b0082';
    return '#4a9eff';
  };

  // Fonction pour obtenir l'emoji selon le nom
  const getStyleEmoji = (name) => {
    const nameLower = name?.toLowerCase() || '';
    if (nameLower.includes('eau') || nameLower.includes('water')) return '💧';
    if (nameLower.includes('feu') || nameLower.includes('flame') || nameLower.includes('flamme')) return '🔥';
    if (nameLower.includes('tonnerre') || nameLower.includes('thunder')) return '⚡';
    if (nameLower.includes('pierre') || nameLower.includes('stone')) return '🪨';
    if (nameLower.includes('vent') || nameLower.includes('wind')) return '💨';
    if (nameLower.includes('son') || nameLower.includes('sound')) return '🔊';
    if (nameLower.includes('brume') || nameLower.includes('mist')) return '🌫️';
    if (nameLower.includes('serpent') || nameLower.includes('serpent')) return '🐍';
    if (nameLower.includes('fleur') || nameLower.includes('flower')) return '🌸';
    if (nameLower.includes('insecte') || nameLower.includes('insect')) return '🦋';
    if (nameLower.includes('amour') || nameLower.includes('love')) return '💖';
    if (nameLower.includes('soleil') || nameLower.includes('sun')) return '☀️';
    if (nameLower.includes('lune') || nameLower.includes('moon')) return '🌙';
    return '🌊';
  };

  const styleColor = getStyleColor(breathingStyle.name);

  return (
    <div className="breathing-card">
      <div 
        className="breathing-card-header"
        style={{ 
          background: `linear-gradient(135deg, ${styleColor}22 0%, transparent 100%)`
        }}
      >
        <div 
          className="breathing-icon"
          style={{ color: styleColor }}
        >
          {getStyleEmoji(breathingStyle.name)}
        </div>
        {breathingStyle.sword_color && (
          <div 
            className="sword-color-badge"
            style={{ backgroundColor: breathingStyle.sword_color }}
          >
            Lame {breathingStyle.sword_color}
          </div>
        )}
      </div>

      <div className="breathing-card-content">
        <h3 className="breathing-card-name">{breathingStyle.name}</h3>
        
        {breathingStyle.traducted_name && (
          <p className="breathing-card-traducted">
            {breathingStyle.traducted_name}
          </p>
        )}

        {breathingStyle.description && (
          <p className="breathing-card-description">
            {breathingStyle.description.length > 120 
              ? breathingStyle.description.substring(0, 120) + '...' 
              : breathingStyle.description}
          </p>
        )}

        {!breathingStyle.description && (
          <p className="breathing-card-no-desc">
            Aucune description disponible
          </p>
        )}

        {breathingStyle.derived_from && (
          <div className="derived-badge">
            <span className="derived-icon">↳</span>
            Dérivé de: {breathingStyle.derived_from}
          </div>
        )}

        <Link 
          to={`/breathing-styles/${breathingStyle.id}`} 
          className="breathing-card-button"
          style={{ 
            background: `linear-gradient(135deg, ${styleColor} 0%, ${styleColor}cc 100%)`
          }}
        >
          Voir les détails
          <span className="button-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

export default BreathingStyleCard;
