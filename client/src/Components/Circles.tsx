import { Transformer, Circle } from 'react-konva';
import React from 'react';
import { ShapeProps } from '../types/Canvas.interface';
import Konva from 'konva';

function Circles({
  element,
  canvaElements,
  handleDragEnd,
  isSelected,
  onSelect,
}: ShapeProps) {
  const shapeRef = React.useRef<Konva.Circle | null>(null);
  const trRef = React.useRef<Konva.Transformer | null>(null);

  React.useEffect(() => {
    if (isSelected && shapeRef.current) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);
  const circle = {
    type: 'circle',
    id: element ? element.id : canvaElements.length - 1,
    x: element ? element.x : window.innerWidth / 2,
    y: element ? element.y : window.innerHeight / 2,
    rotation: element ? element.rotation : 0,
    scaleX: element ? element.scaleX : 0,
    scaleY: element ? element.scaleY : 0,
    color: element ? element.color : 'rgb(255, 255, 255)',
    stroke: element ? element.stroke : 'rgb(0, 0, 0, 0)',
  };

  return (
    <>
      <Circle
        key={circle.id}
        id={circle.id.toString()}
        x={circle.x}
        y={circle.y}
        scaleX={circle.scaleX}
        scaleY={circle.scaleY}
        ref={shapeRef}
        rotation={circle.rotation}
        radius={50}
        fill={circle.color}
        stroke={circle.stroke}
        onDragEnd={(e) => {
          const indx = handleDragEnd();
          console.log(indx, canvaElements, canvaElements[indx]);
          canvaElements[indx].x = e.target.x();
          canvaElements[indx].y = e.target.y();
        }}
        draggable={true}
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={(e: any) => {
          const node = shapeRef.current;
          const scaleX = node?.scaleX();
          const scaleY = node?.scaleY();
          const rotation = node?.rotation();
          const indx = handleDragEnd();
          console.log(indx, canvaElements, canvaElements[indx]);
          canvaElements[indx].scaleX = scaleX;
          canvaElements[indx].scaleY = scaleY;
          canvaElements[indx].rotation = rotation;
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}

export default Circles;
