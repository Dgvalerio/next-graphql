import sbDB from '@/config/supabase';
import { CreateUserArgs } from '@/user/types/create-user.args';
import User from '@/user/user.entity';
import { SupabaseQueryBuilder } from '@supabase/supabase-js/dist/module/lib/SupabaseQueryBuilder';

interface IUserRepository {
  readonly repository: SupabaseQueryBuilder<User>;
  create(user: CreateUserArgs): Promise<User>;
}

class UserService implements IUserRepository {
  readonly repository: SupabaseQueryBuilder<User>;

  constructor() {
    this.repository = sbDB.from('user');
  }

  async create(args: CreateUserArgs): Promise<User> {
    // const alfa = await this.repository.insert({ name: user.name });

    return { id: 0, ...args };
  }
}

export default UserService;
