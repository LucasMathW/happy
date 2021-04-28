import 'dotenv/config';

import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../models/users';

interface User {
  e_mail: string;
  password?: string;
}

export default {
  async autencicateUser(request: Request, response: Response) {
    const { e_mail, password } = request.body;

    const usersRepository = getRepository(users);

    const isUser = await usersRepository.findOne({ where: { e_mail } });

    if (!isUser) {
      return response.status(409).json({ message: 'usuário não encontrado!' });
    }

    const validatePassword = await bcrypt.compare(password, isUser.password);

    if (!validatePassword) {
      response.status(401).json({ message: 'Senha incorreta!!' });
    }

    const token = jwt.sign({ id: isUser.id }, 'secret', { expiresIn: '7d' });

    const user: User = isUser;

    delete user.password;

    return response.json({
      user,
      token,
    });
  },
};
