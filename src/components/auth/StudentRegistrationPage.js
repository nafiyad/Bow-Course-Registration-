import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Box,
  MenuItem
} from '@mui/material';

function StudentRegistrationPage() {
  const navigate = useNavigate();
  const { registerStudent } = useUserContext();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: '',
    program: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = registerStudent(formData);
    if (result.success) {
      alert('Registration successful!');
      navigate('/login');
    } else {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Student Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            autoFocus
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="birthday"
            label="Birthday"
            name="birthday"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.birthday}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="program"
            select
            label="Program"
            name="program"
            value={formData.program}
            onChange={handleChange}
          >
            <MenuItem value="SD-DIP">Software Development - Diploma</MenuItem>
            <MenuItem value="SD-PD">Software Development - Post-Diploma</MenuItem>
            <MenuItem value="SD-CERT">Software Development - Certificate</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default StudentRegistrationPage;
