import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

    const backendUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://mysterious-beginning-ef3abfb64de0.herokuapp.com';
  
  const handleGenerateAudio = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/generate-audio`, {
        text: inputText,  // Pass your input text here
        voice: selectedVoice,  // Pass the selected voice here
      }, {
        headers: {
          Authorization: `Bearer ${yourAuthToken}`,  // Pass your auth token here if needed
        }
      });
  
      console.log('Audio generated!', response.data);
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  };

  return (
    <div className="container"> {/* Apply the container class */}
      <div className="chat-window"> {/* Apply chat-window class for styling */}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
            <p>{msg.text}</p>
            {msg.audioUrl && <audio controls src={msg.audioUrl} />}
          </div>
        ))}
      </div>
      <form className="input-container" onSubmit={handleSubmit}> {/* Apply input-container class */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
