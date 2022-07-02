import React, { useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { deleteAlbum } from '../../Services/Server-Client';
import { AlbumProps } from '../../types/Album.Interfact';
import { Album, User } from '../../types/Canvas.interface';
import './Album.css';

const Album = ({ element, editAlbum, setUser }: AlbumProps) => {
  const [visibilityOnTitle, setVisibilityOnTitle] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setVisibilityOnTitle(true);
  };
  const handleMouseLeave = () => {
    setVisibilityOnTitle(false);
  };

  const deleteOneAlbum = async function (album: Album) {
    setUser((user: User) => {
      let updatedAlbums = user.albums.filter((e) => {
        return e.id !== album.id;
      });
      return { ...user, albums: updatedAlbums };
    });
    return await deleteAlbum(album);
  };

  return (
    <div
      className='albumFrontPage'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className='albumFrontImage'
        alt='album'
        src={element.frontPage}
        onClick={() => editAlbum(element)}
      />
      {visibilityOnTitle && (
        <>
          <h4 unselectable='on' className='albumTitle'>
            {element.title}
          </h4>
          <button
            className='deleteButton'
            onClick={() => {
              return deleteOneAlbum(element);
            }}
          >
            <TiDelete />
          </button>
        </>
      )}
    </div>
  );
};

export default Album;
