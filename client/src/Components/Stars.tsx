import React from 'react';
import { Star } from 'react-konva';

function Stars({
  // click,
  element,
  canvaElements,
  // setCanvaElements,
  handleDragStart,
  handleDragEnd,
}: any) {
  const star = {
    type: 'star',
    id: element ? element.id : canvaElements.length - 1,
    x: element ? element.x : window.innerWidth / 2,
    y: element ? element.y : window.innerHeight / 2,
    rotation: 0,
  };

  return (
    <Star
      type={star.type}
      key={star.id}
      id={star.id.toString()}
      x={star.x}
      y={star.y}
      rotation={star.rotation}
      numPoints={5}
      innerRadius={20}
      outerRadius={40}
      fill='#FF7F50'
      // opacity={0.8}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={(e) => {
        const indx = handleDragEnd();
        console.log(indx, canvaElements, canvaElements[indx]);
        canvaElements[indx].x = e.target.x();
        canvaElements[indx].y = e.target.y();
      }}
      stroke='black'
    />
  );
}

export default Stars;
