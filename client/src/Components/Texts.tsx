import { Transformer, Text } from 'react-konva';
import React from 'react';

function Texts({
  element,
  canvaElements,
  handleDragStart,
  handleDragEnd,
  isSelected,
  onSelect,
}: any) {
  const shapeRef: any = React.useRef();
  const trRef: any = React.useRef();

  const text = {
    type: 'text',
    text: element.text,
    id: element ? element.id : canvaElements.length - 1,
    x: element ? element.x : window.innerWidth / 2,
    y: element ? element.y : window.innerHeight / 2,
    rotation: element ? element.rotation : 0,
    scaleX: element ? element.scaleX : 0,
    scaleY: element ? element.scaleY : 0,
    color: element ? element.color : 'rgb(0, 0, 0, 1)',
    stroke: element ? element.stroke : 'rgb(0, 0, 0, 1)',
    font: element ? element.font : 'Ubuntu',
  };

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        key={text.id}
        x={text.x}
        y={text.y}
        scaleX={text.scaleX}
        scaleY={text.scaleY}
        ref={shapeRef}
        rotation={text.rotation}
        draggable={true}
        text={text.text}
        fontSize={30}
        fill={text.color}
        stroke={text.stroke}
        fontFamily={text.font}
        id={text.id.toString()}
        onDragEnd={(e) => {
          const indx = handleDragEnd(text);
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

export default Texts;
