import { Router } from 'express';
import multer from 'multer';

import authMiddleware from './middleware/authMiddleware';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import AuthController from './controllers/AuthController';

const routes = Router();
const upload = multer(uploadConfig);

// Rotas de Orfanatos
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);

// Rotas de Usuários
routes.post('/users', UsersController.create);
routes.get('/users', authMiddleware, UsersController.index);

routes.post('/auth', AuthController.authenticateUser);
routes.post('/forgot_password', AuthController.forgotPassword);
routes.post('/reset_password', AuthController.resetPassword);

export default routes;
