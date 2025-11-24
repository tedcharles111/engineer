const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const session = require('express-session');
const { connectMongoDB } = require('./mongodb-fix');

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

// Connect to MongoDB
connectMongoDB();

// Enhanced User Schema with in-memory fallback
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

// In-memory user store for development when MongoDB is not available
const inMemoryUsers = new Map();

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    message: 'Multiverse AI Backend is running',
    mode: mongoose.connection.readyState === 1 ? 'mongodb' : 'in-memory'
  });
});

// Enhanced Signup endpoint with in-memory fallback
app.post('/api/auth/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      // Use MongoDB
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ 
        email, 
        password: hashedPassword, 
        name,
        username: email.split('@')[0]
      });
      await user.save();
      
      const token = jwt.sign(
        { userId: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET || 'multiverse-ai-jwt-secret',
        { expiresIn: '7d' }
      );
      
      console.log('User created in MongoDB:', user.email);
      
      res.json({ 
        token, 
        user: { 
          id: user._id, 
          email: user.email, 
          name: user.name,
          username: user.username
        } 
      });
    } else {
      // Use in-memory storage
      if (inMemoryUsers.has(email)) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = {
        id: 'mem-' + Date.now(),
        email,
        password: hashedPassword,
        name,
        username: email.split('@')[0],
        createdAt: new Date()
      };
      
      inMemoryUsers.set(email, user);
      
      const token = jwt.sign(
        { userId: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET || 'multiverse-ai-jwt-secret',
        { expiresIn: '7d' }
      );
      
      console.log('User created in memory:', user.email);
      
      res.json({ 
        token, 
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name,
          username: user.username
        } 
      });
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup. Please try again.' });
  }
});

// Enhanced Login endpoint with in-memory fallback
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body.email);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (mongoose.connection.readyState === 1) {
      // Use MongoDB
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(401).json({ error: 'No user found with this email' });
      }
      
      if (!user.password) {
        return res.status(401).json({ error: 'Please use GitHub to login' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      
      user.lastLogin = new Date();
      await user.save();
      
      const token = jwt.sign(
        { userId: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET || 'multiverse-ai-jwt-secret',
        { expiresIn: '7d' }
      );
      
      console.log('User logged in via MongoDB:', user.email);
      
      res.json({ 
        token, 
        user: { 
          id: user._id, 
          email: user.email, 
          name: user.name,
          username: user.username
        } 
      });
    } else {
      // Use in-memory storage
      const user = inMemoryUsers.get(email);
      
      if (!user) {
        return res.status(401).json({ error: 'No user found with this email' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      
      user.lastLogin = new Date();
      
      const token = jwt.sign(
        { userId: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET || 'multiverse-ai-jwt-secret',
        { expiresIn: '7d' }
      );
      
      console.log('User logged in via memory:', user.email);
      
      res.json({ 
        token, 
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name,
          username: user.username
        } 
      });
    }
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
    
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ user: { id: user._id, email: user.email, name: user.name, username: user.username } });
    } else {
      // Find user in memory
      const user = Array.from(inMemoryUsers.values()).find(u => u.id === decoded.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ user: { id: user.id, email: user.email, name: user.name, username: user.username } });
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Multiverse AI Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`💾 Storage mode: ${mongoose.connection.readyState === 1 ? 'MongoDB' : 'In-Memory (Development)'}`);
});
