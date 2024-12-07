import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface RecipeSummary {
  recipeName: string;
  recipeAuthor: string;
  servingSize: string;
  tags: string[];
}

const recipeSummary: RecipeSummary[] = [
  {
    recipeName: 'Spaghetti Bolognese',
    recipeAuthor: 'John Doe',
    servingSize: '4',
    tags: ['Italian', 'Pasta', 'Main Course'],
  },
  {
    recipeName: 'Chicken Curry',
    recipeAuthor: 'Jane Smith',
    servingSize: '3',
    tags: ['Indian', 'Spicy', 'Main Course'],
  },
];

const RecipeList: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      backgroundColor: '#BBE1C3', // Light green background
      color: '#869D7A', // Muted green for text,
    }}
  >
    {recipeSummary.map((recipe: RecipeSummary, index: number) => (
      <Box key={index} sx={{ marginBottom: 2 }}>
        <Typography variant="h6">{recipe.recipeName}</Typography>
        <Typography>by {recipe.recipeAuthor}</Typography>
        <Typography>Serving Size: {recipe.servingSize}</Typography>
        {recipe.tags.map((tag: string, tagIndex: number) => (
          <Typography key={tagIndex}>{tag}</Typography>
        ))}
        <Link
          className="btn btn-primary btn-block btn-squared"
          to={`/recipe/${recipe.recipeName}`}
        >
          View Recipe
        </Link>
      </Box>
    ))}
  </Box>
);

export default RecipeList;