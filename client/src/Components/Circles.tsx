import React, { useEffect, useState } from 'react';
import { Circle } from 'react-konva';

function Circles({ click, setClick }: any) {
  const [circles, setCircles] = useState<any>(null);

  useEffect(() => {
    if (click === 'circle') {
      const circle = {
        id: Math.random() * 1000,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      };
      setCircles((prev: any) => {
        if (prev) return [...prev, circle];
        else return [circle];
      });
    }
    setClick(null);
  }, [click]);

  return (
    <div>
      {circles &&
        circles.map((circle: any) => (
          <Circle
            key={circle.id}
            id={circle.id}
            x={circle.x}
            y={circle.y}
            radius={50}
            stroke='black'
            draggable={true}
          />
        ))}
    </div>
  );
}

export default Circles;
