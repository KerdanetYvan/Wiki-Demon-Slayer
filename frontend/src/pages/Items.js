import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Items.css';

function Items() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchItems() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/items/');
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Erreur lors du chargement des objets:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchItems();
    }, []);

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
            <div className="items-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement des objets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="items-page">
            <div className="page-header">
                <h1 className="page-title">
                    <span className="title-icon">🗡️</span>
                    Objets
                    <span className="title-kanji">装備</span>
                </h1>
                <p className="page-description">
                    Découvrez les armes et équipements des chasseurs de démons
                </p>
            </div>

            {items.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-icon">📦</span>
                    <p>Aucun objet trouvé</p>
                </div>
            ) : (
                <div className="items-grid">
                    {items.map((item) => (
                        <Link 
                            key={item.id} 
                            to={`/items/${item.id}`}
                            className="obj-card"
                            style={{ borderColor: getRarityColor(item.rarity) }}
                        >
                            <div className="obj-image-container">
                                {item.image ? (
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="obj-image"
                                    />
                                ) : (
                                    <div className="obj-placeholder">🗡️</div>
                                )}
                            </div>
                            
                            <div className="obj-content">
                                <div className="obj-header">
                                    <div className="obj-name">{item.name}</div>
                                    <span 
                                        className="obj-rarity-badge"
                                        style={{ backgroundColor: getRarityColor(item.rarity) }}
                                    >
                                        {item.rarity}
                                    </span>
                                </div>
                                
                                <div className="obj-type">{item.item_type}</div>
                                
                                {item.description && (
                                    <div className="obj-description">
                                        {item.description.substring(0, 100)}
                                        {item.description.length > 100 ? '...' : ''}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Items;
