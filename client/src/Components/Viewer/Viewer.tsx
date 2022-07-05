import { useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import Arrows from '../Shapes/Arrows';
import Circles from '../Shapes/Circles';
import Squares from '../Shapes/Squares';
import Stars from '../Shapes/Stars';
import Texts from '../Shapes/Texts';
import Images from '../Shapes/Images';
import Gifs from '../Shapes/Gifs';
import tornaLogo from '../../Images/tornalogoyellow.png';
import { useParams } from 'react-router-dom';
import { getAlbum } from '../../Services/Server-Client';
import { AlbumInterface, ViewerProps } from '../../Types/Canvas.interface';
import {
	CanvaElement,
	SplitTextFromGenericShapesReducer,
} from '../../Types/Canvas.interface';
import './Viewer.css';
import { BsPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GrLinkTop } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { ShapeType } from '../../Pages/Canvas/Canvas';

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

export function splitTextFromGenericShapes(shapeList: CanvaElement[]) {
	return shapeList.reduce(
		(res: SplitTextFromGenericShapesReducer, el: CanvaElement) => {
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
	const width = window.innerWidth - 60;
	const [canvaElements, setCanvaElements] = useState<CanvaElement[]>([]);
	const [album, setAlbum] = useState<AlbumInterface>();
	const [backgroundColor, setBackGroundColor] = useState<string>(
		'rgba(255, 255, 255)'
	);
	const [play, setPlay] = useState<boolean>(true);
	const [delayID, setDelayID] = useState<number | null>(null);
	const { genericItems, textItems } = splitTextFromGenericShapes(canvaElements);
	let scrollDelay;

	async function getAlbumInfo() {
		const album = await getAlbum(Number(albumId));
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
			scrollDelay = window.setTimeout(pageScroll, 20);
			setDelayID(scrollDelay);
		}
		// window.onScroll = function () {
		//   // @var int totalPageHeight
		//   var totalPageHeight = document.body.scrollHeight;
		//   // @var int scrollPoint
		//   var scrollPoint = window.scrollY + window.innerHeight;
		//   // check if we hit the bottom of the page
		//   if (scrollPoint >= totalPageHeight) {
		//   }
		// };
	}

	function handlePause() {
		setPlay(false);
		clearTimeout(delayID as unknown as number);
		setPlay(true);
	}

	function handleTop() {
		window.scrollTo(0, 0);
	}

	useEffect(() => {
		getAlbumInfo();
	}, []);
	return (
		<div className='mainViewerContainer'>
			<div className='viewerNavbar'>
				<Link to={`/profile/${album?.authorId}`}>
					<img src={tornaLogo} alt='Torna Logo' className='viewerLogo' />
				</Link>
				<h1>{album?.title}</h1>
				<div className='viewerNavBarButtons'>
					{play ? (
						<button onClick={handlePlay}>
							<div className='PlayButton'>
								<BsPlayFill />
								PLAY
							</div>
						</button>
					) : (
						<button onClick={handlePause}>
							<div className='PlayButton'>
								<BsFillPauseFill />
								PAUSE
							</div>
						</button>
					)}
					<button onClick={handleTop}>
						<GrLinkTop />
					</button>
				</div>
			</div>
			<div className='canvasViewer' style={{ background: backgroundColor }}>
				<Stage width={width} height={album?.height}>
					<Layer>
						{genericItems?.map((el: CanvaElement) => {
							const Shape = shapeType[el?.type as keyof ShapeType] as any;
							if (!el || !Shape) return null;
							return (
								<Shape
									key={el.id}
									render={true}
									element={el}
									canvaElements={canvaElements as CanvaElement[]}
									// setCanvaElements={setCanvaElements}
								/>
							);
						})}
					</Layer>
					<Layer>
						{textItems?.map((el: CanvaElement) => (
							<Texts
								key={el.id}
								element={el}
								handleDragEnd={() => 0}
								canvaElements={canvaElements as CanvaElement[]}
							/>
						))}
					</Layer>
				</Stage>
			</div>
		</div>
	);
};

export default Viewer;
