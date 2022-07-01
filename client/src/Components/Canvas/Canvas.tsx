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
import AnimatedText from '../AnimatedText/AnimatedText';
import ImageUpload from '../ImageUpload/ImageUpload';
import Gifs from '../Gifs';
import './Canvas.css';
import tornaLogo from '../../images/tornalogo.png';
import {
  FiStar,
  FiCircle,
  FiSquare,
  FiArrowUpRight,
  FiTrash2,
} from 'react-icons/fi';
import { IoMdColorFill } from 'react-icons/io';
import { RiText } from 'react-icons/ri';
import { MdOutlineColorLens, MdGif } from 'react-icons/md';
import { TbTextResize } from 'react-icons/tb';
import { uuidv4 } from '@firebase/util';
import { useParams } from 'react-router-dom';
import { saveAlbum, getAlbum } from '../../Services/Server-Client';
import { text } from 'stream/consumers';

function splitTextFromGenericShapes(shapeList) {
  console.log(shapeList);
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

// type toggleTool = {
//   backgroundTool: boolean,
//   textTool: boolean,
//   animatedTextTool: boolean,
//   colorTool: boolean,
//   gifTool: boolean,
// }

const shapeType = {
  star: Stars,
  arrow: Arrows,
  circle: Circles,
  square: Squares,
  image: Images,
  text: Texts,
  gif: Gifs,
};

const toggleTool = {
  backgroundTool: false,
  textTool: false,
  animatedTextTool: false,
  colorTool: false,
  gifTool: false,
};

function Canvas() {
  const albumId = useParams().id;
  const [album, setAlbum] = useState<any>();
  const [canvaElements, setCanvaElements] = useState<any[]>([]);
  const [backgroundColor, setBackGroundColor] = useState<string>(
    'rgba(255, 255, 255)'
  );
  const [color, setColor] = useState<string>('rgba(241, 241, 246)');
  const [textColor, setTextColor] = useState<string>('rgba(0, 0, 0, 1)');
  const [stroke, setStroke] = useState<string>('rgba(0, 0, 0, 1)');
  const [strokedText, setStrokedText] = useState<boolean>(false);
  const [height, setHeight] = useState(1200);
  const [width, setWidth] = useState(window.innerWidth - 60);
  const [selectedId, selectShape] = useState<any>(null);
  const [newImage, setNewImage] = useState<any>(null);
  const [font, setFont] = useState<string>('Ubuntu');
  const [newGif, setNewGif] = useState<any>(null);
  const [toolOption, setToolOption] = useState<toggleTool>(toggleTool);

  const fontAPI = process.env.REACT_APP_GOOGLEAPI as string;

  useEffect(() => {
    getAlbumInfo();
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth - 60);
  }, [window.innerWidth]);

  async function getAlbumInfo() {
    const album = await getAlbum(albumId);
    //if template
    album?.background && setBackGroundColor(album.background);
    album?.template && setCanvaElements([...JSON.parse(album.template)]);
    album && setAlbum(album);
  }

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

  async function getAlbumInfo() {
    const album = await getAlbum(albumId);
    //if template
    if (album) {
      const template = JSON.parse(album.template);
      console.log(template);
    }
    album?.template && setCanvaElements([...JSON.parse(album.template)]);
    album && setAlbum(album);
  }

  function handleClick(e: any) {
    e.preventDefault();
    const type = e.target.value;
    const elementId = uuidv4();
    let newCanvaElement!: any;

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

  const editAlbum = async (e) => {
    e.preventDefault();
    const title = e.target.albumTitle.value;
    let frontImage;
    for (let i = 0; i < canvaElements.length; i++) {
      if (canvaElements[i].type === 'image') {
        frontImage = canvaElements[i].imageSrc;
        break;
      }
    }

    const savedAlbum = {
      title: title,
      background: backgroundColor,
      template: JSON.stringify(canvaElements),
      frontPage: frontImage ? frontImage : tornaLogo,
      id: albumId,
    };
    saveAlbum(savedAlbum);
  };

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

  const handleDragStart = () => {};
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

  function handleToggle(e: any) {
    e.preventDefault();
    for (let key in toggleTool) {
      if (key === e.target.value) {
        toggleTool[key] = !toggleTool[key];
      } else {
        toggleTool[key] = false;
      }
    }
    setToolOption({ ...toggleTool });
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
  if (canvaElements) {
  }
  const { genericItems, textItems } = splitTextFromGenericShapes(canvaElements);

  return (
    <div className='mainContainer'>
      {/* NAVBAR */}
      <div className='navbar'>
        <img className='navbarLogo' src={tornaLogo} alt='Torna logo' />
        <div className='navbarImgs'>
          <ImageUpload setNewImage={setNewImage}></ImageUpload>
        </div>
        <form className='navbarForm' onSubmit={editAlbum}>
          <input
            className='navbarInput'
            type='text'
            defaultValue={album?.title}
            name='albumTitle'
            placeholder='Type your title...'
          ></input>
          <button className='buttonSave' type='submit'>
            SAVE ALBUM
          </button>
        </form>
      </div>

      <div className='canvasEditor' style={{ background: backgroundColor }}>
        <div className='sidebarContainer'>
          <div className='toolsContainer'>
            {/* BACKGROUND */}
            <button
              className='drawButtons'
              onClick={handleToggle}
              value='backgroundTool'
            >
              <IoMdColorFill />
            </button>

            <button className='drawButtons' value='star' onClick={handleClick}>
              <FiStar />
            </button>
            <button
              className='drawButtons'
              value='circle'
              onClick={handleClick}
            >
              <FiCircle />
            </button>
            <button
              className='drawButtons'
              value='square'
              onClick={handleClick}
            >
              <FiSquare />
            </button>
            <button className='drawButtons' value='arrow' onClick={handleClick}>
              <FiArrowUpRight />
            </button>

            {/* TEXT */}
            <button
              className='drawButtons'
              onClick={handleToggle}
              value='textTool'
            >
              <RiText />
            </button>

            {/* ANIMATED TEXT */}
            <button
              className='drawButtons'
              onClick={handleToggle}
              value='animatedTextTool'
            >
              <TbTextResize />
            </button>

            <button
              className='drawButtons'
              onClick={handleToggle}
              value='colorTool'
            >
              <MdOutlineColorLens />
            </button>

            {/* GIF */}
            {/* <button
              className='drawButtons'
              onClick={handleToggle}
              value='gifTool'
            >
              <MdGif />
            </button> */}

            {/* DELETE  */}
            <button className='drawButtons' onClick={handleDelete}>
              <FiTrash2 />
            </button>
          </div>

          <div className='logicContainer'>
            {toggleTool.backgroundTool && (
              <div className='toolContainer'>
                <label className='toolLabel'>Background color</label>
                <CompactPicker
                  className='huePicker'
                  color={backgroundColor}
                  onChange={(updatedColor) => {
                    const res = updatedColor.rgb;
                    const string = `rgba(${res.r}, ${res.g}, ${res.b}, ${res.a})`;
                    return setBackGroundColor(string);
                  }}
                ></CompactPicker>
              </div>
            )}

            {toggleTool.textTool && (
              <div className='toolContainer'>
                <label className='toolLabel'>Text Editor</label>
                <form className='formFont' onSubmit={handleSubmit}>
                  <input
                    className='addTextFont'
                    type='text'
                    id='text'
                    name='textInput'
                    placeholder='Type here'
                  />
                  <button classname='buttonFont' type='submit'>
                    ADD
                  </button>
                </form>
                <div className='fontStroke'>
                  <label>STROKE</label>
                  <input
                    type='checkbox'
                    onClick={() => {
                      setStrokedText(!strokedText);
                    }}
                  />
                </div>
                <FontPicker
                  apiKey={fontAPI as string}
                  activeFontFamily={font}
                  onChange={(nextFont) => setFont(nextFont.family)}
                />
              </div>
            )}

            {toggleTool.animatedTextTool && <AnimatedText />}
          </div>
          {toggleTool.colorTool && (
            <div className='toolContainer'>
              <div className='colorPickers'>
                <div className='fillAndStroke'>
                  <label>Fill</label>
                  <ChromePicker
                    color={color}
                    onChange={(updatedColor) => {
                      const res = updatedColor.rgb;
                      const string = `rgba(${res.r}, ${res.g}, ${res.b}, ${res.a})`;
                      setTextColor(string);
                      return setColor(string);
                    }}
                  ></ChromePicker>
                </div>
                <div className='fillAndStroke'>
                  <label>Stroke</label>
                  <ChromePicker
                    color={stroke}
                    onChange={(updatedColor) => {
                      const res = updatedColor.rgb;
                      const string = `rgba(${res.r}, ${res.g}, ${res.b}, ${res.a})`;
                      return setStroke(string);
                    }}
                  ></ChromePicker>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* style={{ background: backgroundColor }} */}
        <div>
          <Stage
            width={width}
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
                    handleDragStart={handleDragStart}
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
                  handleDragStart={handleDragStart}
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
