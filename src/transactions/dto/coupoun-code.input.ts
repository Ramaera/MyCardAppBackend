import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CoupounCodeDto {
  @Field(() => String, { description: 'Example field (placeholder)' })
  coupounCode: string;

  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  cardNumber: string;

  // @Field(() => GraphQLJSONObject, {
  //   description: 'Example field (placeholder)',
  // })
  // metaData: any;
}
