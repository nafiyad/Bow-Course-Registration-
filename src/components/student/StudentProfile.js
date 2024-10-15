// This component shows the student's profile information

import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

function StudentProfile({ user }) {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Student Profile</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography><strong>Name:</strong> {user.firstName} {user.lastName}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>Student ID:</strong> {user.id}</Typography>
        <Typography><strong>Program:</strong> {user.program}</Typography>
      </Box>
    </Paper>
  );
}

export default StudentProfile;
