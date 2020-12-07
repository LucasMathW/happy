import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  e_mail: string;

  @Column()
  password: string;  
}