import { CreateUserArgs } from '@/user/types/create-user.args';
import { DeleteUserArgs } from '@/user/types/delete-user.args';
import { GetUserArgs } from '@/user/types/get-user.args';
import { UpdateUserArgs } from '@/user/types/update-user.args';
import User from '@/user/user.entity';
import UserService from '@/user/user.service';

import { Args, Mutation, Query, Resolver } from 'type-graphql';

interface IUserResolver {
  userService: UserService;
  createUser(user: CreateUserArgs): Promise<User[]>;
  getUsers(): Promise<User[]>;
  getUser(search: GetUserArgs): Promise<User[]>;
  updateUser(args: UpdateUserArgs): Promise<User[]>;
  deleteUser(args: DeleteUserArgs): Promise<boolean>;
}

@Resolver()
export class UserResolver implements IUserResolver {
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
  async getUser(@Args() search: GetUserArgs): Promise<User[]> {
    return this.userService.read(search);
  }

  @Mutation(() => [User])
  async updateUser(@Args() args: UpdateUserArgs): Promise<User[]> {
    return this.userService.update(args);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args() { id }: DeleteUserArgs): Promise<boolean> {
    return this.userService.delete(id);
  }
}
