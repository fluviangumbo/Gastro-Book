import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';

import RamenDiningIcon from '@mui/icons-material/RamenDining';

const theme = createTheme({
  palette: {
    primary: {
      main: '#869D7A', // Olive green
    },
    secondary: {
      main: '#FF964F', // Orange
    },
    background: {
      default: '#BBE1C3', // Light green
      paper: '#A7CDBD', // Muted green
    },
    text: {
      primary: '#91785D', // Taupe
      secondary: '#8B5D33', // Brown
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <ThemeProvider theme={theme}>  
    <Box
      sx={{
        width: '100%',
        marginTop: 'auto',
        backgroundColor: 'primary.main',
        padding: 4,
        textAlign: 'center',
      }}
    >
      <Container>
        <RamenDiningIcon />
        {location.pathname !== '/' && (
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginBottom: 3,
            }}
            onClick={handleGoBack}
          >
            &larr; Go Back
          </Button>
        )}
        <Typography variant="h4">
          Made with{' '}
          <span role="img" aria-label="heart" aria-hidden="false">
            ❤️
          </span>{' '}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          **All pre-made recipes courtesy of{' '}
          <a
            href="https://www.bbcgoodfood.com/recipes"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            https://www.bbcgoodfood.com/recipes
          </a>
        </Typography>
      </Container>
    </Box>
    </ThemeProvider>
  );

};

export default Footer;