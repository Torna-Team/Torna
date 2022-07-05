import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';
import { RiShareForwardLine } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { deleteAlbum } from '../../Services/Server-Client';
import { AlbumProps } from '../../Types/Album.Interface';
import { AlbumInterface } from '../../Types/Canvas.interface';
import { User } from '../../Types/ServerClient.interface';
import './Album.css';

const Album = ({ element, editAlbum, setUser }: AlbumProps) => {
  const navigate = useNavigate();
  const [visibilityOnTitle, setVisibilityOnTitle] = useState<boolean>(false);
  const [toolToggle, setTooToggle] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setVisibilityOnTitle(true);
  };
  const handleMouseLeave = () => {
    setVisibilityOnTitle(false);
    setTooToggle(false);
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
        onClick={() => navigate(`/album/${element.id}/view`)}
      />

      {visibilityOnTitle && (
        <>
          <h4
            unselectable='on'
            className='albumTitle'
            onClick={() => navigate(`/album/${element.id}/view`)}
          >
            {element.title}
          </h4>
          {!toolToggle ? (
            <MdOutlineExpandMore
              className=' toolButton'
              onClick={() => setTooToggle(true)}
            />
          ) : (
            <>
              <MdOutlineExpandLess
                className=' toolButton'
                onClick={() => setTooToggle(false)}
              />
              <div className='albumTools'>
                <FiEdit
                  className='toolIcon'
                  onClick={() => editAlbum(element)}
                />
                <RiShareForwardLine
                  className='toolIcon'
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      encodeURI(
                        `https://thesis-project-jet.vercel.app/album/${element.id}/view`
                      )
                    );
                    alert('Album link copied 🎉');
                  }}
                />
                <TiDelete
                  className='toolIcon'
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this album?'
                      )
                    ) {
                      deleteOneAlbum(element);
                    }
                  }}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Album;
