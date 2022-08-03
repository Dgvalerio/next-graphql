import { IsNotEmpty, IsString } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class DeleteUserArgs {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;
}
