import { SearchState } from './store';

// Define the initial state
const initialState: SearchState = {
    searchTerm: '',
    searchResults: [],
    legalities: [],
    types: [],
    clans: [],
    // Initialize more search options if needed
};

// Define the search reducer
const searchReducer = (state = initialState, action: any): SearchState => {
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

export default searchReducer;
