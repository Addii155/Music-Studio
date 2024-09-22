import React, { useEffect, useState } from 'react';

const AnimatedBars = () => {
  const [heights, setHeights] = useState([
    '0.308138px',
    '10.033px',
    '0.321982px',
    '10.0696px',
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights((prevHeights) => prevHeights.map(height => {
        // Randomly adjust height within a range for demonstration
        const newHeight = Math.random() * 20; // Change this value as needed
        return `${newHeight}px`;
      }));
    }, 1000); // Change every 1 second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flex items-end ms-auto">
      <div className="bg-primary rounded me-1 w-[3px] h-[heights[0]]"></div>
      <div className="bg-primary rounded me-1 w-[3px] h-[heights[1]]"></div>
      <div className="bg-primary rounded me-1 w-[3px] h-[heights[2]]"></div>
      <div className="bg-primary rounded w-[3px] h-[heights[3]]"></div>
    </div>
  );
};

export default AnimatedBars;
