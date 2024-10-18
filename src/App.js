import React, { useState } from 'react';
import axios from 'axios';
import Login from './Login';
import './App.css'; // Make sure to import the CSS
import maleImage from './water.jpg'; // Adjust the path based on your file structure
import femaleImage from './trees.jpg'; // Adjust the path based on your file structure
import PasswordField from './PasswordField'; // Adjust the path as necessary

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [textInput, setTextInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('alloy'); // Default voice

  const handleLogin = (authenticated) => {
    setIsAuthenticated(authenticated);
  };

  const handleGenerateAudio = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:5000/api/generate-audio', 
        { text: textInput, voice: selectedVoice }, // Include selected voice
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAudioUrl(response.data.audioUrl);
      setChatMessages([...chatMessages, { text: textInput, audioUrl: response.data.audioUrl }]);
      setTextInput(''); // Clear input after sending

      // Scroll to the bottom of the chat window
      const chatWindow = document.querySelector('.chat-window');
      chatWindow.scrollTop = chatWindow.scrollHeight;
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  };

  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGenerateAudio();
    }
  };


  return (
    <div className="container">
      {isAuthenticated ? (
        <div>
          <h2>Chat</h2>
          <div className="chat-window">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`message user`}>
                <div><strong>User:</strong> {msg.text}</div>
                {msg.audioUrl && (
                  <audio className="audio" controls src={msg.audioUrl}></audio>
                )}
              </div>
            ))}
          </div>

          {/* Input and Button Container */}
          <div className="input-container">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={handleKeyPress} // Handle Enter key
              placeholder="Type your message"
            />
            <button onClick={handleGenerateAudio}>Send</button>
          </div>

          {/* Voice Selection with Images */}
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
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;

