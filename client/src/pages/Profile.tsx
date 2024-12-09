import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { createTheme, ThemeProvider, Container, Typography, Box, Divider, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useState } from 'react';
import { ADD_RECIPE, REMOVE_RECIPE } from '../utils/mutations';
import { GET_USER, GET_ME, } from '../utils/queries';
import Auth from '../utils/auth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#869D7A', // Olive green
    },
    secondary: {
      main: '#FF964F', // Orange
    },
    background: {
      default: '#BBE1C3', // Light green
      paper: '#A7CDBD', // Muted green
    },
    text: {
      primary: '#91785D', // Taupe
      secondary: '#8B5D33', // Brown
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const Profile = () => {
  const { username: userParam } = useParams();

  // Query to get user data (either the logged-in user or a specific user)
  const { loading, data } = useQuery(userParam ? GET_USER : GET_ME, {
    variables: { username: userParam },
  });

  const [open, setOpen] = useState(false); // controls dialong visibility
  interface RecipeDetails {
    recipeName: string;
    recipeDescription: string;
    servingSize: string;
    ingredients: string[];
    instructions: string[];
    tags: string[];
  }

  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails>({
    recipeName: '',
    recipeDescription: '',
    servingSize: '',
    ingredients: [],
    instructions: [],
    tags: [],
  });



  const [addRecipe] = useMutation(ADD_RECIPE, { refetchQueries: [{ query: GET_ME }] });
  const [removeRecipe] = useMutation(REMOVE_RECIPE, { refetchQueries: [{ query: GET_ME }] });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Typography variant="h6" color="text.secondary">
          Loading...
        </Typography>
      </ThemeProvider>
    );
  }

  if (!user?.username) {
    return (
      <ThemeProvider theme={theme}>
        <Typography variant="h6" color="text.primary" align="center">
          You need to be logged in to see this. Use the navigation links above to
          sign up or log in!
        </Typography>
      </ThemeProvider>
    );
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!recipeDetails.recipeName || !recipeDetails.recipeDescription || !recipeDetails.servingSize || !recipeDetails.ingredients.length || !recipeDetails.instructions.length) {
      alert('Please fill in all fields');
      return;
    }
    try {
      let data = await addRecipe({
        variables: {
          input: {
            recipeName: recipeDetails.recipeName,
            recipeDescription: recipeDetails.recipeDescription,
            servingSize: recipeDetails.servingSize,
            ingredients: recipeDetails.ingredients,
            instructions: recipeDetails.instructions.filter(Boolean),
            tags: recipeDetails.tags.filter(Boolean),
          },
        },
      });
      console.log(data);

      setRecipeDetails({
        recipeName: '',
        recipeDescription: '',
        servingSize: '',
        ingredients: [],
        instructions: [],
        tags: [],
      });
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (recipeId: string) => {
    try {
      await removeRecipe({
        variables: { recipeId },
      });
    } catch (err) {
      console.error("Error deleting recipe,err");
    }
  };




  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ py: 3 }}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: 'background.paper' }}>
            <Typography variant="h4" color="text.primary" gutterBottom>
              Viewing {userParam ? `${user.username}'s` : 'your'} profile.
            </Typography>

            {/* Displaying user's recipes */}
            <Typography variant="h6" color="text.primary" gutterBottom>
              Your Recipes
            </Typography>

            {user.recipes && user.recipes.length > 0 ? (
              user.recipes.map((recipe: any) => (
                <Paper key={recipe._id} sx={{ p: 2, marginBottom: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {recipe.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(recipe.recipeId)} //Delete button functionality
                  >
                    Delete
                  </Button>
                </Paper>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary">
                You have no recipes yet.
              </Typography>
            )}

            {/* Add Recipe button */}
            {!userParam && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpen} // open dialog
              >
                Add Recipe
              </Button>
            )}

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Recipe</DialogTitle>
              <DialogContent>
                <TextField
                  label="Recipe Name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={recipeDetails.recipeName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipeDetails({ ...recipeDetails, recipeName: e.target.value })}
                />
                <TextField
                  label="Recipe Description"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={recipeDetails.recipeDescription}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipeDetails({ ...recipeDetails, recipeDescription: e.target.value })}
                />
                <TextField
                  label="Serving Size"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={recipeDetails.servingSize}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipeDetails({ ...recipeDetails, servingSize: e.target.value })}
                />
                <TextField
                  label="Instructions (comma separated)"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={recipeDetails.instructions.join(', ')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipeDetails({ ...recipeDetails, instructions: e.target.value.split(', ').map((instruction: string) => instruction.trim()) })}
                />
                <TextField
                  label="Tags (comma separated)"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={recipeDetails.tags.join(', ')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipeDetails({ ...recipeDetails, tags: e.target.value.split(',').map((tag: string) => tag.trim()) })}
                />
                <TextField
                  label="Ingredients (comma separated)"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={recipeDetails.ingredients.join(', ')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipeDetails({ ...recipeDetails, ingredients: e.target.value.split(',').map((ingredient: string) => ingredient.trim()) })}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary"> {/* Submit button */}
                  Add Recipe
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>

          <Divider sx={{ my: 3 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;