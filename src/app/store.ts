import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  searchTerm: string;
  searchResults: any[]; // Update this with the appropriate type for search results
  legalities: string[];
  types: string[];
  clans: string[];
  // Add more search options as needed
}

const initialState: SearchState = {
  searchTerm: '',
  searchResults: [],
  legalities: [],
  types: [],
  clans: [],
  // Initialize more search options if needed
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSearchOptions: (state, action: PayloadAction<Partial<SearchState>>) => {
      Object.assign(state, action.payload);
    },
    // Add reducers for other search options if needed
  },
});

export const { setSearchTerm, setSearchOptions } = searchSlice.actions;

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
