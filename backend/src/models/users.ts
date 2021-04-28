import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('users')
export default class users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  e_mail: string;

  @Column()
  password: string;

  @Column()
  passwordResetToken: string;

  @Column()
  passwordResetHours: Date;

  @BeforeInsert()
  @BeforeUpdate()
  passwordHash() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
