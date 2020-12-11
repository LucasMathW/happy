import { Router } from 'express';
import multer from 'multer';
 
import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from  './controllers/UsersController';

const routes = Router();
const upload = multer(uploadConfig);

//Rotas de Orfanatos
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);


//Rotas de Usuários
routes.post('/users', UsersController.create);

export default routes;