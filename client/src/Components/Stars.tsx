import React, { useEffect, useState } from 'react';
import { Star } from 'react-konva';

function Stars({ click, setClick, color }: any) {
  const [stars, setStars] = useState<any>(null);

  useEffect(() => {
    if (click === 'star') {
      const star = {
        id: Math.random() * 1000,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 180,
        color: color,
      };
      setStars((prev: any) => {
        if (prev) return [...prev, star];
        else return [star];
      });
    }
    setClick(null);
  }, [click]);

  return (
    <div>
      {stars &&
        stars.map((star: any) => (
          <Star
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            stroke={color}
            draggable={true}
            rotation={star.rotation}
          />
        ))}
    </div>
  );
}

export default Stars;
