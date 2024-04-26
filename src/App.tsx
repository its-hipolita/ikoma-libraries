import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DeckBuilder from './components/deckBuilder';
import { Box, Grid } from '@mui/material';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Box>
        <Routes>
          <Route path="/deckbuilder" element={<DeckBuilder />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
