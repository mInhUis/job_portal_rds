import React from 'react';
import RegisterForm from './components/RegisterForm';
import './components/RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="register-page-container">
        {/* Header Section */}
        <header className="register-header">
          <div className="logo-section">
            <h1 className="logo">YourApp</h1>
          </div>
          <nav className="auth-nav">
            <span className="nav-text">Already have an account?</span>
            <a href="/login" className="nav-link">Sign In</a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="register-main">
          <div className="register-content">
            {/* Left Side - Welcome Section */}
            <div className="welcome-section">
              <div className="welcome-content">
                <h2 className="welcome-title">Join Our Community</h2>
                <p className="welcome-description">
                  Create your account and start your journey with us. 
                  Get access to exclusive features and connect with thousands of users.
                </p>
                <div className="features-list">
                  <div className="feature-item">
                    <span className="feature-icon">✨</span>
                    <span className="feature-text">Premium Features</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🔒</span>
                    <span className="feature-text">Secure & Private</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🚀</span>
                    <span className="feature-text">Fast & Reliable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="form-section">
              <RegisterForm />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="register-footer">
          <p className="footer-text">
            By signing up, you agree to our{' '}
            <a href="/terms" className="footer-link">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="footer-link">Privacy Policy</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default RegisterPage;
