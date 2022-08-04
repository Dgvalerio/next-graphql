import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
class UpdateUserArgs {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;
}

export default UpdateUserArgs;
