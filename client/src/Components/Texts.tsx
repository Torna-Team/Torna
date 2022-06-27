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
    color: element ? element.color : '#000000',
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
        x={text.x}
        y={text.y}
        scaleX={text.scaleX}
        scaleY={text.scaleY}
        ref={shapeRef}
        rotation={text.rotation}
        text={text.text}
        fontSize={30}
        fill={text.color}
        draggable={true}
        key={text.id}
        fontFamily={text.font}
        id={text.id.toString()}
        onDragEnd={(e) => {
          console.log('text event', e.target);
          console.log('textoooooo', text);
          const indx = handleDragEnd(text);
          console.log(indx, canvaElements, canvaElements[indx]);
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

export default Texts;
