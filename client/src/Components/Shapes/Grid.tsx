import { Rect } from 'react-konva';

const gridWidth = 300;
const gridHeight = 300;

const Grid = () => {
  const stagePos = { x: 0, y: 0 };
  const startX =
    Math.floor((-stagePos.x - window.innerWidth) / gridWidth) * gridWidth;
  const endX =
    Math.floor((-stagePos.x + window.innerWidth * 2) / gridWidth) * gridWidth;

  const startY = Math.floor((-stagePos.y - 5000) / gridHeight) * gridHeight;
  const endY = Math.floor((-stagePos.y + 5000 * 2) / gridHeight) * gridHeight;

  const gridComponents = [];
  var i = 0;
  for (var x = startX; x < endX; x += gridWidth) {
    for (var y = startY; y < endY; y += gridHeight) {
      if (i === 4) {
        i = 0;
      }

      gridComponents.push(
        <Rect
          x={x}
          y={y}
          width={gridWidth}
          height={gridHeight}
          stroke='WhiteSmoke'
        />
      );
    }
  }

  return (
    <>
      {gridComponents.map((el) => {
        return el;
      })}
    </>
  );
};

export default Grid;
