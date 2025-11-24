const fetch = require('node-fetch');

async function testAuthentication() {
  console.log('🧪 Testing Authentication...\\n');
  
  try {
    // Test backend health
    const health = await fetch('http://localhost:5000/health');
    console.log('✅ Backend Health:', (await health.json()).status);
    
    // Test signup
    console.log('\\n🔐 Testing Signup...');
    const signupResponse = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@multiverse.ai',
        password: 'password123',
        name: 'Test User'
      })
    });
    
    if (signupResponse.ok) {
      const data = await signupResponse.json();
      console.log('✅ Signup Successful! User:', data.user.email);
      
      // Test login with same credentials
      console.log('\\n🔑 Testing Login...');
      const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@multiverse.ai',
          password: 'password123'
        })
      });
      
      if (loginResponse.ok) {
        console.log('✅ Login Successful!');
        console.log('🎉 Authentication is working perfectly!');
      } else {
        console.log('❌ Login Failed:', await loginResponse.text());
      }
    } else {
      console.log('❌ Signup Failed:', await signupResponse.text());
    }
  } catch (error) {
    console.log('❌ Test Error:', error.message);
  }
}

testAuthentication();
