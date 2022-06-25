import React, { useEffect, useState } from 'react';
import { Circle } from 'react-konva';

function Circles({ click, setClick }) {
  const [circles, setCircles] = useState(null);

  useEffect(() => {
    if (click === 'circle') {
      const circle = {
        id: Math.random() * 1000,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      };
      setCircles((prev) => {
        if (prev) return [...prev, circle];
        else return [circle];
      });
    }
    setClick(null);
  }, [click]);

  return (
    <div>
      {circles &&
        circles.map((circle) => (
          <Circle
            key={circle.id}
            id={circle.id}
            x={circle.x}
            y={circle.y}
            radius={50}
            fill='pink'
            opacity={0.8}
            draggable={true}
            shadowColor='red'
            shadowBlur={10}
            shadowOpacity={0.6}
          />
        ))}
    </div>
  );
}

export default Circles;
