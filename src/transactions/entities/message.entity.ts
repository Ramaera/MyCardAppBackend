import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => String, { description: 'Example field (placeholder)' })
  message: string;
}
