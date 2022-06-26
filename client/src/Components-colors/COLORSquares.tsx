import React, { useEffect, useState } from 'react';
import { Rect, Arrow } from 'react-konva';

function Squares({ click, setClick, color }: any) {
  const [squares, setSquares] = useState<any>(null);
  const [arrows, setArrows] = useState<any>(null);

  useEffect(() => {
    if (click === 'square') {
      const square = {
        id: (Math.random() * 1000).toString(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: color,
      };
      setSquares((prev: any) => {
        if (prev) return [...prev, square];
        else return [square];
      });
    }
    setClick(null);
  }, [click]);

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
      {squares &&
        squares.map((square: any) => (
          <Rect
            key={square.id}
            id={square.id}
            x={square.x}
            y={square.y}
            draggable={true}
            width={100}
            height={100}
            stroke={color}
          />
        ))}
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
              stroke={color}
              strokeWidth={4}
            />
          ))}
      </div>
    </div>
  );
}

export default Squares;
