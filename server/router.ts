import express from 'express';
import Data from './controller';

const router = express.Router();

//User routes
router.get('/users', Data.getUsers);
router.post('/user/:id', Data.getUser);
router.post('/login', Data.login);
router.post('/register', Data.register);
router.put('/user/:id', Data.editUser);

//Album routes
router.get('/albums/', Data.getAlbums);
router.post('/album/', Data.postAlbum);
router.put('/album/:id', Data.editAlbum);
router.delete('/album/:id', Data.deleteAlbum);

export default router;
