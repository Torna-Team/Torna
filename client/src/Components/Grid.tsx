import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect } from 'react-konva';

const WIDTH = 40;
const HEIGHT = 40;

const Grid = ({ setGridComponents }: any) => {
  const stagePos = { x: 0, y: 0 };
  const startX = Math.floor((-stagePos.x - window.innerWidth) / WIDTH) * WIDTH;
  const endX =
    Math.floor((-stagePos.x + window.innerWidth * 2) / WIDTH) * WIDTH;

  const startY =
    Math.floor((-stagePos.y - window.innerHeight) / HEIGHT) * HEIGHT;
  const endY =
    Math.floor((-stagePos.y + window.innerHeight * 2) / HEIGHT) * HEIGHT;

  const gridComponents = [];
  var i = 0;
  for (var x = startX; x < endX; x += WIDTH) {
    for (var y = startY; y < endY; y += HEIGHT) {
      if (i === 4) {
        i = 0;
      }

      gridComponents.push(
        <Rect x={x} y={y} width={WIDTH} height={HEIGHT} stroke='WhiteSmoke' />
      );
    }
  }
  setGridComponents(gridComponents);
  return <></>;
};

export default Grid;
