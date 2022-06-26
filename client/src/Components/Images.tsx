import { Image } from 'react-konva';

function Images({
  element,
  canvaElements,
  handleDragStart,
  handleDragEnd,
}: any) {
  const image = {
    type: 'image',
    id: element ? element.id : canvaElements.length - 1,
    x: element ? element.x : window.innerWidth / 2,
    y: element ? element.y : window.innerHeight / 2,
    rotation: 0,
    color: element ? element.color : '#000000',
    src: 'https://qph.cf2.quoracdn.net/main-qimg-c8781a4bb1f17e330b50cb35f851da05.webp',
  };

  return (
    <Image
      type={image.type}
      key={image.id}
      id={image.id.toString()}
      x={image.x}
      y={image.y}
      image={image.src}
      rotation={image.rotation}
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
