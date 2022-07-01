import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

//User functions
//Probably not used
const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany({
			include: {
				albums: true,
			},
		});
		res.status(200);
		res.json(users);
	} catch (error) {
		res.status(500);
		console.log(error);
		res.end();
	}
};

const getUserFromGoogleAuth = async (req: Request, res: Response) => {
	try {
		const { email, firstName, lastName } = req.body;
		let user = await prisma.user.findUnique({
			where: {
				email: email,
			},
			include: {
				albums: {
					select: {
						title: true,
						id: true,
						frontPage: true,
					},
				},
			},
		});
		//if Google User signs in for the first time, we save the user with encrypted random password.
		if (user === null) {
			const password = uuidv4();
			const hash = await bcrypt.hash(password, 10);
			(user as any) = await prisma.user.create({
				data: {
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: hash,
				},
				include: {
					albums: {
						select: {
							title: true,
							id: true,
							frontPage: true,
						},
					},
				},
			});
		}
		const securedData = {
			id: user?.id,
			albums: user?.albums,
			firstName: user?.firstName,
			lastName: user?.lastName,
		};
		res.status(200);
		res.json(securedData);
	} catch (error) {
		res.status(500);
		console.log(error);
		res.end();
	}
};

const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
			include: {
				albums: {
					select: {
						title: true,
						id: true,
						frontPage: true,
					},
				},
			},
		});
		if (user) {
			//refactorable
			const validatePass = await bcrypt.compare(password, user.password);
			if (validatePass === false) throw Error();
		}
		const securedData = {
			id: user?.id,
			albums: user?.albums,
			firstName: user?.firstName,
			lastName: user?.lastName,
		};
		res.status(200);
		res.send(securedData);
	} catch (error) {
		res.status(401);
		console.log(error);
		res.send({ error: '401', message: 'Username or password is incorrect' });
	}
};

const register = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, password, email } = req.body;

		const checkUser = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (checkUser) throw new Error();
		const hash = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				firstName,
				lastName,
				password: hash,
				email,
			},
			include: {
				albums: {
					select: {
						title: true,
						id: true,
						frontPage: true,
					},
				},
			},
		});
		const securedData = {
			id: user?.id,
			albums: user?.albums,
			firstName: user?.firstName,
			lastName: user?.lastName,
		};
		res.status(201);
		res.json(securedData);
	} catch (error) {
		res.status(500);
		console.log(error);
		res.send();
		res.end();
	}
};

//probably not used
const editUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { firstName, lastName, password, email } = req.body;
		const user = await prisma.user.update({
			where: {
				id: Number(id),
			},
			data: {
				firstName,
				lastName,
				password,
				email,
			},
		});
		res.status(204);
		res.json(user);
	} catch (error) {
		res.status(500);
		console.log(error);
		res.end();
	}
};

//Albums functions
const getAlbum = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const album = await prisma.album.findUnique({
			where: {
				id: Number(id),
			},
		});
		res.status(200);
		res.json(album);
	} catch (error) {
		res.status(500);
		console.log(error);
		res.end();
	}
};

const postAlbum = async (req: Request, res: Response) => {
	try {
		const { title, template, background, frontPage, author } = req.body;
		const createAlbum = await prisma.album.create({
			data: {
				title,
				template,
				background,
				frontPage,
				author: { connect: { id: author } },
			},
			include: { author: true },
		});
		res.status(201);
		res.json(createAlbum);
	} catch (error) {
		res.status(500);
		console.log(error);
		res.end();
	}
};

const editAlbum = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { title, template, background, frontPage } = req.body;
		const album = await prisma.album.update({
			where: {
				id: Number(id),
			},
			data: {
				title,
				template,
				background,
				frontPage,
			},
		});
		res.status(200);
		res.send(JSON.stringify(album));
	} catch (error) {
		res.status(500);
		console.log(error);
		res.end();
	}
};

const deleteAlbum = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;
		const album = await prisma.album.delete({
			where: {
				id: id,
			},
		});
		res.status(204);
		res.json(album);
	} catch (error) {
		res.status(500);
		console.log(error);
		res.end();
	}
};

export default {
	getUsers,
	getUserFromGoogleAuth,
	login,
	register,
	editUser,
	getAlbum,
	postAlbum,
	editAlbum,
	deleteAlbum,
};
