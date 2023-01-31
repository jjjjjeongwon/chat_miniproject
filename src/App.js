import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import chatApi from './services/chatapi';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Input from './pages/Input';

function App() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  const onMessageReceived = (msg) => {
    console.log('New Message Received!!', msg);
    setMessages(messages.concat(msg));
  };

  const handleLoginSubmit = (name) => {
    console.log('유저네임', name);
    setUser({ name: name });
  };

  const handleMessageSubmit = (msg) => {
    chatApi
      .sendMessage(user.name, msg)
      .then((res) => {
        console.log('sent', res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {user !== null ? (
        <div className="chat-container">
          <SockJsClient
            //url:서버의 웹 소켓 통신 url Spring Boot에서 WebSocketConfiguration작성할 때 적었던 endpoint값을 적어주면 됨
            url={'http://208.67.222.222:8080/my-chat/'}
            topics={['/topic/group']}
            onConnect={console.log('connected!')}
            onDisconnect={console.log('disconnected!')}
            onMessage={(msg) => onMessageReceived(msg)}
            debug={false}
          />
          <Chat messages={messages} currentUser={user} />
          <Input handleOnSubmit={handleMessageSubmit} />
        </div>
      ) : (
        <Login handleOnSubmit={handleLoginSubmit} />
      )}
    </>
  );
}

export default App;
