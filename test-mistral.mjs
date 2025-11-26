import axios from 'axios';

const MISTRAL_API_KEY = '8sco68RTiZlzi3DbcmOMM8uYKiJwbOvu';
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

async function testAPIKey() {
  console.log('🧪 Testing Mistral API Key...');
  console.log('🔑 API Key:', MISTRAL_API_KEY.substring(0, 8) + '...');
  
  try {
    const response = await axios.post(MISTRAL_API_URL, {
      model: 'mistral-large-latest',
      messages: [{ role: 'user', content: 'Say "Hello World"' }],
      max_tokens: 10
    }, {
      headers: {
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ API Key is VALID!');
    console.log('Response:', response.data.choices[0].message.content);
  } catch (error) {
    console.log('❌ API Key test failed:');
    console.log('Status:', error.response?.status);
    console.log('Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('🔑 The API key is invalid. Please check:');
      console.log('   1. Go to https://console.mistral.ai/api-keys/');
      console.log('   2. Verify your API key: 8sco68RTiZlzi3DbcmOMM8uYKiJwbOvu');
      console.log('   3. Make sure the key is active and has credits');
    } else if (error.code === 'ECONNREFUSED' || error.message.includes('timeout')) {
      console.log('🌐 Network issue: Cannot reach Mistral AI servers');
      console.log('   This might be a network firewall or DNS issue');
    }
  }
}

testAPIKey();
