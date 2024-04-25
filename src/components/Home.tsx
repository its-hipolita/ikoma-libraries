import React from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchBar from './Searchbar';
import ResultsView from './resultsView';

const Sidebar = styled(Box)({
    backgroundColor: 'lightgray',
    padding: '16px',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh', // Adjust as needed
    width: '250px', // Adjust as needed
    overflowY: 'auto', // Add scrollbar if content exceeds height
    zIndex: 1, // Ensure sidebar stays above other content
});

const Home = () => {
    return (
        <Grid container spacing={4}>
            {/* Sidebar */}
            <Grid item xs={12} md={2}>
                <Sidebar>
                    <SearchBar />
                </Sidebar>
            </Grid>
            <Grid item xs={12} md={10}>
                <ResultsView />
            </Grid>
        </Grid>
    );
};

export default Home;
