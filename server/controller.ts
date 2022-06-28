import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

//User functions
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

const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (user) {
			const validatePass = await bcrypt.compare(password, user.password);
			if (!validatePass) throw Error();
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(401);
		console.log(error);
		res.send({ error: '401', message: 'Username or password is incorrect' });
	}
};

const postUser = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, password, email } = req.body;
		const hash = await bcrypt.hash(password, 10);
		const createuser = await prisma.user.create({
			data: {
				firstName,
				lastName,
				password: hash,
				email,
			},
		});
		res.status(201);
		res.json(createuser);
	} catch (error) {
		res.status(500);
		console.log(error);
		res.end();
	}
};

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
const getAlbums = async (req: Request, res: Response) => {
	try {
		const albums = await prisma.album.findMany({});
		res.status(200);
		res.json(albums);
	} catch (error) {
		res.status(500);
		console.log(error);
		res.end();
	}
};

const postAlbum = async (req: Request, res: Response) => {
	try {
		const { title, author, authorId } = req.body;
		const createAlbum = await prisma.album.create({
			data: {
				title,
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
		const { title } = req.body;
		const album = await prisma.album.update({
			where: {
				id: Number(id),
			},
			data: {
				title,
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

const deleteAlbum = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const album = await prisma.album.delete({
			where: {
				id: Number(id),
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
	login,
	postUser,
	editUser,
	getAlbums,
	postAlbum,
	editAlbum,
	deleteAlbum,
};