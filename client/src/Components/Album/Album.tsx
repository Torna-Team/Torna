import React, { useState } from 'react';
import './Album.css';

const Album = ({ element, editAlbum }: any) => {
  const [visibilityOnTitle, setVisibilityOnTitle] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setVisibilityOnTitle(true);
  };
  const handleMouseLeave = () => {
    setVisibilityOnTitle(false);
  };

  return (
    <div
      className='albumFrontPage'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => editAlbum(element)}
    >
      <img className='albumFrontImage' alt='album' src={element.frontPage} />
      {visibilityOnTitle && (
        <h4 unselectable='on' className='albumTitle'>
          {element.title}
        </h4>
      )}
    </div>
  );
};

export default Album;
