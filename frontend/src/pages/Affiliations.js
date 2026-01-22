import { useState, useEffect } from "react";
import AffiliationCard from "../components/AffiliationCard";
import './Affiliations.css';

function Affiliations() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/affiliations/');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Erreur lors du chargement des affiliations:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="affiliations-page">
            <div className="affiliations-header">
                <h1 className="affiliations-title">
                    <span className="title-kanji">所属</span>
                    <span className="title-main">AFFILIATIONS</span>
                    <span className="title-sub">Organizations & Groups</span>
                </h1>
                <p className="affiliations-subtitle">
                    Découvrez les différentes organisations du monde de Demon Slayer
                </p>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement des affiliations...</p>
                </div>
            ) : (
                <div className="affiliations-grid">
                    {data && data.map(affiliation => (
                        <AffiliationCard key={affiliation.id} affiliation={affiliation} />
                    ))}
                </div>
            )}

            {!loading && (!data || data.length === 0) && (
                <div className="no-data">
                    <span className="no-data-icon">😢</span>
                    <p>Aucune affiliation trouvée</p>
                </div>
            )}
        </div>
    );
}

export default Affiliations;
