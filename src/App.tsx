import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import Auth from './components/Auth';
import BuilderPage from './components/BuilderPage';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Multiverse AI...</h2>
      </div>
    );
  }

  return (
    <div className="app">
      {user ? <BuilderPage user={user} /> : <Auth />}
    </div>
  );
}

export default App;
