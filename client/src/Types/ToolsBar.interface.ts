import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from 'react';

export interface ToolsBarProps {
  handleToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClick: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleSubmit: (args0: ChangeEvent<HTMLFormElement>) => void;
  toggleTool: ToggleTools;
  backgroundColor: string;
  setBackGroundColor: Dispatch<SetStateAction<string>>;
  grid: boolean;
  setGrid: Dispatch<SetStateAction<boolean>>;
  strokedText: boolean;
  setStrokedText: Dispatch<SetStateAction<boolean>>;
  font: string;
  setFont: Dispatch<SetStateAction<string>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  setNewGif: Dispatch<SetStateAction<string | null>>;
  setTextColor: Dispatch<SetStateAction<string>>;
  stroke: string;
  setStroke: Dispatch<SetStateAction<string>>;
  setRender: Dispatch<SetStateAction<boolean>>;
}

export interface ToggleTools {
  backgroundTool: boolean;
  textTool: boolean;
  animatedTextTool: boolean;
  colorTool: boolean;
  gifTool: boolean;
}
