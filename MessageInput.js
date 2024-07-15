import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    onSendMessage(message);
    setMessage('');
  };

  return (
    <Box display="flex" alignItems="center">
      <TextField
        value={message}
        onChange={e => setMessage(e.target.value)}
        fullWidth
      />
      <Button onClick={handleSendMessage}>Send</Button>
    </Box>
  );
};

export default MessageInput;
