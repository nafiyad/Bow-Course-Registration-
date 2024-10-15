import React, { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper
} from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';

// This component displays and manages messages for admin users
// It allows admins to view and reply to messages from students

function MessageInbox() {
  const { messages, users, sendMessage, markMessageAsRead } = useUserContext();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState('');

  // Open a message and mark it as read
  const handleOpenMessage = (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      markMessageAsRead(message.id);
    }
  };

  // Close the message dialog
  const handleCloseMessage = () => {
    setSelectedMessage(null);
    setReply('');
  };

  // Send a reply to a message
  const handleSendReply = () => {
    if (reply.trim()) {
      sendMessage('admin', selectedMessage.senderId, `Re: ${selectedMessage.subject}`, reply);
      handleCloseMessage();
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Message Inbox</Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        {messages.length > 0 ? (
          <List>
            {messages.map((message) => {
              const sender = users.find(u => u.id === message.senderId);
              return (
                <React.Fragment key={message.id}>
                  <ListItem alignItems="flex-start" button onClick={() => handleOpenMessage(message)}>
                    <ListItemAvatar>
                      <Avatar><AccountCircle /></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={sender ? `${sender.firstName} ${sender.lastName}` : 'Unknown Sender'}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {message.subject}
                          </Typography>
                          {" — " + message.content.substring(0, 50) + "..."}
                        </>
                      }
                      sx={{ color: message.read ? 'text.secondary' : 'text.primary' }}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              );
            })}
          </List>
        ) : (
          <Typography>No messages to display.</Typography>
        )}
      </Paper>

      <Dialog open={!!selectedMessage} onClose={handleCloseMessage} fullWidth maxWidth="sm">
        <DialogTitle>{selectedMessage?.subject}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {selectedMessage?.content}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="reply"
            label="Reply"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMessage}>Cancel</Button>
          <Button onClick={handleSendReply} variant="contained" startIcon={<Send />}>
            Send Reply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MessageInbox;
