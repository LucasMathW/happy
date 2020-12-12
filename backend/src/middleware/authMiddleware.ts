import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { string } from 'yup';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware( 
  request: Request, response: Response, next: NextFunction 
) {
  const { authorization } = request.headers;
   
  if(!authorization){
    response.sendStatus(401);
  }

  const token1 = authorization?.replace('Bearer', '').trim();

  const token = String(token1);

  try{
     const data = jwt.verify(token, 'secret');
     
     const {id} = data as TokenPayload;

     request.userId = id;

     return next();
     
  } catch {
    return response.sendStatus(401);
  }
}