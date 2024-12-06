import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, TextField, Button, Typography, Card, CardContent, Alert } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#869D7A',
    },
    secondary: {
      main: '#FF964F',
    },
    background: {
      default: '#BBE1C3',
      paper: '#A7CDBD',
    },
    error: {
      main: '#8B5D33',
    },
    text: {
      primary: '#91785D',
      secondary: '#8B5D33',
    },
  },
});

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Card>
          <Typography
            variant="h4"
            component="div"
            style={{ backgroundColor: theme.palette.primary.main, color: '#FFF', padding: '1rem' }}
            align="center"
          >
            Login
          </Typography>
          <CardContent>
            {data ? (
              <Typography variant="body1" align="center">
                Success! Enjoy using the <Link to="/">GastroBook</Link>.
              </Typography>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <TextField
                  label="Your email"
                  variant="outlined"
                  name="email"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  name="password"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={formState.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '1rem' }}
                >
                  Submit
                </Button>
              </form>
            )}

            {error && (
              <Alert severity="error" style={{ marginTop: '1rem' }}>
                {error.message}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
