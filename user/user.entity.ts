import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}

export default User;
