import { Dispatch, SetStateAction } from 'react';
import { Album, User } from './Canvas.interface';

export interface AlbumProps {
  element: Album;
  editAlbum: (arg0: Album) => void;
  setUser: Dispatch<SetStateAction<User>>;
}
