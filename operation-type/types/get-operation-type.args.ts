import { IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
class GetOperationTypeArgs {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id?: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsHexColor()
  @IsNotEmpty()
  @IsOptional()
  color?: string;
}

export default GetOperationTypeArgs;
