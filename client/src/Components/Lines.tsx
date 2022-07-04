import { Transformer, Arrow } from 'react-konva';
import React from 'react';
import { ShapeProps } from '../Types/Canvas.interface';
import Konva from 'konva';

function Lines({
  element,
  canvaElements,
  handleDragEnd,
  isSelected,
  onSelect,
}: ShapeProps) {
  const shapeRef = React.useRef<Konva.Arrow | null>(null);
  const trRef = React.useRef<Konva.Transformer | null>(null);

  React.useEffect(() => {
    if (isSelected && shapeRef.current) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);
  const line = {
    type: 'line',
    id: element ? element.id : canvaElements.length - 1,
    x: element ? element.x : window.innerWidth / 2,
    y: element ? element.y : window.innerHeight / 2,
    rotation: element ? element.rotation : 0,
    scaleX: element ? element.scaleX : 0,
    scaleY: element ? element.scaleY : 0,
    color: element ? element.color : 'rgb(0, 0, 0, 1)',
  };

  return (
    <>
      <Arrow
        key={line.id}
        id={line.id.toString()}
        x={line.x}
        y={line.y}
        scaleX={line.scaleX}
        scaleY={line.scaleY}
        ref={shapeRef}
        rotation={line.rotation}
        points={[0, 100, 100, 0]}
        pointerLength={0}
        pointerWidth={0}
        onDragEnd={(e) => {
          const indx = handleDragEnd();
          canvaElements[indx].x = e.target.x();
          canvaElements[indx].y = e.target.y();
        }}
        draggable={true}
        stroke={line.color}
        strokeWidth={4}
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node?.scaleX();
          const scaleY = node?.scaleY();
          const rotation = node?.rotation();
          const indx = handleDragEnd();
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

export default Lines;
