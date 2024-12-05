import { type MouseEvent } from 'react';
import Auth from '../../utils/auth';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
    const logout = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <AppBar position="static">
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography variant="h4" sx={{ textDecoration: 'none', color: 'inherit' }}>
                        Tech Thoughts
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontStyle: 'italic', marginTop: '0.5rem' }}>
                        Get into the mind of a programmer.
                    </Typography>
                </Box>
                <Box>
                    {Auth.loggedIn() ? (
                        <>
                            <Button
                                variant="contained"

                                href="/me"
                                sx={{ margin: '0 0.5rem' }}
                            >
                                {Auth.getProfile().data.username}'s Profile
                            </Button>
                            <Button
                                variant="outlined"

                                onClick={logout}
                                sx={{ margin: '0 0.5rem' }}
                            >
                                Logout
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
    );
};

export default Header;