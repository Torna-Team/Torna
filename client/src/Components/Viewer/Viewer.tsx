//@ts-nocheck
import { useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import Arrows from '../Arrows';
import Circles from '../Circles';
import Squares from '../Squares';
import Stars from '../Stars';
import Texts from '../Texts';
import Images from '../Images';
import Gifs from '../Gifs';
import tornaLogo from '../../Images/tornalogoyellow.png';
import { useParams } from 'react-router-dom';
import { getAlbum } from '../../Services/Server-Client';
import { AlbumInterface } from '../../Types/Canvas.interface';
import { CanvaElement } from '../../Types/Canvas.interface';
import './Viewer.css';

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
  // console.log(shapeList);
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
  const { genericItems, textItems } = splitTextFromGenericShapes(canvaElements);

  async function getAlbumInfo() {
    const album = await getAlbum(albumId);
    // console.log('album', album);
    album?.background && setBackGroundColor(album.background);
    album?.template && setCanvaElements([...JSON.parse(album.template)]);
    album && setAlbum(album);
  }
  function handlePlay() {
    setPlay(!play);
    if (play) {
      pageScroll();
    }
  }

  function pageScroll() {
    window.scrollBy(0, 5);
    scrolldelay = setTimeout(pageScroll, 50);
  }

  useEffect(() => {
    getAlbumInfo();
  }, []);
  console.log(canvaElements, 'canv.el');
  return (
    <div className='mainViewerContainer'>
      <div className='viewerNavbar'>
        <img src={tornaLogo} alt='Torna Logo' className='viewerLogo' />

        <h1>{album.title}</h1>
        <button onClick={handlePlay}> Play</button>
      </div>
      <div className='canvasViewer' style={{ background: backgroundColor }}>
        <Stage width={width} height={height}>
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
