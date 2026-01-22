import { useState, useEffect } from "react";
import PersoCard from "../components/PersoCard";
import './Personnages.css';

function Personnages() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/personnages/');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Erreur lors du chargement des personnages:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="personnages-page">
            <div className="personnages-header">
                <h1 className="personnages-title">
                    <span className="title-kanji">登場人物</span>
                    <span className="title-main">PERSONNAGES</span>
                    <span className="title-sub">Demon Slayer Characters</span>
                </h1>
                <p className="personnages-subtitle">
                    Découvrez tous les personnages de l'univers Demon Slayer
                </p>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement des personnages...</p>
                </div>
            ) : (
                <div className="perso-grid">
                    {data && data.map(personnage => (
                        <PersoCard key={personnage.id} personnage={personnage} />
                    ))}
                </div>
            )}

            {!loading && (!data || data.length === 0) && (
                <div className="no-data">
                    <span className="no-data-icon">😢</span>
                    <p>Aucun personnage trouvé</p>
                </div>
            )}
        </div>
    );
}

export default Personnages;