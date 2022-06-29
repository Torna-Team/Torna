//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { ChromePicker, CompactPicker } from 'react-color';
import { Layer, Stage } from 'react-konva';
import FontPicker from 'font-picker-react';
import checkCanvaElement from '../../Services/utils';
import Arrows from '../Arrows';
import Circles from '../Circles';
import Squares from '../Squares';
import Stars from '../Stars';
import Texts from '../Texts';
import Images from '../Images';
import AnimatedText from '../AnimatedText';
import ImageUpload from '../ImageUpload';
import Gifs from '../Gifs';
import './Canvas.css';
import tornaLogo from '../../images/tornalogo.png';
import { FiStar, FiCircle, FiSquare, FiArrowUpRight } from 'react-icons/fi';
import { IoMdColorFill } from 'react-icons/io';
import { RiText } from 'react-icons/ri';
import { uuidv4 } from '@firebase/util';
import { useParams } from 'react-router-dom';
import { saveAlbum, getAlbum } from '../../Services/Server-Client';

function splitTextFromGenericShapes(shapeList) {
  return shapeList.reduce(
    (res, el) => {
      if (el.type === 'text') res.textItems.push(el);
      else res.genericItems.push(el);
      return res;
    },
    { genericItems: [], textItems: [] }
  );
}

// interface ShapeProps {
//   id: string | number;
//   type: any;
//   element: any;
//   canvaElements: any;
//   handleDragStart: any;
//   handleDragEnd: any;
//   isSelected: any;
//   onSelect: any;
// }

// type ShapeType =
//   | typeof Stars
//   | typeof Arrows
//   | typeof Circles
//   | typeof Squares
//   | typeof Images
//   | typeof Texts;

const shapeType = {
  star: Stars,
  arrow: Arrows,
  circle: Circles,
  square: Squares,
  image: Images,
  text: Texts,
  gif: Gifs,
};

