const express = require('express');
const cors = require('cors');
const { generateCodeWithMistral } = require('./mistral-service');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://your-netlify-app.netlify.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Multiverse AI Backend is running',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/generate-code', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        success: false,
        error: 'Prompt is required' 
      });
    }

    console.log('🚀 Starting code generation for prompt:', prompt.substring(0, 100));
    
    const files = await generateCodeWithMistral(prompt);
    
    console.log('✅ Generated ${files.length} files successfully');
    
    res.json({
      success: true,
      files: files,
      message: 'Generated ${files.length} files with Mistral Large'
    });
  } catch (error) {
    console.error('❌ Code generation error:', error.message);
    res.status(500).json({ 
      success: false,
      error: error.message
    });
  }
});

app.post('/api/test-mistral', async (req, res) => {
  try {
    const testPrompt = "Create a simple 'Hello World' HTML page";
    console.log('🧪 Testing Mistral AI with simple prompt...');
    
    const files = await generateCodeWithMistral(testPrompt);
    
    res.json({
      success: true,
      message: 'Mistral AI test successful',
      files: files
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Mistral AI test failed: ' + error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Multiverse AI Backend running on port ${PORT}');
  console.log('✅ Health: http://localhost:${PORT}/health');
  console.log('✅ Mistral AI: ACTIVE');
});
