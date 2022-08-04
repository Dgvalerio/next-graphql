import OperationType from '@/operation-type/operation-type.entity';
import OperationTypeService from '@/operation-type/operation-type.service';
import CreateOperationTypeArgs from '@/operation-type/types/create-operation-type.args';
import DeleteOperationTypeArgs from '@/operation-type/types/delete-operation-type.args';
import GetOperationTypeArgs from '@/operation-type/types/get-operation-type.args';
import UpdateOperationTypeArgs from '@/operation-type/types/update-operation-type.args';

import { Args, Mutation, Query, Resolver } from 'type-graphql';

interface IOperationTypeResolver {
  operationTypeService: OperationTypeService;
}

@Resolver()
class OperationTypeResolver implements IOperationTypeResolver {
  operationTypeService: OperationTypeService;

  // todo: change this later
  owner = '6';

  constructor() {
    this.operationTypeService = new OperationTypeService();
  }

  @Mutation(() => [OperationType])
  async createOperationType(
    @Args() { name, color }: CreateOperationTypeArgs
  ): Promise<OperationType[]> {
    return this.operationTypeService.create({ name, color }, this.owner);
  }

  @Query(() => [OperationType])
  async getOperationTypes(): Promise<OperationType[]> {
    return this.operationTypeService.readAll(this.owner);
  }

  @Query(() => [OperationType])
  async getOperationType(
    @Args() search: GetOperationTypeArgs
  ): Promise<OperationType[]> {
    return this.operationTypeService.read(search, this.owner);
  }

  @Mutation(() => [OperationType])
  async updateOperationType(
    @Args() args: UpdateOperationTypeArgs
  ): Promise<OperationType[]> {
    return this.operationTypeService.update(args, this.owner);
  }

  @Mutation(() => Boolean)
  async deleteOperationType(
    @Args() { id }: DeleteOperationTypeArgs
  ): Promise<boolean> {
    return this.operationTypeService.delete(id, this.owner);
  }
}

export default OperationTypeResolver;
