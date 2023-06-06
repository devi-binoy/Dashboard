import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Dashboard from './Dashboard';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password
    };

    try {
      const response = await axios.post(
        'https://-------/apis/user_login',
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const { access_token, first_name } = response.data;
        // localStorage.setItem('first_name', first_name);
        // localStorage.setItem('access_token', access_token);
        localStorage.setItem(
          "MCData",
          JSON.stringify({
              token: response.data.access_token,
              first_name: response.data.first_name
          })

      );
        setLoggedIn(true);
        toast.success(`Welcome back, ${first_name}!`);
      } else {
        toast.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred while logging in. Please try again.');
    }
  };

  if (loggedIn) {
    return <Dashboard />;
  }

  return (
    <div className='login-container'>
      <div className='login-card'>
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <TextField
            label="Username"
            value={username}
            onChange={handleUsernameChange}
            variant="outlined"
            margin="normal"
            fullWidth
            sx={{
              '& input:hover': {
                outlineColor: '#5f9670',
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            variant="outlined"
            margin="normal"
            fullWidth
            sx={{
              '& input:hover': {
                outlineColor: '#5f9670',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#80cc99',
              '&:hover': {
                bgcolor: '#99e6b3',
              },
            }}
          >
            Login
          </Button>
        </form>
      </div>
      <ToastContainer position="middle" /> 
    </div>
  );
}

export default Login;
