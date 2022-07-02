import { createContext } from 'react';

export type LoginContextType = {
  loggedIn: boolean;
  setLoggedIn: (l: boolean) => void;
};

export const LoginContext = createContext({} as unknown as LoginContextType);
