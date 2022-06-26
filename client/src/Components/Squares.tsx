import { Rect } from 'react-konva';

function Squares({
  // click,
  element,
  canvaElements,
  // setCanvaElements,
  handleDragStart,
  handleDragEnd,
}: any) {
  const square = {
    type: 'square',
    id: element ? element.id : canvaElements.length - 1,
    x: element ? element.x : window.innerWidth / 2,
    y: element ? element.y : window.innerHeight / 2,
  };

  return (
    <Rect
      key={square.id}
      id={square.id.toString()}
      x={square.x}
      y={square.y}
      draggable={true}
      width={100}
      height={100}
      stroke='black'
      fill='blue'
      onDragStart={handleDragStart}
      onDragEnd={(e) => {
        const indx = handleDragEnd();
        console.log(indx, canvaElements, canvaElements[indx]);
        canvaElements[indx].x = e.target.x();
        canvaElements[indx].y = e.target.y();
      }}
    />
  );
}

export default Squares;
