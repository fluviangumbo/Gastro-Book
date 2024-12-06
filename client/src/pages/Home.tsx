import { useQuery } from '@apollo/client';

import { QUERY_RECIPES } from '../utils/queries.ts';
import { Box, Typography, Paper } from '@mui/material';



const Home = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);
  console.log(data) // Remove this eventually
  const recipes = data?.recipe || [];
  console.log(recipes);

  return (  
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#BBE1C3', // Light green background
        color: '#869D7A', // Muted green for text,
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
          <Typography variant="h2" component="h2" gutterBottom>
            Home Page
          {loading ? (
            <div>Loading...</div>
          ) : (
            <p>Component Here</p>
          )}
          </Typography>
        </Paper>
      </Box>
  
  );
};

export default Home;
