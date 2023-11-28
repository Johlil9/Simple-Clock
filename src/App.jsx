import React, { useState, useEffect } from 'react';
import ClockColumn from './components/clockcolumn/ClockColumn';
import Scroller from './components/scroller/Scroller';
import Background from './styles/Background';

export default function App() {
  const size = 86;
  const [timeZone, setTimeZone] = useState('Europe/Oslo'); // Set initial timezone to Oslo
  const [time, setTime] = useState(getTime(timeZone));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime(timeZone));
    }, 1000);
  
    return () => clearInterval(interval);
  }, [timeZone]);

  return (
    <Background>
      <Scroller direction="left" speed="fast"/>
      <div className="clock-container">
        {
          time.split(':').flatMap((timePart, index, timePartsArray) => {
            let range;
          
            if (index === 0) { // First digit of the hour
              // If the second digit of the hour is less than 4 (i.e., 20-23), the range is [0, 1, 2]
              // Otherwise (i.e., 00-19), the range is [0, 1]
              const secondHourDigit = timePartsArray[0][1];
              range = secondHourDigit < '4' ? [0, 1, 2] : [0, 1];
            } else if (index === 1 || index === 2) { // First digit of minutes and seconds
              range = [0, 1, 2, 3, 4, 5];
            }
          
            return [
              ...timePart.split('').map((digit, digitIndex) => {
                const isSpecialFirstDigit = (index === 0 && digitIndex === 0) || (index > 0 && digitIndex === 0);
                return (
                  <ClockColumn
                    key={`${index}-${digitIndex}`}
                    value={+digit}
                    size={size}
                    range={isSpecialFirstDigit ? range : undefined}
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
  let timeParts = formatter.format(d).split(':');

  // Reset hour if it's '24'
  if (timeParts[0] === '24') {
    timeParts[0] = '00';
  }

  return timeParts.join(':');
}