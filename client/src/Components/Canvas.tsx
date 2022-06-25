import React, { useState } from 'react';
import { Layer, Stage } from 'react-konva';
// import Arrows from './Arrows';
import Circles from './Circles';
import Squares from './Squares';
import Stars from './Stars';
import Texts from './Texts';

function Canvas() {
  const [click, setClick] = useState<boolean>(false);
  const [canvaElements, setCanvaElements] = useState<any[]>([]);
  const [text, setText] = useState<any>([]);
  const [id, setId] = useState<any>(null);

  function handleClick(e: any) {
    e.preventDefault();
    setClick(e.target.value);
  }

  const handleDragStart = (e: any) => {
    const id = Number(e.target.attrs.id);
    setId(id);
    let indx!: number;
    const element = canvaElements.find((el: any, index: any) => {
      if (id === el.id) {
        indx = index;
      }
      return id === el.id;
    });
    setCanvaElements((prev: any) => {
      if (prev) {
        const arr1 = prev.slice(0, indx);
        const arr2 = prev.slice(indx + 1, prev.length);
        const result = [...arr1, ...arr2, element];
        return result;
      } else return [element];
    });
  };

  const handleDragEnd = (e: any) => {
    // const id = Number(e.target.attrs.id);
    let indx!: number;
    let type!: string;
    let item!: any;
    for (let i = 0; i < canvaElements.length; i++) {
      if (canvaElements[i].id === id) {
        indx = i;
        item = canvaElements[i];
        type = canvaElements[i].type;
        break;
      }
    }
    console.log(item);
    setId(null);
    return { indx, type };
    // canvaElements[indx].x = e.target.x();
    // canvaElements[indx].y = e.target.y();
    // const res = canvaElements.filter((el: any) => el.type === type);
    // setStars([...res]);
    // return res;
  };

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
      <button value='star' onClick={handleClick}>
        STAR
      </button>
      <button value='circle' onClick={handleClick}>
        CIRCLE
      </button>
      <button value='square' onClick={handleClick}>
        SQUARE
      </button>
      <button value='arrow' onClick={handleClick}>
        ARROW
      </button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Circles click={click} setClick={setClick}></Circles>
          <Stars
            click={click}
            setClick={setClick}
            canvaElements={canvaElements}
            setCanvaElements={setCanvaElements}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
          ></Stars>
          <Squares click={click} setClick={setClick}></Squares>
          {/* <Arrows click={click} setClick={setClick}></Arrows> */}
        </Layer>
        <Texts text={text}></Texts>
      </Stage>
    </div>
  );
}

export default Canvas;
