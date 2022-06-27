import { Image } from 'react-konva';

function Images({
  element,
  canvaElements,
  handleDragStart,
  handleDragEnd,
}: any) {
  const imageProps = {
    type: 'image',
    id: element ? element.id : canvaElements.length - 1,
    x: element ? element.x : window.innerWidth / 2,
    y: element ? element.y : window.innerHeight / 2,
    rotation: 0,
  };

  return (
    <Image
      type={imageProps.type}
      key={imageProps.id}
      id={imageProps.id.toString()}
      x={imageProps.x}
      y={imageProps.y}
      scaleX={0.1}
      scaleY={0.1}
      image={element.src}
      rotation={imageProps.rotation}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={(e) => {
        const indx = handleDragEnd();
        console.log(indx, canvaElements, canvaElements[indx]);
        canvaElements[indx].x = e.target.x();
        canvaElements[indx].y = e.target.y();
      }}
      stroke='black'
    />
  );
}

export default Images;
