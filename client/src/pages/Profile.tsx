import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { createTheme, ThemeProvider, Container, Typography, Box, Divider, Paper } from '@mui/material';

import { GET_USER, GET_ME } from '../utils/queries';
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

  const { loading, data } = useQuery(userParam ? GET_USER : GET_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ py: 3 }}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: 'background.paper' }}>
            <Typography variant="h4" color="text.primary" gutterBottom>
              Viewing {userParam ? `${user.username}'s` : 'your'} profile.
            </Typography>
          </Paper>

          <Box sx={{ my: 3 }}>
            <Typography variant="body1" color="text.secondary">
              Component Here
            </Typography>
          </Box>

          {!userParam && (
            <Paper elevation={1} sx={{ p: 2, border: '1px dotted #1a1a1a', mt: 3 }}>
              <Typography variant="body1" color="text.secondary">
                Component Here
              </Typography>
            </Paper>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
