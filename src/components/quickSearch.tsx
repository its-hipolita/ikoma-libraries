import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, IconButton, ListItemIcon, ListItemText, MenuList, TextField, Paper, Typography, Box } from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { AddCircleOutline, Check, RemoveCircleOutline, Close, Search as SearchIcon } from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import { useAppDispatch } from '../app/hooks';
import { addToDeck, removeFromDeck, setQuickSearch } from '../app/store';
import { fetchXmlData } from '../services/xmlservice'; // Import the XML service function
import { SearchOptions } from '../app/types';
import { Card } from '../app/types';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const PaperContainer = styled(Paper)(({ theme }) => ({
    position: 'absolute',
    top: 'calc(100% + 8px)', // Position below the search bar with a gap
    width: '325px',
    right: '0',
    zIndex: 1, // Ensure it's above other elements
}));
const IconButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));


const QuickSearchBar: React.FC = () => {
    const [quickSearchTerm, setQuickSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Card[]>([]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useAppDispatch();
    const open = Boolean(anchorEl);
    const paperRef = useRef<HTMLDivElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleAddCard = (card: Card) => {
        dispatch(addToDeck(card));
    };

    const handleClose = () => {
        setMenuOpen(false);
    }

    const handleRemoveCard = (card: Card) => {
        dispatch(removeFromDeck(card));
    }

    const handleSearch = async (searchTerm: string) => {
        const searchOptions: SearchOptions = {
            searchTerm,
            legalities: [],
            types: [],
            clans: [],
            textSearch: '',
        };
        if (searchTerm.length > 0) {
            try {
                const cards = await fetchXmlData(searchOptions, 10, true); // Call XML service with quickSearch option
                setSearchResults(cards); // Update search results with card names
                setMenuOpen(true);
            } catch (error) {
                console.error('Failed to fetch XML data:', error);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(quickSearchTerm.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <Search id="search-menu">
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Quick search"
                    inputProps={{ 'aria-label': 'search' }}
                    value={quickSearchTerm}
                    onChange={(e) => setQuickSearchTerm(e.target.value)}
                    onFocus={(e) => searchResults.length > 1 ? setMenuOpen(true) : null}
                />
            </Search>
            {searchResults.length > 0 && menuOpen && (
                <PaperContainer ref={paperRef}>
                    <IconButtonContainer>
                        <IconButton aria-label="close" onClick={handleClose}>
                            <Close />
                        </IconButton>
                    </IconButtonContainer>
                    {searchResults.map((card, index) => (
                        <Box key={index} display="flex" alignItems="center" justifyContent="space-between" p={1}>
                        <Typography>{card.name}</Typography>
                        <IconButtonContainer>
                            <IconButton aria-label="remove" size="small" onClick={() => handleRemoveCard(card)}>
                                <RemoveCircleOutline />
                            </IconButton>
                            <IconButton aria-label="add" size="small" onClick={() => handleAddCard(card)}>
                                <AddCircleOutline />
                            </IconButton>
                        </IconButtonContainer>
                    </Box>
                    ))}
                </PaperContainer>
            )}
        </form>
    );

};

export default QuickSearchBar;
