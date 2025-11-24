const mongoose = require('mongoose');

// Enhanced MongoDB connection with better error handling and fallbacks
const connectMongoDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/multiverse-ai';
    
    // Try to connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    
    console.log('✅ MongoDB connected successfully');
    return true;
  } catch (error) {
    console.log('⚠️ MongoDB connection failed:', error.message);
    console.log('�� Using in-memory storage for development');
    console.log('📝 To use MongoDB:');
    console.log('   1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/');
    console.log('   2. Or use MongoDB Atlas (free cloud): https://www.mongodb.com/atlas');
    console.log('   3. Update MONGODB_URI in server/.env');
    return false;
  }
};

module.exports = { connectMongoDB };
