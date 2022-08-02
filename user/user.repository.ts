import sbDB from '@/config/supabase';
import User from '@/user/user.entity';
import { SupabaseQueryBuilder } from '@supabase/supabase-js/dist/module/lib/SupabaseQueryBuilder';

interface IUserRepository {
  readonly repository: SupabaseQueryBuilder<User>;
  create(user: User): Promise<User>;
}

class UserRepository implements IUserRepository {
  readonly repository: SupabaseQueryBuilder<User>;

  constructor() {
    this.repository = sbDB.from('user');
  }

  async create(user: User): Promise<User> {
    return user;
  }
}

export default UserRepository;
