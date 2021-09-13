/* eslint-disable camelcase */
import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import users from '../models/users';

export default {
  async index(request: Request, response: Response) {
    return response.send({ userID: request.userId });
  },

  async create(request: Request, response: Response) {
    const { name, e_mail, password } = request.body;

    const usersRepository = getRepository(users);

    let user = await usersRepository.findOne({ where: { e_mail } });

    if (!user) {
      user = await usersRepository.create({
        name,
        e_mail,
        password,
      });

      await usersRepository.save(user);

      delete user.password;

      return response.json({ user });
    }

    return response
      .status(409)
      .json({ message: 'Usuário com esse e-mail já existe!' });
  },
};
