import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CARD_TYPE } from '@prisma/client';
import { BaseModel } from 'src/common/models/base.model';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@ObjectType()
export class CardUserData {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  mobileNumber: string;

  @Field()
  referralAgencyCode: string;
}
