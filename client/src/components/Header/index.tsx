import { type MouseEvent } from 'react';
import Auth from '../../utils/auth';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const Header = () => {
    const logout = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <ThemeProvider theme={theme}>
        <AppBar position="static">
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography variant="h1" sx={{ textDecoration: 'none', textcolor: "secondary" }}>
                        Gastro Book
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontStyle: 'italic', marginTop: '0.5rem' }}>
                        The Easiest Way to Save your Recipes. Even Your Mom Will Love It!
                    </Typography>
                </Box>
                <Box>
                    {Auth.loggedIn() ? (
                        <>
                            <Button
                                variant="contained"
                                color="secondary"

                                href="/me"
                                sx={{ margin: '0 0.5rem' }}
                            >
                                {Auth.getProfile().data.username}'s Profile
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"

                                onClick={logout}
                                sx={{ margin: '0 0.5rem' }}
                            >
                                Logout
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"

                                href="/recipes"
                                sx={{ margin: '0 0.5rem' }}
                                >
                                Add Recipe
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"

                                href="/login"
                                sx={{ margin: '0 0.5rem' }}
                            >
                                Login
                            </Button>
                            <Button
                                variant="outlined"

                                href="/signup"
                                sx={{ margin: '0 0.5rem' }}
                            >
                                Signup
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    </ThemeProvider>
    );
};

export default Header;
