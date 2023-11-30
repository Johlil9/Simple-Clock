import React from 'react';
import './ClockColumn.css';

// ClockColumn component: Displays a column of numbers for a clock.
export default function ClockColumn({ value, size, range }) {
  // If a range is provided, use it; otherwise, default to 0-9
  const numbers = range || Array.from({ length: 10 }, (_, i) => i);
  // / Calculate the vertical offset based on the current value and size.
  const offset = -value * size;
  const style = {
    transform: `translateY(calc(50vh + ${offset}px - ${size / 2}px))`,
    transition: 'transform 300ms',
  };
  // Render the column with numbers.
  return (
    <div className="column" style={style}>
      {numbers.map(num => (
        <div key={num} className={`num ${getClass(value, num)}`}>
          {num}
        </div>
      ))}
    </div>
  );
}
// Determines the CSS class for a number based on its distance from the current value.
function getClass(current, num) {
  const classList = ['visible', 'close', 'far', 'veryFar', 'extremelyFar', 'almostInvisible', 'insivible'];
  return classList[Math.abs(current - num)] || '';
}

