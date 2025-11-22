// server/index.js - Complete backend setup
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// MongoDB schemas
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
  createdAt: { type: Date, default: Date.now }
});

const ProjectSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  name: String,
  description: String,
  code: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Project = mongoose.model('Project', ProjectSchema);

// Authentication endpoints
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');
    res.json({ token, user: { id: user._id, email, name } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');
    res.json({ token, user: { id: user._id, email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Project management endpoints
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find({ userId: req.user.userId });
  res.json(projects);
});

app.post('/api/projects', async (req, res) => {
  const project = new Project({ ...req.body, userId: req.user.userId });
  await project.save();
  res.json(project);
});

app.listen(5000, () => console.log('Server running on port 5000'));
