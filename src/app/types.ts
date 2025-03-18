export interface SearchOptions {
    searchTerm: string;
    legalities: string[],
    types: string[],
    clans: string[],
    textSearch: string;
    keywords: string[],
    forceRange: [number | string, number | string];
    chiRange: [number | string, number | string];
    costRange: [number | string, number | string];
    personalHonorRange: [number | string, number | string];
    honorRequirementRange: [number | string, number | string];
    goldProductionRange: [number | string, number | string];
    focusValueRange: [number | string, number | string];
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
    gold_production: string | null;
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
