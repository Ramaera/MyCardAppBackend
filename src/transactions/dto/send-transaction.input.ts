import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class sendCodeDTO {
  @Field(() => String, { description: 'Example field (placeholder)' })
  cardNumber: string;
  @Field(() => Int, { description: 'Example field (placeholder)' })
  discountAmount: number;

  // @Field(() => GraphQLJSONObject, {
  //   description: 'Example field (placeholder)',
  // })
  // metaData?: any;
}
