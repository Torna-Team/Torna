import React, { useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { deleteAlbum } from '../../Services/Server-Client';
import { AlbumProps } from '../../types/Album.Interfact';
import { AlbumInterface } from '../../types/Canvas.interface';
import { User } from '../../types/ServerClient.interface';
import './Album.css';

const Album = ({ element, editAlbum, setUser }: AlbumProps) => {
  const [visibilityOnTitle, setVisibilityOnTitle] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setVisibilityOnTitle(true);
  };
  const handleMouseLeave = () => {
    setVisibilityOnTitle(false);
  };

  const deleteOneAlbum = async function (album: AlbumInterface) {
    setUser((prevUser?: User) => {
      if (prevUser) {
        let updatedAlbums = prevUser.albums?.filter((e) => {
          return e.id !== album.id;
        });
        return { ...prevUser, albums: updatedAlbums };
      }
    });
    return await deleteAlbum(album);
  };

  return (
    <div
      className='albumFrontPage singleAlbum'
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
          {/* <button
            className='deleteButton'
            onClick={() => {
              return deleteOneAlbum(element);
            }}
          > */}
          <TiDelete
            className=' deleteButton'
            onClick={() => {
              return deleteOneAlbum(element);
            }}
          />
          {/* </button> */}
        </>
      )}
    </div>
  );
};

export default Album;
