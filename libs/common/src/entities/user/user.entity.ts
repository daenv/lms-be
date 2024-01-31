import { AbstractEntity } from '@app/common';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  @IsString()
  username: string;

  @Column()
  @IsString()
  @Exclude()
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  firstName: string;

  @Column()
  @IsString()
  lastName: string;

  @Column()
  @IsString()
  phone: string;
}
