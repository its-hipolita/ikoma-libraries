import { configureStore, createSlice, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { Card, QuickSearch, SearchOptions } from './types';

export interface SearchState {
  searchTerm: string;
  searchResults: any[];
  legalities: string[];
  types: string[];
  clans: string[];
  textSearch: string,
  keywords: any[];
  forceRange: [number | string, number | string];
  chiRange: [number | string, number | string];
  costRange: [number | string, number | string];
  personalHonorRange: [number | string, number | string];
  honorRequirementRange: [number | string, number | string];
  goldProductionRange: [number | string, number | string];
  focusValueRange: [number | string, number | string];
}

const initialState: SearchState = {
  searchTerm: '',
  searchResults: [],
  legalities: [],
  types: [],
  clans: [],
  textSearch: '',
  keywords: [],
  forceRange: ['', ''],
  chiRange: ['', ''],
  costRange: ['', ''],
  personalHonorRange: ['', ''],
  honorRequirementRange: ['', ''],
  goldProductionRange: ['', ''],
  focusValueRange: ['', ''],
};
export interface DeckState {
  currentDeck: Card[];
}

const initialDeckState: DeckState = {
  currentDeck: [],
};

export interface QuickSearchState {
  searchTerm: string;
}

const initialQuickSearchState: QuickSearchState = {
  searchTerm: '',
}


const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSearchOptions: (state, action: PayloadAction<Partial<SearchState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

const deckSlice = createSlice({
  name: 'deck',
  initialState: initialDeckState,
  reducers: {
    addToDeck: (state, action: PayloadAction<Card>) => {
      state.currentDeck.push(action.payload);
      sortDeck(state.currentDeck); // Sort the deck after adding a card
    },
    removeFromDeck: (state, action: PayloadAction<Card>) => {
      const index = state.currentDeck.findIndex(card => card.id === action.payload.id);
      if (index !== -1) {
        state.currentDeck.splice(index, 1);
        sortDeck(state.currentDeck); // Sort the deck after removing a card
      }
    },
    importDeck: (state, action: PayloadAction<Card[]>) => {
      state.currentDeck = action.payload;
      sortDeck(state.currentDeck); // Sort the deck after importing a deck
    },
  },
});

// Function to sort the deck first by type and then by name
const sortDeck = (deck: Card[]) => {
  deck.sort((a, b) => {
    // Sort by type
    if (a.type < b.type) return -1;
    if (a.type > b.type) return 1;
    // If types are the same, sort by name
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
};


const quickSearchSlice = createSlice({
  name: 'quicksearch',
  initialState: initialQuickSearchState,
  reducers: {
    setQuickSearch: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

// Create a middleware to ensure currentDeck is always an array
const ensureCurrentDeckIsArray: Middleware = ({ getState }) => next => action => {
  const state = getState();
  if (!Array.isArray(state.deck.currentDeck)) {
    state.deck.currentDeck = [];
  }
  return next(action);
};


// Export the deck slice actions
export const { addToDeck, removeFromDeck, importDeck } = deckSlice.actions;
export const { setSearchTerm, setSearchOptions } = searchSlice.actions;
export const { setQuickSearch } = quickSearchSlice.actions;

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    deck: deckSlice.reducer,
    quicksearch: quickSearchSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(ensureCurrentDeckIsArray),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
