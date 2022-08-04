import { IsNotEmpty, IsString } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
class DeleteOperationTypeArgs {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export default DeleteOperationTypeArgs;
