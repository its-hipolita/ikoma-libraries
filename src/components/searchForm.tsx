import React, { useEffect, useState } from 'react';
import { Stack, TextField, Button, Autocomplete } from '@mui/material';

import legalities from '../data/legalities';
import cardTypes from '../data/cardTypes';
import clanList from '../data/clanList copy';
import { useAppDispatch } from '../app/hooks';
import { setSearchOptions } from '../app/store';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const SearchForm = () => {
    const searchOptions = useSelector((state: RootState) => state.search);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchOptions.searchTerm);
    const [localTextSearch, setLocalTextSearch] = useState(searchOptions.textSearch);
    const [selectedLegalities, setSelectedLegalities] = useState<string[]>(searchOptions.legalities);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(searchOptions.types);
    const [selectedClans, setSelectedClans] = useState<string[]>(searchOptions.clans);
    const dispatch = useAppDispatch();

    const handleSearch = (e:any) => {
        e.preventDefault();
        dispatch(
            setSearchOptions({
                searchTerm: localSearchTerm.trim(),
                legalities: selectedLegalities,
                types: selectedTypes,
                clans: selectedClans,
                textSearch: localTextSearch.trim(), // Include text search in setSearchOptions
            })
        );
    };

    const isAnyOptionSelected =
        selectedLegalities.length > 0 || selectedTypes.length > 0 || selectedClans.length > 0 || localTextSearch.trim() !== '';

    return (
        <Stack sx={{ width: 280, p: 2 }}>
            <form onSubmit={handleSearch} className="mb-4">
                <TextField
                    type="text"
                    value={localSearchTerm}
                    onChange={(e) => setLocalSearchTerm(e.target.value)}
                    placeholder={localSearchTerm.length > 0 ? '' : 'Search for a card...'}
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <TextField
                    type="text"
                    value={localTextSearch}
                    onChange={(e) => setLocalTextSearch(e.target.value)}
                    label="Search in text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
                    Search
                </Button>
                <Autocomplete
                    multiple
                    id="legalities"
                    options={legalities}
                    value={selectedLegalities}
                    onChange={(event, newValue) => setSelectedLegalities(newValue)}
                    renderInput={(params) => <TextField {...params} label="Legalities" variant="outlined" size="small" fullWidth />}
                    sx={{ mt: 2 }}
                />
                <Autocomplete
                    multiple
                    id="types"
                    options={cardTypes}
                    value={selectedTypes}
                    onChange={(event, newValue) => setSelectedTypes(newValue)}
                    renderInput={(params) => <TextField {...params} label="Types" variant="outlined" size="small" fullWidth />}
                    sx={{ mt: 2 }}
                />
                <Autocomplete
                    multiple
                    id="clans"
                    options={clanList}
                    value={selectedClans}
                    onChange={(event, newValue) => setSelectedClans(newValue)}
                    renderInput={(params) => <TextField {...params} label="Clans" variant="outlined" size="small" fullWidth />}
                    sx={{ mt: 2 }}
                />
            </form>
        </Stack>
    );
};

export default SearchForm;
