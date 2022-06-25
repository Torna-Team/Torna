import React, { useEffect, useState } from 'react';
import { Rect } from 'react-konva';

function Squares({ click, setClick }: any) {
  const [squares, setSquares] = useState<any>(null);

  useEffect(() => {
    if (click === 'square') {
      const square = {
        id: (Math.random() * 1000).toString(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      };
      setSquares((prev: any) => {
        if (prev) return [...prev, square];
        else return [square];
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
            stroke='black'
          />
        ))}
    </div>
  );
}

export default Squares;
