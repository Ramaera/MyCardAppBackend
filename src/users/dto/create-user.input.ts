import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { CARD_TYPE } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import { Expose } from 'class-transformer';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateUserDto {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  mobileNumber: string;
  @Field()
  referralAgencyCode: string;
  @Field(() => [GraphQLJSONObject], { nullable: true })
  address?: any[];
  @Field(() => [GraphQLJSONObject], { nullable: true })
  metaData?: any[];
}

registerEnumType(CARD_TYPE, {
  name: 'CARD_TYPE',
});
