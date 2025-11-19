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

  const formatPrice = (card) => {
    if (!card) return 'Price not available';
    
    const prices = [];
    
    // Check TCGPlayer prices (US market)
    if (card.tcgplayer?.prices) {
      const tcgPrices = card.tcgplayer.prices;
      
      // Generic function to format price type names
      const formatPriceTypeName = (priceType) => {
        return priceType
          .replace(/([A-Z])/g, ' $1') // Add space before capital letters
          .replace(/^\w/, c => c.toUpperCase()) // Capitalize first letter
          .trim();
      };
      
      // Dynamically collect all available price types
      Object.keys(tcgPrices).forEach(priceType => {
        const priceData = tcgPrices[priceType];
        if (priceData?.market && typeof priceData.market === 'number') {
          const displayName = formatPriceTypeName(priceType);
          prices.push(`${displayName}: $${priceData.market.toFixed(2)}`);
        }
      });
    }
    
    // If we have TCGPlayer prices, show them
    if (prices.length > 0) {
      // If multiple prices, show the first one as primary
      if (prices.length === 1) {
        return prices[0].split(': ')[1]; // Just show the price without label for single price
      } else {
        return prices.join(' • '); // Show all prices separated by bullet
      }
    }
    
    // Fallback to Cardmarket (European market)
    if (card.cardmarket?.prices?.averageSellPrice) {
      return `€${card.cardmarket.prices.averageSellPrice.toFixed(2)}`;
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
            <span>🔥</span>
            <span>Charizard Image Loading...</span>
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
        
        {card.set && (
          <p className="card-set">{card.set.name}</p>
        )}

        {card.number && card.set?.total && (
          <p className="card-number">#{card.number}/{card.set.total}</p>
        )}

        <div className="card-info">
          <div className="info-item">
            <span className="info-value price">{formatPrice(card)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
