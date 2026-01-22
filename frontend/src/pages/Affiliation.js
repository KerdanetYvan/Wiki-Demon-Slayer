import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Affiliation.css';

function Affiliation() {
    const [affiliationData, setAffiliationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAffiliation() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/affiliations/${id}/`);
                if (!response.ok) {
                    throw new Error('Affiliation non trouvée');
                }
                const data = await response.json();
                setAffiliationData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchAffiliation();
    }, [id]);

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

    if (loading) {
        return (
            <div className="affiliation-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement de l'affiliation...</p>
                </div>
            </div>
        );
    }

    if (error || !affiliationData) {
        return (
            <div className="affiliation-page">
                <div className="error-container">
                    <span className="error-icon">😢</span>
                    <h2>Affiliation introuvable</h2>
                    <p>Cette organisation n'existe pas ou a disparu...</p>
                    <Link to="/affiliations" className="back-button">
                        ← Retour aux affiliations
                    </Link>
                </div>
            </div>
        );
    }

    const typeColor = getTypeColor(affiliationData.type);

    return (
        <div className="affiliation-page">
            <button onClick={() => navigate(-1)} className="back-nav">
                ← Retour
            </button>

            <div className="affiliation-container">
                {/* Hero Section */}
                <div className="affiliation-hero">
                    <div 
                        className="affiliation-icon-large"
                        style={{ color: typeColor }}
                    >
                        {getTypeEmoji(affiliationData.type)}
                    </div>

                    <div className="affiliation-header">
                        <div 
                            className="affiliation-type-badge-large"
                            style={{ backgroundColor: typeColor }}
                        >
                            {affiliationData.type}
                        </div>
                        
                        <h1 className="affiliation-name">
                            {affiliationData.name}
                        </h1>

                        {affiliationData.description && (
                            <p className="affiliation-description-hero">
                                {affiliationData.description}
                            </p>
                        )}

                        {!affiliationData.description && (
                            <p className="affiliation-no-description">
                                Aucune description disponible pour cette organisation.
                            </p>
                        )}
                    </div>
                </div>

                {/* Wiki Content */}
                <div className="wiki-content">
                    {/* Metadata Section */}
                    <section className="wiki-section metadata">
                        <h2 className="section-title">
                            <span className="section-icon">📋</span>
                            Informations
                        </h2>
                        <div className="metadata-grid">
                            <div className="metadata-item">
                                <span className="metadata-label">ID:</span>
                                <span className="metadata-value">#{affiliationData.id}</span>
                            </div>
                            <div className="metadata-item">
                                <span className="metadata-label">Type:</span>
                                <span className="metadata-value" style={{ color: typeColor }}>
                                    {affiliationData.type}
                                </span>
                            </div>
                            <div className="metadata-item">
                                <span className="metadata-label">Nom:</span>
                                <span className="metadata-value">{affiliationData.name}</span>
                            </div>
                        </div>
                    </section>

                    {/* Description détaillée si présente */}
                    {affiliationData.description && (
                        <section className="wiki-section">
                            <h2 className="section-title">
                                <span className="section-icon">📖</span>
                                Description
                            </h2>
                            <div className="description-content">
                                <p>{affiliationData.description}</p>
                            </div>
                        </section>
                    )}

                    {/* Call to action */}
                    <section className="wiki-section cta-section">
                        <div className="cta-content">
                            <h3>Voir plus d'informations</h3>
                            <p>Explorez les personnages membres de cette organisation</p>
                            <Link 
                                to="/personnages" 
                                className="cta-button"
                                style={{ 
                                    background: `linear-gradient(135deg, ${typeColor} 0%, ${typeColor}cc 100%)`
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

export default Affiliation;
