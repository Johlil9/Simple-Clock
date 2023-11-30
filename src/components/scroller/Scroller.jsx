import React, { useState, useEffect } from 'react';
import './Scroller.css';

// ScrollerInner component: Responsible for rendering the list of tags.
const ScrollerInner = ({ tags, animated }) => {
  // If 'animated' is true, duplicate the tags array for a seamless looping effect.
  const allTags = animated ? [...tags, ...tags] : tags;

  // Render 
  return (
    <ul className="scroller-inner">
      {allTags.map((tag, index) => (
        <li key={index} className="tag-list-item" aria-hidden={!animated && index >= tags.length}>
          {tag}
        </li>
      ))}
    </ul>
  );
};

// Manages the scrolling behavior and animation.
const Scroller = ({ direction = 'left', speed = 'normal' }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  // Predefined list that will be used in the ScrollerInner component.
  const cities = [
    "Honolulu", "Anchorage", "Los Angeles", 
    "Denver", "Mexico City", "New York", 
    "Buenos Aires", "London", "Paris",
    "Moscow", "Dubai", "Beijing", 
    "Tokyo", "Sydney","Norway"
  ];

  useEffect(() => {
    // Create a media query to respect the user's preference for reduced motion.
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
     // Function to update the animation state based on the media query.
    const handleMediaChange = (event) => setIsAnimated(!event.matches);
    // Add a listener for changes to the media query.
    mediaQuery.addEventListener('change', handleMediaChange);
     // Initialize the animation state based on the current media query.
    setIsAnimated(!mediaQuery.matches);
    // Clean up the event listener when the component unmounts.
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);
  
  // Render the Scroller component with dynamic classes for direction and speed.
  return (
    <div className={`scroller ${direction} ${speed}`} data-animated={isAnimated}>
      <ScrollerInner tags={cities} animated={isAnimated} />
    </div>
  );
};

export default Scroller;