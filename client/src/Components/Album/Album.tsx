import React, { useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { deleteAlbum } from '../../Services/Server-Client';
import './Album.css';

const Album = ({ element, editAlbum, setUser }: any) => {
	const [visibilityOnTitle, setVisibilityOnTitle] = useState<boolean>(false);

	const handleMouseEnter = () => {
		setVisibilityOnTitle(true);
	};
	const handleMouseLeave = () => {
		setVisibilityOnTitle(false);
	};

	const deleteOneAlbum = async function (albumid: any) {
		console.log(albumid);
		setUser((user: any) => {
			let updatedAlbums = user.albums.filter((e: any) => {
				return e.id !== albumid.id;
			});
			return { ...user, albums: updatedAlbums };
		});
		return await deleteAlbum(albumid);
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
						className='lala'
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
