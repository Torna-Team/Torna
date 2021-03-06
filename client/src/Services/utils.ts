import { IGif } from '@giphy/js-types';
import { CanvaElement } from '../Types/Canvas.interface';

const checkCanvaElement = (
  type: string,
  elementId: string,
  color: string,
  stroke: string,
  canvaElements: CanvaElement[],
  imageSrc?: string | IGif
) => {
  switch (type) {
    case 'star':
      const star = {
        type: 'star',
        id: elementId,
        x: window.innerWidth / 2,
        y:
          canvaElements.length > 0
            ? canvaElements[canvaElements.length - 1].y + 100
            : window.innerHeight / 2,
        color: color,
        stroke: stroke,
      };

      return star as CanvaElement;
    case 'circle':
      const circle = {
        type: 'circle',
        id: elementId,
        x: window.innerWidth / 2,
        y:
          canvaElements.length > 0
            ? canvaElements[canvaElements.length - 1].y + 100
            : window.innerHeight / 2,
        color: color,
        stroke: stroke,
      };
      return circle as CanvaElement;
    case 'square':
      const square = {
        type: 'square',
        id: elementId,
        x: window.innerWidth / 2,
        y:
          canvaElements.length > 0
            ? canvaElements[canvaElements.length - 1].y + 100
            : window.innerHeight / 2,
        color: color,
        stroke: stroke,
      };
      return square as CanvaElement;
    case 'arrow':
      const arrow = {
        type: 'arrow',
        id: elementId,
        x: window.innerWidth / 2,
        y:
          canvaElements.length > 0
            ? canvaElements[canvaElements.length - 1].y + 100
            : window.innerHeight / 2,
        color: color,
      };
      return arrow as CanvaElement;
    case 'line':
      const line = {
        type: 'line',
        id: elementId,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: color,
      };
      return line as CanvaElement;
    case 'image':
      const image = {
        type: 'image',
        id: elementId,
        x: window.innerWidth / 2,
        y:
          canvaElements.length > 0
            ? canvaElements[canvaElements.length - 1].y + 100
            : window.innerHeight / 2,
        scaleX: 0.4,
        scaleY: 0.4,
        imageSrc,
      };
      return image as CanvaElement;
    case 'gif':
      const newGif = new window.Image();
      newGif.src = imageSrc as string;
      const gif = {
        type: 'gif',
        id: elementId,
        x: window.innerWidth / 2,
        y:
          canvaElements.length > 0
            ? canvaElements[canvaElements.length - 1].y + 100
            : window.innerHeight / 2,
        src: imageSrc,
        scaleX: 0.5,
        scaleY: 0.5,
      };
      return gif;
    default:
      return undefined;
  }
};

export default checkCanvaElement;
