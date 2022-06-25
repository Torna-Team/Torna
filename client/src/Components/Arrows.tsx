import React, { useEffect, useState } from 'react';

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
  });

  return <div>Arrows</div>;
}

export default Arrows;
