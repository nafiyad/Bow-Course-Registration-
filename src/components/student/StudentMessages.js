// This component displays messages for the student

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

function StudentMessages() {
  const { currentUser, getUserMessages } = useUserContext();
  const messages = getUserMessages(currentUser.id);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Your Messages</Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        {messages.length > 0 ? (
          <List>
            {messages.map((message) => (
              <ListItem key={message.id}>
                <ListItemText
                  primary={message.subject}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {message.senderId === 'admin' ? 'From Admin' : 'From You'}
                      </Typography>
                      {" — " + message.content}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>You have no messages.</Typography>
        )}
      </Paper>
    </Box>
  );
}

export default StudentMessages;
