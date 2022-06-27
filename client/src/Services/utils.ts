const checkCanvaElement = (
  type: string,
  canvaElementsLength: number,
  color: string,
  stroke: string,
  imageSrc?: string
) => {
  switch (type) {
    case 'star':
      const star = {
        type: 'star',
        id: canvaElementsLength,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: color,
        stroke: stroke,
      };
      return star;
    case 'circle':
      const circle = {
        type: 'circle',
        id: canvaElementsLength,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: color,
      };
      return circle;
    case 'square':
      const square = {
        type: 'square',
        id: canvaElementsLength,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: color,
      };
      return square;
    case 'arrow':
      const arrow = {
        type: 'arrow',
        id: canvaElementsLength,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: color,
      };
      return arrow;
    case 'image':
      const newImage = new window.Image();
      newImage.src = imageSrc as string;

      const image = {
        type: 'image',
        id: canvaElementsLength,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        src: newImage,
        scaleX: 0.1,
        scaleY: 0.1,
      };
      return image;
    default:
      return {};
  }
};

export default checkCanvaElement;
