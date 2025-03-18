import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, useMediaQuery, useTheme, Box, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchForm from './searchForm';
import { Link } from 'react-router-dom';
import QuickSearch from './quickSearch';

const NavBar: React.FC = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Menu Icon for Mobile */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Stack direction="row" sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div">
                            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                        </Typography>

                        {/* Nav Links */}
                        <Typography variant="h6" component="div" sx={{ ml: 2 }}>
                            <Link to="/deckbuilder" style={{ color: 'inherit', textDecoration: 'none' }}>Deckbuilder</Link>
                        </Typography>
                    </Stack>

                    {/* Render QuickSearchBar only if NOT mobile */}
                    {!isMobile && <QuickSearch />}
                </Toolbar>
            </AppBar>

            {/* Drawer for Mobile */}
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={toggleDrawer}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '80vw', 
                        maxWidth: '320px', 
                    },
                }}
            >
                    <SearchForm />
            </Drawer>
        </>
    );
};

export default NavBar;