function Canvas() {
  const albumId = useParams().id;

  const [canvaElements, setCanvaElements] = useState<any[]>([]);
  const [backgroundColor, setBackGroundColor] = useState<string>(
    'rgba(255, 255, 255)'
  );
  const [color, setColor] = useState<any>('rgba(241, 241, 246)');
  const [textColor, setTextColor] = useState<any>('rgba(0, 0, 0, 1)');
  const [stroke, setStroke] = useState<any>('rgba(0, 0, 0, 1)');
  const [strokedText, setStrokedText] = useState<boolean>(false);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [showStrokePicker, setShowStrokePicker] = useState<boolean>(false);
  const [height, setHeight] = useState(1200);
  const [selectedId, selectShape] = useState<any>(null);
  const [newImage, setNewImage] = useState<any>(null);
  const [font, setFont] = useState<string>('Ubuntu');
  const [newGif, setNewGif] = useState<any>(null);
  const [shownAnimate, setSwhownAnimate] = useState<boolean>(false);

  const fontAPI = process.env.REACT_APP_GOOGLEAPI as string;

  useEffect(() => {
    //get album by id
    const album = getAlbum(albumId);
    //if template
    console.log('album', album);
    album?.template && setCanvaElements(...JSON.parse(album.template));
    //=== render template
    //setCanvaElements(...response.template)
  }, []);

  useEffect(() => {
    if (newImage !== null) {
      const elementId = uuidv4();
      const newCanvaElement = checkCanvaElement(
        'image',
        elementId,
        color,
        stroke,
        newImage
      );
      setCanvaElements((prev: any) => {
        if (prev) return [...prev, newCanvaElement];
        else return [newCanvaElement];
      });
    }
    if (newGif !== null) {
      const elementId = uuidv4();
      const newCanvaElement = checkCanvaElement(
        'gif',
        elementId,
        color,
        stroke,
        newGif
      );
      setCanvaElements((prev: any) => {
        if (prev) return [...prev, newCanvaElement];
        else return [newCanvaElement];
      });
    }
  }, [newImage, newGif]);

  function handleClick(e: any) {
    e.preventDefault();
    const type = e.target.value;
    const elementId = uuidv4();
    let newCanvaElement!: any;
    console.log(type);
    if (type.includes('.gif')) {
      newCanvaElement = checkCanvaElement(
        'gif',
        elementId,
        color,
        stroke,
        type
      );
    } else if (type.includes('http://res.cloudinary.com')) {
      newCanvaElement = checkCanvaElement(
        'image',
        elementId,
        color,
        stroke,
        type
      );
    } else {
      newCanvaElement = checkCanvaElement(type, elementId, color, stroke);
    }
    setCanvaElements((prev: any) => {
      console.log(newCanvaElement);
      if (prev) return [...prev, newCanvaElement];
      else return [newCanvaElement];
    });
  }

  const handleWheel = (e: any) => {
    if (e.evt.deltaY > 0) {
      setHeight(height * 1.05);
    }
    if (e.evt.deltaY < 0) {
      if (height >= 1200) {
        setHeight(height / 1.05);
      }
    }
  };

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const editAlbum = async () => {
    console.log(canvaElements, albumId);
    const savedAlbum = {
      title: 'mi super album',
      template: JSON.stringify(canvaElements),
      id: albumId,
    };
    saveAlbum(savedAlbum);
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
        const arr1 = prev.slice(0, indx);
        const arr2 = prev.slice(indx + 1, prev.length);
        const result = [...arr1, ...arr2, el];
        return result;
      } else return [el];
    });
    console.log(indx);
    return indx;
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    const newText = {
      type: 'text',
      text: e.target.textInput.value,
      id: uuidv4(),
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      color: textColor,
      stroke: strokedText ? stroke : null,
      font: font,
    };

    setCanvaElements((prev: any) => {
      if (prev) return [...prev, newText];
      else return [newText];
    });
    e.target.reset();
  }

  function handleDelete(e: any) {
    e.preventDefault();
    if (selectedId !== null) {
      const arr = canvaElements.filter((el) => {
        return el.id !== selectedId;
      });
      setCanvaElements([...arr]);
    }
  }

  const { genericItems, textItems } = splitTextFromGenericShapes(canvaElements);

  return (
    <div className='canvaContainer'>
      {/* NAVBAR */}
      <div className='navbar'>
        <div className='navbarElements'>
          <img src={tornaLogo} alt='Torna logo' />
        </div>
        <div className='navbarElements'>
          <button className='navbarButton' onClick={editAlbum}>
            SAVE ALBUM
          </button>
        </div>
        <div className='navbarElements'>
          <label> Album Title:</label>
          <input
            className='navbarButton'
            type='text'
            placeholder='Your album title'
          ></input>
        </div>
        <div className='navbarImgs'>
          <ImageUpload setNewImage={setNewImage}></ImageUpload>
        </div>
      </div>

      <div className='canvasEditor'>
        <div className='toolsContainer'>
          <button className='drawButtons'>
            <IoMdColorFill />
          </button>
          <button className='drawButtons' value='star' onClick={handleClick}>
            <FiStar />
          </button>
          <button className='drawButtons' value='circle' onClick={handleClick}>
            <FiCircle />
          </button>
          <button className='drawButtons' value='square' onClick={handleClick}>
            <FiSquare />
          </button>
          <button className='drawButtons' value='arrow' onClick={handleClick}>
            <FiArrowUpRight />
          </button>
          <button className='drawButtons'>
            <RiText />
          </button>
        </div>

        <p>Background color</p>
        <CompactPicker
          className='huePicker'
          color={backgroundColor}
          onChange={(updatedColor) => {
            const res = updatedColor.rgb;
            const string = `rgba(${res.r}, ${res.g}, ${res.b}, ${res.a})`;
            return setBackGroundColor(string);
          }}
        ></CompactPicker>
        <form onSubmit={handleSubmit}>
          <input type='text' id='text' name='textInput'></input>
          <button type='submit'> Add Text </button>
          <input
            type='checkbox'
            onClick={() => {
              setStrokedText(!strokedText);
            }}
          ></input>
          <label>Stroke</label>
        </form>

        <button
          onClick={() =>
            setShowColorPicker((showColorPicker) => !showColorPicker)
          }
        >
          {showColorPicker ? 'Close' : 'Pick fill color'}
        </button>

        {/* FIll */}
        {showColorPicker && (
          <ChromePicker
            className='chromePicker'
            color={color}
            onChange={(updatedColor) => {
              const res = updatedColor.rgb;
              const string = `rgba(${res.r}, ${res.g}, ${res.b}, ${res.a})`;
              setTextColor(string);
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

        <button
          value='https://qph.cf2.quoracdn.net/main-qimg-c8781a4bb1f17e330b50cb35f851da05.webp'
          onClick={handleClick}
        >
          IMAGE
        </button>

        <button
          value={
            'https://media2.giphy.com/media/kDUG0IQtZq7P1AafEK/giphy.gif?cid=3a3f548700d14y67tcer708zyerzponvfdz02guqnami19mb&rid=giphy.gif&ct=g'
          }
          onClick={handleClick}
        >
          GIF
        </button>
        <input
          type='checkbox'
          onClick={() => {
            setSwhownAnimate(!shownAnimate);
          }}
        ></input>
        <label>Animated text</label>
        <button onClick={handleDelete}>DELETE</button>
        {/* miss all the logic but at least they render */}

        <div style={{ background: backgroundColor }}>
          {shownAnimate && <AnimatedText />}
          <Stage
            width={window.innerWidth}
            height={height}
            onWheel={handleWheel}
            onTouchMove={handleWheel}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
          >
            <Layer>
              {genericItems?.map((el) => {
                const Shape = shapeType[el?.type];
                if (!el || !Shape) return null;
                return (
                  <Shape
                    key={el.id}
                    element={el}
                    canvaElements={canvaElements}
                    setCanvaElements={setCanvaElements}
                    handleDragEnd={() => handleDragEnd(el)}
                    isSelected={el.id === selectedId}
                    onSelect={() => {
                      selectShape(el.id);
                    }}
                  />
                );
              })}
            </Layer>
            <Layer>
              {textItems?.map((el) => (
                <Texts
                  key={el.id}
                  element={el}
                  canvaElements={canvaElements}
                  setCanvaElements={setCanvaElements}
                  handleDragEnd={() => handleDragEnd(el)}
                  isSelected={el.id === selectedId}
                  onSelect={() => {
                    selectShape(el.id);
                  }}
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}

export default Canvas;
