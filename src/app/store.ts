import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, QuickSearch, SearchOptions } from './types';

export interface SearchState {
  searchTerm: string;
  searchResults: any[];
  legalities: string[];
  types: string[];
  clans: string[];
  textSearch: string,
}

const initialState: SearchState = {
  searchTerm: '',
  searchResults: [],
  legalities: [],
  types: [],
  clans: [],
  textSearch: '',
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
    },
    removeFromDeck: (state, action: PayloadAction<Card>) => {
      const index = state.currentDeck.findIndex(card => card.id === action.payload.id);
      if (index !== -1) {
        state.currentDeck.splice(index, 1);
      }
    },
  },
});

const quickSearchSlice = createSlice({
  name: 'quicksearch',
  initialState: initialQuickSearchState,
  reducers: {
    setQuickSearch: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

// Export the deck slice actions
export const { addToDeck, removeFromDeck } = deckSlice.actions;
export const { setSearchTerm, setSearchOptions } = searchSlice.actions;
export const { setQuickSearch } = quickSearchSlice.actions;

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    deck: deckSlice.reducer,
    quicksearch: quickSearchSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
