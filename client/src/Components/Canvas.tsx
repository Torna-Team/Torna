import React, { useState } from 'react';
import { Layer, Stage } from 'react-konva';
import Circles from './Circles';
import Squares from './Squares';
import Stars from './Stars';

function Canvas() {
  const [click, setClick] = useState<boolean>(false);

  function handleClick(e: any) {
    e.preventDefault();
    setClick(e.target.value);
  }

  return (
    <div>
      <button type='submit' value='star' onClick={handleClick}>
        STAR
      </button>
      <button type='submit' value='circle' onClick={handleClick}>
        CIRCLE
      </button>
      <button type='submit' value='square' onClick={handleClick}>
        SQUARE
      </button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Stars click={click} setClick={setClick}></Stars>
          <Circles click={click} setClick={setClick}></Circles>
          <Squares click={click} setClick={setClick}></Squares>
        </Layer>
      </Stage>
    </div>
  );
}

export default Canvas;
