import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { QUERY_RECIPE } from '../utils/queries.ts';

const SingleRecipe = () => {
  const { recipeId } = useParams();

  const { loading, data } = useQuery(QUERY_RECIPE, {
    variables: { recipeId: recipeId },
  });

  const recipe = data?.recipe || {};
  console.log(recipe.ingredients);

  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        fontFamily: '"Poppins", sans-serif', // Fun modern font
        padding: 4,
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: 2, color: 'primary.main' }}>
        {recipe.recipeName}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          color: 'secondary.main',
        }}
      >
        by {recipe.recipeAuthor.username}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        {recipe.recipeDescription}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 4, fontStyle: 'italic' }}>
        Serving Size: {recipe.servingSize}
      </Typography>
      <Divider sx={{ marginBottom: 4 }} />
      <Box>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Ingredients:
        </Typography>
        <List sx={{ padding: 0 }}>
          {recipe.ingredients.map((ingredient: string, i: number) => (
            <ListItem
              key={i}
              sx={{
                padding: '2px 0', // Minimal vertical padding
                margin: 0, // Remove margin
              }}
            >
              <ListItemText
                primary={ingredient}
                sx={{
                  textAlign: 'left',
                  margin: 0, // Remove additional margin
                  color: 'text.secondary',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider sx={{ marginY: 4 }} />
      <Box>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Instructions:
        </Typography>
        <List sx={{ padding: 0 }}>
          {recipe.instructions.map((instruction: string, i: number) => (
            <ListItem
              key={i}
              sx={{
                padding: '2px 0',
                margin: 0,
              }}
            >
              <ListItemText
                primary={`${i + 1}. ${instruction}`}
                sx={{
                  margin: 0,
                  color: 'text.primary',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SingleRecipe;