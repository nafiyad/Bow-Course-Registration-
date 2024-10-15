import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Paper, Box, Grid } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School';

function SignUpPage() {
  const navigate = useNavigate();

  const handleAdminSignUp = () => {
    navigate('/admin-register');
  };

  const handleStudentSignUp = () => {
    navigate('/student-register');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <AdminPanelSettingsIcon sx={{ fontSize: 80, mb: 2 }} />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAdminSignUp}
                sx={{ minWidth: 200 }}
              >
                Admin
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <SchoolIcon sx={{ fontSize: 80, mb: 2 }} />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleStudentSignUp}
                sx={{ minWidth: 200 }}
              >
                Student
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default SignUpPage;
