import { Transformer, Arrow } from 'react-konva';
import React from 'react';

function Arrows({
  element,
  canvaElements,
  handleDragStart,
  handleDragEnd,
  isSelected,
  onSelect,
}: any) {
  const shapeRef: any = React.useRef();
  const trRef: any = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  const arrow = {
    type: 'arrow',
    id: element ? element.id : canvaElements.length - 1,
    x: element ? element.x : window.innerWidth / 2,
    y: element ? element.y : window.innerHeight / 2,
    rotation: element ? element.rotation : 0,
    scaleX: element ? element.scaleX : 0,
    scaleY: element ? element.scaleY : 0,
    color: element ? element.color : '#000000',
  };

  return (
    <>
      <Arrow
        key={arrow.id}
        id={arrow.id.toString()}
        x={arrow.x}
        y={arrow.y}
        scaleX={arrow.scaleX}
        scaleY={arrow.scaleY}
        ref={shapeRef}
        rotation={arrow.rotation}
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
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={(e: any) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          const rotation = node.rotation();
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
          boundBoxFunc={(oldBox: any, newBox: any) => {
            // limit resize
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

export default Arrows;
