export interface SearchOptions {
    searchTerm: string;
    legalities: string[],
    types: string[],
    clans: string[],
    textSearch: string;
}

export interface QuickSearch {
  searchTerm: string;
}

export interface Card {
    id: string;
    type: string;
    name: string;
    rarity: string;
    edition: string;
    image: string;
    legal: any;
    text: string;
    cost: string | null;
    focus: string | null;
    clan: string | null;
    force: string | null;
    chi: string | null;
    personal_honor: string | null;
    honor_req: string | null;
}

export const SET_SEARCH_OPTIONS = 'SET_SEARCH_OPTIONS';

export interface SetSearchOptionsAction {
  type: typeof SET_SEARCH_OPTIONS;
  payload: SearchOptions;
}

export const setSearchOptions = (searchOptions: SearchOptions): SetSearchOptionsAction => ({
  type: SET_SEARCH_OPTIONS,
  payload: searchOptions,
});
