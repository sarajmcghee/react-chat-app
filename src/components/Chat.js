import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/App.css'; 
import maleImage from '../assets/water.jpg'; // Replace with actual path for male voice image
import femaleImage from '../assets/trees.jpg'; // Replace with actual path for female voice image

const Chat = () => {
  const [input, setInput] = useState(''); // For input text
  const [selectedVoice, setSelectedVoice] = useState('onyx'); // Default to 'onyx'
  const [messages, setMessages] = useState([]); // For storing messages
  const [menuOpen, setMenuOpen] = useState(false); // For handling menu state
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [error, setError] = useState(''); // For tracking error state
  
  const backendUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://mysterious-beginning-ef3abfb64de0.herokuapp.com';

  // Function to log out the user
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
  
    // Redirect to the homepage or login page based on environment
    const redirectUrl = window.location.hostname === 'localhost'
      ? '/'  // For local development
      : '/react-chat-app/';  // For GitHub Pages
  
    window.location.href = redirectUrl;
  };

  // Function to select voice
  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
  };

  const handleGenerateAudio = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    setLoading(true); // Set loading to true when starting the request

    try {
      const response = await axios.post(`${backendUrl}/api/generate-audio`, {
        text: input,  // Pass the input text from state
        voice: selectedVoice,  // Pass the selected voice from state
      }, {
        headers: {
          Authorization: `Bearer ${token}`,  // Pass your auth token
        }
      });
  
      console.log('Audio generated!', response.data);
      // Add a bot message with the generated audio URL
      const botMessage = { text: 'Audio generated!', audioUrl: response.data.audioUrl, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error generating audio:', error);
      setError('Failed to generate audio. Please try again.'); // Set error message
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add the user message to the chat
    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Call the function to generate audio
    handleGenerateAudio();

    // Clear input after submission
    setInput('');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the dropdown menu
  };

  return (
    <div className="container">
      {/* Hamburger Menu */}
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

      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
            <p>{msg.text}</p>
            {msg.audioUrl && (
              <div>
                <audio controls src={msg.audioUrl} />
                {/* Download button for the audio */}
                <a href={msg.audioUrl} download={`audio-file-${index}.mp3`}>
                  <button>Download Audio</button>
                </a>
              </div>
            )}
          </div>
        ))}
        {/* Display animated dots when waiting for a response */}
        {loading && <div className="loading-indicator">...</div>}
         {/* Show Error Message */}
         {error && <div className="error-message">{error}</div>}
      </div>
      
      {/* Input form */}
      <form className="input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={loading}>Send</button>
      </form>

      {/* Voice Selection below the submit button */}
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
    </div>
  );
};

export default Chat;
