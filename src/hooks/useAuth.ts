import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // For now, simulate successful signup - replace with real API
      console.log('Signing up:', { email, name });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: 'user-' + Date.now(),
        email,
        name
      };
      
      localStorage.setItem('auth_token', 'mock-jwt-token');
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { user: mockUser, token: 'mock-jwt-token' };
    } catch (error) {
      throw new Error('Signup failed. Please try again.');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // For now, simulate successful login - replace with real API
      console.log('Logging in:', { email });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: 'user-' + Date.now(),
        email,
        name: email.split('@')[0]
      };
      
      localStorage.setItem('auth_token', 'mock-jwt-token');
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { user: mockUser, token: 'mock-jwt-token' };
    } catch (error) {
      throw new Error('Invalid email or password.');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const loginWithGitHub = () => {
    // Simulate GitHub OAuth success - in real app, this would redirect to GitHub
    // and then back to your app with an authorization code
    setTimeout(() => {
      const mockUser = {
        id: 'github-user-' + Date.now(),
        email: 'github@user.com',
        name: 'GitHub User'
      };
      
      localStorage.setItem('auth_token', 'github-mock-token');
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      setUser(mockUser);
    }, 1000);
  };

  return { user, signUp, login, logout, loginWithGitHub, loading };
}
