// ES Module test script for authentication
const testAuthentication = async () => {
  console.log('🧪 Testing Authentication...\\n');
  
  try {
    // Test backend health
    const healthResponse = await fetch('http://localhost:5000/health');
    const healthData = await healthResponse.json();
    console.log('✅ Backend Health:', healthData.status);
    console.log('💾 Storage Mode:', healthData.mode);
    
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
      console.log('✅ Signup Successful!');
      console.log('   User:', data.user.email);
      console.log('   Name:', data.user.name);
      
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
        
        // Test token verification
        const loginData = await loginResponse.json();
        console.log('\\n🔒 Testing Token Verification...');
        const verifyResponse = await fetch('http://localhost:5000/api/auth/verify', {
          headers: { 'Authorization': `Bearer ${loginData.token}` }
        });
        
        if (verifyResponse.ok) {
          console.log('✅ Token Verification Successful!');
        } else {
          console.log('❌ Token Verification Failed');
        }
      } else {
        const errorText = await loginResponse.text();
        console.log('❌ Login Failed:', errorText);
      }
    } else {
      const errorText = await signupResponse.text();
      console.log('❌ Signup Failed:', errorText);
    }
  } catch (error) {
    console.log('❌ Test Error:', error.message);
  }
};

// Run the test
testAuthentication();
