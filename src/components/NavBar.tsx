import React, { useState } from 'react';
import { Paper, IconButton, Stack, Drawer, TextField } from '@mui/material';
import { Search, Star } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SearchForm from './searchForm';
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom'; // Import Link for routing
import { useAppDispatch } from '../app/hooks';
import { setSearchOptions } from '../app/store';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import QuickSearchBar from './quickSearch'; // Import the SearchBar component

const NavBar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const toggleDrawer = (isOpen: boolean) => () => {
        setOpen(isOpen);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={toggleDrawer(true)}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <SearchIcon />
                        </IconButton>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            The Ikoma Libraries
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <Link to="/">
                                Home
                            </Link>
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <Link to="/deckbuilder">
                                Deck Builder
                            </Link>
                        </Typography>
                        <QuickSearchBar />
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <SearchForm />
            </Drawer>
        </>
    );
};

export default NavBar;
