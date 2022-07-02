import tornaLogo from '../images/tornalogo.png';

const BASE_URL = 'https://torna-backend.herokuapp.com';

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  password?: string;
  albums?: any[];
  email: string;
}

export interface LoggingUser {
  email: string;
  password: string;
}

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
    console.log(error);
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
    console.log(error);
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
    // console.log(result);
    const res = await result.json();
    // console.log(res);
    return res as any;
  } catch (error) {
    console.error(error);
  }
};

export const saveAlbum = async (album: Album) => {
  try {
    console.log(album);
    const result = await fetch(`${BASE_URL}/album/${album.id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(album),
    });
    // console.log(result);
    const res = await result.json();
    // console.log(res);
    return res as Album;
  } catch (error) {
    console.error(error);
  }
};

export const createAlbum = async (user: User) => {
  try {
    console.log(user);
    const album = {
      title: 'new album',
      template: '',
      background: 'rgba(255, 255, 255)',
      frontPage: tornaLogo,
      author: user.id,
    };
    const result = await fetch(`${BASE_URL}/album/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(album),
    });
    // console.log(result);
    const res = await result.json();
    // console.log(res);
    return res as User;
  } catch (error) {
    console.error(error);
  }
};
