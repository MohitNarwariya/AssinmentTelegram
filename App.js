import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Grid } from '@mui/material';
import Header from './Assignment/Header';
import ChatList from './Assignment/ChatList';
import ChatWindow from './Assignment/ChatWindow';
import MessageInput from './Assignment/MessageInput';
const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <Router>
      <Header />
      <Grid container>
        <Grid item xs={12} md={4}>
          <ChatList onSelectChat={setSelectedChat} />
        </Grid>
        <Grid item xs={12} md={8}>
          {selectedChat ? (
            <>
              <ChatWindow chatId={selectedChat} />
              <MessageInput onSendMessage={(msg) => console.log('Send message:', msg)} />
            </>
          ) : (
            <div>Select a chat to start messaging</div>
          )}
        </Grid>
      </Grid>
    </Router>
  );
};

export default App;
