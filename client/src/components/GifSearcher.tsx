import React, { useEffect, useState } from 'react';

type Props = {};

const GifSearcher = (props: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [gifs, setGifs] = useState<any[]>([]);
  const [flag, setFlag] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  const giphySearchEndpoint: string = 'https://api.giphy.com/v1/gifs/search?';
  const giphyApiKey: any = 'api_key=' + process.env.REACT_APP_GIPHY_KEY;
  const searchQuery: string = `&q=${search}`;
  const queryLimit = '&limit=20';
  const url = giphySearchEndpoint + giphyApiKey + searchQuery + queryLimit + '';
  console.log(url, 'url');

  const searchGif = (e: any) => {
    e.preventDefault();
    if (searchValue === '') {
      setError(true);
    }
    setSearch(searchValue);
    setError(false);
    console.log();
    setSearchValue('');
  };

  const fetchGiphy = async () => {
    if (flag < 10) {
      let fetched = flag;
      try {
        let res = await fetch(url);
        console.log('fetching');
        setFlag(fetched + 1);
        let jsonRes = await res.json();
        console.log(jsonRes);
        setGifs(jsonRes.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('you fetched more than 10 times already');
    }
  };

  useEffect(() => {
    fetchGiphy();
  }, [search]);

  const handleClick = () => {};

  return (
    <div className='search-container'>
      <form onSubmit={searchGif}>
        <input
          type='text'
          placeholder='Search Gifs'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>
        <button>🔍️</button>
      </form>
      {error ? <p className='error'> The search field cannot be empty </p> : ''}

      <div className='gif-container'>
        {gifs &&
          !error &&
          gifs.map((gif, index) => {
            return (
              <img
                src={gif.images.downsized_medium.url}
                key={index.toString()}
                alt={'not loaded'}
                height={150}
                onClick={() => {
                  handleClick();
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default GifSearcher;
