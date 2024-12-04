import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

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
          by the Tech Thoughts team.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;