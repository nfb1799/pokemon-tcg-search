import axios from 'axios';
import charizardImage from '../assets/charizard.png';

const BASE_URL = 'https://api.pokemontcg.io/v2';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for development (bypasses CORS issues)
const getMockData = (query = '', filters = {}) => {
  const mockCards = [
    {
      "id": "gym2-2",
      "name": "Blaine's Charizard",
      "supertype": "Pokémon",
      "subtypes": ["Stage 2"],
      "level": "50",
      "hp": "100",
      "types": ["Fire"],
      "evolvesFrom": "Blaine's Charmeleon",
      "attacks": [
        {
          "name": "Roaring Flames",
          "cost": ["Fire"],
          "convertedEnergyCost": 1,
          "damage": "20+",
          "text": "Discard all Fire Energy cards attached to Blaine's Charizard. This attack does 20 damage plus 20 more damage for each Fire Energy discarded."
        },
        {
          "name": "Flame Jet",
          "cost": ["Fire", "Fire"],
          "convertedEnergyCost": 2,
          "damage": "",
          "text": "Flip a coin. If heads, choose 1 of your opponent's Pokémon. This attack does 40 damage to that Pokémon."
        }
      ],
      "weaknesses": [{"type": "Water", "value": "×2"}],
      "resistances": [{"type": "Fighting", "value": "-30"}],
      "retreatCost": ["Colorless", "Colorless", "Colorless"],
      "convertedRetreatCost": 3,
      "set": {
        "id": "gym2",
        "name": "Gym Challenge",
        "series": "Gym",
        "printedTotal": 132,
        "total": 132
      },
      "number": "2",
      "artist": "Ken Sugimori",
      "rarity": "Rare Holo",
      "nationalPokedexNumbers": [6],
      "images": {
        "small": charizardImage,
        "large": charizardImage
      },
      "tcgplayer": {
        "prices": {
          "1stEditionHolofoil": {"market": 717.34},
          "unlimitedHolofoil": {"market": 508.76}
        }
      }
    },
    {
      "id": "dp3-3",
      "name": "Charizard",
      "supertype": "Pokémon",
      "subtypes": ["Stage 2"],
      "level": "55",
      "hp": "130",
      "types": ["Fire"],
      "evolvesFrom": "Charmeleon",
      "abilities": [
        {
          "name": "Fury Blaze",
          "text": "If your opponent has 3 or less Prize cards left, each of Charizard's attacks does 50 more damage.",
          "type": "Poké-Body"
        }
      ],
      "attacks": [
        {
          "name": "Blast Burn",
          "cost": ["Fire", "Fire", "Fire", "Colorless"],
          "convertedEnergyCost": 4,
          "damage": "120",
          "text": "Flip a coin. If heads, discard 2 Energy cards attached to Charizard. If tails, discard 4 Energy cards."
        }
      ],
      "weaknesses": [{"type": "Water", "value": "+40"}],
      "resistances": [{"type": "Fighting", "value": "-20"}],
      "retreatCost": ["Colorless", "Colorless", "Colorless"],
      "convertedRetreatCost": 3,
      "set": {
        "id": "dp3",
        "name": "Secret Wonders",
        "series": "Diamond & Pearl",
        "printedTotal": 132,
        "total": 132
      },
      "number": "3",
      "artist": "Daisuke Ito",
      "rarity": "Rare Holo",
      "flavorText": "It is said that CHARIZARD's fire burns hotter if it has experienced harsh battles.",
      "nationalPokedexNumbers": [6],
      "images": {
        "small": charizardImage,
        "large": charizardImage
      },
      "tcgplayer": {
        "prices": {
          "holofoil": {"market": 126.25},
          "reverseHolofoil": {"market": 150}
        }
      }
    },
    {
      "id": "base1-4",
      "name": "Charizard",
      "supertype": "Pokémon",
      "subtypes": ["Stage 2"],
      "level": "76",
      "hp": "120",
      "types": ["Fire"],
      "evolvesFrom": "Charmeleon",
      "abilities": [
        {
          "name": "Energy Burn",
          "text": "As often as you like during your turn, you may turn all Energy attached to Charizard into Fire Energy for the rest of the turn.",
          "type": "Pokémon Power"
        }
      ],
      "attacks": [
        {
          "name": "Fire Spin",
          "cost": ["Fire", "Fire", "Fire", "Fire"],
          "convertedEnergyCost": 4,
          "damage": "100",
          "text": "Discard 2 Energy cards attached to Charizard in order to use this attack."
        }
      ],
      "weaknesses": [{"type": "Water", "value": "×2"}],
      "resistances": [{"type": "Fighting", "value": "-30"}],
      "retreatCost": ["Colorless", "Colorless", "Colorless"],
      "convertedRetreatCost": 3,
      "set": {
        "id": "base1",
        "name": "Base",
        "series": "Base",
        "printedTotal": 102,
        "total": 102
      },
      "number": "4",
      "artist": "Mitsuhiro Arita",
      "rarity": "Rare Holo",
      "flavorText": "Spits fire that is hot enough to melt boulders. Known to unintentionally cause forest fires.",
      "nationalPokedexNumbers": [6],
      "images": {
        "small": charizardImage,
        "large": charizardImage
      },
      "tcgplayer": {
        "prices": {
          "holofoil": {"market": 450.61}
        }
      },
      "cardmarket": {
        "prices": {
          "averageSellPrice": 1390
        }
      }
    },
    {
      "id": "xy2-11",
      "name": "Charizard-EX",
      "supertype": "Pokémon",
      "subtypes": ["Basic", "EX"],
      "hp": "180",
      "types": ["Fire"],
      "rules": ["Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."],
      "attacks": [
        {
          "name": "Stoke",
          "cost": ["Colorless"],
          "convertedEnergyCost": 1,
          "damage": "",
          "text": "Flip a coin. If heads, search your deck for up to 3 basic Energy cards and attach them to this Pokémon."
        },
        {
          "name": "Fire Blast",
          "cost": ["Fire", "Colorless", "Colorless", "Colorless"],
          "convertedEnergyCost": 4,
          "damage": "120",
          "text": "Discard an Energy attached to this Pokémon."
        }
      ],
      "weaknesses": [{"type": "Water", "value": "×2"}],
      "retreatCost": ["Colorless", "Colorless"],
      "convertedRetreatCost": 2,
      "set": {
        "id": "xy2",
        "name": "Flashfire",
        "series": "XY",
        "printedTotal": 106,
        "total": 110
      },
      "number": "11",
      "artist": "Eske Yoshinob",
      "rarity": "Rare Holo EX",
      "nationalPokedexNumbers": [6],
      "images": {
        "small": charizardImage,
        "large": charizardImage
      },
      "tcgplayer": {
        "prices": {
          "holofoil": {"market": 9.87}
        }
      }
    },
    {
      "id": "mock-pikachu",
      "name": "Pikachu",
      "supertype": "Pokémon",
      "subtypes": ["Basic"],
      "hp": "60",
      "types": ["Lightning"],
      "attacks": [
        {
          "name": "Thunder Shock",
          "cost": ["Lightning"],
          "convertedEnergyCost": 1,
          "damage": "20",
          "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
        }
      ],
      "weaknesses": [{"type": "Fighting", "value": "×2"}],
      "retreatCost": ["Colorless"],
      "convertedRetreatCost": 1,
      "set": {
        "name": "Base Set",
        "total": 102
      },
      "number": "25",
      "artist": "Mitsuhiro Arita",
      "rarity": "Common",
      "images": {
        "small": charizardImage,
        "large": charizardImage
      }
    },
    {
      "id": "mock-blastoise",
      "name": "Blastoise",
      "supertype": "Pokémon",
      "subtypes": ["Stage 2"],
      "hp": "140",
      "types": ["Water"],
      "attacks": [
        {
          "name": "Hydro Pump",
          "cost": ["Water", "Water", "Water"],
          "convertedEnergyCost": 3,
          "damage": "60+",
          "text": "Does 10 more damage for each Water Energy attached to this Pokémon."
        }
      ],
      "weaknesses": [{"type": "Grass", "value": "×2"}],
      "retreatCost": ["Colorless", "Colorless", "Colorless"],
      "convertedRetreatCost": 3,
      "set": {
        "name": "Base Set",
        "total": 102
      },
      "number": "9",
      "artist": "Mitsuhiro Arita",
      "rarity": "Rare Holo",
      "images": {
        "small": charizardImage,
        "large": charizardImage
      }
    }
  ];

  // Filter cards based on query
  let filteredCards = mockCards;
  
  if (query) {
    filteredCards = mockCards.filter(card => 
      card.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Apply type filter
  if (filters.type) {
    filteredCards = filteredCards.filter(card => 
      card.types && card.types.includes(filters.type)
    );
  }

  // Apply rarity filter
  if (filters.rarity) {
    filteredCards = filteredCards.filter(card => 
      card.rarity === filters.rarity
    );
  }

  return {
    cards: filteredCards,
    totalCount: filteredCards.length,
    page: filters.page || 1,
    pageSize: filters.pageSize || 20,
  };
};

// Search for Pokemon cards - Production API calls
export const searchCards = async (query = '', filters = {}) => {
  try {
    // Production: Use real Pokemon TCG API
    let searchQuery = '';
    
    if (query) {
      searchQuery += `name:"${query}"`;
    }
    
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
    
    // Development fallback: Use mock data for local testing if API fails
    /*
    console.log('🎯 Using mock data for development - searching for:', query || 'all cards');
    await new Promise(resolve => setTimeout(resolve, 800));
    return getMockData(query, filters);
    */
  } catch (error) {
    console.error('Error searching cards:', error);
    throw new Error('Failed to search cards. Please try again.');
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
