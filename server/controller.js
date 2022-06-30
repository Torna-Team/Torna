"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
//User functions
//Probably not used
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            include: {
                albums: true,
            },
        });
        res.status(200);
        res.json(users);
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.end();
    }
});
const getUserFromGoogleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, firstName, lastName } = req.body;
        let user = yield prisma.user.findUnique({
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
            const password = (0, uuid_1.v4)();
            const hash = yield bcrypt_1.default.hash(password, 10);
            user = yield prisma.user.create({
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
            id: user === null || user === void 0 ? void 0 : user.id,
            albums: user === null || user === void 0 ? void 0 : user.albums,
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
        };
        res.status(200);
        res.json(securedData);
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.end();
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma.user.findUnique({
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
            const validatePass = yield bcrypt_1.default.compare(password, user.password);
            if (validatePass === false)
                throw Error();
        }
        const securedData = {
            id: user === null || user === void 0 ? void 0 : user.id,
            albums: user === null || user === void 0 ? void 0 : user.albums,
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
        };
        res.status(200);
        res.send(securedData);
    }
    catch (error) {
        res.status(401);
        console.log(error);
        res.send({ error: '401', message: 'Username or password is incorrect' });
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, password, email } = req.body;
        const checkUser = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (checkUser)
            throw new Error();
        const hash = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
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
            id: user === null || user === void 0 ? void 0 : user.id,
            albums: user === null || user === void 0 ? void 0 : user.albums,
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
        };
        res.status(201);
        res.json(securedData);
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.send();
        res.end();
    }
});
//probably not used
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { firstName, lastName, password, email } = req.body;
        const user = yield prisma.user.update({
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
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.end();
    }
});
//Albums functions
const getAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const album = yield prisma.album.findUnique({
            where: {
                id: Number(id),
            },
        });
        res.status(200);
        res.json(album);
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.end();
    }
});
const postAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, template, background, frontPage, author } = req.body;
        const createAlbum = yield prisma.album.create({
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
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.end();
    }
});
const editAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { title, template, background, frontPage } = req.body;
        const album = yield prisma.album.update({
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
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.end();
    }
});
const deleteAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const album = yield prisma.album.delete({
            where: {
                id: id,
            },
        });
        res.status(204);
        res.json(album);
    }
    catch (error) {
        res.status(500);
        console.log(error);
        res.end();
    }
});
exports.default = {
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
