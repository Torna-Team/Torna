import Navbar from '../Components/Navbar';
import React, { useState, useContext, useEffect } from 'react';
import { LoginContext } from '../Utils/Context';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/Profile.css';
import { createAlbum } from '../Services/Server-Client';
import Album from '../Components/Album/Album';
import { getUser } from '../Services/Server-Client';

function Profile() {
  const navigate = useNavigate();
  // let { id } = useParams();
  const { loggedIn, setLoggedIn } = useContext(LoginContext as any);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (sessionStorage && sessionStorage.getItem('user')) {
      const res = JSON.parse(sessionStorage.getItem('user') as string);
      setUser(res);
      const email = sessionStorage.getItem('email');
      checkExistingUser(res.firstName, email as string);
      setLoggedIn(true);
    }
  }, []);

  const checkExistingUser = async (displayName: string, email: string) => {
    if (displayName && email) {
      const result = await getUser(displayName, email);
      setUser(result);
      console.log(user);
      return result;
    }
  };

  const editAlbum = (album: any) => {
    navigate(`/album/${album.id}/edit`);
  };

  const createNewAlbum = async (user: any) => {
    const newAlbum = await createAlbum(user);
    console.log(newAlbum);
    navigate(`/album/${newAlbum.id}/edit`);
  };

  return (
    <div className='ProfileMainContainer'>
      <Navbar user={user} />
      <div className='albumsContainer'>
        {loggedIn ? (
          <>
            <div className='albumList'>
              {user && user.albums && user.albums.length !== 0 ? (
                user.albums.map((el: any) => {
                  return (
                    <Album
                      className='singleAlbum'
                      element={el}
                      editAlbum={editAlbum}
                    />
                  );
                })
              ) : (
                <p>You don't have albums yet</p>
              )}
            </div>
          </>
        ) : (
          <h3>Log in to see your albums or to create a new one </h3>
        )}
      </div>
      {loggedIn && (
        <button className='newAlbumButton' onClick={() => createNewAlbum(user)}>
          Create a new Album
        </button>
      )}
    </div>
  );
}

export default Profile;
