import axios from 'axios';

const BASE_URL = 'https://api.pokemontcg.io/v2';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Search for Pokemon cards
export const searchCards = async (query = '', filters = {}) => {
  try {
    let searchQuery = '';
    
    // Build search query
    if (query) {
      searchQuery += `name:"${query}"`;
    }
    
    // Add filters
    if (filters.type && searchQuery) {
      searchQuery += ` AND types:${filters.type}`;
    } else if (filters.type) {
      searchQuery = `types:${filters.type}`;
    }
    
    if (filters.rarity && searchQuery) {
      searchQuery += ` AND rarity:"${filters.rarity}"`;
    } else if (filters.rarity) {
      searchQuery = `rarity:"${filters.rarity}"`;
    }
    
    if (filters.set && searchQuery) {
      searchQuery += ` AND set.name:"${filters.set}"`;
    } else if (filters.set) {
      searchQuery = `set.name:"${filters.set}"`;
    }

    const params = {
      q: searchQuery || '*',
      page: filters.page || 1,
      pageSize: filters.pageSize || 20,
    };

    const response = await api.get('/cards', { params });
    return {
      cards: response.data.data,
      totalCount: response.data.totalCount,
      page: response.data.page,
      pageSize: response.data.pageSize,
    };
  } catch (error) {
    console.error('Error searching cards:', error);
    throw new Error(error.response?.data?.error || 'Failed to search cards');
  }
};

// Get card by ID
export const getCardById = async (id) => {
  try {
    const response = await api.get(`/cards/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching card:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch card');
  }
};

// Get card types for filter dropdown
export const getCardTypes = () => {
  return [
    'Colorless', 'Fire', 'Water', 'Lightning', 'Grass', 
    'Fighting', 'Psychic', 'Darkness', 'Metal', 'Fairy', 
    'Dragon'
  ];
};

// Get card rarities for filter dropdown
export const getCardRarities = () => {
  return [
    'Common', 'Uncommon', 'Rare', 'Rare Holo', 'Rare Ultra',
    'Rare Secret', 'Rare Rainbow', 'Promo', 'Amazing Rare'
  ];
};

// Get popular sets for filter dropdown
export const getPopularSets = () => {
  return [
    'Base Set', 'Jungle', 'Fossil', 'Team Rocket', 'Gym Heroes',
    'Gym Challenge', 'Neo Genesis', 'Neo Discovery', 'Neo Destiny',
    'Expedition Base Set', 'Aquapolis', 'Skyridge', 'Ruby & Sapphire',
    'Sandstorm', 'Dragon', 'Team Magma vs Team Aqua', 'Hidden Legends',
    'FireRed & LeafGreen', 'Team Rocket Returns', 'Deoxys', 'Emerald',
    'Unseen Forces', 'Delta Species', 'Legend Maker', 'Holon Phantoms',
    'Crystal Guardians', 'Dragon Frontiers', 'Power Keepers'
  ];
};
