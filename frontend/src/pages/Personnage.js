import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Personnage.css';

function Personnage() {
    const [personnageData, setPersonnageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPersonnage() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/personnages/${id}/`);
                if (!response.ok) {
                    throw new Error('Personnage non trouvé');
                }
                const data = await response.json();
                setPersonnageData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchPersonnage();
    }, [id]);

    const getTypeColor = (type) => {
        return type?.toLowerCase() === 'human' ? '#4a9eff' : '#ff4444';
    };

    const getTypeEmoji = (type) => {
        return type?.toLowerCase() === 'human' ? '⚔️' : '👹';
    };

    const parseAbilities = (description) => {
        if (!description) return { abilities: [], fights: [], equipment: [] };
        
        const abilities = description.match(/Abilities:(.*?)(?:Fighting style:|Demon art:|Equipment:|Fights:|$)/s)?.[1]?.trim() || '';
        const fights = description.match(/Fights:(.*?)$/s)?.[1]?.trim() || '';
        const equipment = description.match(/Equipment:(.*?)(?:Fights:|$)/s)?.[1]?.trim() || '';
        
        return {
            abilities: abilities ? abilities.split(',').map(a => a.trim()).filter(a => a) : [],
            fights: fights ? fights.split(',').map(f => f.trim()).filter(f => f) : [],
            equipment: equipment ? equipment.split(',').map(e => e.trim()).filter(e => e) : []
        };
    };

    if (loading) {
        return (
            <div className="personnage-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement du personnage...</p>
                </div>
            </div>
        );
    }

    if (error || !personnageData) {
        return (
            <div className="personnage-page">
                <div className="error-container">
                    <span className="error-icon">😢</span>
                    <h2>Personnage introuvable</h2>
                    <p>Ce personnage n'existe pas ou a été dévoré par un démon...</p>
                    <Link to="/personnages" className="back-button">
                        ← Retour aux personnages
                    </Link>
                </div>
            </div>
        );
    }

    const parsed = parseAbilities(personnageData.description);

    return (
        <div className="personnage-page">
            <button onClick={() => navigate(-1)} className="back-nav">
                ← Retour
            </button>

            <div className="personnage-container">
                {/* Hero Section */}
                <div className="personnage-hero">
                    <div className="personnage-image-wrapper">
                        <img 
                            src={personnageData.image || 'https://via.placeholder.com/400x600?text=No+Image'} 
                            alt={personnageData.name}
                            className="personnage-image"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
                            }}
                        />
                        <div 
                            className="personnage-type-badge"
                            style={{ backgroundColor: getTypeColor(personnageData.character_type) }}
                        >
                            <span className="type-emoji">{getTypeEmoji(personnageData.character_type)}</span>
                            {personnageData.character_type}
                        </div>
                    </div>

                    <div className="personnage-header">
                        <h1 className="personnage-name">{personnageData.name}</h1>
                        
                        <div className="personnage-meta">
                            {personnageData.rank && (
                                <div className="meta-item rank">
                                    <span className="meta-icon">🏅</span>
                                    <span className="meta-label">Rang:</span>
                                    <span className="meta-value">{personnageData.rank}</span>
                                </div>
                            )}
                            
                            {personnageData.status && (
                                <div className={`meta-item status status-${personnageData.status.toLowerCase()}`}>
                                    <span className="status-dot"></span>
                                    <span className="meta-label">Statut:</span>
                                    <span className="meta-value">{personnageData.status}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Wiki Content */}
                <div className="wiki-content">
                    {/* Abilities Section */}
                    {parsed.abilities.length > 0 && (
                        <section className="wiki-section">
                            <h2 className="section-title">
                                <span className="section-icon">⚡</span>
                                Capacités & Compétences
                            </h2>
                            <div className="abilities-grid">
                                {parsed.abilities.map((ability, index) => (
                                    <div key={index} className="ability-card">
                                        <span className="ability-bullet">•</span>
                                        {ability}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Equipment Section */}
                    {parsed.equipment.length > 0 && (
                        <section className="wiki-section">
                            <h2 className="section-title">
                                <span className="section-icon">🗡️</span>
                                Équipement
                            </h2>
                            <div className="equipment-list">
                                {parsed.equipment.map((item, index) => (
                                    <div key={index} className="equipment-item">
                                        <span className="equipment-icon">▸</span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Fights Section */}
                    {parsed.fights.length > 0 && (
                        <section className="wiki-section">
                            <h2 className="section-title">
                                <span className="section-icon">⚔️</span>
                                Combats
                            </h2>
                            <div className="fights-list">
                                {parsed.fights.map((fight, index) => (
                                    <div key={index} className="fight-item">
                                        <span className="fight-number">{index + 1}</span>
                                        {fight}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Metadata Section */}
                    <section className="wiki-section metadata">
                        <h2 className="section-title">
                            <span className="section-icon">📋</span>
                            Informations
                        </h2>
                        <div className="metadata-grid">
                            <div className="metadata-item">
                                <span className="metadata-label">ID:</span>
                                <span className="metadata-value">#{personnageData.id}</span>
                            </div>
                            <div className="metadata-item">
                                <span className="metadata-label">Type:</span>
                                <span className="metadata-value">{personnageData.character_type}</span>
                            </div>
                            {personnageData.created_at && (
                                <div className="metadata-item">
                                    <span className="metadata-label">Créé le:</span>
                                    <span className="metadata-value">
                                        {new Date(personnageData.created_at).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                            )}
                            {personnageData.updated_at && (
                                <div className="metadata-item">
                                    <span className="metadata-label">Modifié le:</span>
                                    <span className="metadata-value">
                                        {new Date(personnageData.updated_at).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Personnage;