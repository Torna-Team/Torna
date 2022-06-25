import React, { useEffect, useState } from 'react';
import { Star } from 'react-konva';

function Stars({ click, setClick }) {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    if (click === 'star') {
      const star = {
        id: Math.random() * 1000,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 180,
      };
      setStars((prev) => {
        if (prev) return [...prev, star];
        else return [star];
      });
    }
    setClick(null);
  }, [click]);

  return (
    <div>
      {stars &&
        stars.map((star) => (
          <Star
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            fill='#FF7F50'
            opacity={0.8}
            draggable={true}
            rotation={star.rotation}
            shadowColor='red'
            shadowBlur={10}
            shadowOpacity={0.6}
          />
        ))}
    </div>
  );
}

export default Stars;
