import React from 'react';
import firewatch from '../utils/firewatch-green.jpg';

const Background = ({ children }) => {
  const backgroundStyle = {
    backgroundImage: `url(${firewatch})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
  };

  return <div style={backgroundStyle}>{children}</div>;
};

export default Background;