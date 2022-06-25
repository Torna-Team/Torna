import React, { useEffect, useState } from 'react';
import { Star } from 'react-konva';

function Stars({ click, setClick, canvaElements, setCanvaElements }: any) {
  const [stars, setStars] = useState<any>(null);

  useEffect(() => {
    if (click === 'star') {
      const star = {
        type: 'star',
        id: canvaElements.length,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        rotation: 0,
      };
      setCanvaElements((prev: any) => {
        if (prev) return [...prev, star];
        else return [star];
      });
      setStars((prev: any) => {
        if (prev) return [...prev, star];
        else return [star];
      });
    }
    setClick(null);
  }, [click]);

  const handleDragStart = (e: any) => {
    const id = Number(e.target.attrs.id);
    let indx!: number;
    const element = canvaElements.find((el: any, index: any) => {
      if (id === el.id) {
        indx = index;
      }
      return id === el.id;
    });
    setCanvaElements((prev: any) => {
      if (prev) {
        const arr1 = prev.slice(0, indx);
        const arr2 = prev.slice(indx + 1, prev.length);
        const result = [...arr1, ...arr2, element];
        return result;
      } else return [element];
    });
  };

  const handleDragEnd = (e: any) => {
    const id = Number(e.target.attrs.id);
    let indx!: number;
    let type!: string;
    for (let i = 0; i < canvaElements.length; i++) {
      if (canvaElements[i].id === id) {
        indx = i;
        type = canvaElements[i].type;
        break;
      }
    }
    canvaElements[indx].x = e.target.x();
    canvaElements[indx].y = e.target.y();
    const res = canvaElements.filter((el: any) => el.type === type);
    setStars([...res]);
  };

  return (
    <>
      {stars &&
        stars.map((star: any) => (
          <Star
            key={star.id}
            id={star.id.toString()}
            x={star.x}
            y={star.y}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            fill='#FF7F50'
            // opacity={0.8}
            draggable={true}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            rotation={star.rotation}
            shadowColor='red'
            shadowBlur={10}
            shadowOpacity={0.6}
          />
        ))}
    </>
  );
}

export default Stars;
