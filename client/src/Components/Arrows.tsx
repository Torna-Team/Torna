import { Arrow } from 'react-konva';

function Arrows({
  // click,
  element,
  canvaElements,
  // setCanvaElements,
  handleDragStart,
  handleDragEnd,
}: any) {
  const arrow = {
    type: 'arrow',
    id: element ? element.id : canvaElements.length - 1,
    x: element ? element.x : window.innerWidth / 2,
    y: element ? element.y : window.innerHeight / 2,
    color: element ? element.color : '#000000',
  };

  return (
    <Arrow
      key={arrow.id}
      id={arrow.id.toString()}
      x={arrow.x}
      y={arrow.y}
      points={[0, 100, 100, 0]}
      pointerLength={6}
      pointerWidth={6}
      onDragStart={handleDragStart}
      onDragEnd={(e) => {
        const indx = handleDragEnd();
        console.log(indx, canvaElements, canvaElements[indx]);
        canvaElements[indx].x = e.target.x();
        canvaElements[indx].y = e.target.y();
      }}
      draggable={true}
      stroke={arrow.color}
      strokeWidth={4}
    />
  );
}

export default Arrows;
