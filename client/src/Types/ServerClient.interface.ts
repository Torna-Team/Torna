import { AlbumInterface } from './Canvas.interface';

export interface User {
  id?: string;
  firstName: string;
  lastName?: string;
  password?: string;
  albums?: AlbumInterface[];
  email: string;
}

export interface LoggingUser {
  email: string;
  password: string;
}
