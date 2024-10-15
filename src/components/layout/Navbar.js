// This component represents the navigation bar at the top of the application

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

function Navbar() {
  // Get current user and logout function from UserContext
  const { currentUser, logout } = useUserContext();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* App title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bow Course Registration
        </Typography>
        <Box>
          {/* Navigation buttons */}
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          <Button color="inherit" component={RouterLink} to="/programs">Programs</Button>
          <Button color="inherit" component={RouterLink} to="/courses">Courses</Button>
          
          {/* Show different buttons based on whether user is logged in or not */}
          {currentUser ? (
            <>
              <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">Login</Button>
              <Button color="inherit" component={RouterLink} to="/signup">Sign Up</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
