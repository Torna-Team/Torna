"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const router = express_1.default.Router();
//User routes
router.get('/users', controller_1.default.getUsers);
router.post('/user/', controller_1.default.getUserFromGoogleAuth);
router.post('/login', controller_1.default.login);
router.post('/register', controller_1.default.register);
router.put('/user/:id', controller_1.default.editUser);
//Album routes
router.get('/album/:id', controller_1.default.getAlbum);
router.post('/album/', controller_1.default.postAlbum);
router.put('/album/:id', controller_1.default.editAlbum);
router.delete('/album/:id', controller_1.default.deleteAlbum);
exports.default = router;
