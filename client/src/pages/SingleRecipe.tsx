import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { QUERY_RECIPE } from '../utils/queries.ts';

const SingleRecipe = () => {
  const { recipeId: recipeParam } = useParams();

  const { loading, data } = useQuery(QUERY_RECIPE, {
    variables: { recipeId: recipeParam },
  });

  const recipe = data?.recipe || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.recipeName}</h1>
      <h3>
        {recipe.recipeAuthor.username}
      </h3>
      <p>{recipe.recipeDescription}</p>
      <Divider />
      <Box>
        <List>
            {
                recipe.ingredients.map((ingredient: String, i: number) => {
                    <ListItem disablePadding key={i}>
                        <ListItemText>{ingredient}</ListItemText>
                    </ListItem>
                })
            }
        </List>
      </Box>
      <Divider />
      <h2>Instructions:</h2>
      <List>
        {
            recipe.instructions.map((instruction: String, i: number) => {
                <ListItem>
                    <ListItemText>{i+1}. {instruction}</ListItemText>
                </ListItem>
            })
        }
      </List>
    </div>
  );
};

export default SingleRecipe;