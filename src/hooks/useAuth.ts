import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  username?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [backendAvailable, setBackendAvailable] = useState(true);

  // Check if backend is available
  const checkBackendHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      setBackendAvailable(response.ok);
      return response.ok;
    } catch (error) {
      console.warn('Backend not available, using mock mode');
      setBackendAvailable(false);
      return false;
    }
  };

  useEffect(() => {
    checkBackendHealth();
    checkAuth();
    handleOAuthCallback();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    // If we have user data but backend might be down, use local data
    if (userData && token) {
      try {
        setUser(JSON.parse(userData));
        
        // Try to verify with backend if available
        if (await checkBackendHealth()) {
          const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            localStorage.setItem('user_data', JSON.stringify(data.user));
          }
        }
      } catch (error) {
        console.warn('Auth verification failed, using local data');
      }
    }
    setLoading(false);
  };

  const handleOAuthCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userParam = urlParams.get('user');

    if (token && userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(userData));
        setUser(userData);
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error) {
        console.error('OAuth callback error:', error);
      }
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // First check if backend is available
      const isBackendAvailable = await checkBackendHealth();
      
      if (!isBackendAvailable) {
        throw new Error('Backend server is not available. Please try again later.');
      }

      // Use real backend
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Signup failed' }));
        throw new Error(errorData.error || 'Signup failed');
      }
      
      const data = await response.json();
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_data', JSON.stringify(data.user));
      setUser(data.user);
      
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Signup failed. Please try again.');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // First check if backend is available
      const isBackendAvailable = await checkBackendHealth();
      
      if (!isBackendAvailable) {
        throw new Error('Backend server is not available. Please try again later.');
      }

      // Use real backend
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Login failed' }));
        throw new Error(errorData.error || 'Login failed');
      }
      
      const data = await response.json();
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_data', JSON.stringify(data.user));
      setUser(data.user);
      
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Invalid email or password.');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const loginWithGitHub = () => {
    // Redirect to backend GitHub OAuth endpoint
    window.location.href = `${API_BASE_URL}/api/auth/github`;
  };

  return { 
    user, 
    signUp, 
    login, 
    logout, 
    loginWithGitHub, 
    loading,
    backendAvailable 
  };
}
