import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import hl from 'handy-log';


import './database/connection';
import errorHandler from './errors/handle';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(3333, ()=>{
  hl.rainbow(`server is running on port: ${3333}`)
});
