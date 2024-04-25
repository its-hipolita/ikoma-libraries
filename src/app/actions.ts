export const setSearchTerm = (searchTerm:string) => ({
    type: 'SET_SEARCH_TERM',
    payload: searchTerm,
});

export const setSearchResults = (results:any) => ({
    type: 'SET_SEARCH_RESULTS',
    payload: results,
});