import { useQuery } from '@apollo/client';

import { QUERY_RECIPES } from '../utils/queries.ts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';

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

const Home = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);
  console.log(data) // Remove this eventually
  const recipes = data?.recipe || [];
  console.log(recipes);

  return (
    <ThemeProvider theme={theme}>
      <Container
      sx={{
          width: 'maxWidth',
          height: 'maxHeight',
          backgroundColor: 'background.paper',
          textAlign: 'center',
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
      </Container>
    </ThemeProvider>
  );
};

export default Home;
