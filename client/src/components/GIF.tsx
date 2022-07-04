import React, { useState } from 'react';
import { Image } from 'react-konva';
import 'gifler';

// type Props = {};

const GIF = ({ src }: any) => {
  const [anim, setAnim] = useState(null as any);
  const imageRef = React.useRef(null as any);
  const canvas = React.useMemo(() => {
    const node = document.createElement('canvas');
    return node;
  }, []);

  React.useEffect(() => {
    // save animation instance to stop it on unmount
    let an: any;
    window.gifler(src).get((a: any) => {
      an = a;
      an.animateInCanvas(canvas);
      an.onDrawFrame = (ctx: any, frame: any) => {
        ctx.drawImage(frame.buffer, frame.x, frame.y);
        imageRef.current.getLayer().draw();
      };
    });
    if (an) {
      return () => an.stop();
    }
  }, [src, canvas]);

  return <Image image={canvas} ref={imageRef} draggable />;
};

export default GIF;
