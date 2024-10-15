// This component displays a list of all registered students for admin users

import React from 'react';
import { useUserContext } from '../../context/UserContext';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box
} from '@mui/material';

function StudentList() {
  const { users } = useUserContext();

  // Filter users to get only students
  const students = users.filter(user => user.role === 'student');

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Registered Students</Typography>
      <Paper elevation={3}>
        {students.length > 0 ? (
          <List>
            {students.map((student) => (
              <ListItem key={student.id}>
                <ListItemText
                  primary={`${student.firstName} ${student.lastName}`}
                  secondary={`Email: ${student.email} | Program: ${student.program}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" sx={{ p: 2 }}>No students registered yet.</Typography>
        )}
      </Paper>
    </Box>
  );
}

export default StudentList;
