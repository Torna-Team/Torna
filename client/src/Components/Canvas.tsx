import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { Group, Layer, Stage } from 'react-konva';
import FontPicker from 'font-picker-react';
import checkCanvaElement from '../Services/utils';
import Arrows from './Arrows';
import Circles from './Circles';
import Squares from './Squares';
import Stars from './Stars';
import Texts from './Texts';
import Images from './Images';
import ImageUpload from './ImageUpload';

function Canvas() {
  const [canvaElements, setCanvaElements] = useState<any[]>([]);
  const [color, setColor] = useState<any>('rgba(255, 255, 255)');
  const [stroke, setStroke] = useState<any>('rgba(0, 0, 0, 1)');
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [showStrokePicker, setShowStrokePicker] = useState<boolean>(false);
  const [height, setHeight] = useState(600);
  const [selectedId, selectShape] = useState<any>(null);
  const [newImage, setNewImage] = useState<any>(null);
  const [font, setFont] = useState<string>('Ubuntu');

  const fontAPI = process.env.REACT_APP_GOOGLEAPI as string;

  useEffect(() => {
    if (newImage !== null) {
      const canvaLength = canvaElements.length;
      const newCanvaElement = checkCanvaElement(
        'image',
        canvaLength,
        color,
        stroke,
        newImage
      );
      setCanvaElements((prev: any) => {
        if (prev) return [...prev, newCanvaElement];
        else return [newCanvaElement];
      });
    }
  }, [newImage]);

  function handleClick(e: any) {
    e.preventDefault();
    const type = e.target.value;
    const canvaLength = canvaElements.length;
    let newCanvaElement!: any;
    type.includes('http')
      ? (newCanvaElement = checkCanvaElement(
          'image',
          canvaLength,
          color,
          stroke,
          type
        ))
      : (newCanvaElement = checkCanvaElement(type, canvaLength, color, stroke));
    setCanvaElements((prev: any) => {
      if (prev) return [...prev, newCanvaElement];
      else return [newCanvaElement];
    });
  }

  const handleWheel = (e: any) => {
    if (e.evt.deltaY > 0) {
      setHeight(height * 1.05);
    }
    if (e.evt.deltaY < 0) {
      setHeight(height / 1.05);
    }
  };
  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

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
    e.preventDefault();
    const newText = {
      type: 'text',
      text: e.target.textInput.value,
      id: canvaElements.length,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      color: color,
      stroke: stroke,
      font: font,
    };

    // setText((prev: any) => {
    //   if (prev) return [...prev, newText];
    //   else return [newText];
    // });
    setCanvaElements((prev: any) => {
      if (prev) return [...prev, newText];
      else return [newText];
    });
    e.target.reset();
  }

  return (
    <div className='mainContainer'>
      <div className='menuContainer'>
        <form onSubmit={handleSubmit}>
          <input type='text' id='text' name='textInput'></input>
          <button type='submit'> Add Text </button>
        </form>
        <button
          onClick={() =>
            setShowColorPicker((showColorPicker) => !showColorPicker)
          }
        >
          {showColorPicker ? 'Close' : 'Pick fill color'}
        </button>
        {showColorPicker && (
          <ChromePicker
            className='chromePicker'
            color={color}
            onChange={(updatedColor) => {
              const res = updatedColor.rgb;
              const string = `rgba(${res.r}, ${res.g}, ${res.b}, ${res.a})`;
              return setColor(string);
            }}
          ></ChromePicker>
        )}
        <button
          onClick={() =>
            setShowStrokePicker((showStrokePicker) => !showStrokePicker)
          }
        >
          {showStrokePicker ? 'Close' : 'Pick stroke color'}
        </button>
        {showStrokePicker && (
          <ChromePicker
            className='chromePicker'
            color={stroke}
            onChange={(updatedColor) => {
              const res = updatedColor.rgb;
              const string = `rgba(${res.r}, ${res.g}, ${res.b}, ${res.a})`;
              return setStroke(string);
            }}
          ></ChromePicker>
        )}
        <FontPicker
          apiKey={fontAPI as string}
          activeFontFamily={font}
          onChange={(nextFont) => setFont(nextFont.family)}
        />
        <button value={'star'} onClick={handleClick}>
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
        <button
          value='https://qph.cf2.quoracdn.net/main-qimg-c8781a4bb1f17e330b50cb35f851da05.webp'
          onClick={handleClick}
        >
          IMAGE
        </button>
        {/* miss all the logic but at least they render */}
        <ImageUpload setNewImage={setNewImage}></ImageUpload>
      </div>
      <Stage
        width={window.innerWidth}
        height={height}
        onWheel={handleWheel}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {canvaElements &&
            canvaElements.map((el, i) => {
              if (el) {
                if (el.type === 'star') {
                  return (
                    <Stars
                      key={el.id}
                      element={el}
                      canvaElements={canvaElements}
                      setCanvaElements={setCanvaElements}
                      handleDragStart={handleDragStart}
                      handleDragEnd={() => handleDragEnd(el)}
                      isSelected={el.id === selectedId}
                      onSelect={() => {
                        selectShape(el.id);
                      }}
                    ></Stars>
                  );
                }
                if (el.type === 'circle') {
                  return (
                    <Circles
                      key={el.id}
                      element={el}
                      canvaElements={canvaElements}
                      setCanvaElements={setCanvaElements}
                      handleDragStart={handleDragStart}
                      handleDragEnd={() => handleDragEnd(el)}
                      isSelected={el.id === selectedId}
                      onSelect={() => {
                        selectShape(el.id);
                      }}
                    ></Circles>
                  );
                }
                if (el.type === 'square') {
                  return (
                    <Squares
                      key={el.id}
                      element={el}
                      canvaElements={canvaElements}
                      setCanvaElements={setCanvaElements}
                      handleDragStart={handleDragStart}
                      handleDragEnd={() => handleDragEnd(el)}
                      isSelected={el.id === selectedId}
                      onSelect={() => {
                        selectShape(el.id);
                      }}
                    ></Squares>
                  );
                }
                if (el.type === 'arrow') {
                  return (
                    <Arrows
                      key={el.id}
                      element={el}
                      canvaElements={canvaElements}
                      setCanvaElements={setCanvaElements}
                      handleDragStart={handleDragStart}
                      handleDragEnd={() => handleDragEnd(el)}
                      isSelected={el.id === selectedId}
                      onSelect={() => {
                        selectShape(el.id);
                      }}
                    ></Arrows>
                  );
                }
                if (el.type === 'image') {
                  return (
                    <Images
                      key={el.id}
                      element={el}
                      canvaElements={canvaElements}
                      setCanvaElements={setCanvaElements}
                      handleDragStart={handleDragStart}
                      handleDragEnd={() => handleDragEnd(el)}
                      isSelected={el.id === selectedId}
                      onSelect={() => {
                        selectShape(el.id);
                      }}
                    ></Images>
                  );
                }
                if (el.type === 'text') {
                  return (
                    <Group>
                      <Texts
                        key={el.id}
                        element={el}
                        canvaElements={canvaElements}
                        setCanvaElements={setCanvaElements}
                        handleDragStart={handleDragStart}
                        handleDragEnd={() => handleDragEnd(el)}
                        isSelected={el.id === selectedId}
                        onSelect={() => {
                          selectShape(el.id);
                        }}
                      ></Texts>
                    </Group>
                  );
                }
              }
              return <></>;
            })}
        </Layer>
        {/* <Texts
          key={'text'}
          // text={text}
          handleDragEnd={handleDragEnd}
          canvaElements={canvaElements}
          setCanvaElements={setCanvaElements}
        ></Texts> */}
      </Stage>
    </div>
  );
}

export default Canvas;
