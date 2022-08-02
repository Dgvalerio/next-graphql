/* eslint-disable new-cap */
import User from '@/user/user.entity';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: User['name'];

  @IsEmail()
  @IsNotEmpty()
  email: User['email'];

  constructor(name: User['name'], email: User['email']) {
    this.name = name;
    this.email = email;
  }
}
