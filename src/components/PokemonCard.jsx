import React, { useState } from 'react';
import './PokemonCard.css';

const PokemonCard = ({ card }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const getTypeColor = (type) => {
    const typeColors = {
      Colorless: '#A8A878',
      Fire: '#F08030',
      Water: '#6890F0',
      Lightning: '#F8D030',
      Grass: '#78C850',
      Fighting: '#C03028',
      Psychic: '#F85888',
      Darkness: '#705848',
      Metal: '#B8B8D0',
      Fairy: '#EE99AC',
      Dragon: '#7038F8'
    };
    return typeColors[type] || '#68A090';
  };

  const formatPrice = (prices) => {
    if (!prices) return 'Price not available';
    
    // Try to get the most recent market price
    if (prices.cardmarket?.prices?.averageSellPrice) {
      return `€${prices.cardmarket.prices.averageSellPrice}`;
    }
    if (prices.tcgplayer?.prices?.holofoil?.market) {
      return `$${prices.tcgplayer.prices.holofoil.market}`;
    }
    if (prices.tcgplayer?.prices?.normal?.market) {
      return `$${prices.tcgplayer.prices.normal.market}`;
    }
    return 'Price not available';
  };

  return (
    <div className="pokemon-card">
      <div className="card-image-container">
        {imageLoading && (
          <div className="image-placeholder">
            <div className="loading-spinner"></div>
            <span>Loading image...</span>
          </div>
        )}
        {imageError ? (
          <div className="image-error">
            <span>🖼️</span>
            <span>Image not available</span>
          </div>
        ) : (
          <img
            src={card.images?.small || card.images?.large}
            alt={card.name}
            className={`card-image ${imageLoading ? 'loading' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        )}
      </div>

      <div className="card-details">
        <h3 className="card-name">{card.name}</h3>
        
        {card.subtypes && card.subtypes.length > 0 && (
          <p className="card-subtitle">{card.subtypes.join(' • ')}</p>
        )}

        <div className="card-info">
          {card.hp && (
            <div className="info-item">
              <span className="info-label">HP:</span>
              <span className="info-value hp">{card.hp}</span>
            </div>
          )}

          {card.types && card.types.length > 0 && (
            <div className="info-item">
              <span className="info-label">Type:</span>
              <div className="types-container">
                {card.types.map((type, index) => (
                  <span
                    key={index}
                    className="type-badge"
                    style={{ backgroundColor: getTypeColor(type) }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {card.rarity && (
            <div className="info-item">
              <span className="info-label">Rarity:</span>
              <span className="info-value rarity">{card.rarity}</span>
            </div>
          )}

          {card.set && (
            <div className="info-item">
              <span className="info-label">Set:</span>
              <span className="info-value">{card.set.name}</span>
            </div>
          )}

          {card.number && card.set?.total && (
            <div className="info-item">
              <span className="info-label">Card #:</span>
              <span className="info-value">{card.number}/{card.set.total}</span>
            </div>
          )}

          <div className="info-item">
            <span className="info-label">Price:</span>
            <span className="info-value price">{formatPrice(card.cardmarket || card.tcgplayer)}</span>
          </div>
        </div>

        {card.attacks && card.attacks.length > 0 && (
          <div className="attacks-section">
            <h4>Attacks:</h4>
            <div className="attacks-list">
              {card.attacks.slice(0, 2).map((attack, index) => (
                <div key={index} className="attack">
                  <div className="attack-header">
                    <span className="attack-name">{attack.name}</span>
                    {attack.damage && (
                      <span className="attack-damage">{attack.damage}</span>
                    )}
                  </div>
                  {attack.text && (
                    <p className="attack-description">{attack.text}</p>
                  )}
                  {attack.cost && attack.cost.length > 0 && (
                    <div className="attack-cost">
                      {attack.cost.map((cost, costIndex) => (
                        <span
                          key={costIndex}
                          className="cost-badge"
                          style={{ backgroundColor: getTypeColor(cost) }}
                        >
                          {cost}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {card.weaknesses && card.weaknesses.length > 0 && (
          <div className="weaknesses-section">
            <span className="weakness-label">Weakness:</span>
            {card.weaknesses.map((weakness, index) => (
              <span
                key={index}
                className="weakness-badge"
                style={{ backgroundColor: getTypeColor(weakness.type) }}
              >
                {weakness.type} {weakness.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
