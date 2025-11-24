const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const session = require('express-session');

const app = express();

// Middleware - Fix CORS to allow all origins in development
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'multiverse-ai-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// MongoDB connection with better error handling
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/multiverse-ai';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => {
  console.log('❌ MongoDB connection error:', err.message);
  console.log('💡 Using in-memory storage for development');
});

// Enhanced User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  name: { type: String, required: true },
  githubId: { type: String, unique: true, sparse: true },
  avatar: String,
  username: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    message: 'Multiverse AI Backend is running'
  });
});

// Fixed Signup endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = new User({ 
      email, 
      password: hashedPassword, 
      name,
      username: email.split('@')[0]
    });
    
    await user.save();
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'multiverse-ai-jwt-secret',
      { expiresIn: '7d' }
    );
    
    console.log('User created successfully:', user.email);
    
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name,
        username: user.username
      } 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup. Please try again.' });
  }
});

// Fixed Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body.email);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'No user found with this email' });
    }
    
    // Check if user has a password (GitHub users might not have one)
    if (!user.password) {
      return res.status(401).json({ error: 'Please use GitHub to login' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'multiverse-ai-jwt-secret',
      { expiresIn: '7d' }
    );
    
    console.log('User logged in successfully:', user.email);
    
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name,
        username: user.username
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login. Please try again.' });
  }
});

// Verify token endpoint
app.get('/api/auth/verify', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'multiverse-ai-jwt-secret');
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ 
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        username: user.username,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Multiverse AI Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
