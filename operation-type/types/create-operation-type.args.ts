import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
class CreateOperationTypeArgs {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsHexColor()
  @IsNotEmpty()
  color: string;
}

export default CreateOperationTypeArgs;
