import sbDB from '@/config/supabase';
import DuplicatedNameError from '@/operation-type/errors/duplicated-name';
import OperationType from '@/operation-type/operation-type.entity';
import CreateOperationTypeArgs from '@/operation-type/types/create-operation-type.args';
import GetOperationTypeArgs from '@/operation-type/types/get-operation-type.args';
import UpdateOperationTypeArgs from '@/operation-type/types/update-operation-type.args';
import User from '@/user/user.entity';
import { SupabaseQueryBuilder } from '@supabase/supabase-js/dist/module/lib/SupabaseQueryBuilder';

import { UserInputError } from 'apollo-server-micro';

interface IOperationTypeService {
  repository(): SupabaseQueryBuilder<OperationType>;
  create(
    data: CreateOperationTypeArgs,
    userId: User['id']
  ): Promise<OperationType[]>;
  readAll(userId: User['id']): Promise<OperationType[]>;
  read(
    search: GetOperationTypeArgs,
    userId: User['id']
  ): Promise<OperationType[]>;
  update(
    data: UpdateOperationTypeArgs,
    userId: User['id']
  ): Promise<OperationType[]>;
  delete(id: OperationType['id'], userId: User['id']): Promise<boolean>;
}

class OperationTypeService implements IOperationTypeService {
  repository(): SupabaseQueryBuilder<OperationType> {
    return sbDB.from('operation-type');
  }

  async create(
    data: CreateOperationTypeArgs,
    owner: User['id']
  ): Promise<OperationType[]> {
    const { status, body } = await this.repository().insert({ ...data, owner });

    switch (status) {
      case 201:
        return body || [];
      case 409:
        throw new DuplicatedNameError();
      default:
        return [];
    }
  }

  async readAll(userId: User['id']): Promise<OperationType[]> {
    const { status, body } = await this.repository()
      .select()
      .eq('owner', userId);

    switch (status) {
      case 200:
        return body || [];
      default:
        return [];
    }
  }

  async read(
    search: GetOperationTypeArgs,
    userId: User['id']
  ): Promise<OperationType[]> {
    const [key] = Object.keys(search) as (keyof GetOperationTypeArgs)[];

    if (!key) throw new UserInputError('Nenhum campo foi informado!');

    const value = search[key];

    if (!value) throw new UserInputError('Nenhum valor foi informado!');

    const { status, body } = await this.repository()
      .select()
      .eq('owner', userId)
      .eq(key, value);

    switch (status) {
      case 200:
        return body || [];
      default:
        return [];
    }
  }

  async update(
    data: UpdateOperationTypeArgs,
    userId: User['id']
  ): Promise<OperationType[]> {
    const { id, ...newData } = data;

    const { status, body } = await this.repository()
      .update(newData)
      .match({ id, owner: userId });

    switch (status) {
      case 200:
        return body || [];
      case 409:
        throw new DuplicatedNameError();
      default:
        return [];
    }
  }

  async delete(id: OperationType['id'], userId: User['id']): Promise<boolean> {
    const { body } = await this.repository()
      .delete()
      .match({ id, owner: userId });

    return !!(body && body.length > 0);
  }
}

export default OperationTypeService;
