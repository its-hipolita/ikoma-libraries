import React, { useEffect, useState } from 'react';
import { Stack, TextField, Button, Autocomplete, useTheme, ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

import legalities from '../data/legalities';
import cardTypes from '../data/cardTypes';
import clanList from '../data/clanList copy';
import keywordsArray from '../data/keywordsArray';
import { useAppDispatch } from '../app/hooks';
import { setSearchOptions } from '../app/store';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

// Custom styled TextField with adjusted border color and text color for dark theme
const ThemedTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400], // Adjust border color for dark theme
    },
    '& input': {
      color: theme.palette.text.primary, // Adjust text color for dark theme
    },
  },
}));

const SearchForm = () => {
    const searchOptions = useSelector((state: RootState) => state.search);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchOptions.searchTerm);
    const [localTextSearch, setLocalTextSearch] = useState(searchOptions.textSearch);
    const [selectedLegalities, setSelectedLegalities] = useState<string[]>(searchOptions.legalities);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(searchOptions.types);
    const [selectedClans, setSelectedClans] = useState<string[]>(searchOptions.clans);
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>(searchOptions.keywords); // New state for selected keywords
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSearch = (e:any) => {
        e.preventDefault();
        dispatch(
            setSearchOptions({
                searchTerm: localSearchTerm.trim(),
                legalities: selectedLegalities,
                types: selectedTypes,
                clans: selectedClans,
                textSearch: localTextSearch,
                keywords: selectedKeywords, // Include selected keywords in setSearchOptions
            })
        );

        // Check if the user is on '/deckbuilder' and the screen size is mobile
        if (window.innerWidth <= theme.breakpoints.values.sm && window.location.pathname === '/deckbuilder') {
            navigate('/'); // Redirect to '/' on mobile when on '/deckbuilder'
        }
    };

    return (
        <Stack sx={{ width: 280, p: 2 }}>
            <form onSubmit={handleSearch} className="mb-4">
                {/* Replace TextField with ThemedTextField */}
                <ThemedTextField
                    type="text"
                    value={localSearchTerm}
                    onChange={(e) => setLocalSearchTerm(e.target.value)}
                    placeholder={localSearchTerm.length > 0 ? '' : 'Search for a card...'}
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                {/* Replace TextField with ThemedTextField */}
                <ThemedTextField
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
                <ClickAwayListener onClickAway={() => {}}>
                    <Autocomplete
                        multiple
                        id="legalities"
                        options={legalities}
                        value={selectedLegalities}
                        onChange={(event, newValue) => setSelectedLegalities(newValue)}
                        renderInput={(params) => <ThemedTextField {...params} label="Legalities" variant="outlined" size="small" fullWidth />}
                        sx={{ mt: 2 }}
                    />
                </ClickAwayListener>
                <ClickAwayListener onClickAway={() => {}}>
                    <Autocomplete
                        multiple
                        id="types"
                        options={cardTypes}
                        value={selectedTypes}
                        onChange={(event, newValue) => setSelectedTypes(newValue)}
                        renderInput={(params) => <ThemedTextField {...params} label="Types" variant="outlined" size="small" fullWidth />}
                        sx={{ mt: 2 }}
                    />
                </ClickAwayListener>
                <ClickAwayListener onClickAway={() => {}}>
                    <Autocomplete
                        multiple
                        id="clans"
                        options={clanList}
                        value={selectedClans}
                        onChange={(event, newValue) => setSelectedClans(newValue)}
                        renderInput={(params) => <ThemedTextField {...params} label="Clans" variant="outlined" size="small" fullWidth />}
                        sx={{ mt: 2 }}
                    />
                </ClickAwayListener>
                <ClickAwayListener onClickAway={() => {}}>
                    <Autocomplete
                        multiple
                        id="keywords"
                        options={keywordsArray}
                        value={selectedKeywords}
                        onChange={(event, newValue) => setSelectedKeywords(newValue)}
                        renderInput={(params) => <ThemedTextField {...params} label="Keywords" variant="outlined" size="small" fullWidth />}
                        sx={{ mt: 2 }}
                    />
                </ClickAwayListener>
            </form>
        </Stack>
    );
};

export default SearchForm;
