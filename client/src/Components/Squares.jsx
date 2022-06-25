import React, { useEffect, useState } from 'react';
import { Square } from 'react-konva';

function Squares({ click, setClick }) {
  const [squares, setSquares] = useState(null);

  useEffect(() => {
    if (click === 'square') {
      const square = {
        id: Math.random() * 1000,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      };
      setSquares((prev) => {
        if (prev) return [...prev, square];
        else return [square];
      });
    }
    setClick(null);
  }, [click]);

  return <div>Squares</div>;
}

export default Squares;
