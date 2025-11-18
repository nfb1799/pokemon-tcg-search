import React, { useState } from 'react';
import { getCardTypes, getCardRarities, getPopularSets } from '../services/pokemonApi';
import './SearchComponent.css';

const SearchComponent = ({ onSearch, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    rarity: '',
    set: '',
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery, filters);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({
      type: '',
      rarity: '',
      set: '',
    });
    onSearch('', {});
  };

  const cardTypes = getCardTypes();
  const cardRarities = getCardRarities();
  const popularSets = getPopularSets();

  return (
    <div className="search-component">
      <div className="search-header">
        <h1>🃏 Pokemon TCG Search</h1>
        <p>Search through thousands of Pokemon Trading Cards</p>
      </div>

      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Enter Pokemon name (e.g., Pikachu, Charizard, Blastoise...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isLoading}
          >
            {isLoading ? '🔍 Searching...' : '🔍 Search'}
          </button>
        </div>

        <div className="filter-controls">
          <button
            type="button"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="toggle-filters-btn"
          >
            {showAdvancedFilters ? '▲ Hide Filters' : '▼ Advanced Filters'}
          </button>
          
          <button
            type="button"
            onClick={clearFilters}
            className="clear-filters-btn"
            disabled={isLoading}
          >
            Clear All
          </button>
        </div>

        {showAdvancedFilters && (
          <div className="advanced-filters">
            <div className="filter-row">
              <div className="filter-group">
                <label htmlFor="type-select">Type:</label>
                <select
                  id="type-select"
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">All Types</option>
                  {cardTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="rarity-select">Rarity:</label>
                <select
                  id="rarity-select"
                  value={filters.rarity}
                  onChange={(e) => handleFilterChange('rarity', e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">All Rarities</option>
                  {cardRarities.map(rarity => (
                    <option key={rarity} value={rarity}>{rarity}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="set-select">Set:</label>
                <select
                  id="set-select"
                  value={filters.set}
                  onChange={(e) => handleFilterChange('set', e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">All Sets</option>
                  {popularSets.map(set => (
                    <option key={set} value={set}>{set}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchComponent;
