import React, { useEffect, useState } from 'react';
import { BlockPicker, CompactPicker } from 'react-color';
import { Layer, Stage } from 'react-konva';
import FontPicker from 'font-picker-react';
import Draggable from 'react-draggable';
import checkCanvaElement from '../../Services/utils';
import Arrows from '../Shapes/Arrows';
import Circles from '../Shapes/Circles';
import Squares from '../Shapes/Squares';
import Stars from '../Shapes/Stars';
import Texts from '../Shapes/Texts';
import Images from '../Shapes/Images';
import AnimatedText from '../StickerSearch/StickerSearch';
import ImageUpload from '../ImageUpload/ImageUpload';
import Gifs from '../Shapes/Gifs';
import './Canvas.css';
import { Link } from 'react-router-dom';
import tornaLogo from '../../Images/tornalogoyellow.png';
import {
  FiStar,
  FiCircle,
  FiSquare,
  FiArrowUpRight,
  FiTrash2,
} from 'react-icons/fi';
import { IoMdColorFill } from 'react-icons/io';
import { RiText } from 'react-icons/ri';
import { AiOutlineLine } from 'react-icons/ai';
import { TbSticker } from 'react-icons/tb';
import { MdGif, MdOutlineColorLens } from 'react-icons/md';
import { uuidv4 } from '@firebase/util';
import { useParams } from 'react-router-dom';
import { saveAlbum, getAlbum } from '../../Services/Server-Client';
import GifSearcher from '../GifSearcher/GifSearcher';
import {
  CanvaElement,
  SplitTextFromGenericShapesReducer,
  ToggleTool,
  AlbumInterface,
} from '../../Types/Canvas.interface';
import { KonvaEventObject } from 'konva/lib/Node';
import Lines from '../Shapes/Lines';
import Grid from '../Shapes/Grid';

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
  | typeof Lines
  | typeof Texts;

