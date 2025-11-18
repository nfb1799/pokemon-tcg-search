import React from 'react';
import PokemonCard from './PokemonCard';
import './ResultsGrid.css';

const ResultsGrid = ({ 
  cards, 
  isLoading, 
  error, 
  currentPage, 
  totalPages, 
  totalCount,
  onPageChange 
}) => {
  if (isLoading) {
    return (
      <div className="results-container">
        <div className="loading-container">
          <div className="pokeball-loader">
            <div className="pokeball">
              <div className="pokeball-button"></div>
            </div>
          </div>
          <p>Searching for Pokemon cards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="results-container">
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No Pokemon cards found</h3>
          <p>Try adjusting your search terms or filters</p>
          <div className="search-suggestions">
            <p>Popular searches:</p>
            <div className="suggestion-buttons">
              <button onClick={() => onPageChange(1, 'Pikachu')}>Pikachu</button>
              <button onClick={() => onPageChange(1, 'Charizard')}>Charizard</button>
              <button onClick={() => onPageChange(1, 'Blastoise')}>Blastoise</button>
              <button onClick={() => onPageChange(1, 'Venusaur')}>Venusaur</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => onPageChange(currentPage - 1)}
          className="pagination-button"
        >
          ← Previous
        </button>
      );
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="pagination-button"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="pagination-button"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => onPageChange(currentPage + 1)}
          className="pagination-button"
        >
          Next →
        </button>
      );
    }

    return <div className="pagination">{pages}</div>;
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Search Results</h2>
        <p className="results-count">
          Found {totalCount?.toLocaleString()} cards
          {totalPages > 1 && (
            <span> (Page {currentPage} of {totalPages})</span>
          )}
        </p>
      </div>

      <div className="results-grid">
        {cards.map((card) => (
          <PokemonCard key={card.id} card={card} />
        ))}
      </div>

      {renderPagination()}

      <div className="scroll-to-top">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-top-button"
          title="Scroll to top"
        >
          ↑ Top
        </button>
      </div>
    </div>
  );
};

export default ResultsGrid;
