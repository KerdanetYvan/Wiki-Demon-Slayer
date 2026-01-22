import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BloodDemonArts.css';

function BloodDemonArts() {
    const [arts, setArts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchArts() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/blood_demon_arts/');
                const data = await response.json();
                setArts(data);
            } catch (error) {
                console.error('Erreur lors du chargement des arts démoniaques:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchArts();
    }, []);

    if (loading) {
        return (
            <div className="blood-demon-arts-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement des arts démoniaques...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="blood-demon-arts-page">
            <div className="page-header">
                <h1 className="page-title">
                    <span className="title-icon">🩸</span>
                    Arts Démoniaques
                    <span className="title-kanji">血鬼術</span>
                </h1>
                <p className="page-description">
                    Découvrez les pouvoirs surnaturels des démons
                </p>
            </div>

            {arts.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-icon">😈</span>
                    <p>Aucun art démoniaque trouvé</p>
                </div>
            ) : (
                <div className="arts-grid">
                    {arts.map((art) => (
                        <Link 
                            key={art.id} 
                            to={`/blood-demon-arts/${art.id}`}
                            className="demon-art-card"
                        >
                            <div className="demon-art-header">
                                <span className="demon-art-icon">🩸</span>
                                <span className="demon-power-badge">{art.power_level}</span>
                            </div>
                            <div className="demon-art-title">{art.name}</div>
                            <div className="demon-art-type">{art.ability_type}</div>
                            {art.description && (
                                <div className="demon-art-desc">
                                    {art.description.substring(0, 100)}
                                    {art.description.length > 100 ? '...' : ''}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BloodDemonArts;
