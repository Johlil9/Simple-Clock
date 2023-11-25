import React, { useState, useEffect } from 'react';
import './Scroller.css';

const ScrollerInner = ({ tags, animated }) => {
  const allTags = animated ? [...tags, ...tags] : tags;

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

const Scroller = ({ direction = 'left', speed = 'normal' }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const cities = [
    "Honolulu", "Anchorage", "Los Angeles", 
    "Denver", "Mexico City", "New York", 
    "Buenos Aires", "London", "Paris",
    "Moscow", "Dubai", "Beijing", 
    "Tokyo", "Sydney","Norway"
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMediaChange = (event) => setIsAnimated(!event.matches);
  
    mediaQuery.addEventListener('change', handleMediaChange);
    setIsAnimated(!mediaQuery.matches);
  
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);
  

  return (
    <div className={`scroller ${direction} ${speed}`} data-animated={isAnimated}>
      <ScrollerInner tags={cities} animated={isAnimated} />
    </div>
  );
};

export default Scroller;