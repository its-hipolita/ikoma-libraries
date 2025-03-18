import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import  store from './app/store';
import App from './App';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';


const container = document.getElementById('root')!;
const root = createRoot(container);
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // A blue color for primary
    },
    secondary: {
      main: '#dc004e', // A pink color for secondary
    },
    background: {
      default: '#f5f5f5', // Light gray background
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Default font family
    h1: {
      fontSize: '2.5rem', // Custom font size for h1
      fontWeight: 600, // Custom font weight for h1
      marginBottom: '1rem', // Custom margin bottom for h1
    },
    h2: {
      fontSize: '2rem', // Custom font size for h2
      fontWeight: 500, // Custom font weight for h2
      marginBottom: '0.8rem', // Custom margin bottom for h2
    },
    // Add more custom typography styles as needed
  },
  shape: {
    borderRadius: 8, // Custom border radius for elements
  },
});
root.render(
  
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);