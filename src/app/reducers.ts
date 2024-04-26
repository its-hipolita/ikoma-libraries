import { SearchState, DeckState } from './store'; // Assuming you have a DeckState type defined
import { combineReducers } from 'redux';

// Define the initial state for search
const initialSearchState: SearchState = {
    searchTerm: '',
    searchResults: [],
    legalities: [],
    types: [],
    clans: [],
    textSearch: '',
    // Initialize more search options if needed
};

// Define the initial state for deck
const initialDeckState: DeckState = {
    currentDeck: []
    // Add more deck-related state if needed
};

// Define the search reducer
const searchReducer = (state = initialSearchState, action: any): SearchState => {
    switch (action.type) {
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        case 'SET_SEARCH_RESULTS':
            return { ...state, searchResults: action.payload };
        case 'SET_LEGALITIES':
            return { ...state, legalities: action.payload };
        case 'SET_TYPES':
            return { ...state, types: action.payload };
        case 'SET_CLANS':
            return { ...state, clans: action.payload };
        // Add cases for more search options if needed
        default:
            return state;
    }
};

// Define the deck reducer
const deckReducer = (state = initialDeckState, action: any): DeckState => {
    switch (action.type) {
        case 'ADD_TO_DECK':
            return { ...state, currentDeck: [...state.currentDeck, action.payload] };
        // Add more cases for deck-related actions if needed
        default:
            return state;
    }
};


// Combine reducers
const rootReducer = combineReducers({
    search: searchReducer,
    deck: deckReducer
});

export default rootReducer;
