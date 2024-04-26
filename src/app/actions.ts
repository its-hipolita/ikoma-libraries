import { Card } from "./types";

export const setSearchTerm = (searchTerm:string) => ({
    type: 'SET_SEARCH_TERM',
    payload: searchTerm,
});

export const setSearchResults = (results:any) => ({
    type: 'SET_SEARCH_RESULTS',
    payload: results,
});

export const ADD_TO_DECK = 'ADD_TO_DECK';

export const addToDeck = (card: Card) => ({
    type: ADD_TO_DECK,
    payload: card
});

export const REMOVE_FROM_DECK = 'REMOVE_FROM_DECK';

export const removeFromDeck = (card: Card) => ({
    type: REMOVE_FROM_DECK,
    payload: card
});

export const setQuickSearch = (quickSearch:string) => ({
    type: 'SET_QUICK_SEARCH',
    payload: quickSearch,
});
