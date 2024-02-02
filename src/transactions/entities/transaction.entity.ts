import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CoupounCode {
  @Field(() => String, { description: 'Example field (placeholder)' })
  couponCode: string;
}

@ObjectType()
export class Transaction {
  @Field(() => String, { description: 'Example field (placeholder)' })
  coupounCode: string;
}
