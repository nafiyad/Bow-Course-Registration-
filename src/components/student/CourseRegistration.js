// This component handles course registration for students

import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useUserContext } from '../../context/UserContext';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Box,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function CourseRegistration() {
  const { courses } = useAppContext();
  const { currentUser, registerForCourse, unregisterFromCourse } = useUserContext();
  const [error, setError] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');

  const availableCourses = courses.filter(course => 
    course.program === currentUser?.program && 
    (selectedTerm === '' || course.term === selectedTerm)
  );

  const handleRegister = (course) => {
    const result = registerForCourse(currentUser.id, course);
    if (result.success) {
      setError('');
    } else {
      setError(result.message);
    }
  };

  const handleUnregister = (courseId) => {
    unregisterFromCourse(currentUser.id, courseId);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Course Registration</Typography>
      {error && <Alert severity="error" style={{marginBottom: '20px'}}>{error}</Alert>}
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Select Term</InputLabel>
              <Select
                value={selectedTerm}
                label="Select Term"
                onChange={(e) => setSelectedTerm(e.target.value)}
              >
                <MenuItem value="">All Terms</MenuItem>
                <MenuItem value="Winter">Winter</MenuItem>
                <MenuItem value="Spring">Spring</MenuItem>
                <MenuItem value="Summer">Summer</MenuItem>
                <MenuItem value="Fall">Fall</MenuItem>
              </Select>
            </FormControl>
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Available Courses</Typography>
            {availableCourses.length === 0 ? (
              <Typography>No courses available for the selected term.</Typography>
            ) : (
              <List>
                {availableCourses.map((course) => (
                  <ListItem key={course.id}>
                    <ListItemText
                      primary={course.name}
                      secondary={`${course.code} - ${course.term}`}
                    />
                    <Button 
                      onClick={() => handleRegister(course)}
                      disabled={currentUser.registeredCourses?.some(c => c.id === course.id)}
                      variant="contained"
                      color="primary"
                    >
                      Register
                    </Button>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Registered Courses</Typography>
            {currentUser.registeredCourses?.length === 0 ? (
              <Typography>You haven't registered for any courses yet.</Typography>
            ) : (
              <List>
                {currentUser.registeredCourses?.map((course) => (
                  <ListItem key={course.id}>
                    <ListItemText
                      primary={course.name}
                      secondary={`${course.code} - ${course.term}`}
                    />
                    <Button 
                      onClick={() => handleUnregister(course.id)}
                      variant="outlined"
                      color="secondary"
                    >
                      Unregister
                    </Button>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CourseRegistration;
