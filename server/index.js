import express from 'express';
import cors from 'cors';
import { generateCodeWithMistral } from './mistral-service.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://your-netlify-app.netlify.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health endpoint with detailed info
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Multiverse AI Backend is running',
    timestamp: new Date().toISOString(),
    port: PORT,
    features: {
      mistral: 'active',
      fallback: 'enabled'
    }
  });
});

// Enhanced code generation with better error handling
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
    
    console.log(`✅ Generated ${files.length} files successfully`);
    
    res.json({
      success: true,
      files: files,
      message: `Generated ${files.length} files`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Code generation error:', error.message);
    res.status(500).json({ 
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Add a simple test endpoint
app.post('/api/test-mistral', async (req, res) => {
  try {
    const testPrompt = "Create a simple 'Hello World' HTML page";
    console.log('🧪 Testing Mistral AI with simple prompt...');
    
    const files = await generateCodeWithMistral(testPrompt);
    
    res.json({
      success: true,
      message: 'AI generation successful',
      files: files
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Generation failed: ' + error.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Multiverse AI Backend running on port ${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/health`);
  console.log(`✅ Mistral AI: CONFIGURED (with fallback)`);
  console.log(`✅ CORS: Enabled for frontend development`);
});
