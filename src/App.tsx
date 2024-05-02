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
        <Routes>
          <Route path="/deckbuilder" element={<DeckBuilder />} />
          <Route path="/" element={<Home />} />
        </Routes>
    </Router>
  );
}

export default App;
