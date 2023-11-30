import React from 'react';
import firewatch from '../utils/firewatch-green.jpg';

// Background component that accepts a 'children' prop to render child components 
const Background = ({ children }) => {
  // Define the style for the background
  const backgroundStyle = {
    backgroundImage: `url(${firewatch})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
  };
  // Render a div with the background style and any children passed to this component
  return <div style={backgroundStyle}>{children}</div>;
};

export default Background;