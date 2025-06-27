import React from 'react';

const PixelBackground = ({ condition }) => {
  const generateParticles = (count, type) => {
    return Array.from({ length: count }, (_, i) => {
      const delay = Math.random() * 3;
      const duration = 1 + Math.random() * 2;
      const left = Math.random() * 100;
      
      if (type === 'rain') {
        return (
          <div
            key={i}
            className="rain-drop"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`
            }}
          />
        );
      } else if (type === 'snow') {
        return (
          <div
            key={i}
            className="snow-flake"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration + 2}s`,
              fontSize: `${12 + Math.random() * 8}px`
            }}
          >
            ❄
          </div>
        );
      }
      return null;
    });
  };

  const generateStars = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="pixel-stars"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 60}%`,
          animationDelay: `${Math.random() * 3}s`
        }}
      />
    ));
  };

  return (
    <>
      <div className="pixel-background"></div>
      <div className="pixel-cityscape"></div>
      <div className="pixel-hearts">💜💙💜</div>
      
      {generateStars()}
      
      {condition === 'rain' && (
        <div className="weather-particles">
          {generateParticles(30, 'rain')}
        </div>
      )}
      
      {condition === 'snow' && (
        <div className="weather-particles">
          {generateParticles(20, 'snow')}
        </div>
      )}
    </>
  );
};

export default PixelBackground;
