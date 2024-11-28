import React from 'react';

const Hero = () => {
  const containerStyle = {
    height: '100vh',
    display: 'flex',
  };

  const sideStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const leftSideStyle = {
    ...sideStyle,
    backgroundColor: 'var(--gray-text)',
    color: 'black',
  };

  const rightSideStyle = {
    ...sideStyle,
    backgroundColor: 'black',
    color: 'var(--white-text)',
  };

  const textContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    textAlign: 'center',
  };

  const textStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={leftSideStyle}>
        <div style={textContentStyle}>
          <h2 style={textStyle}>Classic Cars</h2>
          <h2 style={textStyle}>Modern Practices</h2>
        </div>
      </div>
      <div style={rightSideStyle}>
        <div style={textContentStyle}>
          <h2 style={textStyle}>need new engines</h2>
          <h2 style={textStyle}>need AI</h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;