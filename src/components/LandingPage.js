import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { useSpring, animated } from 'react-spring';
import '../styles/LandingPage.css'; // Add custom styles

const LandingPage = () => {
  const handleGithubLogin = () => {
    window.location.href = 'https://mysterious-beginning-ef3abfb64de0.herokuapp.com/auth/github';
  };

  // Updated animation with slower timing and staggered effect
  const heroAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-50px)' },
    config: { duration: 1500 }, // Slower animation (1.5 seconds)
    delay: 200,
  });

  const textAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-30px)' },
    config: { duration: 2000 }, // Slower for the description and button
    delay: 1000, // Delays the text animation
  });

  return (
    <div>
      {/* <header className="header">
        <div className="logo">MyApp</div>
        <nav>
          <ul>
            <li><Link to="features" smooth={true} duration={500}>Features</Link></li>
            <li><Link to="cta" smooth={true} duration={500}>Get Started</Link></li>
          </ul>
        </nav>
      </header> */}

      {/* Hero Section with animations */}
      <animated.section className="hero" style={heroAnimation}>
        <div className="hero-content">
          <animated.h1 style={heroAnimation}>Voxify</animated.h1>
          <animated.p style={textAnimation}>Turn your words into lifelike <br/> audio using cutting-edge AI voices.</animated.p>
          <animated.button className="cta-button" onClick={handleGithubLogin} style={textAnimation}>
            <FaGithub /> Login with GitHub
          </animated.button>
        </div>
      </animated.section>

      {/* <section id="features" className="features">
        <div className="feature">
          <h2>Seamless Conversion</h2>
          <p>Instantly convert your text into spoken audio in just a few clicks.</p>
        </div>
        <div className="feature">
          <h2>AI-Driven Voices</h2>
          <p>Choose from a range of realistic AI voices to give your words life.</p>
        </div>
        <div className="feature">
          <h2>Download & Share</h2>
          <p>Easily download your generated audio and share it with others.</p>
        </div>
      </section>

      <section id="cta" className="cta">
        <h2>Ready to get started?</h2>
        <button className="cta-button" onClick={handleGithubLogin}>
          <FaGithub /> Login with GitHub
        </button>
      </section> */}

      <footer className="footer">
        <p>&copy; 2024 Voxify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
