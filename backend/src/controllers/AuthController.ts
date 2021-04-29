import 'dotenv/config';

import { Response, Request } from 'express';
import { getRepository, Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../models/users';
import crypto from 'crypto';
import {resolve} from 'path'
import sendMailService from '../service/sendMailService'

interface User {
  e_mail: string;
  password?: string;
}

export default {
  async authenticateUser(request: Request, response: Response) {
    const { e_mail, password } = request.body;

    const usersRepository = getRepository(users);

    const isUser = await usersRepository.findOne({ where: { e_mail } });

    if (!isUser)
      return response.status(409).json({ message: 'usuário não encontrado!' });

    const validatePassword = await bcrypt.compare(password, isUser.password);

    if (!validatePassword)
      return response.status(400).json({ message: 'Senha incorreta!!' });

    const token = jwt.sign({ id: isUser.id }, 'secret', { expiresIn: '7d' });

    const user: User = isUser;

    delete user.password;

    return response.json({
      user,
      token,
    });
  },

  async forgotPassword(request: Request, response: Response){
    const {e_mail} = request.body

    const usersRepository = getRepository(users);
    const user = await usersRepository.findOne({where: {e_mail}});

    if(!user){
      return response.status(409).json({ message: 'Usuário não encontrado'});
    }

    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    now.setHours(now.getHours() + 1)

   user.PasswordResetToken = token,
   user.PasswordResetExpires = now

   await usersRepository.save(user)

   const resetPath = resolve(__dirname, '..', "views", "emails", "index.hbs")

   const variables ={
     id: user.id,
     name : user.name,
     token: user.PasswordResetToken,
   }

   await sendMailService.execute(e_mail, user.name, variables, resetPath)

   return response.status(200).json('Acesse seu email para ter acesso ao token')

  },

  async resetPassword(request: Request, response: Response){
    const {e_mail, token, password} = request.body;
    console.log(e_mail)
    const usersRepository = getRepository(users);

    const userExists = await usersRepository.findOne({where :{ e_mail }})

    if(!userExists)
      return response.status(409).json('Não existe usuário com esse email')

    if(token !== userExists.PasswordResetToken)
      return response.status(409).json('O token é inválido!')

    const now = new Date()

    if(userExists.PasswordResetExpires < now )
      return response.status(401).json('O token expirou, emita um novo token e tente outra avez');

    if(await bcrypt.compare(password, userExists.password))
      return response.status(409).json('Tente uma senha diferente da anterior')

    userExists.password = password

    const user = await usersRepository.save(userExists)

    delete user.PasswordResetToken
    delete user.PasswordResetExpires
    delete user.password

    return response.status(201).json('Senha alterada com sucesso, faça o  loguin usando a sua nova senha!');

  }
};
