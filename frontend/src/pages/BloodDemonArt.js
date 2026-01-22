import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './BloodDemonArt.css';

function BloodDemonArt() {
    const [art, setArt] = useState(null);
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchArt() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/blood_demon_arts/${id}/`);
                if (!response.ok) {
                    throw new Error('Art démoniaque non trouvé');
                }
                const data = await response.json();
                setArt(data);

                // Charger le personnage associé
                if (data.character_id) {
                    const charResponse = await fetch(`http://127.0.0.1:8000/api/v1/personnages/${data.character_id}/`);
                    if (charResponse.ok) {
                        const charData = await charResponse.json();
                        setCharacter(charData);
                    }
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchArt();
    }, [id]);

    if (loading) {
        return (
            <div className="blood-demon-art-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement de l'art démoniaque...</p>
                </div>
            </div>
        );
    }

    if (error || !art) {
        return (
            <div className="blood-demon-art-page">
                <div className="error-container">
                    <span className="error-icon">😈</span>
                    <h2>Art démoniaque introuvable</h2>
                    <p>Cet art a été oublié ou n'existe pas...</p>
                    <Link to="/blood-demon-arts" className="back-button">
                        ← Retour aux arts démoniaques
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="blood-demon-art-page">
            <button onClick={() => navigate(-1)} className="back-nav">
                ← Retour
            </button>

            <div className="art-container">
                {/* Hero Section */}
                <div className="art-hero">
                    <span className="art-icon-large">🩸</span>
                    
                    <div className="art-header">
                        <h1 className="art-name">{art.name}</h1>
                        <p className="art-type">{art.ability_type}</p>
                        <div className="power-display">
                            <span className="power-label">Niveau de puissance</span>
                            <span className="power-value">{art.power_level}</span>
                        </div>
                    </div>
                </div>

                {/* Wiki Content */}
                <div className="wiki-content">
                    {/* Description */}
                    {art.description && (
                        <section className="wiki-section">
                            <h2 className="section-title">
                                <span className="section-icon">📖</span>
                                Description
                            </h2>
                            <div className="description-content">
                                <p>{art.description}</p>
                            </div>
                        </section>
                    )}

                    {/* Character Section */}
                    {character && (
                        <section className="wiki-section">
                            <h2 className="section-title">
                                <span className="section-icon">👤</span>
                                Utilisateur
                            </h2>
                            <Link 
                                to={`/personnages/${character.id}`}
                                className="character-link"
                            >
                                {character.image && (
                                    <img 
                                        src={`http://127.0.0.1:8000${character.image}`} 
                                        alt={character.name}
                                        className="character-image"
                                    />
                                )}
                                <div className="character-info">
                                    <h3>{character.name}</h3>
                                    <p>{character.character_type} - {character.rank}</p>
                                </div>
                                <span className="link-arrow">→</span>
                            </Link>
                        </section>
                    )}

                    {/* Metadata */}
                    <section className="wiki-section metadata">
                        <h2 className="section-title">
                            <span className="section-icon">📋</span>
                            Informations
                        </h2>
                        <div className="metadata-grid">
                            <div className="metadata-item">
                                <span className="metadata-label">ID:</span>
                                <span className="metadata-value">#{art.id}</span>
                            </div>
                            <div className="metadata-item">
                                <span className="metadata-label">Type:</span>
                                <span className="metadata-value">{art.ability_type}</span>
                            </div>
                            <div className="metadata-item">
                                <span className="metadata-label">Puissance:</span>
                                <span className="metadata-value">{art.power_level}</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default BloodDemonArt;
