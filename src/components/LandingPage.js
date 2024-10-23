import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa'; // Import FaGoogle icon
import { useSpring, animated } from 'react-spring';
import '../styles/LandingPage.css'; // Add custom styles

const LandingPage = () => {
  const handleGithubLogin = () => {
    window.location.href = 'https://mysterious-beginning-ef3abfb64de0.herokuapp.com/auth/github';
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://mysterious-beginning-ef3abfb64de0.herokuapp.com/auth/google';
  };

  const heroAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-50px)' },
    config: { duration: 1500 },
    delay: 200,
  });

  const textAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-30px)' },
    config: { duration: 2000 },
    delay: 1000,
  });

  return (
    <div className='landing-page'>
      <animated.section className="hero" style={heroAnimation}>
        <div className="hero-content">
          <animated.h1 style={heroAnimation}>Voxify</animated.h1>
          <animated.p style={textAnimation}>
            Turn your words into lifelike <br /> audio using cutting-edge AI voices.
          </animated.p>

          {/* Buttons Container */}
          <div className="buttons-container">
            <animated.button
              className="cta-button github-login"
              onClick={handleGithubLogin}
              style={textAnimation}
            >
              <FaGithub /> Login with GitHub
            </animated.button>

            <animated.button
              className="cta-button google-login"
              onClick={handleGoogleLogin}
              style={textAnimation}
            >
              <FaGoogle /> Login with Google
            </animated.button>
          </div>
        </div>
      </animated.section>

      <footer className="footer">
        <p>&copy; 2024 Voxify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
