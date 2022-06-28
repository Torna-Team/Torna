import React, { useState } from 'react';

type Props = {
  setGifUrl: string;
};

const GifSearcher = (props: Props) => {
  const [search, setSearch] = useState<string>('');
  const [gifs, setGifs] = useState<any[]>([]);
  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder='Search Gifs'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <button>🔍️</button>
    </div>
  );
};

export default GifSearcher;
