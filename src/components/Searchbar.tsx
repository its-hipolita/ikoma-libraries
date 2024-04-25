import React, { useState } from 'react';
import { Stack, Input, Button, Autocomplete, Checkbox, TextField } from '@mui/material';
import { useAppDispatch } from '../app/hooks';
import { setSearchOptions } from '../app/store';
import clanList from '../data/clanList copy';
import cardTypes from '../data/cardTypes';
import legalities from '../data/legalities';

const SearchBar: React.FC = () => {
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [selectedLegalities, setSelectedLegalities] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedClans, setSelectedClans] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(
            setSearchOptions({
                searchTerm: localSearchTerm.trim(),
                legalities: selectedLegalities,
                types: selectedTypes,
                clans: selectedClans,
            })
        );
    };
    return (
        <Stack className="max-w-md mx-auto" spacing={4}>
            <form onSubmit={handleSearch} className="mb-4">
                <Stack direction="row" alignItems="center" justifyContent="space-between" borderBottom="2px solid teal" py={2}>
                    <Input
                        type="text"
                        value={localSearchTerm}
                        onChange={(e) => setLocalSearchTerm(e.target.value)}
                        placeholder="Search for a card..."
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                    <Button
                        type="submit"
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                        Search
                    </Button>
                </Stack>
                {/* Multi-select combo boxes with typeahead suggestions */}
                <Autocomplete
                    multiple
                    id="legalities"
                    options={legalities}
                    value={selectedLegalities}
                    onChange={(event, newValue) => setSelectedLegalities(newValue)}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox checked={selected} />
                            {option}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} label="Legalities" placeholder="Select legalities" />
                    )}
                />
                <Autocomplete
                    multiple
                    id="types"
                    options={cardTypes}
                    value={selectedTypes}
                    onChange={(event, newValue) => setSelectedTypes(newValue)}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox checked={selected} />
                            {option}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} label="Types" placeholder="Select types" />
                    )}
                />
                <Autocomplete
                    multiple
                    id="clans"
                    options={clanList}
                    value={selectedClans}
                    onChange={(event, newValue) => setSelectedClans(newValue)}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox checked={selected} />
                            {option}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} label="Clans" placeholder="Select clans" />
                    )}
                />
            </form>
        </Stack>
    );
};

export default SearchBar;
