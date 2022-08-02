import sbDB from '@/config/supabase';
import { CreateUserDto } from '@/user/types/create-user.dto';
import User from '@/user/user.entity';
import { SupabaseQueryBuilder } from '@supabase/supabase-js/dist/module/lib/SupabaseQueryBuilder';

import { validate } from 'class-validator';

interface IUserRepository {
  readonly repository: SupabaseQueryBuilder<User>;
  create(user: CreateUserDto): Promise<User>;
}

class UserRepository implements IUserRepository {
  readonly repository: SupabaseQueryBuilder<User>;

  constructor() {
    this.repository = sbDB.from('user');
  }

  async create(input: CreateUserDto): Promise<User> {
    const user = new CreateUserDto(input.name, input.email);

    const validationErrors = await validate(user);

    if (validationErrors.length > 0) {
      console.log('validation failed: ', validationErrors);
    } else {
      console.log('validation succeed');
    }

    // const alfa = await this.repository.insert({ name: user.name });

    return { id: 0, ...user };
  }
}

export default UserRepository;
