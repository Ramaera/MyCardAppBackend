import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class TransactionDto {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  cardNumber: number;
  @Field(() => Int, { description: 'Example field (placeholder)' })
  coupounCode: number;
  @Field(() => Int, { description: 'Example field (placeholder)' })
  discountAmount: number;

  @Field(() => GraphQLJSONObject, {
    description: 'Example field (placeholder)',
  })
  metaData: any;
}