const shapeType = {
  star: Stars,
  arrow: Arrows,
  circle: Circles,
  square: Squares,
  image: Images,
  text: Texts,
  gif: Gifs,
  line: Lines,
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
  const [width, setWidth] = useState<number>(
    window.innerWidth - window.innerWidth * 0.05
  );
  const [selectedId, selectShape] = useState<number | null>(null);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [font, setFont] = useState<string>('Ubuntu');
  const [render, setRender] = useState<boolean>(true);
  const [toolOption, setToolOption] = useState<ToggleTool>(toggleTool);
  const [newGif, setNewGif] = useState<string | null>(null);
  const [grid, setGrid] = useState<boolean>(true);

  const fontAPI = process.env.REACT_APP_GOOGLEAPI as string;

  useEffect(() => {
    getAlbumInfo();
    if (!height) setHeight(600);
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth - window.innerWidth * 0.05);
  }, [window.innerWidth]);

  async function getAlbumInfo() {
    const album = await getAlbum(Number(albumId));
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
        canvaElements as CanvaElement[],
        newImage
      );
      setCanvaElements((prev) => {
        if (prev) return [...prev, newCanvaElement] as CanvaElement[];
        else return [newCanvaElement] as CanvaElement[];
      });
      setNewImage(null);
    }
    if (newGif !== null) {
      const elementId = uuidv4();
      const newCanvaElement = checkCanvaElement(
        'gif',
        elementId,
        color,
        stroke,
        canvaElements as CanvaElement[],
        newGif
      );
      setCanvaElements((prev) => {
        if (prev) return [...prev, newCanvaElement] as CanvaElement[];
        else return [newCanvaElement] as CanvaElement[];
      });
      setNewGif(null);
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
        canvaElements as CanvaElement[],
        type
      ) as CanvaElement;
    } else if (type.includes('http://res.cloudinary.com')) {
      newCanvaElement = checkCanvaElement(
        'image',
        elementId,
        color,
        stroke,
        canvaElements as CanvaElement[],
        type
      ) as CanvaElement;
    } else {
      newCanvaElement = checkCanvaElement(
        type,
        elementId,
        color,
        stroke,
        canvaElements as CanvaElement[]
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

    const newHeight = Math.floor(maxHeightPoint) + 900;
    setHeight(newHeight);
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
      frontPage: frontImage,
      id: albumId,
      authorId: album?.authorId as number,
      height: newHeight as number,
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
    let clickedOnGrid;
    if (grid) clickedOnGrid = e.target.getLayer().index === 0;
    if (clickedOnEmpty || clickedOnGrid) {
      selectShape(null);
    }
  };
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
      y:
        canvaElements && canvaElements.length > 0
          ? canvaElements[canvaElements.length - 1].y + 100
          : window.innerHeight / 2,
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

              {/* STAR */}
              <button
                className='drawButtons'
                value='star'
                onClick={handleClick}
              >
                <FiStar />
              </button>

              {/* CIRCLE */}
              <button
                className='drawButtons'
                value='circle'
                onClick={handleClick}
              >
                <FiCircle />
              </button>

              {/* SQUARE */}
              <button
                className='drawButtons'
                value='square'
                onClick={handleClick}
              >
                <FiSquare />
              </button>

              {/* LINE */}
              <button
                className='drawButtons'
                value='line'
                onClick={handleClick}
              >
                <AiOutlineLine />
              </button>

              {/* ARROW */}
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
                <TbSticker />
              </button>

              {/* GIF */}
              <button
                className='drawButtons'
                onClick={handleToggle}
                value='gifTool'
              >
                <MdGif />
              </button>

              {/* COLORS */}
              <button
                className='drawButtons'
                onClick={handleToggle}
                value='colorTool'
              >
                <MdOutlineColorLens />
              </button>

              {/* DELETE  */}
              <button className='drawButtons' onClick={handleDelete}>
                <FiTrash2 />
              </button>
            </div>

            <div className='logicContainer'>
              {toggleTool.backgroundTool && (
                <div className='toolContainer'>
                  <label className='toolLabel'>Background</label>
                  <CompactPicker
                    className='huePicker'
                    color={backgroundColor}
                    onChange={(updatedColor) => {
                      const res = updatedColor.rgb;
                      const string = `rgba(${res.r}, ${res.g}, ${res.b}, ${res.a})`;
                      return setBackGroundColor(string);
                    }}
                  ></CompactPicker>
                  <div className='check'>
                    <label>GRID</label>
                    <input
                      type='checkbox'
                      onClick={() => setGrid(!grid)}
                      defaultChecked={grid}
                    />
                  </div>
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
                  <div className='check'>
                    <label>STROKE</label>
                    <input
                      type='checkbox'
                      defaultChecked={strokedText}
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
                <AnimatedText setNewGif={setNewGif} setRender={setRender} />
              )}

              {toggleTool.colorTool && (
                <div className='toolContainer'>
                  <div className='fillAndStroke'>
                    <label>Fill</label>
                    <BlockPicker
                      color={color}
                      colors={[
                        'transparent',
                        '#fffafa',
                        '#ed2939',
                        '#ff8a65',
                        '#ffdb58',
                        '#37D67A',
                        '#2CCCE4',
                        '#ffa6c9',
                        '#ba68c8',
                        '#1b1b1b',
                      ]}
                      onChange={(updatedColor) => {
                        const res = updatedColor.rgb;
                        const string = `rgba(${res.r}, ${res.g}, ${res.b}, ${res.a})`;
                        setTextColor(string);
                        return setColor(string);
                      }}
                    ></BlockPicker>
                    <label>Stroke</label>
                    <BlockPicker
                      color={stroke}
                      colors={[
                        'transparent',
                        '#fffafa',
                        '#ed2939',
                        '#ff8a65',
                        '#ffdb58',
                        '#37D67A',
                        '#2CCCE4',
                        '#ffa6c9',
                        '#ba68c8',
                        '#1b1b1b',
                      ]}
                      onChange={(updatedColor) => {
                        const res = updatedColor.rgb;
                        const string = `rgba(${res.r}, ${res.g}, ${res.b}, ${res.a})`;
                        return setStroke(string);
                      }}
                    ></BlockPicker>
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
            <Layer>{grid && <Grid></Grid>}</Layer>

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
