export {};

declare global {
  interface Window {
    gifler: any; // 👈️ turn off type checking
  }

  type User = {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    albums: Album[];
  };

  type Album = {
    id: number;
    title: string;
    template: string;
    authorId: number;
    background: string;
    frontPage: string;
  };

