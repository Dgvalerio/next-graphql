import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class OperationType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  color: string;

  @Field({ description: 'User id' })
  owner: string;
}

export default OperationType;
