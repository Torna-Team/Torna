import { Transformer, Image } from 'react-konva';
import React from 'react';
import { useState } from 'react';
import 'gifler';

function Gifs({
  element,
  canvaElements,
  handleDragStart,
  handleDragEnd,
  isSelected,
  onSelect,
}: any) {
  const trRef: any = React.useRef();
  const imageRef = React.useRef(null as any);
  const canvas = React.useMemo(() => {
    const node = document.createElement('canvas');
    return node;
  }, []);

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
    let an: any;
    window.gifler(element.src.src).get((a: any) => {
      an = a;
      an.animateInCanvas(canvas);
      an.onDrawFrame = (ctx: any, frame: any) => {
        ctx.drawImage(frame.buffer, frame.x, frame.y);
        if (imageRef.current) {
          imageRef.current.getLayer().draw();
        }
      };
    });
    if (an) {
      return () => an.stop();
    }
  }, [isSelected, element.src, canvas]);

  const imageProps = {
    type: 'image',
    id: element ? element.id : canvaElements.length - 1,
    x: element ? element.x : window.innerWidth / 2,
    y: element ? element.y : window.innerHeight / 2,
    rotation: element ? element.rotation : 0,
    scaleX: element ? element.scaleX : 0.05,
    scaleY: element ? element.scaleY : 0.05,
  };

  return (
    <>
      <Image
        type={imageProps.type}
        key={imageProps.id}
        id={imageProps.id.toString()}
        x={imageProps.x}
        y={imageProps.y}
        scaleX={imageProps.scaleX}
        scaleY={imageProps.scaleY}
        ref={imageRef}
        rotation={imageProps.rotation}
        image={canvas}
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={(e) => {
          const indx = handleDragEnd();
          canvaElements[indx].x = e.target.x();
          canvaElements[indx].y = e.target.y();
        }}
        stroke='black'
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={(e: any) => {
          const node = imageRef.current;
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

export default Gifs;
