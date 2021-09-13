import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) {
    response.sendStatus(401);
  }

  let token = authorization?.replace('Bearer', '').trim();

  token = String(token);

  try {
    const data = jwt.verify(token, 'secret');

    const { id } = data as TokenPayload;

    request.userId = id;

    return next();
  } catch {
    return response.sendStatus(401);
  }
}
