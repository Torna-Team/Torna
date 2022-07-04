import { useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import './AnimatedText.css';
import { uuidv4 } from '@firebase/util';
import { AnimatedTextProps } from '../../Types/AnimatedText.interface';
import { IGif } from '@giphy/js-types';

const giphyKey = process.env.REACT_APP_GIPHY_KEY as string;
const giphy = new GiphyFetch(giphyKey);

const AnimatedText = ({ setNewGif, setRender }: AnimatedTextProps) => {
  const [text, setText] = useState<string>('');
  const [results, setResults] = useState<IGif[]>([]);
  const [err, setErr] = useState<boolean>(false);
  const [width, setWidth] = useState<number>((window.innerWidth / 100) * 14);
  // const [height, setHeight] = useState<number>(window.innerHeight);

  const handleClick = async (gifClicked: string | any) => {
    console.log(gifClicked, 'gcli');
    // let GifObj = { src : ''}
    // GifObj.src= gifClicked.url
    setNewGif(gifClicked.images.preview_webp.url);
    setRender(true);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    if (text.length === 0) {
      setErr(true);
      return;
    }
    const apiCall = async () => {
      const res = await giphy.animate(text, { limit: 25 });
      console.log(res.data, 'resDAta');
      setResults(res.data);
    };
    apiCall();
    setText('');
    setErr(false);
  };

  return (
    <div className='animated-container'>
      <div className='search-animated'>
        <label>Animated Text</label>
        <input
          className='addTextAnimated'
          value={text}
          onChange={handleInput}
          placeholder='Type here'
        />
        <button onClick={handleSubmit}>SEARCH TEXT</button>
      </div>

      <div className='TextResult-container'>
        {results &&
          !err &&
          results.map((gif) => {
            return (
              <img
                src={gif.url}
                width={width}
                key={uuidv4()}
                alt={'Gif not uploaded'}
                onClick={() => {
                  handleClick(gif as any);
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AnimatedText;
