import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './HomePage.css';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Full Stack Developer",
      company: "TechInnovate",
      content: "Multiverse AI transformed how I prototype. I built a complete SaaS dashboard in 2 hours instead of 2 weeks!",
      avatar: "👩‍💻",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Startup Founder",
      company: "Nexus Ventures",
      content: "As a non-technical founder, this tool helped me create our MVP and secure funding. Absolutely magical!",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      role: "Product Manager",
      company: "HealthTech Pro",
      content: "The AI understands complex requirements perfectly. Our team's productivity increased by 300%.",
      avatar: "👩‍⚕️",
      rating: 5
    }
  ];

  const features = [
    {
      icon: "🚀",
      title: "Instant Code Generation",
      description: "Transform ideas into working code in seconds with multiple AI models"
    },
    {
      icon: "🎨",
      title: "Beautiful Designs",
      description: "Professional, responsive layouts with modern gradients and animations"
    },
    {
      icon: "🔗",
      title: "One-Click GitHub Export",
      description: "Deploy directly to GitHub Pages without configuration"
    },
    {
      icon: "🎤",
      title: "Voice Commands",
      description: "Speak your ideas and watch them become real code"
    },
    {
      icon: "👥",
      title: "Real-Time Collaboration",
      description: "Work with your team in real-time on the same project"
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption"
    }
  ];

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('🎉 Check your email for verification link! You can start building immediately.');
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubAuth = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/builder`,
          scopes: 'repo,user'
        }
      });
      if (error) throw error;
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-glow-1"></div>
          <div className="hero-glow-2"></div>
          <div className="hero-glow-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Build <span className="gradient-text">Amazing Web Apps</span><br />
              with AI Power
            </h1>
            <p className="hero-description">
              Transform your ideas into production-ready code instantly. 
              The most advanced AI web builder that understands exactly what you need.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">10x</div>
                <div className="stat-label">Faster Development</div>
              </div>
              <div className="stat">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Apps Built</div>
              </div>
              <div className="stat">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
            </div>
          </div>

          <div className="hero-auth">
            <div className="auth-card">
              <h3>Start Building Magic</h3>
              
              <form onSubmit={handleEmailAuth} className="auth-form">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Your best email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>

                <button type="submit" disabled={loading} className="auth-btn primary">
                  {loading ? '✨ Creating Magic...' : (isLogin ? 'Sign In & Build' : 'Start Free & Build')}
                </button>
              </form>

              <div className="divider">
                <span>or continue with</span>
              </div>

              <button onClick={handleGitHubAuth} disabled={loading} className="auth-btn github">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>

              {message && (
                <div className={`message ${message.includes('Check your email') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <div className="auth-footer">
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
                  {isLogin ? "New here? Start building free" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Builders Love Multiverse</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Trusted by Amazing Builders</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{testimonial.avatar}</div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role} • {testimonial.company}</p>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Build the Future?</h2>
          <p className="cta-description">
            Join thousands of developers building amazing things with AI
          </p>
          <button onClick={handleGitHubAuth} className="cta-button">
            🚀 Start Building Free with GitHub
          </button>
        </div>
      </section>
    </div>
  );
}
