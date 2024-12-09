import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { TextField, Button, Card, CardHeader, CardContent, Typography, Box } from '@mui/material';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { input: { ...formState } },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#BBE1C3',
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%', backgroundColor: '#A7CDBD' }}>
        <CardHeader
          title="Sign Up"
          sx={{ backgroundColor: '#869D7A', color: '#FFFFFF', textAlign: 'center', padding: 2 }}
        />
        <CardContent>
          {data ? (
            <Typography variant="body1" textAlign="center">
              Success! Now you can enjoy the world of{' '}
              <Link to="/" style={{ color: '#FF964F', textDecoration: 'none' }}>
                GastroBook
              </Link>
            </Typography>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <TextField
                fullWidth
                label="Your Username"
                name="username"
                value={formState.username}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#91785D',
                    color: '#FFFFFF',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#FFFFFF',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Your Email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#91785D',
                    color: '#FFFFFF',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#FFFFFF',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#91785D',
                    color: '#FFFFFF',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#FFFFFF',
                  },
                }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  marginTop: 2,
                  backgroundColor: '#8B5D33',
                  '&:hover': { backgroundColor: '#FF964F' },
                }}
              >
                Submit
              </Button>
            </form>
          )}

          {error && (
            <Typography
              variant="body2"
              sx={{ marginTop: 2, padding: 2, backgroundColor: '#FF964F', color: '#FFFFFF' }}
            >
              {error.message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
