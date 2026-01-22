import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Item.css';

function Item() {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchItem() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/items/${id}/`);
                if (!response.ok) {
                    throw new Error('Objet non trouvé');
                }
                const data = await response.json();
                setItem(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchItem();
    }, [id]);

    const getRarityColor = (rarity) => {
        const rarityLower = rarity?.toLowerCase() || '';
        if (rarityLower.includes('légendaire') || rarityLower.includes('legendary')) return '#ff6b00';
        if (rarityLower.includes('épique') || rarityLower.includes('epic')) return '#a335ee';
        if (rarityLower.includes('rare')) return '#0070dd';
        if (rarityLower.includes('commun') || rarityLower.includes('common')) return '#9d9d9d';
        return '#7dd3c0';
    };

    if (loading) {
        return (
            <div className="item-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement de l'objet...</p>
                </div>
            </div>
        );
    }

    if (error || !item) {
        return (
            <div className="item-page">
                <div className="error-container">
                    <span className="error-icon">📦</span>
                    <h2>Objet introuvable</h2>
                    <p>Cet objet n'existe pas ou a été perdu...</p>
                    <Link to="/items" className="back-button">
                        ← Retour aux objets
                    </Link>
                </div>
            </div>
        );
    }

    const rarityColor = getRarityColor(item.rarity);

    return (
        <div className="item-page">
            <button onClick={() => navigate(-1)} className="back-nav">
                ← Retour
            </button>

            <div className="item-container">
                {/* Hero Section */}
                <div 
                    className="obj-detail-hero"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${rarityColor}15, transparent 70%)`
                    }}
                >
                    <div className="obj-detail-image-large">
                        {item.image ? (
                            <img 
                                src={item.image} 
                                alt={item.name}
                                style={{ boxShadow: `0 0 40px ${rarityColor}80` }}
                            />
                        ) : (
                            <div className="obj-detail-icon-large">🗡️</div>
                        )}
                    </div>

                    <div className="obj-detail-header">
                        <div className="obj-detail-name" style={{
                            textShadow: `0 0 30px ${rarityColor}80`
                        }}>
                            {item.name}
                        </div>

                        <div className="obj-detail-badges">
                            <span 
                                className="obj-detail-rarity-badge"
                                style={{ backgroundColor: rarityColor }}
                            >
                                {item.rarity}
                            </span>
                            <span className="obj-detail-type-badge">{item.item_type}</span>
                        </div>
                    </div>
                </div>

                {/* Wiki Content */}
                <div className="wiki-content">
                    {/* Description */}
                    {item.description && (
                        <section className="wiki-section" style={{ borderLeftColor: rarityColor }}>
                            <h2 className="section-title" style={{ color: rarityColor }}>
                                <span className="section-icon">📖</span>
                                Description
                            </h2>
                            <div className="description-content">
                                <p>{item.description}</p>
                            </div>
                        </section>
                    )}

                    {/* Properties */}
                    <section className="wiki-section" style={{ borderLeftColor: rarityColor }}>
                        <h2 className="section-title" style={{ color: rarityColor }}>
                            <span className="section-icon">⚙️</span>
                            Propriétés
                        </h2>
                        <div className="properties-grid">
                            <div className="property-item">
                                <span className="property-label">Type:</span>
                                <span className="property-value">{item.item_type}</span>
                            </div>
                            <div className="property-item">
                                <span className="property-label">Rareté:</span>
                                <span 
                                    className="property-value rarity"
                                    style={{ color: rarityColor }}
                                >
                                    {item.rarity}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Metadata */}
                    <section className="wiki-section metadata" style={{ borderLeftColor: rarityColor }}>
                        <h2 className="section-title" style={{ color: rarityColor }}>
                            <span className="section-icon">📋</span>
                            Informations
                        </h2>
                        <div className="metadata-grid">
                            <div className="metadata-item">
                                <span className="metadata-label">ID:</span>
                                <span className="metadata-value">#{item.id}</span>
                            </div>
                            <div className="metadata-item">
                                <span className="metadata-label">Nom:</span>
                                <span className="metadata-value">{item.name}</span>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="wiki-section cta-section">
                        <div className="cta-content">
                            <h3>Explorer plus d'objets</h3>
                            <p>Découvrez tous les équipements des chasseurs</p>
                            <Link 
                                to="/items" 
                                className="cta-button"
                                style={{ 
                                    background: `linear-gradient(135deg, ${rarityColor} 0%, ${rarityColor}cc 100%)`
                                }}
                            >
                                <span className="button-icon">🗡️</span>
                                Voir tous les objets
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Item;
