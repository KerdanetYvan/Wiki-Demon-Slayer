import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './BreathingStyle.css';

function BreathingStyle() {
    const [breathingData, setBreathingData] = useState(null);
    const [techniques, setTechniques] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBreathingStyle() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/breathing_styles/${id}/`);
                if (!response.ok) {
                    throw new Error('Souffle non trouvé');
                }
                const data = await response.json();
                setBreathingData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchBreathingStyle();
        async function fetchTechniques() {
            if (!id) return;
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/techniques/?search=${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setTechniques(data);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des techniques:', error);
            }
        }
        fetchTechniques();
    }, [id]);

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
        return '#7dd3c0';
    };

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

    if (loading) {
        return (
            <div className="breathing-style-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement du souffle...</p>
                </div>
            </div>
        );
    }

    if (error || !breathingData) {
        return (
            <div className="breathing-style-page">
                <div className="error-container">
                    <span className="error-icon">😢</span>
                    <h2>Souffle introuvable</h2>
                    <p>Cette technique de respiration n'existe pas ou a été oubliée...</p>
                    <Link to="/breathing-styles" className="back-button">
                        ← Retour aux souffles
                    </Link>
                </div>
            </div>
        );
    }

    const styleColor = getStyleColor(breathingData.name);

    return (
        <div className="breathing-style-page">
            <button onClick={() => navigate(-1)} className="back-nav">
                ← Retour
            </button>

            <div className="breathing-style-container">
                {/* Hero Section */}
                <div className="breathing-style-hero" style={{
                    background: `radial-gradient(circle at 50% 50%, ${styleColor}15, transparent 70%)`
                }}>
                    <div 
                        className="breathing-icon-large"
                        style={{ color: styleColor }}
                    >
                        {getStyleEmoji(breathingData.name)}
                    </div>

                    <div className="breathing-header">
                        <h1 className="breathing-name" style={{
                            textShadow: `0 0 30px ${styleColor}80`
                        }}>
                            {breathingData.name}
                        </h1>

                        {breathingData.traducted_name && (
                            <p className="breathing-traducted">
                                {breathingData.traducted_name}
                            </p>
                        )}

                        {breathingData.description && (
                            <p className="breathing-description-hero">
                                {breathingData.description}
                            </p>
                        )}

                        {!breathingData.description && (
                            <p className="breathing-no-description">
                                Aucune description disponible pour ce souffle.
                            </p>
                        )}
                    </div>
                </div>

                {/* Wiki Content */}
                <div className="wiki-content">
                    {/* Characteristics Section */}
                    <section className="wiki-section" style={{ borderLeftColor: styleColor }}>
                        <h2 className="section-title" style={{ color: styleColor }}>
                            <span className="section-icon">⚡</span>
                            Caractéristiques
                        </h2>
                        <div className="characteristics-grid">
                            {breathingData.sword_color && (
                                <div className="characteristic-item">
                                    <span className="char-label">Couleur de lame:</span>
                                    <div className="sword-color-display">
                                        <div 
                                            className="sword-color-sample"
                                            style={{ backgroundColor: breathingData.sword_color }}
                                        ></div>
                                        <span className="char-value">{breathingData.sword_color}</span>
                                    </div>
                                </div>
                            )}

                            {breathingData.derived_from && (
                                <div className="characteristic-item">
                                    <span className="char-label">Dérivé de:</span>
                                    <span className="char-value derived">{breathingData.derived_from}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Description détaillée */}
                    {breathingData.description && (
                        <section className="wiki-section" style={{ borderLeftColor: styleColor }}>
                            <h2 className="section-title" style={{ color: styleColor }}>
                                <span className="section-icon">📖</span>
                                Description détaillée
                            </h2>
                            <div className="description-content">
                                <p>{breathingData.description}</p>
                            </div>
                        </section>
                    )}

                    {/* Metadata Section */}
                    <section className="wiki-section metadata" style={{ borderLeftColor: styleColor }}>
                        <h2 className="section-title" style={{ color: styleColor }}>
                            <span className="section-icon">📋</span>
                            Informations
                        </h2>
                        <div className="metadata-grid">
                            <div className="metadata-item">
                                <span className="metadata-label">ID:</span>
                                <span className="metadata-value">#{breathingData.id}</span>
                            </div>
                            <div className="metadata-item">
                                <span className="metadata-label">Nom:</span>
                                <span className="metadata-value">{breathingData.name}</span>
                            </div>
                            {breathingData.traducted_name && (
                                <div className="metadata-item">
                                    <span className="metadata-label">Nom traduit:</span>
                                    <span className="metadata-value">{breathingData.traducted_name}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Techniques Section */}
                    {techniques.length > 0 && (
                        <section className="wiki-section" style={{ borderLeftColor: styleColor }}>
                            <h2 className="section-title" style={{ color: styleColor }}>
                                <span className="section-icon">⚔️</span>
                                Techniques ({techniques.length})
                            </h2>
                            <div className="techniques-list">
                                {techniques.map((technique) => (
                                    <div key={technique.id} className="technique-card">
                                        <div className="technique-header">
                                            <h3 className="technique-name">{technique.name}</h3>
                                            {technique.power_level && (
                                                <span className="power-badge" style={{ backgroundColor: styleColor }}>
                                                    ⚡ {technique.power_level}
                                                </span>
                                            )}
                                        </div>
                                        {technique.description && (
                                            <p className="technique-description">{technique.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Call to action */}
                    <section className="wiki-section cta-section">
                        <div className="cta-content">
                            <h3>Voir les utilisateurs</h3>
                            <p>Découvrez les personnages qui maîtrisent ce souffle</p>
                            <Link 
                                to="/personnages" 
                                className="cta-button"
                                style={{ 
                                    background: `linear-gradient(135deg, ${styleColor} 0%, ${styleColor}cc 100%)`
                                }}
                            >
                                <span className="button-icon">👥</span>
                                Voir tous les personnages
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default BreathingStyle;
