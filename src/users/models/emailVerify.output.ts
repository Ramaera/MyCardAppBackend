import 'reflect-metadata';
import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
} from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field()
  message: string;
}
