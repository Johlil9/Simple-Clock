import React, { useState, useEffect } from 'react';
import ClockColumn from './ClockColumn';
import Scroller from './components/scroller/Scroller';
import Background from './styles/Background';

export default function App() {
  const size = 86;
  const [timeZone, setTimeZone] = useState('UTC');
  const [time, setTime] = useState(getTime(timeZone));
 
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime(timeZone));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeZone]); // Re-run the effect when timeZone changes

  return (
    <Background>
      <Scroller direction="left" speed="fast"/>
      <div className="clock-container">
        {
          time.split(':').flatMap((timePart, index, timePartsArray) => {
            // Determine the range based on whether it's the first digit of the hours
            const range = index === 0 ? [0, 1, 2] : undefined;
            return [
              ...timePart.split('').map((digit, digitIndex) => {
                // Only pass the range for the first digit of the hours
                const isHourFirstDigit = index === 0 && digitIndex === 0;
                return (
                  <ClockColumn
                    key={`${index}-${digitIndex}`}
                    value={+digit}
                    size={size}
                    range={isHourFirstDigit ? range : undefined}
                  />
                );
              }),
              index < timePartsArray.length - 1 ? <div key={`colon-${index}`} className="colon"></div> : null,
            ];
          })
        }
      </div>
      </Background>
  );
}

function getTime(timeZone) {
  const d = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timeZone
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const timeParts = formatter.format(d).split(':');
  return timeParts.join(':'); 
}