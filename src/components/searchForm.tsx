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
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>(searchOptions.keywords);
    const [forceRange, setForceRange] = useState<[number | string, number | string]>(searchOptions.forceRange);
    const [chiRange, setChiRange] = useState<[number | string, number | string]>(searchOptions.chiRange);
    const [costRange, setCostRange] = useState<[number | string, number | string]>(searchOptions.costRange);
    const [personalHonorRange, setPersonalHonorRange] = useState<[number | string, number | string]>(searchOptions.personalHonorRange);
    const [honorRequirementRange, setHonorRequirementRange] = useState<[number | string, number | string]>(searchOptions.honorRequirementRange);
    const [goldProductionRange, setGoldProductionRange] = useState<[number | string, number | string]>(searchOptions.goldProductionRange);
    const [focusValueRange, setFocusValueRange] = useState<[number | string, number | string]>(searchOptions.focusValueRange);

    const dispatch = useAppDispatch();
    const theme = useTheme();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSearch = (e: any) => {
        e.preventDefault();
        dispatch(
            setSearchOptions({
                searchTerm: localSearchTerm.trim(),
                legalities: selectedLegalities,
                types: selectedTypes,
                clans: selectedClans,
                textSearch: localTextSearch,
                keywords: selectedKeywords, // Include selected keywords in setSearchOptions
                forceRange: forceRange,
                chiRange: chiRange,
                costRange: costRange,
                personalHonorRange: personalHonorRange,
                honorRequirementRange: honorRequirementRange,
                goldProductionRange: goldProductionRange,
                focusValueRange: focusValueRange,

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
                <ClickAwayListener onClickAway={() => { }}>
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
                <ClickAwayListener onClickAway={() => { }}>
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
                <ClickAwayListener onClickAway={() => { }}>
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
                <ClickAwayListener onClickAway={() => { }}>
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

                <Stack direction="row">
                    <ThemedTextField
                        type="number"
                        value={forceRange[0]}
                        onChange={(e) => setForceRange([e.target.value, forceRange[1]])}
                        label="Force (from)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2, mr: 2 }}
                    />
                    <ThemedTextField
                        type="number"
                        value={forceRange[1]}
                        onChange={(e) => setForceRange([forceRange[0], e.target.value])}
                        label="Force (to)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                </Stack>

                <Stack direction="row">
                    <ThemedTextField
                        type="number"
                        value={chiRange[0]}
                        onChange={(e) => setChiRange([e.target.value, chiRange[1]])}
                        label="Chi (from)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2, mr: 2 }}
                    />
                    <ThemedTextField
                        type="number"
                        value={chiRange[1]}
                        onChange={(e) => setChiRange([chiRange[0], e.target.value])}
                        label="Chi (to)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                </Stack>


                <Stack direction="row">
                    <ThemedTextField
                        type="number"
                        value={costRange[0]}
                        onChange={(e) => setCostRange([e.target.value, costRange[1]])}
                        label="Cost (from)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2, mr: 2 }}
                    />
                    <ThemedTextField
                        type="number"
                        value={costRange[1]}
                        onChange={(e) => setCostRange([costRange[0], e.target.value])}
                        label="Cost (to)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                </Stack>

                <Stack direction="row">
                    <ThemedTextField
                        type="number"
                        value={personalHonorRange[0]}
                        onChange={(e) => setPersonalHonorRange([e.target.value, personalHonorRange[1]])}
                        label="Personal honor (from)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2, mr: 2 }}
                    />
                    <ThemedTextField
                        type="number"
                        value={personalHonorRange[1]}
                        onChange={(e) => setPersonalHonorRange([personalHonorRange[0], e.target.value])}
                        label="Personal honor (to)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                </Stack>

                <Stack direction="row">
                    <ThemedTextField
                        type="number"
                        value={honorRequirementRange[0]}
                        onChange={(e) => setHonorRequirementRange([e.target.value, honorRequirementRange[1]])}
                        label="Honor requirement (from)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2, mr: 2 }}
                    />
                    <ThemedTextField
                        type="number"
                        value={honorRequirementRange[1]}
                        onChange={(e) => setHonorRequirementRange([honorRequirementRange[0], e.target.value])}
                        label="Honor requirement (to)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                </Stack>

                <Stack direction="row">
                    <ThemedTextField
                        type="number"
                        value={goldProductionRange[0]}
                        onChange={(e) => setGoldProductionRange([e.target.value, goldProductionRange[1]])}
                        label="Gold production (from)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2, mr: 2 }}
                    />
                    <ThemedTextField
                        type="number"
                        value={goldProductionRange[1]}
                        onChange={(e) => setGoldProductionRange([goldProductionRange[0], e.target.value])}
                        label="Gold production (to)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                </Stack>

                <Stack direction="row">
                    <ThemedTextField
                        type="number"
                        value={focusValueRange[0]}
                        onChange={(e) => setFocusValueRange([e.target.value, focusValueRange[1]])}
                        label="Focus value (from)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2, mr: 2 }}
                    />
                    <ThemedTextField
                        type="number"
                        value={focusValueRange[1]}
                        onChange={(e) => setFocusValueRange([focusValueRange[0], e.target.value])}
                        label="Focus value (to)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                </Stack>
            </form>
        </Stack>
    );
};

export default SearchForm;
