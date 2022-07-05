import React from 'react';
import { BlockPicker, CompactPicker } from 'react-color';
import FontPicker from 'font-picker-react';
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
import GifSearcher from '../../Components/GifSearcher/GifSearcher';
import { CanvaImports } from '../../Pages/Canvas/CanvaImports';
import Draggable from 'react-draggable';
import './ToolsBar.css';
import { ToolsBarProps } from '../../Types/ToolsBar.interface';


const fontAPI = process.env.REACT_APP_GOOGLEAPI as string;

function ToolsBar({
  handleToggle,
  handleClick,
  handleDelete,
  handleSubmit,
  toggleTool,
  backgroundColor,
  setBackGroundColor,
  grid,
  setGrid,
  strokedText,
  setStrokedText,
  font,
  setFont,
  color,
  setColor,
  setNewGif,
  setTextColor,
  stroke,
  setStroke,
  setRender,
}: ToolsBarProps) {
  return (
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
          <button className='drawButtons' value='star' onClick={handleClick}>
            <FiStar />
          </button>

          {/* CIRCLE */}
          <button className='drawButtons' value='circle' onClick={handleClick}>
            <FiCircle />
          </button>

          {/* SQUARE */}
          <button className='drawButtons' value='square' onClick={handleClick}>
            <FiSquare />
          </button>

          {/* LINE */}
          <button className='drawButtons' value='line' onClick={handleClick}>
            <AiOutlineLine />
          </button>

          {/* ARROW */}
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
              <label>Text Editor</label>
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
            <CanvaImports.AnimatedText
              setNewGif={setNewGif}
              setRender={setRender}
            />
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
  );
}

export default ToolsBar;
