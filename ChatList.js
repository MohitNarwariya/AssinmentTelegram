import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, CircularProgress, Box } from '@mui/material';

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1');
        console.log('API response:', response.data);
        setChats(response.data.data.data); // Adjusted here to match the nested structure
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chats:', error);
        setError('Error fetching chats');
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

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

  if (!chats.length) {
    return <div>No chats available</div>;
  }

  return (
    <List>
      {chats.map(chat => (
        <ListItem button key={chat.id} onClick={() => onSelectChat(chat.id)}>
          <ListItemText primary={chat.creator.name || 'Unknown'} />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
