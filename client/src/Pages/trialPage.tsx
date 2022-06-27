import React from 'react';
import { useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import Rectangle from '../components/TransformedRectangle';
import GIF from '../components/GIF';
import { Video } from '../components/Video';
import 'gifler';

const elements = [
  {
    fill: 'green',
    x: 100,
    y: 100,
    id: '1a',
    type: 'Circle',
    width: 100,
    height: 100,
    numPoints: 4,
    innerRadius: 10,
    outerRadius: 20,
    points: [0, 0, 100, 0, 50, 100],
    closed: true,
    pointerLength: 6,
    pointerWidth: 2,
    stroke: 'green',
  },
  {
    fill: 'blue',
    x: 100,
    y: 100,
    id: '2b',
    type: 'Rect',
    width: 100,
    height: 100,
    numPoints: 5,
    innerRadius: 10,
    outerRadius: 20,
    points: [50, 150, 150, 50],
    pointerLength: 2,
    pointerWidth: 8,
    stroke: 'blue',
  },
  {
    fill: 'red',
    x: 100,
    y: 100,
    id: '3c',
    type: 'Rect',
    width: 50,
    height: 50,
    numPoints: 6,
    innerRadius: 10,
    outerRadius: 20,
    pointerLength: 9,
    pointerWidth: 4,
    stroke: 'red',
  },
];

// type item = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   fill: string;
//   id: string;
// };

function App() {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(300);
  // const [text, setText] = useState('');
  const [rectangles, setRectangles] = React.useState(elements);
  const [selectedId, selectShape] = React.useState<any>(null);

  const handleWheel = (evt: any) => {
    // evt.preventDefault();
    console.log(evt.evt.deltaY);
    if (evt.evt.deltaY > 0) {
      setHeight(height * 1.05);
    }
    if (evt.evt.deltaY < 0) {
      setHeight(height / 1.05);
    }
    // setHeigth(evt.deltaY * 1.5);
  };

  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <div className='App'>
      <div className='container'>
        <Stage
          width={width}
          height={height}
          onWheel={handleWheel}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            <GIF
              src={
                'https://media2.giphy.com/media/v2zAv6LiWFxvBbtE86/giphy.gif?cid=3a3f5487hiro0qxvli8qg86bcck8f69o91cdncs0yvjf9xks&rid=giphy.gif&ct=s'
              }
              draggable
            ></GIF>
            <Video
              src={
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
              }
            ></Video>
            {elements.map((item, i) => {
              return (
                <Rectangle
                  key={i}
                  shapeProps={item}
                  isSelected={item.id === selectedId}
                  onSelect={() => {
                    selectShape(item.id);
                  }}
                  onChange={(newAttrs: any) => {
                    const items = elements.slice();
                    items[i] = newAttrs;
                    setRectangles(items);
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default App;
