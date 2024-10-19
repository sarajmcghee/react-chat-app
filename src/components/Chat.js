// Chat.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring'; // Import animation
import '../styles/App.css'; 
import maleImage from '../assets/water.jpg'; 
import femaleImage from '../assets/trees.jpg'; 

const Chat = () => {
  const [input, setInput] = useState(''); 
  const [selectedVoice, setSelectedVoice] = useState('onyx'); 
  const [messages, setMessages] = useState([]); 
  const [menuOpen, setMenuOpen] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 

  const backendUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://mysterious-beginning-ef3abfb64de0.herokuapp.com';

  const chatWindowRef = useRef(null);

  // Animation for chat container
  const chatAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    delay: 200,
  });

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    const redirectUrl = window.location.hostname === 'localhost'
      ? '/' 
      : '/react-chat-app/'; 
    window.location.href = redirectUrl;
  };

  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
  };

  const handleGenerateAudio = async () => {
    const token = localStorage.getItem('token'); 
    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/generate-audio`, {
        text: input,
        voice: selectedVoice,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
  
      console.log('Audio generated!', response.data);
      const botMessage = { text: 'Audio generated!', audioUrl: response.data.audioUrl, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error generating audio:', error);
      setError('Failed to generate audio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    handleGenerateAudio();
    setInput('');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Auto-scroll to bottom of chat after new message
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <animated.div style={chatAnimation} className="container">
      <div className="menu">
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        {menuOpen && (
          <div className="dropdown-content">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <div ref={chatWindowRef} className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
            <p>{msg.text}</p>
            {msg.audioUrl && (
              <div>
                <audio controls src={msg.audioUrl} />
                <a href={msg.audioUrl} download={`audio-file-${index}.mp3`}>
                  <button>Download Audio</button>
                </a>
              </div>
            )}
          </div>
        ))}
        {loading && <div className="loading-indicator">...</div>}
        {error && <div className="error-message">{error}</div>}
      </div>

      <form className="input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={loading}>Send</button>
      </form>

      <div className="voice-selection">
        <div className={`voice-option ${selectedVoice === 'onyx' ? 'selected' : ''}`} onClick={() => handleVoiceSelect('onyx')}>
          <img src={maleImage} alt="Male Voice" />
          <div className="voice-label">Male Voice</div>
        </div>
        <div className={`voice-option ${selectedVoice === 'shimmer' ? 'selected' : ''}`} onClick={() => handleVoiceSelect('shimmer')}>
          <img src={femaleImage} alt="Female Voice" />
          <div className="voice-label">Female Voice</div>
        </div>
      </div>
    </animated.div>
  );
};

export default Chat;
