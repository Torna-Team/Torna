const checkCanvaElement = (type: string, canvaElementsLength: number) => {
  switch (type) {
    case 'star':
      const star = {
        type: 'star',
        id: canvaElementsLength,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        rotation: 0,
      };
      return star;
    case 'circle':
      const circle = {
        type: 'circle',
        id: canvaElementsLength,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      return circle;
    case 'square':
      const square = {
        type: 'square',
        id: canvaElementsLength,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      return square;

    default:
      return {};
  }
};

export default checkCanvaElement;
