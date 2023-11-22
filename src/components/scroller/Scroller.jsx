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
  const timeZones = [
    "UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", 
    "UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", 
    "UTC-04:00", "UTC-03:00", "UTC-02:00", "UTC-01:00", 
    "UTC±00:00", "UTC+01:00", "UTC+02:00", "UTC+03:00", 
    "UTC+04:00", "UTC+05:00", "UTC+06:00", "UTC+07:00", 
    "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00", 
    "UTC+12:00"
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMediaChange = () => setIsAnimated(!mediaQuery.matches);

    mediaQuery.addListener(handleMediaChange);
    setIsAnimated(!mediaQuery.matches);

    return () => mediaQuery.removeListener(handleMediaChange);
  }, []);

  return (
    <div className={`scroller ${direction} ${speed}`} data-animated={isAnimated}>
      <ScrollerInner tags={timeZones} animated={isAnimated} />
    </div>
  );
};

export default Scroller;
