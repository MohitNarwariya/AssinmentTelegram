import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Box, CircularProgress } from '@mui/material';

const ChatWindow = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`);
        console.log('Messages API response:', response.data);
        setMessages(response.data.messages || []); // Safely accessing the messages property
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Error fetching messages');
        setLoading(false);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!messages.length) {
    return <div>No messages available</div>;
  }

  return (
    <Box>
      <List>
        {messages.map(message => (
          <ListItem key={message.id}>
            <ListItemText primary={message.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatWindow;
