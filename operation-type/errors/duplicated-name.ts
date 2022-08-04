import { UserInputError } from 'apollo-server-micro';

class DuplicatedNameError extends UserInputError {
  constructor() {
    super('Esse tipo de operação já foi cadastrado!', { fieldName: 'name' });
  }
}

export default DuplicatedNameError;
