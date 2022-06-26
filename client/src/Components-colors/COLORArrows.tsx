import React, { useEffect, useState } from 'react';
import { Arrow } from 'react-konva';

function Arrows({ click, setClick }: any) {
  const [arrows, setArrows] = useState<any>(null);

  useEffect(() => {
    if (click === 'arrow') {
      const arrow = {
        type: 'arrow',
        id: Math.random() * 1000,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      setArrows((prev: any) => {
        if (prev) return [...prev, arrow];
        else return [arrow];
      });
    }
    setClick(null);
  }, [click]);

  return (
    <div>
      {arrows &&
        arrows.map((arrow: any) => (
          <Arrow
            key={arrow.id}
            id={arrow.id}
            x={arrow.x}
            y={arrow.y}
            points={[0, 100, 100, 0]}
            pointerLength={6}
            pointerWidth={6}
            draggable={true}
            stroke='black'
            strokeWidth={4}
          />
        ))}
    </div>
  );
}

export default Arrows;
