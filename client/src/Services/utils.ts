const checkCanvaElement = (
	type: string,
	elementId: string,
	color: string,
	stroke: string,
	imageSrc?: string
) => {
	switch (type) {
		case 'star':
			const star = {
				type: 'star',
				id: elementId,
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
				color: color,
				stroke: stroke,
			};
			return star;
		case 'circle':
			const circle = {
				type: 'circle',
				id: elementId,
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
				color: color,
				stroke: stroke,
			};
			return circle;
		case 'square':
			const square = {
				type: 'square',
				id: elementId,
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
				color: color,
				stroke: stroke,
			};
			return square;
		case 'arrow':
			const arrow = {
				type: 'arrow',
				id: elementId,
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
				color: color,
			};
			return arrow;
		case 'image':
			const image = {
				type: 'image',
				id: elementId,
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
				scaleX: 0.1,
				scaleY: 0.1,
				imageSrc,
			};
			return image;
		case 'gif':
			const newGif = new window.Image();
			newGif.src = imageSrc as string;

			const gif = {
				type: 'gif',
				id: elementId,
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
				src: newGif,
				scaleX: 0.5,
				scaleY: 0.5,
			};
			return gif;
		default:
			return {};
	}
};

export default checkCanvaElement;
