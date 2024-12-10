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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '200vh',
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
         
          <RecipeList recipes={recipes}/>
          </>
          )}
      </Box>
    
  );
};

export default Home;
