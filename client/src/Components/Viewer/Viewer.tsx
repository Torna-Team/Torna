//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import checkCanvaElement from '../../Services/utils';
import Arrows from '../Arrows';
import Circles from '../Circles';
import Squares from '../Squares';
import Stars from '../Stars';
import Texts from '../Texts';
import Images from '../Images';
import Gifs from '../Gifs';
import tornaLogo from '../../images/tornalogo.png';
import { useParams } from 'react-router-dom';
import { saveAlbum, getAlbum } from '../../Services/Server-Client';
import { AlbumInterface } from '../../types/Canvas.interface';
import { CanvaElement } from '../../types/Canvas.interface';
import './Viewer.css';
import { BsPlayFill, BsFillPauseFill } from 'react-icons/bs';

// import splitTextFromGenericShapes from '../Canvas/Canvas';
// import AnimatedText from '../AnimatedText/AnimatedText';
// import shapeType from '../Canvas/Canvas';
// import getAlbumInfo from '../Canvas/Canvas';

type Props = {};

const shapeType = {
  star: Stars,
  arrow: Arrows,
  circle: Circles,
  square: Squares,
  image: Images,
  text: Texts,
  gif: Gifs,
};

export function splitTextFromGenericShapes(shapeList) {
  return shapeList.reduce(
    (res, el) => {
      if (el.type === 'text') res.textItems.push(el);
      else res.genericItems.push(el);
      return res;
    },
    { genericItems: [], textItems: [] }
  );
}

const Viewer = (props: Props) => {
  const albumId = useParams().id;
  const height = 1200;
  const [width, setWidth] = useState(window.innerWidth - 60);
  const [canvaElements, setCanvaElements] = useState<CanvaElement[]>([]);
  const [album, setAlbum] = useState<AlbumInterface | null>({});
  const [backgroundColor, setBackGroundColor] = useState<string>(
    'rgba(255, 255, 255)'
  );
  const [play, setPlay] = useState<boolean>(true);
  const [delayID, setDelayID] = useState(null);
  const { genericItems, textItems } = splitTextFromGenericShapes(canvaElements);
  let scrollDelay;

  async function getAlbumInfo() {
    const album = await getAlbum(albumId);
    album?.background && setBackGroundColor(album.background);
    album?.template && setCanvaElements([...JSON.parse(album.template)]);
    album && setAlbum(album);
  }
  function handlePlay() {
    setPlay(!play);
    pageScroll();
  }

  function pageScroll() {
    if (play) {
      window.scrollBy(0, 2);
      scrollDelay = setTimeout(pageScroll, 20);
      setDelayID(scrollDelay);
    }
    window.onScroll = function () {
      // @var int totalPageHeight
      var totalPageHeight = document.body.scrollHeight;
      // @var int scrollPoint
      var scrollPoint = window.scrollY + window.innerHeight;
      // check if we hit the bottom of the page
      if (scrollPoint >= totalPageHeight) {
        console.log('at the bottom');
      }
    };
  }

  function handlePause() {
    setPlay(false);
    clearTimeout(delayID);
    setPlay(true);
  }

  useEffect(() => {
    getAlbumInfo();
  }, []);
  return (
    <div className='mainViewerContainer'>
      <div className='viewerNavbar'>
        <img src={tornaLogo} alt='Torna Logo' className='viewerLogo' />

        <h1>{album.title}</h1>
        <div>
          {play ? (
            <button onClick={handlePlay}>
              <BsPlayFill />
              PLAY
            </button>
          ) : (
            <button onClick={handlePause}>
              <BsFillPauseFill />
              PAUSE
            </button>
          )}
        </div>
      </div>
      <div className='canvasViewer' style={{ background: backgroundColor }}>
        <Stage width={width} height={album?.height}>
          <Layer>
            {genericItems?.map((el: CanvaElement) => {
              const Shape = shapeType[el?.type];
              if (!el || !Shape) return null;
              return (
                <Shape
                  key={el.id}
                  render={true}
                  element={el}
                  canvaElements={canvaElements}
                  setCanvaElements={setCanvaElements}
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
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Viewer;
