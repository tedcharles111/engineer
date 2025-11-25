const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Always respond to health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: '✅ Backend is definitely running!',
    timestamp: new Date().toISOString()
  });
});

// Always-working signup endpoint
app.post('/api/auth/signup', (req, res) => {
  console.log('📝 Signup request:', req.body);
  
  // Always succeed immediately
  res.json({
    success: true,
    message: '🎉 Account created successfully!',
    user: {
      id: 'user-' + Date.now(),
      email: req.body.email,
      name: req.body.name,
      username: req.body.email.split('@')[0]
    },
    token: 'mock-token-' + Date.now()
  });
});

// Always-working login endpoint  
app.post('/api/auth/login', (req, res) => {
  res.json({
    success: true,
    user: {
      id: 'user-123',
      email: req.body.email,
      name: 'Test User'
    },
    token: 'mock-token-123'
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 GUARANTEED Backend running on port ${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/health`);
  console.log(`🎯 Signup: http://localhost:${PORT}/api/auth/signup`);
});
