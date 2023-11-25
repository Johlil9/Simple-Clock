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
            if (index === 0) { // Hours first digit
              range = [0, 1, 2];
            } else if (index === 4 || index === 2) { // Minutes and seconds first digit
              range = [0, 1, 2, 3, 4, 5];
            }
          
            return [
              ...timePart.split('').map((digit, digitIndex) => {
                const isSpecialFirstDigit = index === 0 && digitIndex === 0 || index > 1 && digitIndex === 0;
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
  const timeParts = formatter.format(d).split(':');
  return timeParts.join(':'); 
}