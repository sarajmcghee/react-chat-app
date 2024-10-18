const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth setup
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // Here you can save the user information to your database
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Hardcoded user credentials (for demo purposes)
const user = {
  username: 'sara',
  password: bcrypt.hashSync('test', 8), // Hash the password
};

// Authentication endpoint (for username/password)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username !== user.username || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ auth: true, token });
});

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// GitHub login route
app.get('/auth/github', passport.authenticate('github'));

// GitHub callback route
app.get('/auth/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, you can redirect to your dashboard or send user data
    res.redirect('/dashboard'); // Change this to your desired route
  }
);

// Endpoint to generate audio using OpenAI (protected)
app.post('/api/generate-audio', authenticateToken, async (req, res) => {
  const { text, voice } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/audio/speech', {
      model: 'tts-1',
      voice: voice,
      input: text,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer'
    });

    const audioFileName = `output-${Date.now()}.mp3`;
    const audioFilePath = path.join(__dirname, audioFileName);
    
    fs.writeFile(audioFilePath, response.data, (err) => {
      if (err) {
        console.error('Error saving audio file:', err);
        return res.status(500).json({ error: 'Failed to save audio file' });
      }

      const audioUrl = `http://localhost:${PORT}/${audioFileName}`;
      res.json({ audioUrl });
    });
  } catch (error) {
    console.error('Error calling OpenAI API:', error.response ? error.response.data : error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Serve static files
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
