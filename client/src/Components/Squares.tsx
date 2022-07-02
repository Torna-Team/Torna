import { Transformer, Rect } from 'react-konva';
import React from 'react';
import { ShapeProps } from '../types/Canvas.interface';
import Konva from 'konva';

function Squares({
  element,
  canvaElements,
  handleDragEnd,
  isSelected,
  onSelect,
}: ShapeProps) {
  const shapeRef = React.useRef<Konva.Rect | null>(null);
  const trRef = React.useRef<Konva.Transformer | null>(null);

  React.useEffect(() => {
    if (isSelected && shapeRef.current) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const square = {
    type: 'square',
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
      <Rect
        key={square.id}
        id={square.id.toString()}
        x={square.x}
        y={square.y}
        scaleX={square.scaleX}
        scaleY={square.scaleY}
        ref={shapeRef}
        rotation={square.rotation}
        draggable={true}
        width={100}
        height={100}
        fill={square.color}
        stroke={square.stroke}
        onDragEnd={(e) => {
          const indx = handleDragEnd();
          canvaElements[indx].x = e.target.x();
          canvaElements[indx].y = e.target.y();
        }}
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

export default Squares;
