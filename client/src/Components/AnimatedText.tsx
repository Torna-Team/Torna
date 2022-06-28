import React, { useEffect } from 'react';
import { useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import GIF from '../components/GIF';
import '../Styles/gifPicker.styles.css';

const giphyKey: any = process.env.REACT_APP_GIPHY_KEY;
const giphy = new GiphyFetch(giphyKey);
type Props = {};

const AnimatedText = (props: Props) => {
  const [text, setText] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [err, setErr] = useState<boolean>(false);
  const [width, setWidth] = useState<number>((window.innerWidth / 100) * 14);
  // const [height, setHeight] = useState<number>(window.innerHeight);

  const handleInput = (e: any) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: any) => {
    if (text.length === 0) {
      console.log('lenght is 0, please add text before submiting');
      setErr(true);
      return;
    }
    const apiCall = async () => {
      const res = await giphy.animate(text, { limit: 10 });
      console.log(res, 'res');
      setResults(res.data);
    };
    apiCall();
    setText('');
    setErr(false);
  };

  return (
    <>
      <div className='gifpicker-container'>
        <div className='search-container'>
          <h3>Animated Text</h3>
          <input value={text} onChange={handleInput} />
          <button onClick={handleSubmit}>🖌️</button>
        </div>
        <div className='gifResult-container'>
          {results &&
            !err &&
            results.map((gif) => {
              return <img src={gif.url} width={width} draggable />;
            })}
        </div>
      </div>
    </>
  );
};

export default AnimatedText;
