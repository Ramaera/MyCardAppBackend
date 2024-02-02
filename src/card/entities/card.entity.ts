import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CARD_TYPE } from '@prisma/client';
import { BaseModel } from 'src/common/models/base.model';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { CardUser } from 'src/users/models/user.model';
import { CardUserData } from './cardUser.entity';
import { PaymentDocument } from 'src/payment-documents/entities/payment-document.entity';

@ObjectType()
export class Card {
  @Field(() => String, { nullable: true })
  cardNumber: string;

  @Field({ nullable: true })
  isActive: boolean;

  @Field({ nullable: true })
  cardValue: number;

  @Field({ nullable: true })
  cardType: CARD_TYPE;

  @Field({ nullable: true })
  maxDiscount: number;

  @Field({ nullable: true })
  cardValidity: number;

  @Field()
  id: number;

  @Field()
  transaction: Transaction;

  @Field(() => CardUserData, { nullable: true })
  cardHolderUser: CardUserData;

  @Field(() => [PaymentDocument], { nullable: true })
  Documents: PaymentDocument[];
}
