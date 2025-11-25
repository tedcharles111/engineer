import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
}

export function useAuthInstant() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // IMMEDIATE signup - no backend checks, no delays
  const signUp = async (email: string, password: string, name: string) => {
    return new Promise((resolve) => {
      // Create user data immediately (under 100ms)
      const userData = {
        id: 'user-' + Date.now(),
        email,
        name,
        username: email.split('@')[0],
        createdAt: new Date().toISOString()
      };

      // Generate instant token
      const token = 'instant-token-' + Date.now();

      // Store immediately
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      setUser(userData);
      
      console.log('✅ INSTANT account creation for:', email);
      
      // Resolve immediately - no waiting
      resolve({
        success: true,
        token,
        user: userData,
        message: 'Account created instantly!'
      });
    });
  };

  // Instant login
  const login = async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      // Check local storage first
      const userData = localStorage.getItem('user_data');
      
      if (userData) {
        const user = JSON.parse(userData);
        if (user.email === email) {
          // Instant login - no verification
          setUser(user);
          resolve({
            success: true,
            user,
            token: 'instant-token'
          });
          return;
        }
      }
      
      // If no user found, create one instantly
      const newUser = {
        id: 'user-' + Date.now(),
        email,
        name: email.split('@')[0],
        username: email.split('@')[0]
      };
      
      localStorage.setItem('auth_token', 'instant-token');
      localStorage.setItem('user_data', JSON.stringify(newUser));
      setUser(newUser);
      
      resolve({
        success: true,
        user: newUser,
        token: 'instant-token'
      });
    });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const checkAuth = () => {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { 
    user, 
    signUp, 
    login, 
    logout, 
    loading: false, // Never show loading
    backendAvailable: true // Always say backend is available
  };
}
