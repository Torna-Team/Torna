import React, { useState } from 'react';
import { Layer, Stage } from 'react-konva';
import Arrows from './Arrows';
import Circles from './Circles';
import Squares from './Squares';
import Stars from './Stars';
import Texts from './Texts';

function Canvas() {
  const [click, setClick] = useState<boolean>(false);
  const [text, setText] = useState<any>([]);

  function handleClick(e: any) {
    e.preventDefault();
    setClick(e.target.value);
  }

  function handleSubmit(e: any) {
    //generate text object
    e.preventDefault();
    const newText = e.target.textInput.value;
    setText((prev: any) => {
      if (prev) return [...prev, newText];
      else return [newText];
    });
    e.target.reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' id={text} name='textInput'></input>
        <button type='submit'> Add Text </button>
      </form>
      <button type='submit' value='star' onClick={handleClick}>
        STAR
      </button>
      <button type='submit' value='circle' onClick={handleClick}>
        CIRCLE
      </button>
      <button type='submit' value='square' onClick={handleClick}>
        SQUARE
      </button>
      <button type='submit' value='arrow' onClick={handleClick}>
        ARROW
      </button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Stars click={click} setClick={setClick}></Stars>
          <Circles click={click} setClick={setClick}></Circles>
          <Squares click={click} setClick={setClick}></Squares>
          <Arrows click={click} setClick={setClick}></Arrows>
        </Layer>
        <Texts text={text}></Texts>
      </Stage>
    </div>
  );
}

export default Canvas;
