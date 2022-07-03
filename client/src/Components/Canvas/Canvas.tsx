import React, { useEffect, useState } from 'react';
import { ChromePicker, CompactPicker } from 'react-color';
import { Layer, Stage } from 'react-konva';
import FontPicker from 'font-picker-react';
import Draggable from 'react-draggable';
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
import { Link } from 'react-router-dom';
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
import { MdGif, MdOutlineColorLens } from 'react-icons/md';
import { TbTextResize } from 'react-icons/tb';
import { uuidv4 } from '@firebase/util';
import { useParams } from 'react-router-dom';
import { saveAlbum, getAlbum } from '../../Services/Server-Client';
import GifSearcher from '../GifSearcher/GifSearcher';
import {
  CanvaElement,
  SplitTextFromGenericShapesReducer,
  ToggleTool,
  AlbumInterface,
} from '../../types/Canvas.interface';
import { KonvaEventObject } from 'konva/lib/Node';

function splitTextFromGenericShapes(shapeList: CanvaElement[]) {
  return shapeList.reduce(
    (res: SplitTextFromGenericShapesReducer, el: CanvaElement) => {
      if (el.type === 'text') res.textItems.push(el as CanvaElement);
      else res.genericItems.push(el);
      return res;
    },
    { genericItems: [], textItems: [] }
  );
}

