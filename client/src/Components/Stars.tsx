import React from 'react';
import { Transformer, Star } from 'react-konva';

function Stars({
  element,
  canvaElements,
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

  const star = {
    type: 'star',
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
      <Star
        type={star.type}
        key={star.id}
        id={star.id.toString()}
        x={star.x}
        y={star.y}
        scaleX={star.scaleX}
        scaleY={star.scaleY}
        ref={shapeRef}
        rotation={star.rotation}
        numPoints={5}
        innerRadius={20}
        outerRadius={40}
        fill={star.color}
        stroke={star.stroke}
        draggable={true}
        onDragEnd={(e) => {
          const indx = handleDragEnd();
          canvaElements[indx].x = e.target.x();
          canvaElements[indx].y = e.target.y();
        }}
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={(e: any) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          const rotation = node.rotation();
          const indx = handleDragEnd();
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

export default Stars;
