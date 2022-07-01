import { Dispatch, SetStateAction } from 'react';

export interface CanvaElement {
  type: string;
  id: string;
  x: number;
  y: number;
  color: string;
  stroke?: string;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
  imageSrc?: string;
  text?: string;
  font?: string;
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
  setNewImage: Dispatch<SetStateAction<string>>;
}
