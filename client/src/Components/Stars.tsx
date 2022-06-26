import { Star } from 'react-konva';

function Stars({
  element,
  canvaElements,
  handleDragStart,
  handleDragEnd,
}: any) {
  const star = {
    type: 'star',
    id: element ? element.id : canvaElements.length - 1,
    x: element ? element.x : window.innerWidth / 2,
    y: element ? element.y : window.innerHeight / 2,
    rotation: 0,
    color: element ? element.color : '#000000',
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
      fill={star.color}
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
