import { Circle } from 'react-konva';

function Circles({
  // click,
  element,
  canvaElements,
  // setCanvaElements,
  handleDragStart,
  handleDragEnd,
}: any) {
  const circle = {
    type: 'circle',
    id: element ? element.id : canvaElements.length - 1,
    x: element ? element.x : window.innerWidth / 2,
    y: element ? element.y : window.innerHeight / 2,
    color: element ? element.color : '#000000',
  };

  return (
    <Circle
      key={circle.id}
      id={circle.id.toString()}
      x={circle.x}
      y={circle.y}
      radius={50}
      stroke='black'
      fill={circle.color}
      onDragStart={handleDragStart}
      onDragEnd={(e) => {
        const indx = handleDragEnd();
        console.log(indx, canvaElements, canvaElements[indx]);
        canvaElements[indx].x = e.target.x();
        canvaElements[indx].y = e.target.y();
      }}
      draggable={true}
    />
  );
}

export default Circles;
