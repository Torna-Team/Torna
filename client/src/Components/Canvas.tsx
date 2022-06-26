import React, { useState } from 'react';
import { Layer, Stage } from 'react-konva';
import checkCanvaElement from '../Services/utils';
// import Arrows from './Arrows';
import Circles from './Circles';
import Squares from './Squares';
import Stars from './Stars';
import Texts from './Texts';

function Canvas() {
  const [canvaElements, setCanvaElements] = useState<any[]>([]);
  const [text, setText] = useState<any>([]);

  function handleClick(e: any) {
    e.preventDefault();
    //THIS should be moved into utils as a huge function that returns the object that we need based on the type
    const type = e.target.value;
    const canvaLength = canvaElements.length;
    const newCanvaElement = checkCanvaElement(type, canvaLength);
    // if (type === 'star') {
    //   const star = {
    //     type: 'star',
    //     id: canvaElements.length,
    //     x: window.innerWidth / 2,
    //     y: window.innerHeight / 2,
    //     rotation: 0,
    //   };
    setCanvaElements((prev: any) => {
      if (prev) return [...prev, newCanvaElement];
      else return [newCanvaElement];
    });
  }

  const handleDragStart = (e: any) => {
    // console.log(e.target, e.target._id, e);
    // const newId = Number(e.target.attrs.id);
    // console.log('la new id al clickar y hacer drag', newId);
    // let indx!: number;
    // console.log('newid', newId);
  };

  const handleDragEnd = (el: any) => {
    let indx!: number;
    for (let i = 0; i < canvaElements.length; i++) {
      if (canvaElements[i].id === el.id) {
        indx = i;
        break;
      }
    }

    setCanvaElements((prev: any) => {
      if (prev) {
        console.log(indx);
        const arr1 = prev.slice(0, indx);
        const arr2 = prev.slice(indx + 1, prev.length);
        const result = [...arr1, ...arr2, el];
        console.log(arr1, arr2, result);
        return result;
      } else return [el];
    });
    return indx;
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
          {canvaElements &&
            canvaElements.map((el, i) => {
              if (el) {
                if (el.type === 'star') {
                  return (
                    <Stars
                      element={el}
                      canvaElements={canvaElements}
                      setCanvaElements={setCanvaElements}
                      handleDragStart={handleDragStart}
                      handleDragEnd={() => handleDragEnd(el)}
                    ></Stars>
                  );
                }
                if (el.type === 'circle') {
                  return (
                    <Circles
                      element={el}
                      canvaElements={canvaElements}
                      setCanvaElements={setCanvaElements}
                      handleDragStart={handleDragStart}
                      handleDragEnd={() => handleDragEnd(el)}
                    ></Circles>
                  );
                }
                if (el.type === 'square') {
                  return (
                    <Squares
                      element={el}
                      canvaElements={canvaElements}
                      setCanvaElements={setCanvaElements}
                      handleDragStart={handleDragStart}
                      handleDragEnd={() => handleDragEnd(el)}
                    ></Squares>
                  );
                }
              }
              return <></>;
            })}

          {/* <Squares click={click} setClick={setClick}></Squares> */}
          {/* <Arrows click={click} setClick={setClick}></Arrows> */}
        </Layer>
        <Texts text={text} handleDragEnd={handleDragEnd}></Texts>
      </Stage>
    </div>
  );
}

export default Canvas;
