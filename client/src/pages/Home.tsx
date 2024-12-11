import { useQuery } from '@apollo/client';

// import { Link } from 'react-router-dom';
import { QUERY_RECIPES } from '../utils/queries.ts';
import { Box, Typography } from '@mui/material';
import RecipeList from '../components/RecipeList/index.tsx';
// import SingleRecipe from './SingleRecipe.tsx';





const Home = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);
  const recipes = data?.recipes || [];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#BBE1C3',
        color: '#2E5230',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ textAlign: 'center', marginBottom: '1.5rem' }}
      >
        Recipes
      </Typography>
      <Box
        sx={{
          width: '80%',
          maxWidth: '1200px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '1rem',
          maxHeight: '70vh', // Limit height for scrolling
          overflowY: 'auto', // Enable vertical scrolling
        }}
      >
        {loading ? (
          <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>
        ) : recipes.length > 0 ? (

          <RecipeList recipes={recipes} />
        ) : (
          <Typography>No recipes available.</Typography>
        )}
      </Box>
    </Box>
  );
};


export default Home;
