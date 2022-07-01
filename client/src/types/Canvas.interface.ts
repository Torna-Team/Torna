import { Dispatch, SetStateAction } from 'react';
import { Interface } from 'readline';

export interface CanvaElement {
  type: string;
  id: string;
  x: number;
  y: number;
  color?: string;
  stroke?: string;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
  imageSrc?: string;
  text?: string;
  font?: string;
  src?: HTMLImageElement;
}

export interface ToggleTool {
  backgroundTool: boolean;
  textTool: boolean;
  animatedTextTool: boolean;
  colorTool: boolean;
  gifTool: boolean;
}

export interface SplitTextFromGenericShapesReducer {
  genericItems: CanvaElement[];
  textItems: CanvaElement[];
}

export interface Album {
  authorId: number;
  background: string;
  frontPage: string;
  id: number;
  template: string;
  title: string;
}

export interface UploadImageProps {
  setNewImage: Dispatch<SetStateAction<string | null>>;
}

// export interface ShapeProps {
//   element: CanvaElement;
//   canvaElements: CanvaElement[];
//   setCanvaElements: Dispatch<SetStateAction<CanvaElement>>;
//   handleDragEnd: () => number;
//   isSelected: boolean;
//   onSelect: () => void;
// }

export interface ShapeProps {
  key: string;
  element: CanvaElement;
  canvaElements: CanvaElement[];
  setCanvaElements?: Dispatch<SetStateAction<CanvaElement[] | undefined>>;
  handleDragStart: () => void;
  handleDragEnd: () => number;
  isSelected: boolean;
  onSelect: () => void;
}
