import { useRouteError } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#BBE1C3', // Light green background
        color: '#869D7A', // Muted green for text
        padding: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          textAlign: 'center',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#A7CDBD', // Muted aqua green background for the card
          color: '#869D7A' // Muted green for text
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#FF964F', // Bright orange for the title
            marginBottom: 2
          }}
        >
          Oh No!!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.2rem',
            marginBottom: 2,
            color: '#91785D' // Soft brown for the text
          }}
        >
          It looks like there was a grease fire in the kitchen.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.2rem',
            marginBottom: 2,
            color: '#91785D' // Soft brown for the text
          }}
        >
          Excuse me while we put this fire out!!
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontStyle: 'italic',
            color: '#8B5D33' // Rich brown for error details
          }}
        >
          {error.statusText || error.message}
        </Typography>
      </Paper>
    </Box>
  );
}
