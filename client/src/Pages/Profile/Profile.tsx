import Navbar from '../../Components/Navbar/Navbar';
import { useState, useContext, useEffect } from 'react';
import { LoginContext, LoginContextType } from '../../Services/Context';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { createAlbum } from '../../Services/Server-Client';
import Album from '../../Components/Album/Album';
import { getUser } from '../../Services/Server-Client';
import { AlbumInterface } from '../../Types/Canvas.interface';
import { User } from '../../Types/ServerClient.interface';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';

function Profile() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext<LoginContextType>(LoginContext);
  const [user, setUser] = useState<User>();
  const [oldToNewOrder, setOldToNewOrder] = useState<boolean>(false);

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
      result?.albums?.sort((a: AlbumInterface, b: AlbumInterface) => {
        return a.id - b.id;
      });
      setUser(result);
      return result;
    }
  };

  const sortAlbums = () => {
    let sortedUserAlbums: AlbumInterface[] = [];
    if (user?.albums) {
      if (!oldToNewOrder) {
        sortedUserAlbums = user?.albums?.sort(
          (a: AlbumInterface, b: AlbumInterface) => {
            return b.id - a.id;
          }
        );
        setOldToNewOrder(true);
      } else {
        sortedUserAlbums = user?.albums?.sort(
          (a: AlbumInterface, b: AlbumInterface) => {
            return a.id - b.id;
          }
        );
        setOldToNewOrder(false);
      }
    }
    const sortedUser = {
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      albums: sortedUserAlbums,
    };
    setUser(sortedUser as User);
  };

  const editAlbum = (album: AlbumInterface) => {
    navigate(`/album/${album.id}/edit`);
  };

  const createNewAlbum = async (user: User) => {
    const newAlbum = await createAlbum(user);
    navigate(`/album/${newAlbum?.id}/edit`);
  };

  return (
    <div className='ProfileMainContainer'>
      <Navbar user={user as User} />
      <div className='albumsContainer'>
        {loggedIn ? (
          <>
            <div className='profileContainer'>
              <div className='sortBtnsContainer'>
                {oldToNewOrder ? (
                  <HiSortAscending className='sortBtn' onClick={sortAlbums} />
                ) : (
                  <HiSortDescending className='sortBtn' onClick={sortAlbums} />
                )}
              </div>
              <div className='albumList'>
                {user && user.albums && user.albums.length !== 0 ? (
                  user.albums.map((el: AlbumInterface) => {
                    return (
                      <>
                        <Album
                          setUser={setUser}
                          element={el}
                          editAlbum={editAlbum}
                        />
                      </>
                    );
                  })
                ) : (
                  <p>You don't have albums yet</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <h3 className='loginText'>
            Log in to see your albums or to create a new one
          </h3>
        )}
      </div>

      {loggedIn && (
        <div className='newAlbum'>
          <button
            className='newAlbumButton'
            onClick={() => createNewAlbum(user as unknown as User)}
          >
            Create new Album
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
