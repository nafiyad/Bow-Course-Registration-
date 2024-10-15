// This component allows students to contact the admin

import React, { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import { Send } from '@mui/icons-material';

function ContactForm() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { currentUser, sendMessage } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subject.trim() && content.trim()) {
      const result = sendMessage(currentUser.id, 'admin', subject, content);
      if (result.success) {
        setSubject('');
        setContent('');
        setOpenSnackbar(true);
      } else {
        alert('Failed to send message. Please try again.');
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Contact Admin</Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Subject"
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            startIcon={<Send />}
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ContactForm;
