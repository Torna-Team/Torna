import { useEffect, useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';

const Canva = ({ uploadedImage }: any) => {
  const [drawImage, setDrawImage] = useState<any>(null);
  useEffect(() => {
    loadImage();
  }, [uploadedImage]);

  //habrá que guardar cada imagen como un objeto para poder acceder a su X e Y???? Draggable tiene que actualizar X e Y
  //https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/drag_and_drop?from-embed

  const loadImage = () => {
    if (uploadedImage) {
      //aqui tenemos que crear el puto objeto de mierda
      for (let i = 0; i < uploadedImage.length; i++) {
        const newImage = new window.Image();
        newImage.src = uploadedImage[i];
        newImage.onload = () => {
          if (uploadedImage) {
            console.log('UPLOAD IMAGES', uploadedImage[0]);
            setDrawImage((prev: any) => {
              if (prev) {
                return [...prev, newImage];
              } else return [newImage];
            });
          }
        };
      }
    }
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {drawImage &&
          drawImage.map((el: any) => {
            return (
              <Image
                image={el}
                alt='test'
                scaleX={0.1}
                scaleY={0.1}
                draggable={true}
              ></Image>
            );
          })}
      </Layer>
    </Stage>
  );
};

export default Canva;
