import { CreateUserArgs } from '@/user/types/create-user.args';
import { GetUserArgs } from '@/user/types/get-user.args';
import { UpdateUserArgs } from '@/user/types/update-user.args';
import User from '@/user/user.entity';
import UserService from '@/user/user.service';

import { Args, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolver {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Mutation(() => [User])
  async createUser(@Args() { name, email }: CreateUserArgs): Promise<User[]> {
    return this.userService.create({ name, email });
  }

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.readAll();
  }

  @Query(() => [User])
  async getUser(@Args() args: GetUserArgs): Promise<User[]> {
    return this.userService.read(args);
  }

  @Mutation(() => [User])
  async updateUser(@Args() args: UpdateUserArgs): Promise<User[]> {
    return this.userService.update(args);
  }
}