type ShapeType =
  | typeof Stars
  | typeof Arrows
  | typeof Circles
  | typeof Squares
  | typeof Images
  | typeof Texts;

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
  const albumId: string | undefined = useParams().id;
  const [album, setAlbum] = useState<AlbumInterface>();
  const [canvaElements, setCanvaElements] = useState<
    CanvaElement[] | undefined
  >([]);
  const [backgroundColor, setBackGroundColor] = useState<string>(
    'rgba(255, 255, 255)'
  );
  const [color, setColor] = useState<string>('rgba(241, 241, 246)');
  const [textColor, setTextColor] = useState<string>('rgba(0, 0, 0, 1)');
  const [stroke, setStroke] = useState<string>('rgba(0, 0, 0, 1)');
  const [strokedText, setStrokedText] = useState<boolean>(false);
  const [height, setHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number>(window.innerWidth - 60);
  const [selectedId, selectShape] = useState<number | null>(null);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [font, setFont] = useState<string>('Ubuntu');
  const [render, setRender] = useState<boolean>(true);
  const [toolOption, setToolOption] = useState<ToggleTool>(toggleTool);

  const [newGif, setNewGif] = useState<string | null>(null);

  const fontAPI = process.env.REACT_APP_GOOGLEAPI as string;

  useEffect(() => {
    getAlbumInfo();
    if (!height) setHeight(600);
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth - 60);
  }, [window.innerWidth]);

  async function getAlbumInfo() {
    const album = await getAlbum(Number(albumId));
    console.log(album);
    album?.template && setCanvaElements([...JSON.parse(album.template)]);
    album?.background && setBackGroundColor(album.background);
    album?.height && setHeight(album.height);
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
      setCanvaElements((prev) => {
        if (prev) return [...prev, newCanvaElement] as CanvaElement[];
        else return [newCanvaElement] as CanvaElement[];
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
      setCanvaElements((prev) => {
        if (prev) return [...prev, newCanvaElement] as CanvaElement[];
        else return [newCanvaElement] as CanvaElement[];
      });
    }
  }, [newImage, newGif, render]);

  function handleClick(
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    const type = (e.target as HTMLInputElement).value;
    const elementId = uuidv4();
    let newCanvaElement!: CanvaElement;
    if (type.includes('.gif')) {
      newCanvaElement = checkCanvaElement(
        'gif',
        elementId,
        color,
        stroke,
        type
      ) as CanvaElement;
    } else if (type.includes('http://res.cloudinary.com')) {
      newCanvaElement = checkCanvaElement(
        'image',
        elementId,
        color,
        stroke,
        type
      ) as CanvaElement;
    } else {
      newCanvaElement = checkCanvaElement(
        type,
        elementId,
        color,
        stroke
      ) as CanvaElement;
    }
    setCanvaElements((prev) => {
      if (prev) return [...prev, newCanvaElement];
      else return [newCanvaElement];
    });
  }

  const editAlbum = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let maxHeightPoint = 0;
    for (const element of canvaElements as CanvaElement[]) {
      if (element.y > maxHeightPoint) {
        maxHeightPoint = element.y;
      }
    }
    setHeight(Math.floor(maxHeightPoint + 1400));

    //save inside object and inside BE

    const title = e.target.albumTitle.value as string;
    let frontImage;
    if (canvaElements)
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
      authorId: album?.authorId as number,
      height: maxHeightPoint + 1400,
    };
    saveAlbum(savedAlbum as unknown as AlbumInterface);
  };

  const handleWheel = (e: KonvaEventObject<WheelEvent | TouchEvent>) => {
    if (height) {
      if ((e.evt as WheelEvent).deltaY > 0) {
        setHeight(height * 1.05);
      }
      if ((e.evt as WheelEvent).deltaY < 0) {
        if (height >= 1200) {
          setHeight(height / 1.05);
        }
      }
    }
  };

  const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleDragStart = () => {};
  const handleDragEnd = (el: CanvaElement) => {
    let indx!: number;
    if (canvaElements)
      for (let i = 0; i < canvaElements.length; i++) {
        if (canvaElements[i].id === el.id) {
          indx = i;
          break;
        }
      }

    setCanvaElements((prev) => {
      if (prev) {
        const arr1 = prev.slice(0, indx);
        const arr2 = prev.slice(indx + 1, prev.length);
        const result = [...arr1, ...arr2, el];
        return result;
      } else return [el];
    });
    return indx;
  };

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
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

    setCanvaElements((prev) => {
      if (prev) return [...prev, newText] as CanvaElement[];
      else return [newText] as CanvaElement[];
    });
    e.target.reset();
  }

  function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    for (let key in toggleTool) {
      if (key === (e.target as HTMLInputElement).value) {
        toggleTool[key as keyof ToggleTool] =
          !toggleTool[key as keyof ToggleTool];
      } else {
        toggleTool[key as keyof ToggleTool] = false;
      }
    }
    setToolOption({ ...toggleTool });
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (canvaElements && selectedId !== null) {
      const arr = canvaElements.filter((el: CanvaElement) => {
        return el.id !== (selectedId as number | string);
      });
      setCanvaElements([...arr]);
    }
  }
  if (canvaElements) {
  }

  const { genericItems, textItems } = splitTextFromGenericShapes(
    canvaElements as CanvaElement[]
  );

  return (
    <div className='mainContainer'>
      {/* NAVBAR */}
      <div className='navbar'>
        <Link to={`/profile/${album?.authorId}`}>
          <img className='navbarLogo' src={tornaLogo} alt='Torna logo' />
        </Link>
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
        <Draggable>
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

              <button
                className='drawButtons'
                value='star'
                onClick={handleClick}
              >
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
              <button
                className='drawButtons'
                value='arrow'
                onClick={handleClick}
              >
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
              <button
                className='drawButtons'
                onClick={handleToggle}
                value='gifTool'
              >
                <MdGif />
              </button>
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
                    <button className='buttonFont' type='submit'>
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
              {toggleTool.animatedTextTool && (
                <AnimatedText setNewGif={setNewGif} />
              )}
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
              {toggleTool.gifTool && (
                <GifSearcher setNewGif={setNewGif} setRender={setRender} />
              )}
            </div>
          </div>
        </Draggable>
        <div className='canvaContainer'>
          <Stage
            width={width}
            height={height as number}
            onWheel={handleWheel}
            onTouchMove={handleWheel}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
          >
            <Layer>
              {genericItems?.map((el: CanvaElement) => {
                const Shape = shapeType[
                  el?.type as keyof ShapeType
                ] as ShapeType;
                if (!el || !Shape) return null;
                return (
                  <Shape
                    render={render}
                    setRender={setRender}
                    key={el.id}
                    element={el}
                    canvaElements={canvaElements as CanvaElement[]}
                    setCanvaElements={setCanvaElements}
                    handleDragStart={handleDragStart}
                    handleDragEnd={() => handleDragEnd(el)}
                    isSelected={el.id === (selectedId as number | string)}
                    onSelect={() => {
                      setRender(false);
                      selectShape(el.id as unknown as number);
                    }}
                  />
                );
              })}
            </Layer>
            <Layer>
              {textItems?.map((el: CanvaElement) => (
                <Texts
                  key={el.id}
                  element={el}
                  canvaElements={canvaElements as CanvaElement[]}
                  setCanvaElements={setCanvaElements}
                  handleDragStart={handleDragStart}
                  handleDragEnd={() => handleDragEnd(el)}
                  isSelected={el.id === (selectedId as number | string)}
                  onSelect={() => {
                    selectShape(el.id as unknown as number);
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
