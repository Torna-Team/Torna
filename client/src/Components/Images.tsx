import { Transformer, Image } from 'react-konva';
import { useRef, useEffect } from 'react';
import { ShapeProps } from '../Types/Canvas.interface';
import Konva from 'konva';

function Images({
  element,
  canvaElements,
  handleDragEnd,
  isSelected,
  onSelect,
}: ShapeProps) {
  const shapeRef = useRef<Konva.Image | null>(null);
  const trRef = useRef<Konva.Transformer | null>(null);

  useEffect(() => {
    if (isSelected && shapeRef.current) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);
  const imageProps = {
    type: 'image',
    id: element ? element.id : canvaElements.length - 1,
    x: element ? element.x : window.innerWidth / 2,
    y: element ? element.y : canvaElements[canvaElements.length - 1].y + 100,
    rotation: element ? element.rotation : 0,
    scaleX: element ? element.scaleX : 0.05,
    scaleY: element ? element.scaleY : 0.05,
  };
  const newImage = new window.Image();
  newImage.src = element.imageSrc as string;

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
        ref={shapeRef}
        rotation={imageProps.rotation}
        image={newImage}
        draggable={true}
        onDragEnd={(e) => {
          const indx = handleDragEnd();
          canvaElements[indx].x = e.target.x();
          canvaElements[indx].y = e.target.y();
        }}
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

export default Images;
