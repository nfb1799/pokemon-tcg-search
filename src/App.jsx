import React, { useState, useCallback } from 'react';
import SearchComponent from './components/SearchComponent';
import ResultsGrid from './components/ResultsGrid';
import { searchCards } from './services/pokemonApi';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [lastSearchQuery, setLastSearchQuery] = useState('');
  const [lastSearchFilters, setLastSearchFilters] = useState({});

  const handleSearch = useCallback(async (query, filters, page = 1) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const searchFilters = { ...filters, page, pageSize: 20 };
      const response = await searchCards(query, searchFilters);
      
      setCards(response.cards);
      setCurrentPage(response.page);
      setTotalCount(response.totalCount);
      setTotalPages(Math.ceil(response.totalCount / response.pageSize));
      setLastSearchQuery(query);
      setLastSearchFilters(filters);
      
      // Scroll to results on new search (not pagination)
      if (page === 1) {
        setTimeout(() => {
          const resultsElement = document.querySelector('.results-container');
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } catch (err) {
      setError(err.message);
      setCards([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePageChange = useCallback((page, newQuery = null) => {
    if (newQuery) {
      // Handle suggestion clicks
      handleSearch(newQuery, {}, 1);
    } else {
      // Handle pagination
      handleSearch(lastSearchQuery, lastSearchFilters, page);
    }
  }, [handleSearch, lastSearchQuery, lastSearchFilters]);

  return (
    <div className="App">
      <main className="main-content">
        <SearchComponent 
          onSearch={handleSearch}
          isLoading={isLoading}
        />
        
        <ResultsGrid
          cards={cards}
          isLoading={isLoading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={handlePageChange}
        />
      </main>
      
      <footer className="app-footer">
        <p>
          Built with ❤️ using the{' '}
          <a 
            href="https://pokemontcg.io/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Pokemon TCG API
          </a>
        </p>
        <p className="disclaimer">
          Pokemon and all respective names are Trademark & © of Nintendo 1996-2024
        </p>
      </footer>
    </div>
  );
}

export default App;
