import { useState, useEffect } from "react";
import BreathingStyleCard from "../components/BreathingStyleCard";
import './BreathingStyles.css';

function BreathingStyles() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/breathing_styles/');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Erreur lors du chargement des souffles:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="breathing-styles-page">
            <div className="breathing-styles-header">
                <h1 className="breathing-styles-title">
                    <span className="title-kanji">呼吸法</span>
                    <span className="title-main">SOUFFLES</span>
                    <span className="title-sub">Breathing Techniques</span>
                </h1>
                <p className="breathing-styles-subtitle">
                    Découvrez les techniques de respiration des pourfendeurs de démons
                </p>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement des souffles...</p>
                </div>
            ) : (
                <div className="breathing-styles-grid">
                    {data && data.map(breathingStyle => (
                        <BreathingStyleCard key={breathingStyle.id} breathingStyle={breathingStyle} />
                    ))}
                </div>
            )}

            {!loading && (!data || data.length === 0) && (
                <div className="no-data">
                    <span className="no-data-icon">😢</span>
                    <p>Aucun souffle trouvé</p>
                </div>
            )}
        </div>
    );
}

export default BreathingStyles;
