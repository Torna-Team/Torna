import React from 'react';
// import { useEffect, useContext, useState } from 'react'
import { Image } from 'react-konva';
import Konva from 'konva';

export const Video = ({ src }: any) => {
  const imageRef: null | any = React.useRef(null);
  const [size, setSize] = React.useState({ width: 50, height: 50 });
  const [state, setState] = React.useState<string>('play');

  const handleClick = () => {
    setState('play');
  };

  // we need to use "useMemo" here, so we don't create new video elment on any render
  const videoElement = React.useMemo(() => {
    const element = document.createElement('video');
    element.src = src;
    return element;
  }, [src]);

  // when video is loaded, we should read it size
  React.useEffect(() => {
    const onload = function () {
      setSize({
        width: videoElement.videoWidth,
        height: videoElement.videoHeight,
      });
    };
    videoElement.addEventListener('loadedmetadata', onload);
    return () => {
      videoElement.removeEventListener('loadedmetadata', onload);
    };
  }, [videoElement]);

  // use Konva.Animation to redraw a layer
  React.useEffect(() => {
    videoElement.play();
    const layer = imageRef.current.getLayer();

    const anim: any = new Konva.Animation(() => {}, layer);
    anim.start();

    return () => anim.stop();
  }, [videoElement]);

  return (
    <Image
      ref={imageRef}
      image={videoElement}
      x={20}
      y={20}
      stroke='red'
      width={400}
      height={225}
      draggable
      state={state}
      // onClick={handleClick}
    />
  );
};
