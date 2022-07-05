import { IGif } from '@giphy/js-types';
import { Dispatch, SetStateAction } from 'react';

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
  newGif?: IGif | string;
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

export interface AlbumInterface {
  authorId: number;
  background: string;
  frontPage: string;
  id: number;
  template: string;
  title: string;
  height?: number;
}

export interface UploadImageProps {
  setNewImage: Dispatch<SetStateAction<string | null>>;
}

export interface GifSearcherProps {
  setNewGif: Dispatch<SetStateAction<string | null>>;
  setRender: Dispatch<SetStateAction<boolean>>;
}

export interface ShapeProps {
  key: string;
  element: CanvaElement;
  canvaElements: CanvaElement[];
  setCanvaElements?: Dispatch<SetStateAction<CanvaElement[] | undefined>>;
  handleDragEnd: () => number;
  isSelected: boolean;
  onSelect: () => void;
  imageUpload?: boolean;
  uploadingImages?: boolean;
  render?: boolean;
  setRender?: Dispatch<SetStateAction<boolean>>;
}
