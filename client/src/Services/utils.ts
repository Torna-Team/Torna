const checkCanvaElement = (
  type: string,
  canvaElementsLength: number,
  color: string
) => {
  switch (type) {
    case 'star':
      const star = {
        type: 'star',
        id: canvaElementsLength,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: color,
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
    default:
      return {};
  }
};

export default checkCanvaElement;
