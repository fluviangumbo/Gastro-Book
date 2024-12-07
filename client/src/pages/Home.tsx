import { useQuery } from '@apollo/client';

// import { Link } from 'react-router-dom';
import { QUERY_RECIPES } from '../utils/queries.ts';
import { Box, Typography, Paper } from '@mui/material';
import RecipeList from '../components/RecipeList/index.tsx';
// import SingleRecipe from './SingleRecipe.tsx';





const Home = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);

  const recipes = data?.recipes || [];

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
          Home page
        </Typography>
      </Paper>
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
        <Typography variant="h3" component="h3" gutterBottom>
          Recipes
        </Typography>
        {loading ? (
          <Typography>
            Loading...
          </Typography>
        ) : (
          <>
         <Typography>
          Put your recipes here
          </Typography>
          <RecipeList recipes={recipes}/>
          </>
          )}
      </Box>
    </Box>
  );
};

export default Home;
