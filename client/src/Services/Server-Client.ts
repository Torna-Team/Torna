import logoArrow from '../Images/logobackgroundgray.jpg';
import { AlbumInterface } from '../Types/Canvas.interface';
import { LoggingUser, User } from '../Types/ServerClient.interface';

const BASE_URL = 'https://torna-backend.herokuapp.com';

export const getUser = async (displayName: string, email: string) => {
  try {
    const result = await fetch(`${BASE_URL}/user/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        firstName: displayName,
        lastName: '',
        email: email,
      }),
    });
    const json = await result.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (user: LoggingUser) => {
  try {
    const result = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    });
    const res = await result.json();
    return res as User;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (newuser: User) => {
  try {
    const result = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newuser),
    });
    const res = await result.json();
    return res as User;
  } catch (error) {
    console.error(error);
  }
};

export const getAlbum = async (id: number) => {
  try {
    const result = await fetch(`${BASE_URL}/album/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const res = await result.json();
    return res as AlbumInterface;
  } catch (error) {
    console.error(error);
  }
};

export const saveAlbum = async (album: AlbumInterface) => {
  try {
    const result = await fetch(`${BASE_URL}/album/${album.id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(album),
    });
    const res = await result.json();
    return res as AlbumInterface;
  } catch (error) {
    console.error(error);
  }
};

export const createAlbum = async (user: User) => {
  try {
    const album = {
      title: 'New album',
      template: '',
      background: 'rgb(255, 255, 255)',
      frontPage: logoArrow,
      author: user.id,
    };
    const result = await fetch(`${BASE_URL}/album/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(album),
    });
    const res = await result.json();
    return res as User;
  } catch (error) {
    console.error(error);
  }
};
export const deleteAlbum = async (album: AlbumInterface) => {
  try {
    await fetch(`${BASE_URL}/album/${album.id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(album),
    });
  } catch (error) {
    console.error(error);
  }
};
