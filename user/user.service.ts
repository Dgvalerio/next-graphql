import sbDB from '@/config/supabase';
import { CreateUserArgs } from '@/user/types/create-user.args';
import { GetUserArgs } from '@/user/types/get-user.args';
import User from '@/user/user.entity';
import { SupabaseQueryBuilder } from '@supabase/supabase-js/dist/module/lib/SupabaseQueryBuilder';

import { UserInputError } from 'apollo-server-micro';

interface IUserRepository {
  readonly repository: SupabaseQueryBuilder<User>;
  create(user: CreateUserArgs): Promise<User[]>;
  readAll(): Promise<User[]>;
}

class UserService implements IUserRepository {
  readonly repository: SupabaseQueryBuilder<User>;

  constructor() {
    this.repository = sbDB.from('user');
  }

  async create({ name, email }: CreateUserArgs): Promise<User[]> {
    const { status, body } = await this.repository.insert({
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
    const { status, body } = await this.repository.select();

    switch (status) {
      case 200:
        return body || [];
      default:
        return [];
    }
  }

  async read(partial: GetUserArgs): Promise<User[]> {
    const [key] = Object.keys(partial) as (keyof GetUserArgs)[];

    if (!key) throw new UserInputError('Nenhum campo foi informado!');

    const value = partial[key];

    if (!value) throw new UserInputError('Nenhum valor foi informado!');

    const { status, body } = await this.repository.select().eq(key, value);

    switch (status) {
      case 200:
        return body || [];
      default:
        return [];
    }
  }
}

export default UserService;
