import { ObjectType } from '@nestjs/graphql';
import { CardUser } from '../../users/models/user.model';
import { Token } from './token.model';

@ObjectType()
export class Authe extends Token {
  carduser: CardUser;
}
