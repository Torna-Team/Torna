import { IGif } from '@giphy/js-types';
import { Dispatch, SetStateAction } from 'react';

export interface AnimatedTextProps {
  setNewGif: Dispatch<SetStateAction<string | null>>;
}
