import Navbar from '../Components/Navbar';
import React, { useState, useContext, useEffect } from 'react';
import { LoginContext } from '../Utils/Context';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/Profile.css';
import { createAlbum } from '../Services/Server-Client';

function Profile() {
	const navigate = useNavigate();
	// let { id } = useParams();
	const { loggedIn, setLoggedIn } = useContext(LoginContext as any);
	const [user, setUser] = useState<any>();

	useEffect(() => {
		if (sessionStorage && sessionStorage.getItem('user')) {
			const res = JSON.parse(sessionStorage.getItem('user') as string);
			console.log(res.albums[4].frontPage);
			setUser(res);
			setLoggedIn(true);
		}
	}, [loggedIn]);

	const editAlbum = (album: any) => {
		navigate(`/album/${album.id}/edit`);
	};

	const createNewAlbum = async (user: any) => {
		const newAlbum = await createAlbum(user);
		console.log(newAlbum);
		navigate(`/album/${newAlbum.id}/edit`);
	};

	return (
		<div className='mainContainer'>
			<Navbar user={user} />
			<div className='albumsContainer'>
				{loggedIn ? (
					<>
						<div className='albumList'>
							{user && user.albums && user.albums.length !== 0 ? (
								user.albums.map((el: any) => {
									return (
										<div
											className='albumFrontPage'
											onClick={() => editAlbum(el)}
										>
											<h4 className='albumTitle'>{el.title}</h4>
											<img className='albumFrontImage' src={el.frontPage} />
										</div>
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
			<button onClick={() => createNewAlbum(user)}>Create a new Album</button>
		</div>
	);
}

export default Profile;
