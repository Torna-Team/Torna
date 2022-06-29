import React, { useEffect } from 'react';
import { useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import './AnimatedText.css';

const giphyKey: any = process.env.REACT_APP_GIPHY_KEY;
const giphy = new GiphyFetch(giphyKey);
type Props = {
  setNewGif: any;
};

const AnimatedText = ({ setNewGif }: Props) => {
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
      const res = await giphy.animate(text, { limit: 25 });
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
            results.map((gif, index) => {
              return (
                <img
                  src={gif.url}
                  width={width}
                  key={index}
                  alt={index.toString()}
                  onClick={() => {
                    setNewGif(gif);
                  }}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AnimatedText;
