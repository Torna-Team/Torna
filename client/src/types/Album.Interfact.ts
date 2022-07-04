import { Dispatch, SetStateAction } from 'react';
import { AlbumInterface } from './Canvas.interface';
import { User } from './ServerClient.interface';

export interface AlbumProps {
  element: AlbumInterface;
  editAlbum: (arg0: AlbumInterface) => void;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}
