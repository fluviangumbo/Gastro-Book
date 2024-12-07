import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList } from 'react-window';

interface RecipeSummary {
  _id: string;
  recipeName: string;
  recipeAuthor: {
    _id: string;
    username: string;
  }
  servingSize: string;
  tags: string[];
}

interface RecipeListProps {
  recipes: RecipeSummary[]
}

function renderRow(props: any) {
  const { data, index} = props;
  console.log(data)
  return (
    <ListItem key={index} component="div" disablePadding>
      
        <Typography variant="h6">{data[index].recipeName}</Typography>
        <Typography>by {data[index].recipeAuthor?.username}</Typography>
        <Typography>Serving Size: {data[index].servingSize}</Typography>
        {data[index].tags?.map((tag: string, tagIndex: number) => (
          <Typography key={tagIndex}>{tag}</Typography>
        ))}
        <ListItemButton>
        <Link
          className="btn btn-primary btn-block btn-squared"
          to={`/recipe/${data[index].recipeName}`}
        >
          View Recipe
        </Link>
        </ListItemButton>
    </ListItem>
  );
}

// WE NEED A WAY TO RETURN A LIMIT, OR ONLY DISPLAY A CERTAIN AMOUNT
const RecipeList: React.FC<RecipeListProps> = ({recipes}) => (
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
      <FixedSizeList
      height={400}
      width={360}
      itemData={recipes}
      itemSize={46}
      itemCount={recipes.length}
      overscanCount={5}
    >
      {renderRow}
    </FixedSizeList>
  </Box>
);

export default RecipeList;

