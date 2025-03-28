import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Create a theme instance for ADHD and autism-friendly design
const theme = createTheme({
  palette: {
    primary: {
      main: '#6750A4', // Purple similar to Tiimo
    },
    secondary: {
      main: '#E8DEF8', // Light purple
    },
    background: {
      default: '#F6F5FA', // Light background for better contrast
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<div>Aashu - ADHD & Autism-Friendly Planning App</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
