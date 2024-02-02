import 'reflect-metadata';
import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
} from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
// import { Post } from '../../posts/models/post.model';
import { BaseModel } from '../../common/models/base.model';
import { Role } from '@prisma/client';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Card } from 'src/card/entities/card.entity';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class CardUser extends BaseModel {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  mobileNumber: string;

  @Field()
  Role: Role;
  @Field()
  referralAgencyCode: string;
  // @Field(() => [GraphQLJSONObject], { nullable: true })
  // address?: any[];
  // @Field(() => [GraphQLJSONObject], { nullable: true })
  // metaData?: any[];
  @HideField()
  password: string;

  @Field(() => [Card], { nullable: true })
  myCard: Card[];
}
