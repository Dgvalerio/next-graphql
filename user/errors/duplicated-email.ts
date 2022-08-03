import { UserInputError } from 'apollo-server-micro';

class DuplicatedEmailError extends UserInputError {
  constructor() {
    super('Esse e-mail já foi utilizado!', { fieldName: 'email' });
  }
}

export default DuplicatedEmailError;
