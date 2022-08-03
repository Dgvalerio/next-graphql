import sbDB from '@/config/supabase';
import { CreateUserArgs } from '@/user/types/create-user.args';
import { GetUserArgs } from '@/user/types/get-user.args';
import { UpdateUserArgs } from '@/user/types/update-user.args';
import User from '@/user/user.entity';
import { SupabaseQueryBuilder } from '@supabase/supabase-js/dist/module/lib/SupabaseQueryBuilder';

import { UserInputError } from 'apollo-server-micro';

interface IUserService {
  create(user: CreateUserArgs): Promise<User[]>;
  readAll(): Promise<User[]>;
  read(search: GetUserArgs): Promise<User[]>;
  update(data: UpdateUserArgs): Promise<User[]>;
  delete(userId: User['id']): Promise<boolean>;
}

class UserService implements IUserService {
  private repository(): SupabaseQueryBuilder<User> {
    return sbDB.from('user');
  }

  async create({ name, email }: CreateUserArgs): Promise<User[]> {
    const { status, body } = await this.repository().insert({
      name,
      email,
    });

    switch (status) {
      case 201:
        return body || [];
      case 409:
        throw new UserInputError('Esse e-mail já foi utilizado!', {
          fieldName: 'email',
        });
      default:
        return [];
    }
  }

  async readAll(): Promise<User[]> {
    const { status, body } = await this.repository().select();

    switch (status) {
      case 200:
        return body || [];
      default:
        return [];
    }
  }

  async read(search: GetUserArgs): Promise<User[]> {
    const [key] = Object.keys(search) as (keyof GetUserArgs)[];

    if (!key) throw new UserInputError('Nenhum campo foi informado!');

    const value = search[key];

    if (!value) throw new UserInputError('Nenhum valor foi informado!');

    const { status, body } = await this.repository().select().eq(key, value);

    switch (status) {
      case 200:
        return body || [];
      default:
        return [];
    }
  }

  async update(data: UpdateUserArgs): Promise<User[]> {
    const { id, ...newData } = data;

    const { status, body } = await this.repository()
      .update(newData)
      .match({ id });

    switch (status) {
      case 200:
        return body || [];
      case 409:
        throw new UserInputError('Esse e-mail já foi utilizado!', {
          fieldName: 'email',
        });
      default:
        return [];
    }
  }

  async delete(userId: User['id']): Promise<boolean> {
    const { body } = await this.repository().delete().match({ id: userId });

    return !!(body && body.length > 0);
  }
}

export default UserService;
